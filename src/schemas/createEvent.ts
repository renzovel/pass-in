import {z} from "zod";

export const schemaCreateEvents = z.object({
    title: z.string().min(4),
    details: z.string().nullable(),
    maxPar: z.number().int().positive()
});

export const schemaEvent201 = z.object({
    eventId: z.string().uuid()
});