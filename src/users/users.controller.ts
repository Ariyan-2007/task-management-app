import {
    BadRequestException,
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('create')
  async createUser(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.usersService.createUser(createUserDto);
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException('Username already exists.');
      }

      throw new InternalServerErrorException('Error creating user. Please try again later.');
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getUsers() {
    try {
      return await this.usersService.findUsers();
    } catch (error) {

      throw new UnauthorizedException('Could not retrieve users.');
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async getUserById(@Param('id') id: string) {
    try {
      const user = await this.usersService.findByUserId(id);
      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      return user;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new UnauthorizedException('Could not retrieve user data.');
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':username')
  async getUserByUsername(@Param('username') username: string) {
    try {
      const user = await this.usersService.findByUsername(username);
      if (!user) {
        throw new NotFoundException(`User with username ${username} not found`);
      }
      return user;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new UnauthorizedException('Could not retrieve user data.');
    }
  }
}
