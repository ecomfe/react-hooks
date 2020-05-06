const normalize = (pathname: string): string => pathname.replace(/\/{2,}/g, '/');
const trimTrailingSlashes = (pathname: string): string => pathname.replace(/\/+$/, '');

export const resolve = (from: string, to: string): string => {
    if (!to) {
        return normalize(trimTrailingSlashes(from));
    }

    if (to.startsWith('/')) {
        return to;
    }

    const segments = normalize(trimTrailingSlashes(from)).split('/');
    const toSegments = normalize(trimTrailingSlashes(to)).split('/');

    for (const segment of toSegments) {
        if (segment === '..') {
            // Reserve the heading `""` segment in order to currectly join them including a leading `"/""`
            segments.length > 1 && segments.pop();
        }
        else if (segment !== '.') {
            segments.push(segment);
        }
    }

    return segments.length > 1 ? normalize(segments.join('/')) : '/';
};
