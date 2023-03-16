import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'
import { AbsenceStatus } from './schemas/user.enums'
import { User, UserDocument } from './schemas/user.schema'

@Injectable()
export class UserService {
	constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {}

	async create(userToCreate: User): Promise<User> {
		if (!userToCreate) return null

		userToCreate.onSite = false

		try {
			const user = await this.userModel.create(userToCreate)
			user.save()

			return user
		} catch (error) {
			return error.message
		}
	}

	async createQL(values: { name: string; age: string; address: { street: string; number: string; floor: string } }) {
		const userToCreate = new User().create(values.name, values.age, values.address)

		try {
			const created = await this.userModel.create(userToCreate)
			created.save()

			return created
		} catch (error) {
			return error.message
		}
	}

	async get(id: string) {
		if (!id) return null

		try {
			const userToFind = await this.userModel.findOne({ _id: id })

			if (!userToFind) return NotFoundException

			return userToFind
		} catch (error) {
			return error.message
		}
	}

	async getOnsiteStatus(id: string) {
		if (!id) return null

		try {
			const userTofind = await this.userModel.findOne({ _id: id })

			if (!userTofind) return NotFoundException

			return userTofind.onSite
		} catch (error) {
			return error.message
		}
	}

	async getAll(): Promise<User[] | any> {
		try {
			// const usersToFind = (await this.userModel.find().exec()).map((user) => {
			//	const { name, age, _id } = user
			//	return { name, age, _id }
			const usersToFind = await this.userModel.find().exec()

			if (!usersToFind) return NotFoundException

			return usersToFind
		} catch (error) {
			return error.message
		}
	}

	async getAllByStatus(onSite: boolean) {
		try {
			// const usersToFind = (await this.userModel.find({ onSite: onSite }).exec()).map((user) => {
			// 	const { name, absenceStatus } = user
			// 	return { name, absenceStatus }
			// })

			const usersToFind = await this.userModel.find({ onSite: onSite }).exec()
			if (!usersToFind) return NotFoundException

			return usersToFind
		} catch (error) {
			return error.message
		}
	}

	async delete(id: string) {
		try {
			const deleted = await this.userModel.deleteOne({ _id: id })

			if (!deleted.acknowledged) return InternalServerErrorException

			return deleted.deletedCount
		} catch (error) {
			return error.message
		}
	}

	async update(id: string, newValues: User) {
		const filter = { _id: id }
		const update = {
			name: newValues.name,
			age: newValues.age,
			address: newValues.address,
			onSite: newValues.onSite,
		}

		try {
			let updated = await this.userModel.findOneAndUpdate(filter, update, {
				new: true,
			})
			return updated
		} catch (error) {
			return error.message
		}
	}

	async updateAdressInformation(values: { id: string; street: string; number: string; floor: string }) {
		const filter = { _id: values.id }
		const update = {
			address: {
				street: values.street,
				number: values.number,
				floor: values.floor,
			},
		}

		try {
			const updated = await this.userModel.findOneAndUpdate(filter, update, {
				new: true,
			})
			console.log(updated)
			return update
		} catch (error) {
			return error.message
		}
	}

	async updatePersonalInformation(values: { id: string; name: string; age: string }) {
		const filter = { _id: values.id }
		const update = { name: values.name, age: values.age }

		try {
			const updated = await this.userModel.findOneAndUpdate(filter, update, {
				new: true,
			})
			return updated
		} catch (error) {
			return error.message
		}
	}

	async updateAbsenceStatus(values: { id: string; status: AbsenceStatus }) {
		const filter = { _id: values.id }
		const update = values.status == AbsenceStatus.onSite ? { onSite: true, absenceStatus: values.status } : { onSite: false, absenceStatus: values.status }

		try {
			const updated = await this.userModel.findOneAndUpdate(filter, update, {
				new: true,
			})
			return updated
		} catch (error) {
			return error.message
		}
	}
}
