export function wrapNativeException<T = any>(ex: NSError, wrapError: (...args) => T = (msg) => new Error(msg) as any) {
    if (!ex) {
        return null;
    }
    if (typeof ex === 'string') {
        return wrapError(ex);
    }
    if (!(ex instanceof Error)) {
        const err = wrapError(ex.localizedDescription);
        err['nativeException'] = ex;
        err['code'] = ex.code;
        err['domain'] = ex.domain;
        // TODO: we loose native stack. see how to get it
        return err;
    }
    return ex;
}
