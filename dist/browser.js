"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
/**
 * Sentry Connector for Browser based environments (non-Node)
 */
var Sentry = require("@sentry/browser");
function captureAndLogError(error) {
    console.error(error);
    Sentry.captureException(error);
}
exports.captureAndLogError = captureAndLogError;
exports.sentryEnabled = !(!process.env.SENTRY_ENABLED || ['0', 'false', ''].includes(String(process.env.SENTRY_ENABLED).toLowerCase()));
/**
 * Emit events only if sentry is enabled for the current environment
 * @param event
 */
function beforeSend(event) {
    if (!exports.sentryEnabled) {
        return null;
    }
    return event;
}
exports.beforeSend = beforeSend;
function initSentry(options) {
    if (options === void 0) { options = {}; }
    Sentry.init(__assign(__assign({}, options), { dsn: options.dsn || process.env.SENTRY_DSN || '', environment: options.environment || process.env.SENTRY_ENVIRONMENT || '', release: options.release || process.env.SENTRY_RELEASE, beforeSend: options.beforeSend || beforeSend }));
}
exports.initSentry = initSentry;
exports["default"] = Sentry;
