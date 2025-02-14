import {
  Controller,
  Get,
  Post,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('tasks')
export class TasksController {
  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getTasks() {
    try {
      return 'Protected Task Data';
    } catch (error) {
      throw new UnauthorizedException(
        'You are not authorized to access this resource.',
      );
    }
  }
}
