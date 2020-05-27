/**
 * Sentry Connector for Node environments (non-Browser)
 */
import * as Sentry from '@sentry/node';

const emitErrors = !['false', '0', ''].includes(String(process.env.SENTRY_ENABLED).toLowerCase());
const useSentryReleases = ['1', 'true'].includes(String(process.env.SENTRY_USE_RELEASES).toLowerCase());

// emit events only if sentry is enabled for the current environment:
const beforeSend = (error: Error): Error | null => (emitErrors ? error : null);

const config: Sentry.NodeOptions = {
	dsn: process.env.SENTRY_DSN || '',
	environment: process.env.SENTRY_ENVIRONMENT || '',
	beforeSend
};

if (useSentryReleases) config.release = `${process.env.npm_package_name}@${process.env.npm_package_version}`;

Sentry.init(config);

export function captureAndLogError(error: Error): void {
	console.error(error);
	Sentry.captureException(error);
}

export default Sentry;
