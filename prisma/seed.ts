import {prisma} from "../src/lib/prisma";

async function seed(){
    await prisma.checkIn.deleteMany({});
    await prisma.attendee.deleteMany({});
    await prisma.event.deleteMany({});
    await prisma.event.create({
        data:{
            id:"1b27cf8e-dc85-46cd-b2e3-07e22d48719d",
            title:"Evento numero 1",
            details:"Detalhes do evento 1",
            slug:"evento-numero-1",
            maxPar:2,
            attendees:{
                
            }
        }
    }),
    await prisma.event.create({
        data:{
            id:"1b27cf8e-dc85-46cd-b2e3-07e22d48720d",
            title:"Evento numero 2",
            details:"Detalhes do evento 2",
            slug:"evento-numero-2",
            maxPar:2
        }
    }),
    await prisma.event.create({
        data:{
            id:"1b27cf8e-dc85-46cd-b2e3-07e22d48721d",
            title:"Evento numero 3",
            details:"Detalhes do evento 3",
            slug:"evento-numero-3",
            maxPar:2
        }
    })
    await prisma.attendee.create({
        data:{
            id:1,
            name:"Renzo",
            email:"renzo@gmail.com",
            eventId:"1b27cf8e-dc85-46cd-b2e3-07e22d48719d"
        }
    })
}

seed().then(async ()=>{
    console.log("Database seeded!")
    await prisma.$disconnect();
}).catch(async (e)=>{
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
});