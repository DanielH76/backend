import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from "@nestjs/common";
import mongoose from "mongoose";
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

        if(!userToFind) return NotFoundException
        return userToFind
    }

    @Get()
    async getAll() {
        const usersToFind = await this.userService.getAll()
        console.log(usersToFind)

        if(!usersToFind) return NotFoundException
        return usersToFind
    }

    @Delete(':id')
    async deleteById(@Param() params) {
        if(!params.id) return 'Missing id'

        const deleted = await this.userService.delete(params.id)

        return deleted

    }

    @Put()
    async update(@Body() user: User){
        if(!user) return 'user missing'
        

        const updated = await this.userService.update(user.id, user)
        return updated
    }

    @Put('address')
    async updateAddress(@Body() values: {id: string, street: string, number: string, floor: string}){

        if(!values.id) return 'missing id'
        if(!values.street && !values.number && !values.floor) return 'missing update parameters'
        
        const updated = await this.userService.updateAdressInformation(values)

        return updated
    }

}