import { ActiveStatusEnum } from "src/commom/enum/enum";
import { Video } from "src/videos/entities/video.entity";
import { BeforeInsert, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('Course')
export class Course {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;
  
    @Column()
    description: string;

    @OneToMany(type => Video, video => video.course)
    videos: Video[];
  
    @Column({
      type: 'enum',
      enum: ActiveStatusEnum,
      default: ActiveStatusEnum.ACTIVE,
    })
    status: ActiveStatusEnum;
  
    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;
  
    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updated_at: Date;
  
    @BeforeInsert()
    async beforeInsert() {
      this.status = ActiveStatusEnum.ACTIVE;
    }
}
