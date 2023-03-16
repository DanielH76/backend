import { BadRequestException, Body, Controller, Post } from "@nestjs/common";
import { User } from "../service/schemas/user.schema";
import { UserService } from "../service/user.service";


@Controller('user')
export class UserController {
    constructor (private readonly userService: UserService){}


    @Post()
    async create(@Body() user: User){
        if(!user) return BadRequestException

        this.userService.create(user)
        console.log(user)
        return user

    }


}