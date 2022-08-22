import { Contains, IsString, IsUrl } from "class-validator";

export class CreateMatchDto {
    @IsString()
    eventTitle: string;

    @IsString()
    @Contains('vs')
    matchTitle: string;

    @IsUrl()
    link: string;
}
