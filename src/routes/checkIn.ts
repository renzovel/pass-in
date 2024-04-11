import {FastifyInstance}  from "fastify";
import {ZodTypeProvider} from "fastify-type-provider-zod";
import {schemaParam, schemaStatus201} from "../schemas/checkIn";
import {prisma} from "../lib/prisma";
import { BadRequest } from "../lib/badRequest";




export const checkIn = async (app:FastifyInstance)=>{
    app
    .withTypeProvider<ZodTypeProvider>()
    .get("/attendees/:attendeeId/check-in", {
        schema:{
            summary:'CheckIn attendees.',
            tags:['CheckIn'],
            params:schemaParam,
            response:{
                201:schemaStatus201
            }
        }   
    }, async (req,res)=>{
        const {attendeeId} = req.params;
        
        const checkIn = await prisma.checkIn.findUnique({
            where:{
                attendeeId
            }
        });

        if (checkIn!==null) {
            throw new BadRequest("Attendees already checked in!");
        }

        const createCheckIn = await prisma.checkIn.create({
            data:{
                attendeeId
            }
        });
        
        return res.status(201).send();
    });
}