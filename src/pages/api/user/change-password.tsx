import {NextApiRequest, NextApiResponse} from "next"
import {getSession} from "next-auth/client";
import {connect} from "@/utils/db";
import {hashPassword, verifyPassword} from "@/utils/auth";

async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method != "PATCH") {
        return res.status(404).json({})
    }

    const session = await getSession({req});

    if (!session) {
        return res.status(401).json({message: "Not authenticated!"})
    }

    const email = session.user.email;
    const {oldPassword, newPassword} = req.body;

    const client = await connect();

    const users = await client.db().collection("users")
    const user = await users.findOne({email})

    if (!user) {
        await client.close()
        return res.status(404).json({message: "User not found."})
    }

    const areEqual = await verifyPassword(oldPassword, user.password)

    if (!areEqual) {
        await client.close()
        return res.status(403).json({message: "You're not authorized for this operation!"})
    }

    const hashedPassword = await hashPassword(newPassword)

    await users.updateOne({email}, {
        $set: {password: hashedPassword}
    })

    await client.close()
    return res.status(200).json({message: "Password updated!"})
}

export default handler
