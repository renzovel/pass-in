import {z} from "zod";

export const schemaCreateForEvents = z.object({
    email: z.string().email(),
    name: z.string().min(4)
});

export const schemaCreateForEvent201 = z.object({
    attendeeId: z.number()
});

export const schemaParamForEvent = z.object({
    eventId: z.string().uuid()
});
