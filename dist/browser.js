"use strict";
exports.__esModule = true;
exports.initSentry = exports.captureAndLogError = void 0;
/**
 * Sentry Connector for Browser based environments (non-Node)
 */
var Sentry = require("@sentry/browser");
function captureAndLogError(error) {
    console.error(error);
    Sentry.captureException(error);
}
exports.captureAndLogError = captureAndLogError;
function initSentry(config) {
    // emit events only if sentry is enabled for the current environment:
    var beforeSendDefault = function (error) {
        return !process.env.SENTRY_ENABLED || ['0', 'false', ''].includes(process.env.SENTRY_ENABLED.toLowerCase()) ? null : error;
    };
    Sentry.init({
        dsn: process.env.SENTRY_DSN || '',
        environment: config && config.environment ? config.environment : process.env.SENTRY_ENVIRONMENT || '',
        release: config && config.release ? config.release : process.env.SENTRY_RELEASE,
        beforeSend: config && config.beforeSend ? config.beforeSend : beforeSendDefault
    });
}
exports.initSentry = initSentry;
exports["default"] = Sentry;
