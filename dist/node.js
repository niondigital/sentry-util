"use strict";
exports.__esModule = true;
/**
 * Sentry Connector for Node environments (non-Browser)
 */
var Sentry = require("@sentry/node");
var emitErrors = !['false', '0', ''].includes(String(process.env.SENTRY_ENABLED).toLowerCase());
var useSentryReleases = ['1', 'true'].includes(String(process.env.SENTRY_USE_RELEASES).toLowerCase());
// emit events only if sentry is enabled for the current environment:
var beforeSend = function (error) { return (emitErrors ? error : null); };
var config = {
    dsn: process.env.SENTRY_DSN || '',
    environment: process.env.SENTRY_ENVIRONMENT || '',
    beforeSend: beforeSend
};
if (useSentryReleases)
    config.release = process.env.npm_package_name + "@" + process.env.npm_package_version;
Sentry.init(config);
function captureAndLogError(error) {
    console.error(error);
    Sentry.captureException(error);
}
exports.captureAndLogError = captureAndLogError;
exports["default"] = Sentry;
