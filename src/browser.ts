/**
 * Sentry Connector for Browser based environments (non-Node)
 */
import * as Sentry from '@sentry/browser';

// emit events only if sentry is enabled for the current environment:
const beforeSend = (error: Error): Error | null => (process.env.SENTRY_ENABLED ? error : null);

export function initSentry(release?: string): void {
	Sentry.init({
		dsn: process.env.SENTRY_DSN || '',
		environment: process.env.SENTRY_ENVIRONMENT || '',
		release,
		beforeSend
	});
}
export function captureAndLogError(error: Error): void {
	console.error(error);
	Sentry.captureException(error);
}

export default Sentry;
