import {OptimisticState, NextState, Execute, AsyncWorkFlow} from './interface';

const NONE = {};

export function initialize<T>(state: T): OptimisticState<T> {
    return {
        optimistic: false,
        archive: NONE,
        queue: [],
        hostState: state,
    };
}

function putOptimisticBy<T>(transactionID: number, next: NextState<T>): NextState<OptimisticState<T>> {
    return state => {
        return {
            ...state,
            optimistic: true,
            archive: state.archive === NONE ? state.hostState : state.archive,
            queue: state.queue.concat({transactionID, next}),
            hostState: next(state.hostState),
        };
    };
}

function putNormalBy<T>(next: NextState<T>): NextState<OptimisticState<T>> {
    return state => {
        return {
            ...state,
            queue: state.optimistic ? state.queue.concat({next}) : state.queue,
            hostState: next(state.hostState),
        };
    };
}

function rollbackBy<T>(transactionID: number, next: NextState<T>): NextState<OptimisticState<T>> {
    const putNormal = putNormalBy(next);

    return state => {
        /* eslint-disable no-param-reassign */
        const rollbackedState = state.queue.reduce(
            (input, action) => {
                if (action.transactionID === transactionID) {
                    return input;
                }

                const isOptimisticAction = !!action.transactionID;

                // The next save point should be the first time an optimistic action is dispatched,
                // so any actions earlier than new save point should be safe to discard
                if (input.archive === NONE && isOptimisticAction) {
                    input.archive = input.hostState;
                }

                if (input.archive !== NONE) {
                    input.queue.push(action);
                }

                // Still mark state to optimistic if an optimistic action occurs
                if (isOptimisticAction) {
                    input.optimistic = true;
                }

                // Apply remaining action to make state up to time,
                // here we just need to apply all middlewares **after** redux-optimistic-manager,
                // so use `next` instead of global `dispatch`
                input.hostState = action.next(input.hostState);

                return input;
            },
            {archive: NONE, queue: [] as typeof state['queue'], hostState: state.archive as T, optimistic: false}
        );
        /* eslint-enable no-param-reassign */
        return putNormal(rollbackedState);
    };
}

const uuid = (() => {
    let i = 1;
    return () => i++;
})();

const isPromise = (value: any): value is Promise<any> => value && typeof value.then === 'function';

export async function consumeOptimistic<T, R>(
    execute: Execute<T>,
    reduceAsync: AsyncWorkFlow<T, R>,
    reduceOptimistic: NextState<T>
) {
    const transactionID = uuid();
    const generator = reduceAsync();
    let next = generator.next();
    let isPromiseOccured = false;
    let isRollbacked = false;

    while (!next.done) {
        const yieldValue = next.value;

        if (isPromise(yieldValue)) {
            if (!isPromiseOccured) {
                isPromiseOccured = true;
                execute(putOptimisticBy(transactionID, reduceOptimistic));
            }

            try {
                const result = await yieldValue;
                next = generator.next(result);
            }
            catch (ex) {
                next = (generator.throw as Function)(ex);
            }
        }
        else {
            if (isPromiseOccured && !isRollbacked) {
                isRollbacked = true;
                execute(rollbackBy(transactionID, yieldValue));
            }
            else {
                execute(putNormalBy(yieldValue));
            }

            next = generator.next();
        }
    }
}

export function consumeReduce<T>(execute: Execute<T>, reduce: NextState<T>) {
    execute(putNormalBy(reduce));
}
