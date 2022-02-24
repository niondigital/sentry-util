/**
 * Sentry Connector for Node.js environments (non-Browser)
 */
import * as Sentry from '@sentry/node';
import { NodeOptions } from '@sentry/node/dist/backend';
import { Event } from '@sentry/node';
export { Event, EventHint } from '@sentry/node';
export declare function captureAndLogError(error: Error): void;
export declare const sentryEnabled: boolean;
/**
 * Emit events only if sentry is enabled for the current environment
 * @param event
 */
export declare function beforeSend(event: Event): Event | null;
export declare function initSentry(options?: NodeOptions): void;
export default Sentry;
