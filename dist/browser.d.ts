/**
 * Sentry Connector for Browser based environments (non-Node)
 */
import * as Sentry from '@sentry/browser';
export declare function initSentry(release?: string): void;
export declare function captureAndLogError(error: Error): void;
export default Sentry;
