import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Solana {
  @PrimaryColumn()
  id: string;

  @Column()
  active: boolean;

  @Column()
  balanceWidgetActive: boolean;

  @Column()
  rentExemptWidgetActive: boolean;
}
