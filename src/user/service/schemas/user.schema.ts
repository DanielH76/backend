import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, Mongoose, Types } from "mongoose";


export type UserDocument = User & Partial<Document>

@Schema()
export class User {
    @Prop({type: Types.ObjectId})
    id: string

    @Prop()
    name: string

    @Prop()
    age: string

    @Prop({type: {}})
    address: {
        street: string
        number: string
        floor: string
    }

    @Prop()
    onSite: boolean
}

export const UserSchema = SchemaFactory.createForClass(User);
