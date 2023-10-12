import { ActiveStatusEnum } from "src/commom/enum/enum";
import { Video } from "src/videos/entities/video.entity";
import { BeforeInsert, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('video_comment')
export class VideoComment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    text: string; 
    
    @ManyToOne(type => Video, video => video.videoComments)
    video: Video;

    @Column()
    answered: boolean;

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
    
      @BeforeInsert()
      async beforeInsertAns() {
        this.answered = false;
      }
}
