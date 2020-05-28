/**
 * Sentry Connector for Node environments (non-Browser)
 */
import * as Sentry from '@sentry/node';

export function captureAndLogError(error: Error): void {
	console.error(error);
	Sentry.captureException(error);
}

export function initSentry(beforeSend?: (error: Error) => Error | null): void {
	// emit events only if sentry is enabled for the current environment:
	const beforeSendDefault = (error: Error): Error | null =>
		['false', '0', ''].includes(String(process.env.SENTRY_ENABLED).toLowerCase()) ? null : error;

	const config: Sentry.NodeOptions = {
		dsn: process.env.SENTRY_DSN || '',
		environment: process.env.SENTRY_ENVIRONMENT || '',
		release: process.env.SENTRY_RELEASE || `${process.env.npm_package_name}@${process.env.npm_package_version}`,
		beforeSend: beforeSend || beforeSendDefault
	};

	Sentry.init(config);
}

export default Sentry;
