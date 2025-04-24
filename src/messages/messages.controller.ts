import { Body, Controller, Delete, Get, Inject, Param, Post, Put, Query, UsePipes } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ParseIntIdPipe } from 'src/common/pipes/parse-int-id.pipe';
import { RegexProtocol } from 'src/common/regex/regex.protocol';
import { ONLY_LOWERCASE_LETTERS_REGEX, REMOVE_SPACES_REGEX, SERVER_NAME } from './messages.constant';

@Controller('messages')
// You can use one this to test interceptors
// @UseInterceptors(SimpleCacheInterceptor, ChangeDataInterceptor, AddHeaderInterceptor, AuthTokenInterceptor)
@UsePipes(ParseIntIdPipe)
export class MessagesController {
    constructor(
        private readonly messagesService: MessagesService,
        @Inject(SERVER_NAME)
        private readonly serverName: string,
        @Inject(REMOVE_SPACES_REGEX)
        private readonly removeSpacesRegex: RegexProtocol,
        @Inject(ONLY_LOWERCASE_LETTERS_REGEX)
        private readonly onlyLowercaseLettersRegex: RegexProtocol,
    ) { }

    // To change status code use @HttpCode() decorator
    // Instead of using numbers, use HttpStatus Enum

    // @Query is to use query parameters
    // This is used especially in paginations

    @Get()
    // @UseGuards(IsAdminGuard)
    // @UseInterceptors(TimingConnectionInterceptor, ErrorHandlingInterceptor) // interceptors loads before and/or after pipe and funtions
    // @UrlParam() url: string -> a Param decorator created to get the url used in the request
        // other example it's @ReqDataParam that return the corresponding param used from request
    findAll(@Query() paginationDto: PaginationDto) { // @Req() req: Request // to use middleware request
        // console.log('MessagesController', req['user']);
        
        console.log(this.removeSpacesRegex.execute(this.serverName));
        console.log(this.onlyLowercaseLettersRegex.execute(this.serverName));
        
        // throw new BadRequestException('MESSAGE ERROR'); // use this to see ExceptionFilter
        return this.messagesService.findAll(paginationDto);
    }

    @Get(':id')
    // @UseInterceptors(AddHeaderInterceptor, ErrorHandlingInterceptor) // interceptors loads before pipe and funtions
    findOne(@Param('id') id: number) {
        return this.messagesService.findOne(id);
    }

    @Post()
    create(@Body() createMessageDto: CreateMessageDto) {
        return this.messagesService.create(createMessageDto);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() updateMessageDto: UpdateMessageDto) {
        return this.messagesService.update(id, updateMessageDto);
    }

    // ParseIntPipe transform the value in a number and throws error if isn't a number
    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.messagesService.remove(id);
    }
}
