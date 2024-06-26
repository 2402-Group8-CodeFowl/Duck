import { PrismaClient } from "@prisma/client"
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

console.log("in the seed file")

const createUserTable = async () => {
  console.log("creating the User table...")

  await prisma.user.create({
    data: {
      username: "admin",
      password: await bcrypt.hash("admin", 10),
      isAdmin: true,
    }
  })

  for(let i = 0; i < 3;i++){
    await prisma.user.create({
      data: {
        username: `testuser${i+1}`,
        password: await bcrypt.hash("password", 10),
      }
    })
  }

  console.log("User table created!")
}

const seedData = async () => {
  await createUserTable()
}
seedData()