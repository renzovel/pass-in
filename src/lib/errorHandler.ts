import {FastifyInstance} from 'fastify';
import {BadRequest} from "./badRequest";
import {ZodError} from "zod";


type FastifyErrorHandle = FastifyInstance['errorHandler'];

export const errorHandler: FastifyErrorHandle = (error, req, res) => {
    if (error instanceof BadRequest) {
        console.log(error);
    }

    return res.status(500).send({message: error.message});
}