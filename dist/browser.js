"use strict";
exports.__esModule = true;
/**
 * Sentry Connector for Browser based environments (non-Node)
 */
var Sentry = require("@sentry/browser");
// emit events only if sentry is enabled for the current environment:
var beforeSend = function (error) { return (process.env.SENTRY_ENABLED ? error : null); };
function initSentry(release) {
    Sentry.init({
        dsn: process.env.SENTRY_DSN || '',
        environment: process.env.SENTRY_ENVIRONMENT || '',
        release: release,
        beforeSend: beforeSend
    });
}
exports.initSentry = initSentry;
function captureAndLogError(error) {
    console.error(error);
    Sentry.captureException(error);
}
exports.captureAndLogError = captureAndLogError;
exports["default"] = Sentry;
