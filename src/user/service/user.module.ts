import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { UserController } from '../api/user.controller'
import { UserResolver } from '../api/user.resolver'
import { User, UserSchema } from './schemas/user.schema'
import { UserService } from './user.service'

@Module({
	imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
	controllers: [UserController],
	providers: [UserService, UserResolver],
})
export class UserModule {}
