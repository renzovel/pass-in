import {prisma} from "../lib/prisma";
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import {schemaParam, schemaStatus200} from "../schemas/getEvent"; 

export const getEvent = async (app:FastifyInstance)=>{
    app
    .withTypeProvider<ZodTypeProvider>()
    .get("/events/:eventId", {
        schema:{
            summary:'Get events for ID.',
            tags:['EventId'],
            params:schemaParam,
            response:{
                200:schemaStatus200
            }
        }    
    },async (req, res)=>{
        const {eventId} = req.params;
        const event = await prisma.event.findUnique({
            select:{
                id:true,
                title:true,
                details:true,
                slug:true,
                _count:{
                    select:{
                        attendees:true
                    }
                }
            },
            where:{
                id:eventId
            }
        });

        if (event===null) {
            throw new Error("Event not found.");            
        }
        
        const { id, title, details, slug, _count} = event;

        return res.send({statusCode:200, data:{id, title, details, slug, ..._count}});
    });
}