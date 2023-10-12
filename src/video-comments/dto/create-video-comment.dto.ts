import { IsNotEmpty } from "class-validator";

export class CreateVideoCommentDto {
    
    @IsNotEmpty()
    text: string;
    
    @IsNotEmpty()
    videoId: number;

}
