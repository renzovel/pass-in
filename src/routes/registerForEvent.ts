import {prisma} from "../lib/prisma";
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import {schemaCreateForEvent201,schemaCreateForEvents,schemaParamForEvent} from "../schemas/registerForEvent";

export const registerForEvents = async (app:FastifyInstance)=>{
    app
    .withTypeProvider<ZodTypeProvider>()
    .post("/events/:eventId/attendees", {
        schema:{
            body:schemaCreateForEvents,
            params:schemaParamForEvent,
            response:{
                201: schemaCreateForEvent201
            }
        }    
    },async (req, res)=>{
        const {eventId} = req.params;
        const {email, name} = req.body;
        const [verifyFormEmail, event, countPar] = await Promise.all([
            prisma.attendee.findUnique({
                where:{
                    eventId_email:{
                        email,
                        eventId
                    }
                }
            }),
            prisma.event.findUnique({
                where:{
                    id:eventId
                }
            }),
            prisma.attendee.count({
                where:{
                    eventId
                }
            })
        ]);

        if (verifyFormEmail!==null) {
            throw new Error("This Email is already registered for this event.");            
        }

        if (event?.maxPar&&countPar>=event.maxPar) {
            throw new Error("The maximum number of attendees for this event has been reached.");            
        }
        
        const attendees = await prisma.attendee.create({
            data:{
                name,
                email,
                eventId
            }
        });

        return res.status(201).send({ attendeeId : attendees.id});
    });
}