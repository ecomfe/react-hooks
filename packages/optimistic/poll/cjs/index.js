"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const user_attention_1 = require("user-attention");
const action_pending_1 = require("@huse/action-pending");
const timeout_1 = require("@huse/timeout");
const resolveOptions = (options) => {
    if (typeof options === 'number') {
        return {
            minInterval: options,
            maxInterval: options,
            maxIdleTime: 0,
            stopOnInactive: false,
        };
    }
    return {
        minInterval: options.minInterval,
        maxInterval: options.maxInterval || options.minInterval,
        maxIdleTime: options.maxIdleTime || 30 * 1000,
        stopOnInactive: options.stopOnInactive || false,
    };
};
function usePoll(fetch, options) {
    const { minInterval, maxInterval, maxIdleTime, stopOnInactive } = resolveOptions(options);
    const attention = react_1.useRef(null);
    const lastAttentionState = react_1.useRef('active');
    const lastPollTime = react_1.useRef(Date.now());
    const [poll, pendingCount] = action_pending_1.useActionPending(fetch);
    const [response, setResponse] = react_1.useState();
    const pollAndStore = react_1.useCallback(() => {
        lastPollTime.current = Date.now();
        poll().then(setResponse);
    }, [poll]);
    react_1.useEffect(() => {
        const context = user_attention_1.create({ maxIdleTime });
        attention.current = context;
        return () => {
            context.dispose();
            attention.current = null;
        };
    }, [maxIdleTime]);
    react_1.useEffect(() => pollAndStore(), [pollAndStore]);
    timeout_1.useStableInterval(() => {
        if (!attention.current) {
            pollAndStore();
            return;
        }
        const userAttentionState = attention.current.getState();
        if (stopOnInactive && userAttentionState === 'inactive') {
            return;
        }
        const now = Date.now();
        const timeEllapsedSinceLastPoll = now - lastPollTime.current;
        const minTimeAllowedToPoll = userAttentionState === 'active' ? minInterval : maxInterval - minInterval;
        if (timeEllapsedSinceLastPoll >= minTimeAllowedToPoll) {
            pollAndStore();
        }
    }, minInterval);
    react_1.useEffect(() => {
        if (!attention.current) {
            return;
        }
        const { subscribe, getState } = attention.current;
        const detectActive = () => {
            const previousState = lastAttentionState.current;
            const currentState = getState();
            lastAttentionState.current = currentState;
            if (stopOnInactive
                && previousState === 'inactive'
                && currentState === 'active'
                && Date.now() - lastPollTime.current >= minInterval) {
                pollAndStore();
            }
        };
        return subscribe(detectActive);
    }, [minInterval, pollAndStore, stopOnInactive]);
    return [response, pendingCount];
}
exports.usePoll = usePoll;
//# sourceMappingURL=index.js.map