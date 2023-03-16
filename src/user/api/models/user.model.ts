import { Field, ID, ObjectType } from '@nestjs/graphql'
import { AbsenceStatus } from 'src/user/service/schemas/user.enums'
import { UserDocument } from 'src/user/service/schemas/user.schema'
import { AddressModel } from './address.model'

@ObjectType()
export class UserModel {
	@Field(() => ID)
	_id: string

	@Field()
	name: string

	@Field()
	age: string

	@Field()
	address: AddressModel

	@Field(() => Boolean)
	onSite: boolean

	@Field()
	absenceStatus: AbsenceStatus

	static from(user: UserDocument): UserModel {
		let model = new UserModel()

		model._id = user.id
		model.name = user.name
		model.age = user.age
		model.address = user.address
		model.onSite = user.onSite
		model.absenceStatus = user.absenceStatus

		return model
	}
}
