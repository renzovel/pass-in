import {number, z} from "zod";

export const schemaParam = z.object({
    eventId: z.string().uuid()
});

export const schemaQueryString = z.object({
    query:z.string().nullish(),
    indexPage:z.string().nullish().default("0").transform(Number)
});

export const schemaStatus200 = z.array(
    z.object({
        id: z.number(),
        name: z.string(),
        email: z.string().email(),
        createAt: z.date(),
        checkIn:z.object({
            createAt: z.date()
        }).nullable()
    })
);