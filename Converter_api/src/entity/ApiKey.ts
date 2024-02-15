import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
  CreateDateColumn,
} from "typeorm";
import { Users } from "./User";

@Entity()
export class ApiKey {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "text" })
  name: string;

  @Column({ unique: true })
  key: string;

  @ManyToOne(() => Users, { eager: true })
  @JoinColumn()
  user: Users;

  @CreateDateColumn()
  created_at: Date;

  @Column({
    type: "timestamp",
    default: () => `(CURRENT_DATE + interval '1' month)`,
  })
  expired_at: Date;

  @Column({ type: "int", default: 0 })
  usage_count: number;
}
