import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateGithubDto } from './dto/update-github.dto';
import { Github } from './entities/github.entity';

@Injectable()
export class GithubService {
  constructor(
    @InjectRepository(Github) private repository: Repository<Github>,
  ) {}

  async getStatus(id: string): Promise<Github> {
    try {
      return await this.repository.findOneOrFail(id);
    } catch {
      const github = this.repository.create({
        id,
        active: false,
        commitsWidgetActive: false,
        commitsWidgetId: 0,
        starsWidgetActive: false,
        starsWidgetId: 0,
      });

      return this.repository.save(github);
    }
  }

  async putStatus(
    id: string,
    updateGithubDto: UpdateGithubDto,
  ): Promise<Github> {
    const github = this.repository.create({
      id,
      active: updateGithubDto.active,
      commitsWidgetActive: updateGithubDto.commitsWidgetActive,
      commitsWidgetId: updateGithubDto.commitsWidgetId,
      starsWidgetActive: updateGithubDto.starsWidgetActive,
      starsWidgetId: updateGithubDto.starsWidgetId,
    });

    return this.repository.save(github);
  }
}
