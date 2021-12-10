import { Module } from '@nestjs/common';
import { SolanaService } from './solana.service';
import { SolanaController } from './solana.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Solana } from './entities/solana.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Solana])],
  controllers: [SolanaController],
  providers: [SolanaService],
})
export class SolanaModule {}
