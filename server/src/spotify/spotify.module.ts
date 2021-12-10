import { Module } from '@nestjs/common';
import { SpotifyService } from './spotify.service';
import { SpotifyController } from './spotify.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Spotify } from './entities/spotify.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Spotify])],
  controllers: [SpotifyController],
  providers: [SpotifyService],
})
export class SpotifyModule {}
