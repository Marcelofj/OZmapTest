import 'reflect-metadata'
import * as mongoose from 'mongoose'
import { getModelForClass, Prop, Ref, setGlobalOptions, Severity } from '@typegoose/typegoose'
import { User } from './User'
import ObjectId = mongoose.Types.ObjectId

setGlobalOptions({ options: { allowMixed: Severity.ALLOW } })

class Base {
    @Prop({ required: true, default: () => (new ObjectId()).toString() })
    _id!: string
}

class Location {
    @Prop({ required: true, default: () => (new ObjectId()).toString() })
    _id!: string

    @Prop()
    coordinates!: [number, number]

    @Prop({ default: 'Polygon' })
    type!: string
}

export class Region extends Base {

    @Prop({ required: true, index: '2dsphere' })
    location!: Location

    @Prop({ required: true })
    name!: string

    @Prop({ required: true })
    user!: Ref<User>
}


export const RegionModel = getModelForClass(Region, { schemaOptions: { timestamps: true } })