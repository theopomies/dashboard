import { Module } from '@nestjs/common';
import { GithubService } from './github.service';
import { GithubController } from './github.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Github } from './entities/github.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Github])],
  controllers: [GithubController],
  providers: [GithubService],
})
export class GithubModule {}
