import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class UpdateUserPersonalInput {
	@Field()
	name: string

	@Field()
	age: string
}
