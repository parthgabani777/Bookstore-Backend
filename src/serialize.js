export function responseDataSerialize(data) {
    return {
        ...data,
    };
}

export function responseErrorSerialize(error) {
    return {
        errors: [...error],
    };
}
