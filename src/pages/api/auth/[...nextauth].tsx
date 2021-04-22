import NextAuth from "next-auth"
import Providers from "next-auth/providers";
import {connect} from "@/utils/db";
import {verifyPassword} from "@/utils/auth";

export default NextAuth({
    session: {
        jwt: true
    },
    providers: [
        Providers.Credentials({
            async authorize(credentials: { email: string, password: string }): Promise<any> {
                const client = await connect()

                const user = await client.db().collection('users').findOne({email: credentials.email});

                if (!user) {
                    await client.close()
                    throw new Error("No user found!")
                }

                const isValid = await verifyPassword(credentials.password, user.password)

                if (!isValid) {
                    await client.close()
                    throw new Error("Could not log you in!")
                }

                await client.close()

                // next-auth now that authorization is succeeded
                return {email: credentials.email};
            }
        })
    ]
});
