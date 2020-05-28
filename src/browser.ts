/**
 * Sentry Connector for Browser based environments (non-Node)
 */
import * as Sentry from '@sentry/browser';

export function initSentry(environment?: string, release?: string, beforeSend?: (error: Error) => Error | null): void {
	// emit events only if sentry is enabled for the current environment:
	const beforeSendDefault = (error: Error): Error | null =>
		!process.env.SENTRY_ENABLED || ['0', 'false', ''].includes(process.env.SENTRY_ENABLED.toLowerCase()) ? null : error;

	Sentry.init({
		dsn: process.env.SENTRY_DSN || '',
		environment: environment || process.env.SENTRY_ENVIRONMENT || '',
		release: release || process.env.SENTRY_RELEASE,
		beforeSend: beforeSend ? beforeSend : beforeSendDefault
	});
}
export function captureAndLogError(error: Error): void {
	console.error(error);
	Sentry.captureException(error);
}

export default Sentry;
