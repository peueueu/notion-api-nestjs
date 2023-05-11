import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { NotionService } from 'src/notion/notion.service';
import { ConfigModule } from 'src/config/config.module';

@Module({
  imports: [ConfigModule],
  providers: [UsersService, NotionService],
  controllers: [UsersController],
})
export class UsersModule {}
