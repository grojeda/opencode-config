# React Testing Library

Test what users can observe and do. Avoid coupling tests to component internals, private state, or implementation-only structure.

## Guiding Principle

The more tests resemble the way software is used, the more confidence they provide.

```tsx
render(<LoginForm />);

await userEvent.type(screen.getByLabelText(/email/i), 'a@example.com');
await userEvent.type(screen.getByLabelText(/password/i), 'secret');
await userEvent.click(screen.getByRole('button', { name: /sign in/i }));

expect(await screen.findByText(/welcome/i)).toBeInTheDocument();
```

## Query Priority

Prefer queries in this order:

- `getByRole` for accessible elements and names.
- `getByLabelText` for form fields.
- `getByPlaceholderText` when no label exists.
- `getByText` for visible text.
- `getByDisplayValue` for current form values.
- `getByAltText` for images.
- `getByTitle` only when title is meaningful to users.
- `getByTestId` last, when no user-facing query is stable.

## Interactions

Use `@testing-library/user-event` for realistic interactions.

```tsx
const user = userEvent.setup();

await user.click(screen.getByRole('button', { name: /save/i }));
await user.keyboard('{Escape}');
await user.selectOptions(screen.getByLabelText(/role/i), 'admin');
```

Use lower-level `fireEvent` only when `user-event` does not model the event you need.

## Async UI

```tsx
expect(await screen.findByRole('alert')).toHaveTextContent(/saved/i);

await waitFor(() => {
  expect(api.save).toHaveBeenCalledTimes(1);
});

await waitForElementToBeRemoved(() => screen.getByText(/loading/i));
```

- Use `findBy*` for elements that should appear later.
- Use `waitFor` for assertions that become true after async work.
- Use `waitForElementToBeRemoved` for loading states and dismissals.

## Do

- Assert accessible roles, labels, names, and visible outcomes.
- Use `user-event` for clicks, typing, selection, tabbing, and keyboard flows.
- Mock network or service boundaries rather than component internals.
- Keep snapshots small and intentional if used at all.

## Don't

- Don't inspect component state, hooks, or instance internals.
- Don't use a shallow-rendering mindset; render the behavior users depend on.
- Don't prefer `data-testid` when accessible queries work.
- Don't create broad snapshots that fail on harmless markup changes.

## Official Sources

- https://testing-library.com/docs/guiding-principles
- https://testing-library.com/docs/queries/about
- https://testing-library.com/docs/user-event/intro
- https://testing-library.com/docs/dom-testing-library/api-async
- https://testing-library.com/docs/react-testing-library/intro/
