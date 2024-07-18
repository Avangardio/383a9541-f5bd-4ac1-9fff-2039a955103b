import Joi from "joi";
import {Book, ICreateBook} from "../types/books.types";


// Define a validation schema for the request body
export const createBookSchema = Joi.object<ICreateBook>({
    title: Joi.string().trim().required(),
    author: Joi.string().alphanum().trim().required(),
    publicationDate: Joi.string().isoDate().trim().required(),
    genres: Joi.array().items(Joi.string().trim().required()),
});

export const bookByIdSchema = Joi.string().trim().uuid().required();
