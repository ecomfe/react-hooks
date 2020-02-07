import * as router from '../index';

describe('index', () => {
    test('useQuery', () => expect(typeof router.useQuery).toBe('function'));
    test('useUpdateQuery', () => expect(typeof router.useUpdateQuery).toBe('function'));
    test('useQueryState', () => expect(typeof router.useQueryState).toBe('function'));
    test('useNavigate', () => expect(typeof router.useNavigate).toBe('function'));
});
