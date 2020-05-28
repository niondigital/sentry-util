"use strict";
exports.__esModule = true;
/**
 * Sentry Connector for Browser based environments (non-Node)
 */
var Sentry = require("@sentry/browser");
function initSentry(environment, release, beforeSend) {
    // emit events only if sentry is enabled for the current environment:
    var beforeSendDefault = function (error) {
        return !process.env.SENTRY_ENABLED || ['0', 'false', ''].includes(process.env.SENTRY_ENABLED.toLowerCase()) ? null : error;
    };
    Sentry.init({
        dsn: process.env.SENTRY_DSN || '',
        environment: environment || process.env.SENTRY_ENVIRONMENT || '',
        release: release || process.env.SENTRY_RELEASE,
        beforeSend: beforeSend ? beforeSend : beforeSendDefault
    });
}
exports.initSentry = initSentry;
function captureAndLogError(error) {
    console.error(error);
    Sentry.captureException(error);
}
exports.captureAndLogError = captureAndLogError;
exports["default"] = Sentry;
