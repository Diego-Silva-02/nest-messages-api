import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';

@Controller('messages')
export class MessagesController {

    // To chance status code use @HttpCode() decorator
    // Instead of using numbers, use HttpStatus Enum

    // @Query is to use query parameters
    // This is used especially in paginations

    @Get()
    findAll(@Query() pagination: any) {
        const { limit = 10, offset = 0 } = pagination;
        
        return `This route return all messages. Limit = ${limit}, Offset = ${offset}.`;
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
