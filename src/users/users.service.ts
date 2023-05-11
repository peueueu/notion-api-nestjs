import { Injectable } from '@nestjs/common';
import { NotionService } from 'src/notion/notion.service';
import { CreateUserPageDto } from './dto/create-user-page.dto';
import {
  CreatePageResponse,
  UpdatePageResponse,
} from '@notionhq/client/build/src/api-endpoints';

@Injectable()
export class UsersService {
  constructor(private readonly notionService: NotionService) {}

  async getPages(): Promise<any> {
    const database = await this.notionService.getDatabase();

    const response = await this.notionService
      .getNotionClient()
      .databases.query({
        database_id: database.id,
      });

    return response;
  }

  async getPageById({ pageID }): Promise<any> {
    const response = await this.notionService.getNotionClient().pages.retrieve({
      page_id: pageID.id,
    });

    return response;
  }

  async createUserPage(
    userData: CreateUserPageDto,
  ): Promise<CreatePageResponse> {
    try {
      const database = await this.notionService.getDatabase();

      const notionClient = this.notionService.getNotionClient();

      const response = await notionClient.pages.create({
        parent: {
          database_id: database.id,
        },
        properties: {
          ID: {
            title: [
              {
                text: {
                  content: userData.username,
                },
              },
            ],
          },
          Name: {
            rich_text: [
              {
                text: {
                  content: userData.name,
                },
              },
            ],
          },
          Status: {
            checkbox: userData.status,
          },
          Date: {
            date: {
              start: new Date(userData.date).toISOString(),
            },
          },
        },
      });

      return response;
    } catch (error) {
      console.log(error.body);
    }
  }

  async updateUserPage({ pageID, userData }): Promise<UpdatePageResponse> {
    const notionClient = this.notionService.getNotionClient();

    const propertiesToUpdate = {
      ID: userData.username
        ? {
            title: [
              {
                text: {
                  content: userData.username,
                },
              },
            ],
          }
        : undefined,
      Name: userData.name
        ? {
            rich_text: [
              {
                text: {
                  content: userData.name,
                },
              },
            ],
          }
        : undefined,
      Status: userData.status
        ? {
            checkbox: userData.status,
          }
        : undefined,
      Date: userData.date
        ? {
            date: {
              start: new Date(userData.date).toISOString(),
            },
          }
        : undefined,
    };

    const response = await notionClient.pages.update({
      page_id: pageID.id,
      properties: { ...propertiesToUpdate },
    });
    return response;
  }

  async deleteUserPage({ pageID }): Promise<UpdatePageResponse> {
    const notionClient = this.notionService.getNotionClient();

    const response = await notionClient.pages.update({
      page_id: pageID.id,
      archived: true,
    });

    return response;
  }
}
