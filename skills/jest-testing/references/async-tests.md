# Async Tests

Jest only fails an async test reliably when the promise is returned or awaited. Every async path must be observable by the test runner.

## Promises

```ts
test('loads a user', async () => {
  await expect(loadUser('1')).resolves.toEqual({ id: '1' });
});

test('rejects missing users', async () => {
  await expect(loadUser('missing')).rejects.toThrow('not found');
});
```

Return the promise if the test is not marked `async`:

```ts
test('loads a user', () => {
  return expect(loadUser('1')).resolves.toMatchObject({ id: '1' });
});
```

## Rejection Assertions

Use `expect.assertions()` when a `catch` path must run.

```ts
test('reports validation errors', async () => {
  expect.assertions(1);

  try {
    await saveUser({ name: '' });
  } catch (error) {
    expect(error).toMatchObject({ code: 'VALIDATION_ERROR' });
  }
});
```

Prefer `rejects` when possible:

```ts
await expect(saveUser({ name: '' })).rejects.toMatchObject({
  code: 'VALIDATION_ERROR',
});
```

## Callback APIs

Use `done` only for callback-style APIs that do not expose promises. Wrap assertions in `try/catch` and pass errors to `done`.

```ts
test('calls back with data', done => {
  fetchUser('1', (error, user) => {
    try {
      expect(error).toBeNull();
      expect(user).toEqual({ id: '1' });
      done();
    } catch (assertionError) {
      done(assertionError);
    }
  });
});
```

## Do

- Return or await every promise under test.
- Use `await expect(promise).resolves` and `await expect(promise).rejects` for promise outcomes.
- Use `expect.assertions()` for rejection and callback paths that must execute.
- Convert callback APIs to promises when that makes tests simpler.

## Don't

- Don't mix `done` with `async` tests or returned promises.
- Don't assert inside an unawaited `.then()` or `.catch()` chain.
- Don't add arbitrary sleeps to wait for async work.
- Don't ignore unhandled promise rejections; make the failing path explicit.

## Official Sources

- https://jestjs.io/docs/asynchronous
- https://jestjs.io/docs/expect#resolves
- https://jestjs.io/docs/expect#rejects
