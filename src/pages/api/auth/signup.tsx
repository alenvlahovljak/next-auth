import {NextApiRequest, NextApiResponse} from "next"
import {connect} from "@/utils/db"
import {hashPassword} from "@/utils/auth"

async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method != 'POST') {
        return;
    }

    const {email, password} = req.body

    if (!email || !email.includes('@') || !password || password.trim().length < 7) {
        return res.status(422).json({message: "Invalid input - password should at least be at least 7 characters long."})
    }

    const client = await connect()
    const db = client.db()

    const existingUser = db.collection('users').findOne({email})

    if(existingUser){
        await client.close()
        return res.status(422).json({message: "User exists already!"})
    }

    const hashedPassword = await hashPassword(password)

    await db.collection('users').insertOne({
        email,
        password: hashedPassword
    })

    await client.close()
    return res.status(201).json({message: "Create user!"})
}

export default handler
