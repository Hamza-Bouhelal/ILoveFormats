import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class RefreshToken {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column()
  token: string;
}
