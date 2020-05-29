/**
 * Sentry Connector for Browser based environments (non-Node)
 */
import * as Sentry from '@sentry/browser';
import IInitSentryConfig from './types/IInitSentryConfig';
export declare function captureAndLogError(error: Error): void;
export declare function initSentry(config?: IInitSentryConfig): void;
export default Sentry;
