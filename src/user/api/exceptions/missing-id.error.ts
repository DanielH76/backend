import { ApolloError } from 'apollo-server-express'

export class MissingIdError extends ApolloError {
	constructor(message?: string) {
		super(message, 'MISSING_ID')
	}
}
