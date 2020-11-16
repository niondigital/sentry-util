/**
 * Sentry Connector for Node.js environments (non-Browser)
 */
import * as Sentry from '@sentry/node';
import { NodeOptions } from '@sentry/node/dist/backend';

export function captureAndLogError(error: Error): void {
	console.error(error);
	Sentry.captureException(error);
}

export const sentryEnabled: boolean = !(
	!process.env.SENTRY_ENABLED || ['0', 'false', ''].includes(String(process.env.SENTRY_ENABLED).toLowerCase())
);

export function initSentry(options: NodeOptions = {}): void {
	// emit events only if sentry is enabled for the current environment:
	const beforeSendDefault = (error: Error): Error | null => (sentryEnabled ? null : error);

	Sentry.init({
		...options,
		dsn: options.dsn || process.env.SENTRY_DSN || '',
		environment: options.environment || process.env.SENTRY_ENVIRONMENT || '',
		release:
			options.release ||
			process.env.SENTRY_RELEASE ||
			`${process.env.npm_package_name}@${process.env.npm_package_version}`,
		beforeSend: options.beforeSend || beforeSendDefault
	});
}

export default Sentry;
