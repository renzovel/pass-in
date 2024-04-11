import {prisma} from "../lib/prisma";
import {generateSlug} from "../../utils/generateSlug";
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import {schemaCreateEvents, schemaEvent201} from "../schemas/createEvent"; 

export const createEvents = async (app:FastifyInstance)=>{
    app
    .withTypeProvider<ZodTypeProvider>()
    .post("/events", {
        schema:{
            summary:'Create events.',
            tags:['Events'],
            body:schemaCreateEvents,
            response:{
                201: schemaEvent201
            }
        }    
    },async (req, res)=>{
        const {title, details, maxPar} = req.body;

        const slug = generateSlug(title);

        const verifySlug = await prisma.event.findUnique({
            where:{
            slug 
            }
        });

        if(verifySlug!==null){
            throw new Error("Another event with same title already exist.");
        }

        const result = await  prisma.event.create({
            data:{
                title,
                details, 
                maxPar,
                slug
            }
        });

        return res.status(201).send({eventId : result.id});
    });
}