import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SpotifyModule } from './spotify/spotify.module';

const config: PostgresConnectionOptions = {
  type: 'postgres',
  username: `${process.env.POSTGRES_USER}`,
  host: `${process.env.POSTGRES_HOST}`,
  database: `${process.env.POSTGRES_DATABASE}`,
  password: `${process.env.POSTGRES_PASSWORD}`,
  port: +process.env.POSTGRES_PORT || 5432,
  synchronize: true,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
};
@Module({
  imports: [SpotifyModule, TypeOrmModule.forRoot(config)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
