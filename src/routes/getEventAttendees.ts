import {FastifyInstance} from "fastify";
import {ZodTypeProvider} from "fastify-type-provider-zod";
import {schemaParam,schemaQueryString,schemaStatus200} from "../schemas/getEventAttendees";
import {prisma} from "../lib/prisma";

export const getEventAttendees = async (app:FastifyInstance) => {
    app.withTypeProvider<ZodTypeProvider>()
    .get("/event/:eventId/attendees", {
        schema:{
            summary:'Get events for attendees.',
            tags:['EventsAttendees'],
            params:schemaParam,
            querystring:schemaQueryString,
            response:{
                200:schemaStatus200
            }
        }
    }, async (req,res)=>{
        const {eventId} = req.params;
        const {indexPage, query} = req.query;
        console.log(req.query)
        const allEvents =await prisma.attendee.findMany({
            select:{
                id:true,
                name:true,
                email:true,
                createAt:true,
                eventId:true,
                checkIn:{
                    select:{
                        createAt:true
                    }
                }
            },
            where:query? {
                eventId,
                name:{
                    contains:query
                }
            }:{
                eventId
            },
            take:10,
            skip: indexPage * 10,
            orderBy:{
                createAt:"desc"
            }
        });

        return res.send(allEvents);
    });
}