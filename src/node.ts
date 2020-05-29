/**
 * Sentry Connector for Node.js environments (non-Browser)
 */
import * as Sentry from '@sentry/node';
import IInitSentryConfig from './types/IInitSentryConfig';

export function captureAndLogError(error: Error): void {
	console.error(error);
	Sentry.captureException(error);
}

export function initSentry(config?: IInitSentryConfig): void {
	// emit events only if sentry is enabled for the current environment:
	const beforeSendDefault = (error: Error): Error | null =>
		!process.env.SENTRY_ENABLED || ['false', '0', ''].includes(process.env.SENTRY_ENABLED.toLowerCase()) ? null : error;

	Sentry.init({
		dsn: process.env.SENTRY_DSN || '',
		environment: config && config.environment ? config.environment : process.env.SENTRY_ENVIRONMENT || '',
		release:
			config && config.release
				? config.release
				: process.env.SENTRY_RELEASE || `${process.env.npm_package_name}@${process.env.npm_package_version}`,
		beforeSend: config && config.beforeSend ? config.beforeSend : beforeSendDefault
	});
}

export default Sentry;
