# Karma Configuration

Angular CLI can construct Karma configuration for you. Add a `karma.conf.js` only when the project needs explicit Karma options, custom reporters, launcher settings, or coverage thresholds.

## Create or Start a Config

```bash
# Angular CLI project: generate a Karma config file
ng generate config karma

# Plain Karma project: initialize a config file interactively
npx karma init karma.conf.js

# Start Karma with a config file
npx karma start karma.conf.js
```

## Common `karma.conf.js` Shape

```js
module.exports = function (config) {
  config.set({
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    browsers: ['Chrome'],
    reporters: ['progress', 'kjhtml'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma'),
    ],
    singleRun: false,
    autoWatch: true,
  });
};
```

## CLI Overrides

Karma options in the config file can be overridden from the CLI.

```bash
npx karma start karma.conf.js --single-run --log-level debug
npx karma start karma.conf.js --browsers ChromeHeadless --reporters progress
ng test --no-watch --browsers=ChromeHeadless
```

## Options to Check

- `singleRun`: run once and exit with pass/fail status for CI.
- `autoWatch`: rerun when watched files change.
- `browsers`: launch browsers such as `Chrome` or `ChromeHeadless` when the launcher plugin is installed.
- `reporters`: include terminal, HTML, coverage, or CI reporters supported by installed plugins.
- `plugins`: load framework adapters, launchers, reporters, and preprocessors.
- `files`: include browser-loaded files in plain Karma projects; Angular CLI projects usually let the builder manage this.
- Timeouts: `captureTimeout`, `browserNoActivityTimeout`, `browserDisconnectTimeout`, and `browserSocketTimeout` help diagnose slow or flaky browser startup.
- `failOnSkippedTests`: fail on deliberate skips such as `fit()` or `xit()`.

## TypeScript Config Caveat

Karma can load TypeScript config through `ts-node`, but ES module output in the resolved `tsconfig.json` can cause Node parse errors. Use a JavaScript wrapper that registers `ts-node` with `module: 'commonjs'` when needed.

```js
require('ts-node').register({
  compilerOptions: { module: 'commonjs' },
});
require('./karma.conf.ts');
```

## Do

- Keep Angular CLI test settings in `angular.json` unless a real Karma config is needed.
- Keep `plugins` aligned with every non-built-in framework, launcher, reporter, or preprocessor you configure.
- Use CLI overrides for one-off runs instead of changing committed config.
- Enable `failOnSkippedTests` when accidental focused or skipped specs must fail CI.

## Don't

- Don't add `files` globs that fight the Angular CLI builder in CLI-managed projects.
- Don't tune timeouts before checking browser launcher installation and startup logs.
- Don't assume `singleRun: true` also disables every project-level watch wrapper.
- Don't commit debug-only `logLevel: config.LOG_DEBUG` unless the team wants noisy output.

## Official Sources

- https://angular.dev/guide/testing/karma
- https://karma-runner.github.io/6.4/intro/configuration.html
- https://karma-runner.github.io/6.4/config/configuration-file.html
