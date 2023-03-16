import { Mutation, Query } from '@nestjs/graphql'
import { Args, Resolver } from '@nestjs/graphql'
import { UserService } from '../service/user.service'
import { CreateUserAddressInput } from './inputs/create-user-address.input'
import { CreateUserInput } from './inputs/create-user.input'
import { UserModel } from './models/user.model'

@Resolver()
export class UserResolver {
	constructor(private readonly userService: UserService) {}

	@Query(() => [UserModel])
	async getAllUsers(): Promise<UserModel[]> {
		const users: UserModel[] = await this.userService.getAll()
		return users
	}

	@Query(() => UserModel)
	async getById(@Args('id', { type: () => String }) id: string) {
		const user: UserModel = await this.userService.get(id)
		return user
	}

	@Mutation(() => UserModel)
	async create(@Args('input') input: CreateUserInput) {
		const created = this.userService.createQL(input)
		return created
	}

	@Mutation(() => UserModel)
	async updateAddress(@Args('id', { type: () => String }) id: string, @Args('input') input: CreateUserAddressInput) {
		const updated = this.userService.updateAdressInformation({ id, ...input })

		return updated
	}
}
