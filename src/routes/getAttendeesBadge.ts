import { FastifyInstance } from "fastify";
import {ZodTypeProvider} from "fastify-type-provider-zod";
import {schemaParam, schemaStatus200} from "../schemas/getAttendeesBadge";
import { prisma } from "../lib/prisma";


export const getAttendeesBadge = async (app:FastifyInstance)=>{
    app.withTypeProvider<ZodTypeProvider>()
    .get("/attendees/:attendeesId/badge", {
        schema:{
            params:schemaParam,
            response:{
                200:schemaStatus200
            }
        }
    }, async (req, res)=>{
        const { attendeesId } = req.params;
        
        const attendees = await prisma.attendee.findUnique({
            select:{
                name:true,
                email:true,
                event:{
                    select:{
                        title:true
                    }
                }
            },
            where:{
                id:attendeesId
            }
        });
        
        if (attendees===null) {
            throw new Error("Attendess not found.");
        }

        const baseURL = `${req.protocol}://${req.hostname}`;
        const checkInURL = new URL(`/attendees/${attendeesId}/check-in`, baseURL).toString();

        const {name, email, event} = attendees;

        res.status(200).send({
            name,
            email,
            eventTitle:event.title,
            checkInURL
        });
    });

}