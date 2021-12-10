import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateSolanaDto } from './dto/update-solana.dto';
import { Solana } from './entities/solana.entity';

@Injectable()
export class SolanaService {
  constructor(
    @InjectRepository(Solana) private repository: Repository<Solana>,
  ) {}

  async getStatus(id: string): Promise<Solana> {
    try {
      return await this.repository.findOneOrFail(id);
    } catch {
      const solana = this.repository.create({
        id,
        active: false,
        balanceWidgetActive: false,
        rentWidgetActive: false,
      });

      return this.repository.save(solana);
    }
  }

  async putStatus(
    id: string,
    updateSolanaDto: UpdateSolanaDto,
  ): Promise<Solana> {
    const solana = this.repository.create({
      id,
      active: updateSolanaDto.active,
      balanceWidgetActive: updateSolanaDto.balanceWidgetActive,
      rentWidgetActive: updateSolanaDto.rentWidgetActive,
    });

    return this.repository.save(solana);
  }
}
