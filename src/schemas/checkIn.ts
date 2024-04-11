import {z} from "zod";

export const schemaParam = z.object({
    attendeeId: z.coerce.number().int()
});

export const schemaStatus201 = z.null();
