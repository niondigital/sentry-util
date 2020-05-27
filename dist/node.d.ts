/**
 * Sentry Connector for Node environments (non-Browser)
 */
import * as Sentry from '@sentry/node';
export declare function captureAndLogError(error: Error): void;
export default Sentry;
