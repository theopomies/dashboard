import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Spotify {
  @PrimaryColumn()
  id: string;

  @Column()
  active: boolean;

  @Column()
  playerWidgetActive: boolean;

  @Column()
  playerWidgetSongLink: string;
}
