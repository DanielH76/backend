import { BadRequestException, Body, Controller, Get, NotFoundException, Param, Post } from "@nestjs/common";
import { User } from "../service/schemas/user.schema";
import { UserService } from "../service/user.service";


@Controller('user')
export class UserController {
    constructor (private readonly userService: UserService){}


    @Post()
    async create(@Body() user: User){
        if(!user) return BadRequestException

        const createdUser = await this.userService.create(user)
        console.log(createdUser)
        return createdUser

    }

    @Get(':id')
    async get(@Param() params){
        if(!params.id) return 'Missing id'

        const userToFind = await this.userService.get(params.id)
        console.log(userToFind)

        if(!userToFind) return NotFoundException
        return userToFind
    }


}