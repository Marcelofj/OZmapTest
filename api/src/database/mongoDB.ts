import mongoose from 'mongoose'
import config from '../config/default'
import Logger from '../config/logger'

const connect = async () => {

    const uri = config.mongoDB.uri
    const dbName = config.mongoDB.dbName

    try {
        await mongoose.connect(uri, { dbName })
        Logger.info('MongoDB is connected!')
    } catch (error) {
        Logger.error('Cannot connect!')
        Logger.error(error)
        process.exit(1)
    }

}

export default connect