"use strict";
exports.__esModule = true;
/**
 * Sentry Connector for Node environments (non-Browser)
 */
var Sentry = require("@sentry/node");
function captureAndLogError(error) {
    console.error(error);
    Sentry.captureException(error);
}
exports.captureAndLogError = captureAndLogError;
function initSentry(beforeSend) {
    // emit events only if sentry is enabled for the current environment:
    var beforeSendDefault = function (error) {
        return ['false', '0', ''].includes(String(process.env.SENTRY_ENABLED).toLowerCase()) ? null : error;
    };
    var config = {
        dsn: process.env.SENTRY_DSN || '',
        environment: process.env.SENTRY_ENVIRONMENT || '',
        release: process.env.SENTRY_RELEASE || process.env.npm_package_name + "@" + process.env.npm_package_version,
        beforeSend: beforeSend || beforeSendDefault
    };
    Sentry.init(config);
}
exports.initSentry = initSentry;
exports["default"] = Sentry;
