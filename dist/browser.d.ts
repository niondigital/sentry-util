/**
 * Sentry Connector for Browser based environments (non-Node)
 */
import * as Sentry from '@sentry/browser';
export declare function initSentry(environment?: string, release?: string, beforeSend?: (error: Error) => Error | null): void;
export declare function captureAndLogError(error: Error): void;
export default Sentry;
