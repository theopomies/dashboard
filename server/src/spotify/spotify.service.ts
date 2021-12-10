import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateSpotifyDto } from './dto/update-spotify.dto';
import { Spotify } from './entities/spotify.entity';

@Injectable()
export class SpotifyService {
  constructor(
    @InjectRepository(Spotify) private repository: Repository<Spotify>,
  ) {}

  async getStatus(id: string): Promise<Spotify> {
    try {
      return await this.repository.findOneOrFail(id);
    } catch {
      const spotify = this.repository.create({
        id,
        active: false,
        playerWidgetActive: false,
        playerWidgetSongLink: '',
      });

      return this.repository.save(spotify);
    }
  }

  async putStatus(
    id: string,
    updateSpotifyDto: UpdateSpotifyDto,
  ): Promise<Spotify> {
    const spotify = this.repository.create({
      id,
      active: updateSpotifyDto.active,
      playerWidgetActive: updateSpotifyDto.playerWidgetActive,
      playerWidgetSongLink: updateSpotifyDto.playerWidgetSongLink,
    });

    return this.repository.save(spotify);
  }
}
