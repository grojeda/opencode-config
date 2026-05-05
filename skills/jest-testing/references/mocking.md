# Mocking Modules and Functions

Mock collaborators at the boundary of the unit under test. Keep the real behavior of the code being tested intact.

## Function Mocks

```ts
const sendEmail = jest.fn().mockResolvedValue({ id: 'msg_1' });

await notifyUser({ sendEmail });

expect(sendEmail).toHaveBeenCalledWith('user@example.com');
```

Use async helpers for promise-based dependencies:

```ts
const loadUser = jest.fn()
  .mockResolvedValueOnce({ id: '1' })
  .mockRejectedValueOnce(new Error('offline'));
```

## Spies

Use `jest.spyOn` when you need to observe or temporarily replace an existing method.

```ts
const errorSpy = jest
  .spyOn(console, 'error')
  .mockImplementation(() => {});

try {
  runWithExpectedError();
  expect(errorSpy).toHaveBeenCalled();
} finally {
  errorSpy.mockRestore();
}
```

## Module Mocks

```ts
jest.mock('../api', () => ({
  fetchUser: jest.fn().mockResolvedValue({ id: '1' }),
}));
```

Partial mock with `jest.requireActual`:

```ts
jest.mock('../api', () => {
  const actual = jest.requireActual('../api');

  return {
    ...actual,
    fetchUser: jest.fn().mockRejectedValue(new Error('offline')),
  };
});
```

## Cleanup Differences

- `jest.clearAllMocks()` clears call history but keeps mock implementations.
- `jest.resetAllMocks()` clears call history and resets mock implementations.
- `jest.restoreAllMocks()` restores original implementations for spies and replaced properties.

```ts
afterEach(() => {
  jest.clearAllMocks();
  jest.restoreAllMocks();
});
```

## Do

- Mock network, filesystem, time, process globals, and external service boundaries.
- Prefer narrow mocks that model the behavior the test needs.
- Restore spies that replace real global or module methods.
- Use `mockResolvedValue` and `mockRejectedValue` for async collaborators.

## Don't

- Don't mock the unit under test.
- Don't over-mock internal implementation details that should be exercised by the test.
- Don't share mutable mock state across tests without resetting it.
- Don't use broad auto-mocks when explicit behavior is clearer.

## Official Sources

- https://jestjs.io/docs/mock-functions
- https://jestjs.io/docs/jest-object#jestmockmodulename-factory-options
- https://jestjs.io/docs/jest-object#jestrequireactualmodulename
