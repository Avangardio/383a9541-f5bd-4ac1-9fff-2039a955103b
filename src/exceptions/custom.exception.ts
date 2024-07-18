export class CustomException extends Error {
    public errorCode: number = 404;

    constructor(message: string) {
        super(message);
    }
}
