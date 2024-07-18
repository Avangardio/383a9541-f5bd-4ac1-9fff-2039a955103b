import {BooksService} from "./books.service";
import {IUpdateBook} from "./types/books.types";
import {Request, Response} from "express";
import {validateOrThrow} from "../../misc/validation/validateByJoiSchema";
import {createBookSchema} from "./schemes/books.schemes";

export class BooksController {
    private booksService: BooksService;

    constructor() {
        this.booksService = new BooksService();
    }

    async getBooks(_: Request, res: Response): Promise<void> {
        const books = await this.booksService.getBooks();
        res.status(200).json(books);
    }
    async addBook(req: Request, res: Response): Promise<void> {
        const data = validateOrThrow(createBookSchema, req.body);
        const newBook = await this.booksService.addBook(data);
        res.status(201).json(newBook);
    }
    async deleteBook(req: Request, res: Response): Promise<void> {
        const id = validateOrThrow(createBookSchema, req.params?.id);
        await this.booksService.deleteBook(id);
        res.status(201)
    }
    async updateBook(req: Request, res: Response): Promise<void> {
        const data = validateOrThrow<IUpdateBook>(createBookSchema, req.body);
        const id = validateOrThrow(createBookSchema, req.params?.id);
        const updatedBook = await this.booksService.updateBook({...data, id: id});
        res.status(201).json(updatedBook);
    }
    async getBookById(req: Request, res: Response): Promise<void> {
        const id = validateOrThrow(createBookSchema, req.params?.id);
        const book = await this.booksService.getBookById(id);
        res.status(200).json(book);
    }
}
