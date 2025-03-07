import { Body, Controller, Get, Param, Post } from '@nestjs/common';

@Controller('messages')
export class MessagesController {

    @Get()
    findAll() {
        return 'This route return all messages!';
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return `Message with id: ${id}!`;
    }

    @Post()
    create(@Body() message: any) {
        return message;
    }
}
