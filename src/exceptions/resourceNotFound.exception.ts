export class ResourceNotFoundException extends Error {
    public errorCode: number = 404;

    constructor(message: string) {
        super(message);
    }
}
