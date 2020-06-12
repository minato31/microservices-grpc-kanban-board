import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Project } from "./Project";
import { Task } from "./Task";

enum Progress {
  TODO = 0,
  DOING = 1,
  DONE = 2,
}

@Entity()
export class Board extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "enum", enum: Progress, nullable: false })
  progress: Progress;

  @CreateDateColumn({ type: "timestamp" })
  created_at: Date;

  @OneToMany((_type) => Task, (task) => task.board)
  tasks: Task[];

  @ManyToOne((_type) => Project, (project) => project.boards)
  project: Project;
}
