import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateUserAddressInput {
	@Field()
	street: string

	@Field()
	number: string

	@Field()
	floor: string
}
