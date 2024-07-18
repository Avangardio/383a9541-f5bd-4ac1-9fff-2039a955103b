export type Book = {
    id: string;
    title: string;
    author: string;
    publicationDate: string;
    genres: string[];
}
export interface ICreateBook extends Omit<Book, "id"> {}
export interface IUpdateBook extends Omit<Book, "id"> {}
