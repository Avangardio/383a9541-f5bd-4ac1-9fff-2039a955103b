import {Client, DatabaseError} from "pg";
import {PostgresDB} from "../../database/postgres";
import {Book, ICreateBook} from "./types/books.types";
import {DatabaseException} from "../../exceptions/database.exception";
import { v4 as uuidv4 } from 'uuid';
import {ResourceNotFoundException} from "../../exceptions/resourceNotFound.exception";

export class BooksRepository {
    private dbClient: Client

    constructor() {
        this.dbClient = PostgresDB.getClient()
    }

    public async addBook(data: ICreateBook): Promise<Book> {
        try {
            const uuid = uuidv4();
            const result = await this.dbClient.query(
                `INSERT INTO books ("id", title", "author", "genres", "publicationDate") 
                                VALUES ($1, $2, $3, $4, $5) RETURNING *`,
                [uuid, data.title, data.author, data.genres, data.publicationDate]
            );
            return result.rows[0];
        } catch (e: unknown) {
            throw new DatabaseException((e as DatabaseError).message);
        }
    }

    public async getBooks(): Promise<Book[]> {
        try {
            const result = await this.dbClient.query(
                `SELECT * FROM books`,
            );
            return result.rows;
        } catch (e: unknown) {
            throw new DatabaseException((e as DatabaseError).message);
        }
    }

    public async getBookById(bookId: string): Promise<Book> {
        try {
            const result = await this.dbClient.query(
                `SELECT * FROM books WHERE bookId = $1`,
                [bookId]
            );
            if(!result.rows[0]) {
                throw new ResourceNotFoundException("Book was not found!");
            }
            return result.rows[0];
        } catch (e: unknown) {
            // Обработка ошибки посгресса
            if (e instanceof Error) {
                throw new DatabaseException((e as DatabaseError).message);
            }
            // Пробрасываем исключение на 404
            throw e;
        }
    }

    public async updateBook(data: Book): Promise<Book> {
        try {
            const result = await this.dbClient.query(
                `UPDATE books 
                                SET "title" = $1, "author" = $2, "genres" = $3, "publicationDate" = $4 
                                WHERE "id" = $5 FROM books`,
                [data.title, data.author, data.genres, data.publicationDate, data.id]
            );
            return result.rows[0];
        } catch (e: unknown) {
            throw new DatabaseException((e as DatabaseError).message);
        }
    }

    public async deleteBook(bookId: string): Promise<void> {
        try {
            await this.dbClient.query(
                `DELETE * FROM books WHERE "id" = $1`,
                [bookId]
            );
            return;
        } catch (e: unknown) {
            throw new DatabaseException((e as DatabaseError).message);
        }
    }
}
