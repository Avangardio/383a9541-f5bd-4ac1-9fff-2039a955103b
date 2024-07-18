export class DatabaseException extends Error {
    public errorCode: number = 500;

    constructor(message: string) {
        super(message);
    }
}
