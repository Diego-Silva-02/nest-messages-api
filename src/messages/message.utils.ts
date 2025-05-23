import { Injectable } from "@nestjs/common";

@Injectable()
export class MessageUtils {
    invertString(str: string) {
        return str.split('').reverse().join('');
    }
}

@Injectable()
export class MessageUtilsMock {
    invertString() {
        return 'test return';
    }
}