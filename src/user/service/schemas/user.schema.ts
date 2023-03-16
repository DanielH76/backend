import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Types } from 'mongoose'
import { AbsenceStatus } from './user.enums'

export type UserDocument = User & Partial<Document>

@Schema()
export class User {
	@Prop({ type: Types.ObjectId })
	id: string

	@Prop()
	name: string

	@Prop()
	age: string

	@Prop({ type: {} })
	address: {
		street: string
		number: string
		floor: string
	}

	@Prop()
	onSite: boolean

	@Prop()
	absenceStatus: AbsenceStatus
}

export const UserSchema = SchemaFactory.createForClass(User)
