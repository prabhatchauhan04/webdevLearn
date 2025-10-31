import { PrismaClient } from '@prisma/client';
let prisma = new PrismaClient();
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import env from '../../env.js';


export async function signup({ email, name, password }) {

    try {
        // pehle check karo ki user already exist karta hai ya nahi with this email
        let existing = await prisma.user.findUnique({
            where: { email }
        });

        if (existing) {
            let err = new Error('User already exists with this email');
            err.status = 401;
            throw err;
        }

        const salt = await bcrypt.genSalt(10); // generate a salt with 10 rounds
        const passwordHash = await bcrypt.hash(password, salt); // hash the password with the generated salt

        console.log(email , name , password)
        let user = await prisma.user.create({
            data: {
                email,
                password: passwordHash,
                name
            }
        });

        let token = jwt.sign({ name, email }, env.JWT_SECRET);

        return {
            user: {
                id: user.id,
                email: user.email,
                name: user.name
            },
            token
        };
    } catch (error) {

        return error;

    }

}