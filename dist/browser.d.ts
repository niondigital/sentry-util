/**
 * Sentry Connector for Browser based environments (non-Node)
 */
import * as Sentry from '@sentry/browser';
import { BrowserOptions } from "@sentry/browser";
export declare function captureAndLogError(error: Error): void;
export declare const sentryEnabled: boolean;
export declare function initSentry(options?: BrowserOptions): void;
export default Sentry;
