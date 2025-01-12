import { ActiveStatusEnum } from "src/commom/enum/enum";
import { Course } from "src/course/entities/course.entity";
import { VideoComment } from "src/video-comments/entities/video-comment.entity";
import { BeforeInsert, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('video')
export class Video {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    url: string;

    @ManyToOne(type => Course, course => course.videos)
    course: Course;

    @OneToMany(type => VideoComment, videoComment => videoComment.video, { eager: true })
    videoComments: VideoComment[];

    @Column()
    ordering: number;

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
