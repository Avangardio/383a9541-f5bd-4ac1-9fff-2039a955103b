import Joi from "joi";
import {ValidationException} from "../../exceptions/validation.exception";

export function validateOrThrow<T>(schema: Joi.Schema<any>, subject: T): T {
    const { error, value } = schema.validate(subject);
    if (error) throw new ValidationException(error.message);
    return value;
}
