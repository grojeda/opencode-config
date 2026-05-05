# TypeScript with Jest

Jest can run TypeScript through Babel, SWC, or ts-jest. Know whether your test transform type-checks or only transpiles.

## Jest Globals

Import from `@jest/globals` when the project does not expose Jest globals or when explicit imports are preferred.

```ts
import { describe, expect, jest, test } from '@jest/globals';

test('formats a name', () => {
  const format = jest.fn((name: string) => name.trim());

  expect(format(' Ada ')).toBe('Ada');
});
```

## Type Checking

Babel and SWC commonly transpile TypeScript without type-checking. Run TypeScript separately in validation and CI.

```bash
npx tsc --noEmit
npx jest
```

`ts-jest` can type-check during tests, but it is often slower than Babel or SWC transforms.

## Transform Tradeoffs

- Babel: fast transpilation, broad ecosystem support, usually no type-checking.
- SWC: very fast transpilation, usually no type-checking.
- ts-jest: closer TypeScript compiler behavior, can type-check, often slower.

Choose the transform that matches the project. Do not switch transforms just to fix one test unless the current transform cannot support the code.

## Path Aliases

Mirror TypeScript `paths` in Jest `moduleNameMapper`.

```js
module.exports = {
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};
```

If aliases work in the app but fail in Jest, check `tsconfig.json`, Jest `rootDir`, and `moduleNameMapper` together.

## ESM and CommonJS

Config mismatches are a common source of TypeScript Jest failures.

- Check `package.json` `type`, TypeScript `module`, and Jest transform output.
- Use the file extension and config format Jest expects: `jest.config.js`, `jest.config.cjs`, `jest.config.mjs`, or `jest.config.ts`.
- Ensure ESM-only dependencies are transformed or loaded in a Jest-supported way.
- Avoid mixing `require` and `import` fixes without understanding the runtime mode.

## Do

- Run `tsc --noEmit` when the Jest transform only transpiles.
- Import Jest globals explicitly when required by project config or lint rules.
- Keep path aliases synchronized between TypeScript, bundler, and Jest.
- Treat ESM/CommonJS errors as config alignment problems first.

## Don't

- Don't assume passing Jest means TypeScript types are valid.
- Don't duplicate app aliases differently in Jest.
- Don't mock around type errors instead of running the type checker.
- Don't switch between ESM and CommonJS piecemeal in test files.

## Official Sources

- https://jestjs.io/docs/getting-started#using-typescript
- https://jestjs.io/docs/ecmascript-modules
- https://jestjs.io/docs/configuration#modulenamemapper-objectstring-string--arraystring
- https://www.typescriptlang.org/docs/handbook/module-resolution.html
