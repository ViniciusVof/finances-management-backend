import { PrismaClient } from '@prisma/client';
import express from 'express';

const prisma = new PrismaClient()

const app = express();

app.use(express.json())
app.get('/users', async (req, res) => {
    const users = await prisma.user.findMany()
    res.json(users)
  })
app.listen(process.env.PORT, () => {
    console.log(`Tudo pronto na url: http://localhost:${process.env.PORT}`)
})