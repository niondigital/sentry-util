/**
 * Sentry Connector for Node.js environments (non-Browser)
 */
import * as Sentry from '@sentry/node';
import IInitSentryConfig from './types/IInitSentryConfig';
export declare function captureAndLogError(error: Error): void;
export declare function initSentry(config: IInitSentryConfig): void;
export default Sentry;
