export interface SnapshotState<T> {
    pendingValue: T;
    history: T[];
    version: number | null;
}
