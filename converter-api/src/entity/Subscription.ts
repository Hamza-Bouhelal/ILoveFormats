import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
} from "typeorm";
import { SubscriptionLevel } from "../utils/types";

@Entity()
export class Subscription {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column()
  subscription_type: SubscriptionLevel;

  @Column({ type: "int" })
  converts: number;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  start_date: Date;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
    onUpdate: "CURRENT_TIMESTAMP(6)",
  })
  updated_at: Date;
}
