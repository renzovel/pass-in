import {fastify} from "fastify";
import {createEvents, registerForEvents, getEvent, getAttendeesBadge} from "./routes";
import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";
const PORT:any=process.env.port||5050;


const app = fastify();

// Add schema validator and serializer
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(createEvents);
app.register(registerForEvents);
app.register(getEvent);
app.register(getAttendeesBadge);

app.listen({port:PORT}).then(()=>{
    console.log(`Server runnning http://localhost:${PORT}`);
});