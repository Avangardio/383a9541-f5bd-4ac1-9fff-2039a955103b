import {BooksRepository} from "./books.repository";
import {Book, ICreateBook} from "./types/books.types";

export class BooksService {
    private booksRepository: BooksRepository;

    constructor() {
        this.booksRepository = new BooksRepository();
    }

    async getBooks(): Promise<Book[]> {
        return this.booksRepository.getBooks();
    }
    async addBook(data: ICreateBook): Promise<Book> {
        return this.booksRepository.addBook(data);
    }
    async deleteBook(id: string): Promise<void> {
        await this.booksRepository.deleteBook(id);
    }
    async updateBook(data: Book): Promise<Book> {
        return this.booksRepository.updateBook(data)
    }
    async getBookById(id: string): Promise<Book> {
        return this.booksRepository.getBookById(id);
    }
}
