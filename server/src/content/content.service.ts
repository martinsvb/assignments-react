import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';

@Injectable()
export class ContentService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateContentDto) {
    return this.prisma.content.create({ data });
  }

  findAll(type: string) {
    return this.prisma.content.findMany({
      where: {
        type,
      },
    });
  }

  findOne(id: string) {
    return this.prisma.content.findUnique({
      where: { id },
    });
  }

  update(id: string, data: UpdateContentDto) {
    return this.prisma.content.update({
      where: { id },
      data,
    });
  }

  remove(id: string) {
    return this.prisma.content.delete({ where: { id } });
  }
}
