"use strict";
exports.__esModule = true;
exports.initSentry = exports.captureAndLogError = void 0;
/**
 * Sentry Connector for Node.js environments (non-Browser)
 */
var Sentry = require("@sentry/node");
function captureAndLogError(error) {
    console.error(error);
    Sentry.captureException(error);
}
exports.captureAndLogError = captureAndLogError;
function initSentry(config) {
    // emit events only if sentry is enabled for the current environment:
    var beforeSendDefault = function (error) {
        return !process.env.SENTRY_ENABLED || ['false', '0', ''].includes(process.env.SENTRY_ENABLED.toLowerCase()) ? null : error;
    };
    Sentry.init({
        dsn: process.env.SENTRY_DSN || '',
        environment: config && config.environment ? config.environment : process.env.SENTRY_ENVIRONMENT || '',
        release: config && config.release
            ? config.release
            : process.env.SENTRY_RELEASE || process.env.npm_package_name + "@" + process.env.npm_package_version,
        beforeSend: config && config.beforeSend ? config.beforeSend : beforeSendDefault
    });
}
exports.initSentry = initSentry;
exports["default"] = Sentry;
