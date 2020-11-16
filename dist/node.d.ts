/**
 * Sentry Connector for Node.js environments (non-Browser)
 */
import * as Sentry from '@sentry/node';
import { NodeOptions } from "@sentry/node/dist/backend";
export declare function captureAndLogError(error: Error): void;
export declare const sentryEnabled: boolean;
export declare function initSentry(options?: NodeOptions): void;
export default Sentry;
