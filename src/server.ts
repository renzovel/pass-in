import {fastify, } from "fastify";
import {fastifySwagger} from "@fastify/swagger";
import {fastifySwaggerUi} from "@fastify/swagger-ui";
import {errorHandler} from "./lib/errorHandler";
import {createEvents, registerForEvents, getEvent, getAttendeesBadge,checkIn,getEventAttendees} from "./routes";
import { serializerCompiler, validatorCompiler, jsonSchemaTransform, ZodTypeProvider} from "fastify-type-provider-zod";
import fastifyCors from "@fastify/cors";

const PORT:any=process.env.port||5050;


export const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(fastifyCors, {
    origin:'*'
});

app.register(fastifySwagger,{
    swagger:{
        consumes:['application/json'],
        produces:['application/json'],
        info:{
            title:"Pass-in App",
            description:"Aplication event check-in",
            version:"1.0.0"
        }
    },
    transform: jsonSchemaTransform
});

app.register(fastifySwaggerUi,{
    routePrefix:"/swagger"
})

// Add schema validator and serializer
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(createEvents);
app.register(registerForEvents);
app.register(getEvent);
app.register(getAttendeesBadge);
app.register(checkIn);
app.register(getEventAttendees); 

app.setErrorHandler(errorHandler);

app.listen({port:PORT, host:"0.0.0.0"}).then(()=>{
    console.log(`Server runnning http://localhost:${PORT}`);
});