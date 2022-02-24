/**
 * Sentry Connector for Browser based environments (non-Node)
 */
import * as Sentry from '@sentry/browser';
import { Event } from '@sentry/browser';

export { Event, EventHint } from '@sentry/browser';

export function captureAndLogError(error: Error): void {
	console.error(error);
	Sentry.captureException(error);
}

export const sentryEnabled: boolean = !(
	!process.env.SENTRY_ENABLED || ['0', 'false', ''].includes(String(process.env.SENTRY_ENABLED).toLowerCase())
);

/**
 * Emit events only if sentry is enabled for the current environment
 * @param event
 */
export function beforeSend(event: Event): Event | null {
	if (!sentryEnabled) {
		return null;
	}
	return event;
}

export function initSentry(options: Sentry.BrowserOptions = {}): void {
	Sentry.init({
		...options,
		dsn: options.dsn || process.env.SENTRY_DSN || '',
		environment: options.environment || process.env.SENTRY_ENVIRONMENT || '',
		release: options.release || process.env.SENTRY_RELEASE,
		beforeSend: options.beforeSend || beforeSend
	});
}

export default Sentry;
