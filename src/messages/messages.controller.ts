import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

@Controller('messages')
export class MessagesController {

    // To chance status code use @HttpCode() decorator
    // Instead of using numbers, use HttpStatus Enum

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

    @Put(':id')
    update(@Param('id') id: string, @Body() message: any) {
        return {
            id,
            ...message
        };
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return `Message with id ${id} was deleted!`;
    }
}
