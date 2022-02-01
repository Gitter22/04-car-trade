import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Session } from '@nestjs/common';
import { Serialize } from 'src/interceptors/serialize.interceptors';
import { CreateUserDTO } from './dtos/create-user.dto';
import { UpdateUserDTO } from './dtos/update-user.dto';
import { UsersService } from './users.service';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { AuthGuard } from 'src/guards/auth.guard';
import { UseGuards } from '@nestjs/common';

@Controller('auth')

export class UsersController {
    constructor(private usersService: UsersService,
        private authService: AuthService) { }

    @Post('signup')
    async createUser(@Body() body: CreateUserDTO, @Session() session: any) {
        const user = await this.authService.signup(body.email, body.password)
        session.userId = user.id
        return user
    }

    @Post('signin')
    async signInUser(@Body() body: CreateUserDTO, @Session() session: any) {
        const user = await this.authService.signin(body.email, body.password)
        session.userId = user.id
        return user
    }

    @Get('whoami')
    @UseGuards(AuthGuard)
    whoAmI(@CurrentUser() user: string) {
        return user
    }

    @Post('signout')
    async signout(@Session() session: any) {
        return session.userId = null
    }



    @Get('/:id')
    @Serialize(UserDto)
    findUser(@Param('id') id: string) {
        console.log("this is handler")
        return this.usersService.findOne(parseInt(id))
    }

    @Get()
    @Serialize(UserDto)
    findUserByEmail(@Query('email') email: string) {
        return this.usersService.find(email)
    }

    @Delete('/:id')
    deleteUser(@Param('id') id: string) {
        return this.usersService.remove(parseInt(id))
    }

    @Patch('/:id')
    updateUser(@Param('id') id: string, @Body() body: UpdateUserDTO) {
        return this.usersService.update(parseInt(id), body)
    }
}
