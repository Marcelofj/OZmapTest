const STATUS_CODE: {
    readonly ok: number,
    readonly created: number,
    readonly updated: number,
    readonly notFound: number,
    readonly badRequest: number,
    readonly internalServerError: number,
    readonly defaultError: number
} = {
    ok: 200,
    created: 201,
    updated: 201,
    notFound: 400,
    badRequest: 400,
    internalServerError: 500,
    defaultError: 418
}

export default STATUS_CODE