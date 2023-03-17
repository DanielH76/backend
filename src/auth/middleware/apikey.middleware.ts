import { Injectable, NestMiddleware } from '@nestjs/common'
import { config } from 'dotenv'
import { Request, Response, NextFunction } from 'express'

config()

@Injectable()
export class ApiKeyMiddleware implements NestMiddleware {
	use(req: Request, res: Response, next: NextFunction) {
		const key = req.header('x-api-key')
		const secret = process.env.API_KEY

		key !== secret ? res.sendStatus(401) : next()
	}
}
