import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { UpdateSolanaDto } from './dto/update-solana.dto';
import { Solana } from './entities/solana.entity';
import { SolanaService } from './solana.service';

@Controller('solana/:id')
export class SolanaController {
  constructor(private readonly solanaService: SolanaService) {}

  @Get()
  async getStatus(@Param('id') id: string): Promise<Solana> {
    return this.solanaService.getStatus(id);
  }

  @Put()
  async putStatus(
    @Param('id') id: string,
    @Body() body: UpdateSolanaDto,
  ): Promise<Solana> {
    return this.solanaService.putStatus(id, body);
  }
}
