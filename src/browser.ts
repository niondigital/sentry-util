/**
 * Sentry Connector for Browser based environments (non-Node)
 */
import * as Sentry from '@sentry/browser';

// emit events only if sentry is enabled for the current environment:
const beforeSendDefault = (error: Error): Error | null => (process.env.SENTRY_ENABLED ? error : null);

export function initSentry(environment: string, release?: string, beforeSend?: (error: Error) => Error | null): void {
	Sentry.init({
		dsn: process.env.SENTRY_DSN || '',
		environment, // used to be process.env.SENTRY_ENVIRONMENT || ''
		release,
		beforeSend: beforeSend ? beforeSend : beforeSendDefault
	});
}
export function captureAndLogError(error: Error): void {
	console.error(error);
	Sentry.captureException(error);
}

export default Sentry;
