const PORT:any=process.env.port||5050;
import fastify from "fastify";
import {z} from "zod";
import {PrismaClient} from "@prisma/client";
const prisma = new PrismaClient({
    log: ["query"]
});
const schemaEvents = z.object({
    title: z.string().min(4),
    details: z.string().nullable(),
    maxPar: z.number().int().positive()
});
const app = fastify();
app.post("/events", async (req, res)=>{
    const data = schemaEvents.parse(req.body);
    const {title, details, maxPar} = data;
    const result = await  prisma.event.create({
        data:{
            title,
            details, 
            maxPar,
            slug: new Date().toISOString()
        }
    })

    return res.status(201).send({eventId : result.id});
});

app.listen({port:PORT}).then(()=>{
    console.log(`Server runnning http://localhost:${PORT}`);
});