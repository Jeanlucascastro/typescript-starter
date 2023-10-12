import { IsNotEmpty } from "class-validator";

export class CreateVideoDto {

    @IsNotEmpty()
    name: string;
    @IsNotEmpty()
    url: string;
    @IsNotEmpty()
    ordering: number;
    @IsNotEmpty()
    courseId: number; 

}
