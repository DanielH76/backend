import { ApolloError } from 'apollo-server-express'

export class UserNotFoundError extends ApolloError {
	constructor(message?: string) {
		super(message, 'USER_NOT_FOUND_IN_DATABASE')
	}
}
