import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotionModule } from './notion/notion.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [NotionModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
