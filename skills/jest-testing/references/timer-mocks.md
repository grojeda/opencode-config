# Timer Mocks

Use fake timers to make time-based code deterministic. Enable them only in tests that need timer control, and restore real timers after cleanup.

## Basic Flow

```ts
afterEach(() => {
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
});

test('runs delayed work', () => {
  jest.useFakeTimers();

  const callback = jest.fn();
  schedule(callback);

  jest.advanceTimersByTime(1000);

  expect(callback).toHaveBeenCalledTimes(1);
});
```

## Timer Controls

```ts
jest.useFakeTimers();

// Run every currently scheduled timer, including timers scheduled by timers.
jest.runAllTimers();

// Run only timers currently pending. Use for recursive timers.
jest.runOnlyPendingTimers();

// Move virtual time forward.
jest.advanceTimersByTime(500);

// Restore real timers.
jest.useRealTimers();
```

## Recursive Timers

Use `runOnlyPendingTimers` for code that schedules the next timer from inside a timer callback.

```ts
test('polls once', () => {
  jest.useFakeTimers();
  const poll = jest.fn(() => setTimeout(poll, 1000));

  setTimeout(poll, 1000);
  jest.runOnlyPendingTimers();

  expect(poll).toHaveBeenCalledTimes(1);
});
```

## React Testing Library Cleanup

If fake timers are active, flush pending timers before switching back so scheduled cleanup does not leak.

```ts
afterEach(() => {
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
});
```

## Do

- Use fake timers for debounce, throttle, retry, polling, and delayed cleanup code.
- Prefer `advanceTimersByTime` when asserting behavior at specific timestamps.
- Use `runOnlyPendingTimers` for recursive or self-scheduling timers.
- Restore real timers in `afterEach` when a test enables fake timers.

## Don't

- Don't enable fake timers globally unless every test in the file expects them.
- Don't use `runAllTimers` on recursive timers.
- Don't leave fake timers enabled for later tests.
- Don't combine arbitrary sleeps with fake timers.

## Official Sources

- https://jestjs.io/docs/timer-mocks
- https://testing-library.com/docs/using-fake-timers/
