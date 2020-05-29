# @madebyheyday/sentry-util

Provides basic sentry integration for Node and Browser based projects and includes Typescript type declarations.

## Usage

Set the following environment variables in Node or the browser (via webpack):

| Variable           | Purpose                                                                                                                                                                                                                                    |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| SENTRY_ENABLED     | Used by default beforeSend() function if no custom beforeSend function is provided.<br>Set to true\|1 / false\|0 to enable/disable reporting errors to Sentry                                                                              |
| SENTRY_DSN         | DSN as found in your Sentry settings                                                                                                                                                                                                       |
| SENTRY_ENVIRONMENT | Environment identifier to use when reporting errors.<br>Can be overriden in browser context by providing parameter `environment` to `initSentry()` in case your environment cannot or should not be hardcoded in to the application source |
| SENTRY_RELEASE     | set to the release name to report to sentry when capturing errors. When not set, the Node implementation will use `${process.env.npm_package_name}@${process.env.npm_package_version` as a default.                                        |

### Browsers

In your main.js

```
import Sentry, { initSentry } from '@madebyheyday/sentry-util/browser';

initSentry({ environment: 'production' });
// optionally provide a custom beforeSend function to filter captured errors
initSentry({ environment: 'production', beforeSend: (error: Error): Error | null => error });

// optionally use Sentry instance to allow setting extras, breadcrumbs, ...
Sentry.setExtra('userAuthenticated', false);

```

Anywhere you wish to capture errors

```
import Sentry, { captureAndLogError } from '@madebyheyday/sentry-util/browser';

// optionally use Sentry instance to allow setting extras, breadcrumbs, ...
Sentry.addBreadcrumb({
	level: Sentry.Severity.Debug,
	message: `User logged in`
});

// use captureAndLogError() as an error handler for promises or try/catch blocks
anyPromise.catch(captureAndLogError);

try {
	throw new Error('test')
} catch (error) {
	captureAndLogError(error);
}
```

### Node

Set `process.env.SENTRY_ENVIRONMENT` to the desired environment specifier to use when reporting errors.

```
import Sentry, { initSentry, captureAndLogError } from '@madebyheyday/sentry-util/node';

// initialize sentry
initSentry();
// optionally provide a custom beforeSend function to filter captured errors
initSentry({ beforeSend: (error: Error): Error | null => error });

// package exports Sentry instance to allow setting extras, breadcrumbs, ...
Sentry.setExtra('userAuthenticated', false);


// then use captureAndLogError() as an error handler for promises or try/catch blocks
anyPromise.catch(captureAndLogError);

try {
	throw new Error('test')
} catch (error) {
	captureAndLogError(error);
}
```
