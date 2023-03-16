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

	public create(name: string, age: string, address: { street: string; number: string; floor: string }) {
		let userToCreate = new User()
		userToCreate.name = name
		userToCreate.age = age
		userToCreate.address = address
		userToCreate.absenceStatus = 0
		userToCreate.onSite = false

		return userToCreate
	}
}

export const UserSchema = SchemaFactory.createForClass(User)
