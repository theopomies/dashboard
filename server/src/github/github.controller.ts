import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { UpdateGithubDto } from './dto/update-github.dto';
import { Github } from './entities/github.entity';
import { GithubService } from './github.service';

@Controller('github/:id')
export class GithubController {
  constructor(private readonly githubService: GithubService) {}

  @Get()
  async getStatus(@Param('id') id: string): Promise<Github> {
    return this.githubService.getStatus(id);
  }

  @Put()
  async putStatus(
    @Param('id') id: string,
    @Body() body: UpdateGithubDto,
  ): Promise<Github> {
    return this.githubService.putStatus(id, body);
  }
}
