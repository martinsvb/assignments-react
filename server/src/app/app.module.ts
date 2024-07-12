import { Module } from '@nestjs/common';
import {
  PrismaModule,
  providePrismaClientExceptionFilter,
} from 'nestjs-prisma';
import { AppController } from './app.controller';
import { ContentModule } from '../content/content.module';
import { prismaExceptions } from '../prisma';

@Module({
  imports: [
    PrismaModule.forRoot({
      isGlobal: true,
    }),
    ContentModule,
  ],
  controllers: [AppController],
  providers: [providePrismaClientExceptionFilter(prismaExceptions)],
})
export class AppModule {}
