import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class AddressModel {
	@Field()
	street: string

	@Field()
	number: string

	@Field()
	floor: string
}
