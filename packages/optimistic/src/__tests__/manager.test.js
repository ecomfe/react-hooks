import {consumeOptimistic, initialize} from '../manager';

const immediate = () => new Promise(resolve => setImmediate(resolve));

const saveTodo = async todo => {
    await immediate();
    return {...todo, id: 1};
};

describe('consumeOptimistic', () => {
    test('single async workflow', async () => {
        let state = initialize({loading: false, todos: []});
        let callCount = 0;
        const snapshots = [
            [false, {loading: true, todos: []}],
            [true, {loading: false, todos: [{name: 'new'}]}],
            [false, {loading: false, todos: [{id: 1, name: 'new'}]}],
        ];
        const execute = fn => {
            state = fn(state);
            const [optimistic, hostState] = snapshots[callCount];
            expect(state.optimistic).toBe(optimistic);
            expect(state.hostState).toEqual(hostState);
            callCount++;
        };
        await consumeOptimistic(
            execute,
            function* save() {
                yield state => ({...state, loading: true});
                const savedTodo = yield saveTodo({name: 'new'});
                yield state => ({loading: false, todos: state.todos.concat(savedTodo)});
            },
            state => ({loading: false, todos: state.todos.concat({name: 'new'})})
        );
        expect(callCount).toBe(3);
    });

    test('multiple async workflows', async () => {
        let state = initialize({pendingCount: 0, todos: []});
        let callCount = 0;
        const snapshots = [
            [false, {pendingCount: 1, todos: []}], // before 1
            [true, {pendingCount: 0, todos: [{name: 'foo'}]}], // optimistic 1
            [true, {pendingCount: 1, todos: [{name: 'foo'}]}], // before 2
            [true, {pendingCount: 0, todos: [{name: 'foo'}, {name: 'bar'}]}], // optimistic 2
            [true, {pendingCount: 0, todos: [{name: 'bar'}, {id: 1, name: 'foo'}]}], // after 1
            [false, {pendingCount: 0, todos: [{id: 1, name: 'foo'}, {id: 1, name: 'bar'}]}], // after 2
        ];
        const execute = fn => {
            state = fn(state);
            const [optimistic, hostState] = snapshots[callCount];
            expect(state.optimistic).toBe(optimistic);
            expect(state.hostState).toEqual(hostState);
            callCount++;
        };
        const run = name => consumeOptimistic(
            execute,
            function* save() {
                yield state => ({...state, pendingCount: state.pendingCount + 1});
                const savedTodo = yield saveTodo({name});
                yield state => ({pendingCount: state.pendingCount - 1, todos: state.todos.concat(savedTodo)});
            },
            state => ({pendingCount: state.pendingCount - 1, todos: state.todos.concat({name})})
        );
        await Promise.all([run('foo'), run('bar')]);
        expect(callCount).toBe(6);
    });

    test('multiple yields after async return', async () => {
        let state = initialize(0);
        let callCount = 0;
        const snapshots = [
            [false, 1],
            [true, 10],
            [false, 2],
            [false, 3],
        ];
        const execute = fn => {
            state = fn(state);
            const [optimistic, hostState] = snapshots[callCount];
            expect(state.optimistic).toBe(optimistic);
            expect(state.hostState).toEqual(hostState);
            callCount++;
        };
        await consumeOptimistic(
            execute,
            function* save() {
                yield () => 1;
                yield immediate();
                yield () => 2;
                yield () => 3;
            },
            () => 10
        );
        expect(callCount).toBe(4);
    });

    test('multiple async stage', async () => {
        let state = initialize(0);
        let callCount = 0;
        const snapshots = [
            [false, 1],
            [true, 10],
            [false, 2],
            [false, 3],
        ];
        const execute = fn => {
            state = fn(state);
            const [optimistic, hostState] = snapshots[callCount];
            expect(state.optimistic).toBe(optimistic);
            expect(state.hostState).toEqual(hostState);
            callCount++;
        };
        await consumeOptimistic(
            execute,
            function* save() {
                yield () => 1;
                yield immediate();
                yield () => 2;
                yield immediate();
                yield () => 3;
            },
            () => 10
        );
        expect(callCount).toBe(4);
    });

    test('exceptions', async () => {
        let state = initialize(0);
        let callCount = 0;
        const snapshots = [
            [false, 1],
            [true, 10],
            [false, -1],
        ];
        const execute = fn => {
            state = fn(state);
            const [optimistic, hostState] = snapshots[callCount];
            expect(state.optimistic).toBe(optimistic);
            expect(state.hostState).toEqual(hostState);
            callCount++;
        };
        await consumeOptimistic(
            execute,
            function* save() {
                yield () => 1;
                try {
                    yield immediate().then(() => throw new Error('error'));
                    yield () => 2;
                }
                catch (ex) {
                    yield () => -1;
                }
            },
            () => 10
        );
        expect(callCount).toBe(3);
    });
});
