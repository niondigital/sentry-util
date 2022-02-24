/**
 * Sentry Connector for Browser based environments (non-Node)
 */
import * as Sentry from '@sentry/browser';
import { Event } from '@sentry/browser';
export { Event, EventHint } from '@sentry/browser';
export declare function captureAndLogError(error: Error): void;
export declare const sentryEnabled: boolean;
/**
 * Emit events only if sentry is enabled for the current environment
 * @param event
 */
export declare function beforeSend(event: Event): Event | null;
export declare function initSentry(options?: Sentry.BrowserOptions): void;
export default Sentry;
