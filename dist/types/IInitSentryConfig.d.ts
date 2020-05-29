export default interface IInitSentryConfig {
    environment?: string;
    release?: string;
    beforeSend?: (error: Error) => Error | null;
}
