import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { User, UserDocument } from "./schemas/user.schema";


@Injectable()
export class UserService {
    constructor(@InjectModel(User.name)private readonly userModel: Model<UserDocument>){}

    async create(userToCreate: User): Promise<User> {
        if(!userToCreate) return null

        try{
            const user = await this.userModel.create(userToCreate);
            user.save()

        }catch(error) {
            return error.message 
        }
    }

    async get(id: string) {
        if(!id) return null

        try{
            const userToFind = await this.userModel.findOne({_id: id})

            if(!userToFind) return NotFoundException
            return userToFind
        }catch(error) {
            return error.message
        }
    }

    async getAll() {
        try{
            const usersToFind = await this.userModel.find().exec()

            if(!usersToFind) return NotFoundException
            return usersToFind

        }catch(error){  
            return error.message
        }
    }

    async delete(id: string) {
        try{
            console.log(id)
            if(Types.ObjectId.isValid(id)) console.log('valid')

            const deleted = await this.userModel.deleteOne({_id: id})
            console.log(deleted.deletedCount)

            if(!deleted.acknowledged) return InternalServerErrorException
            return deleted.deletedCount

        }catch(error){
            return error.message
        }
    }

    async update(id: string, newValues: User){
        const filter = {_id: id}
        const update = {name: newValues.name, age: newValues.age, address: newValues.address, onSite: newValues.onSite}

        try{
            let updated = await this.userModel.findOneAndUpdate(filter, update, {new: true})
            return updated

        } catch(error){
            return error.message
        }
    }

    async updateAdressInformation(values: {id: string, street: string, number: string, floor: string}){
        const filter = {_id: values.id}
        const update = {address: {street: values.street, number: values.number, floor: values.floor}}

        try{
            let updated = await this.userModel.findOneAndUpdate(filter, update, {new: true})
            console.log(updated)
            return update
        }catch(error){
            return error.message
        }



    }
}