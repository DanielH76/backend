import { ApolloError } from 'apollo-server-express'

export class MissingAddressError extends ApolloError {
	constructor(message?: string) {
		super(message, 'MISSING_ADDRESS_PARAMETER')
	}
}

export class MissingAddressNumberError extends ApolloError {
	constructor(message?: string) {
		super(message, 'MISSING_STREETNUMBER_PARAMETER')
	}
}

export class MissingAddressFloorError extends ApolloError {
	constructor(message?: string) {
		super(message, 'MISSING_FLOOR_PARAMETER')
	}
}
