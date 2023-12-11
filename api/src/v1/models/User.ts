import 'reflect-metadata'
import * as mongoose from 'mongoose'
import { getModelForClass, Prop, Ref, setGlobalOptions, Severity } from '@typegoose/typegoose'
import { Region } from './Region'
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

    @Prop({ default: 'Point' })
    type!: string
}

export class User extends Base {

    @Prop({ required: true })
    name!: string

    @Prop({ required: true, unique: true })
    email!: string

    @Prop()
    address?: string

    @Prop({ index: '2dsphere' })
    location?: Location

    @Prop({ required: true, default: [], ref: () => Region, type: () => String })
    regions!: Ref<Region>[]
}


export const UserModel = getModelForClass(User, { schemaOptions: { timestamps: true } })
