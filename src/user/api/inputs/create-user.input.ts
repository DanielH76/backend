import { Field, InputType } from '@nestjs/graphql'
import { CreateUserAddressInput } from './create-user-address.input'

@InputType()
export class CreateUserInput {
	@Field()
	name: string

	@Field()
	age: string

	@Field()
	address: CreateUserAddressInput
}
