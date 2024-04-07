import {z} from "zod";

export const schemaParam = z.object({
    attendeesId:z.coerce.number().int()
});

export const schemaStatus200 = z.object({
    name:z.string(),
    email:z.string().email(),
    eventTitle:z.string(),
    checkInURL:z.string().url()
});