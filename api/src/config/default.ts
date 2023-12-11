import dotenv from 'dotenv'
dotenv.config()

const config = {
    app: {
        hostname: <string>process.env.HOSTNAME,
        port: <number>Number(process.env.PORT),
        env: <string>process.env.ENV
    },
    mongoDB: {
        dbName: <string>process.env.MONGO_DBNAME,
        uri: <string>process.env.MONGO_URI
    },
    mongoDBTest: {
        dbName: <string>process.env.MONGO_DBNAME,
        uri: <string>process.env.MONGO_URI
    }
}

export default config




