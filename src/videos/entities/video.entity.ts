import { ActiveStatusEnum } from "src/commom/enum/enum";
import { Course } from "src/course/entities/course.entity";
import { BeforeInsert, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('Video')
export class Video {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    url: string;

    @ManyToOne(type => Course, course => course.videos)
    course: Course;

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
