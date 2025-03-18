import { PartialType } from "@nestjs/mapped-types";
import { CreateMessageDto } from "./create-message.dto";
import { IsBoolean, IsOptional } from "class-validator";

// use mapped types (or partial types) to repeat variables and validations from one class
export class UpdateMessageDto extends PartialType(CreateMessageDto) {
    @IsBoolean()
    @IsOptional()
    readonly read?: boolean
}
