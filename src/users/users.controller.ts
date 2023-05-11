import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserPageDto } from './dto/create-user-page.dto';
import {
  CreatePageResponse,
  UpdatePageResponse,
} from '@notionhq/client/build/src/api-endpoints';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async getPages(): Promise<any> {
    const response = await this.userService.getPages();

    return response;
  }

  @Get(':id')
  async getPageById(@Param() id: string): Promise<any> {
    const response = await this.userService.getPageById({ pageID: id });

    return response;
  }

  @Post()
  async createUserPage(
    @Body()
    userData: CreateUserPageDto,
  ): Promise<CreatePageResponse> {
    const response: CreatePageResponse = await this.userService.createUserPage(
      userData,
    );
    return response;
  }

  @Patch(':id')
  async updateUserPage(
    @Param() id: string,
    @Body()
    userData: {
      name?: string;
      username?: string;
      date?: Date;
      status?: boolean;
    },
  ): Promise<UpdatePageResponse> {
    const properties = {
      pageID: id,
      userData,
    };
    const response: UpdatePageResponse = await this.userService.updateUserPage(
      properties,
    );
    return response;
  }

  @Delete(':id')
  async archiveUserPage(@Param() id: string): Promise<UpdatePageResponse> {
    const response = await this.userService.deleteUserPage({ pageID: id });
    return response;
  }
}
