import { Mutation, Query } from '@nestjs/graphql'
import { Args, Resolver } from '@nestjs/graphql'
import { AbsenceStatus } from '../service/schemas/user.enums'
import { UserService } from '../service/user.service'
import { CreateUserAddressInput } from './inputs/create-user-address.input'
import { CreateUserInput } from './inputs/create-user.input'
import { UpdateUserPersonalInput } from './inputs/update-user-personal.input'
import { UserModel } from './models/user.model'

@Resolver()
export class UserResolver {
	constructor(private readonly userService: UserService) {}

	@Query(() => [UserModel])
	async getAllUsers(): Promise<UserModel[]> {
		const users: UserModel[] = await this.userService.getAll()
		return users
	}

	@Query(() => [UserModel])
	async getAllByStatus(@Args('status', { type: () => Boolean }) status: boolean) {
		const users = this.userService.getAllByStatus(status)
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

	@Mutation(() => UserModel)
	async updatePersonal(@Args('id', { type: () => String }) id: string, @Args('input') input: UpdateUserPersonalInput) {
		const updated = this.userService.updatePersonalInformation({ id, ...input })
		return updated
	}

	@Mutation(() => UserModel)
	async updateAbsence(@Args('id', { type: () => String }) id: string, @Args('input') input: AbsenceStatus) {
		const updated = this.userService.updateAbsenceStatus({ id, status: input })
	}

	@Mutation(() => Number)
	async deleteUser(@Args('id', { type: () => String }) id: string) {
		const deleted = this.userService.delete(id)
		return deleted
	}
}
