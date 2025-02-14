import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserRole } from './user.schema';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';


@Injectable()
export class UsersService {
    constructor (@InjectModel(User.name) private userModel: Model<User>) {}

    async createUser(userData: CreateUserDto){
        const {username, email, password, firstName, lastName, role} = userData;
        const existingUser = await this.userModel.findOne({ username});
        const existingEmail = await this.userModel.findOne({ email});
        if(existingUser){
            throw new ConflictException('Username already exists');
        }
        else if(existingEmail){
            throw new ConflictException('Email already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new this.userModel({firstName, lastName, username, password: hashedPassword, email, role });
        return user.save();
    }

    async findByUsername(username: string): Promise<User | null> {
        return this.userModel.findOne({ username }).exec();
      }
    async findByUserId(id: string): Promise<User | null>{
        return this.userModel.findOne({ id}).exec();
    }

    async findUsers(): Promise<User[]>{
        return this.userModel.find().exec();
    }

}
