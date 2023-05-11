import { Injectable } from '@nestjs/common';
import { Client } from '@notionhq/client';
import { ConfigService } from 'src/config/config.service';

@Injectable()
export class NotionService {
  private readonly notion: Client;

  constructor(private readonly configService: ConfigService) {
    this.notion = new Client({
      auth: this.configService.get('NOTION_API_KEY'),
    });
  }

  public getNotionClient(): Client {
    return this.notion;
  }

  async getDatabase(): Promise<any> {
    const response = await this.notion.databases.retrieve({
      database_id: this.configService.get('NOTION_DATABASE_ID'),
    });

    return response;
  }
}
