import express from "express";
import {BooksController} from "./books.controller";
import {roleMiddleware, Permissions} from "../../misc/middlewares/roleMiddleware";
import {jwtMiddleware} from "../../misc/middlewares/jwt.middleware";
import {handle} from "../../exceptions/exceptions.handler";

const router = express.Router();
const booksController = new BooksController();

router.get('/', [jwtMiddleware, roleMiddleware(Permissions.VIEW_PERMISSION)], handle(booksController.getBooks));
router.post('/', [jwtMiddleware, roleMiddleware(Permissions.ADD_PERMISSION)], handle(booksController.addBook));
router.delete('/:id', [jwtMiddleware, roleMiddleware(Permissions.DELETE_PERMISSION)], handle(booksController.deleteBook));
router.put('/:id', [jwtMiddleware, roleMiddleware(Permissions.UPDATE_PERMISSION)], handle(booksController.updateBook));
router.get('/:id', [jwtMiddleware, roleMiddleware(Permissions.VIEW_PERMISSION)], handle(booksController.getBookById));
