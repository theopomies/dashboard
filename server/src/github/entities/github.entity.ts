import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Github {
  @PrimaryColumn()
  id: string;

  @Column()
  active: boolean;

  @Column()
  starsWidgetActive: boolean;

  @Column()
  starsWidgetId: number;

  @Column()
  commitsWidgetActive: boolean;

  @Column()
  commitsWidgetId: number;
}
