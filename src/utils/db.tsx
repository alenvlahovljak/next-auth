import {MongoClient} from "mongodb"

export async function connect() {
    return MongoClient.connect(process.env.NEXT_APP_ATLAS_DB || "")
}
