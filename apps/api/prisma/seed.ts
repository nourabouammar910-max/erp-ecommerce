import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';


const prisma = new PrismaClient();


async function main(){

  const password =
    await bcrypt.hash(
      'admin123',
      10
    );


  const admin =
    await prisma.user.upsert({

      where:{
        email:'admin@test.com'
      },


      update:{
        password,
        role:Role.ADMIN
      },


      create:{

        name:'Admin',

        email:
          'admin@test.com',

        password,

        role:
          Role.ADMIN
      }

    });


  console.log(
    'ADMIN CREATED:',
    admin.email
  );

}



main()
.finally(
 ()=>prisma.$disconnect()
);