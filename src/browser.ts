/**
 * Sentry Connector for Browser based environments (non-Node)
 */
import * as Sentry from '@sentry/browser';
import IInitSentryConfig from './types/IInitSentryConfig';

export function captureAndLogError(error: Error): void {
	console.error(error);
	Sentry.captureException(error);
}

export function initSentry(config?: IInitSentryConfig): void {
	// emit events only if sentry is enabled for the current environment:
	const beforeSendDefault = (error: Error): Error | null =>
		!process.env.SENTRY_ENABLED || ['0', 'false', ''].includes(String(process.env.SENTRY_ENABLED).toLowerCase()) ? null : error;

	Sentry.init({
		dsn: process.env.SENTRY_DSN || '',
		environment: config && config.environment ? config.environment : process.env.SENTRY_ENVIRONMENT || '',
		release: config && config.release ? config.release : process.env.SENTRY_RELEASE,
		beforeSend: config && config.beforeSend ? config.beforeSend : beforeSendDefault
	});
}

export default Sentry;
