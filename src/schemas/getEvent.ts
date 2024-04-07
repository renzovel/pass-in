import {z} from "zod";

export const schemaParam = z.object({
    eventId: z.string().uuid()
});

export const schemaStatus200 = z.object({
    statusCode:z.number(),
    data:z.object({
        id:z.string().uuid(),
        title:z.string(),
        details:z.string().nullable(),
        slug:z.string(),
        attendees:z.number()
    })
});