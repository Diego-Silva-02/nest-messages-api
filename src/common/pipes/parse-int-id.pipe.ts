import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class ParseIntIdPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        if (metadata.type !== 'param' || metadata.data !== 'id') { // data it's the name of param
            return value;
        }

        // converts value to number
        const parsedValue = Number(value);

        if(isNaN(parsedValue)) {
            throw new BadRequestException('ParseIntIdPipe expects a numerical value.')
        }

        if(parsedValue < 0) {
            throw new BadRequestException('ParseIntIdPipe expects a number greater than zero.')
        }

        return value;
    }

}