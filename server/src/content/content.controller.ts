import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { ContentEntity } from './entities/content.entity';
import { ContentService } from './content.service';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';

@Controller('content')
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @Post()
  async create(@Body() createContentDto: CreateContentDto) {
    return new ContentEntity(
      await this.contentService.create(createContentDto),
    );
  }

  @Get('list/:type')
  async findAll(@Param('type') type: string) {
    const contents = await this.contentService.findAll(type);
    return contents.map((content) => new ContentEntity(content));
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const content = new ContentEntity(await this.contentService.findOne(id));
    if (!content) {
      throw new NotFoundException(`Content with ${id} does not exist.`);
    }
    return content;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateContentDto: UpdateContentDto
  ) {
    return new ContentEntity(
      await this.contentService.update(id, updateContentDto)
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return new ContentEntity(await this.contentService.remove(id));
  }
}
