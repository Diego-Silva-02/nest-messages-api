import { IsNotEmpty, IsPositive, IsString, MaxLength, MinLength } from "class-validator";

export class CreateMessageDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    @MaxLength(255)
    //@IsOptional() -> using this, the key isn't required
    readonly text: string;

    @IsPositive()
    fromId: number;

    @IsPositive()
    toId: number;
}