export class ValidationException extends Error {
    public errorCode: number = 400;

    constructor(message: string) {
        super(message);
    }
}
