import {z} from 'zod'


const userSignupSchema = z.object(
    {
        email: z.string().email(),
        username: z.string().min(3),
        password: z.string()
    }
)

export {
    userSignupSchema
}