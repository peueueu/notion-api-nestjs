import { Module } from '@nestjs/common';
import { NotionService } from './notion.service';
// import { ConfigService } from 'src/config/config.service';
import { ConfigModule } from 'src/config/config.module';

@Module({
  imports: [ConfigModule],
  providers: [NotionService],
  exports: [NotionService],
})
export class NotionModule {}
