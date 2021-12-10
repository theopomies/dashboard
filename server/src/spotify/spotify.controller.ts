import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { UpdateSpotifyDto } from './dto/update-spotify.dto';
import { Spotify } from './entities/spotify.entity';
import { SpotifyService } from './spotify.service';

@Controller('spotify/:id')
export class SpotifyController {
  constructor(private readonly spotifyService: SpotifyService) {}

  @Get()
  async getStatus(@Param('id') id: string): Promise<Spotify> {
    return this.spotifyService.getStatus(id);
  }

  @Put()
  async putStatus(
    @Param('id') id: string,
    @Body() body: UpdateSpotifyDto,
  ): Promise<Spotify> {
    return this.spotifyService.putStatus(id, body);
  }
}
