import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {

    constructor(private readonly messagesService: MessagesService) { }

    // To chance status code use @HttpCode() decorator
    // Instead of using numbers, use HttpStatus Enum

    // @Query is to use query parameters
    // This is used especially in paginations

    @Get()
    findAll(@Query() pagination: any) {
        const { limit = 10, offset = 0 } = pagination;
        
        return this.messagesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.messagesService.findOne(id);
    }

    @Post()
    create(@Body() body: any) {
        return this.messagesService.create(body);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() body: any) {
        return this.messagesService.update(id, body);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.messagesService.remove(id);
    }
}
