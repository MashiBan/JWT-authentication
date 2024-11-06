import { Body, Controller, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { Tokens } from './types';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { GetCurrentUser, GetCurrentUserId } from 'src/common/decorators';

@Controller('auth')
export class AuthController {
    constructor(private authservice: AuthService){}

    @Post('local/signup')
    @HttpCode(HttpStatus.CREATED)
    //to map body to authDto
    signupLocal(@Body() dto: AuthDto):Promise<Tokens>{
        return this.authservice.signupLocal(dto);
    }

    @Post('local/signin')
    @HttpCode(HttpStatus.OK)
    signinLocal(@Body() dto: AuthDto): Promise<Tokens>{
        return this.authservice.signinLocal(dto);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('logout')
    @HttpCode(HttpStatus.OK)
    logout(@GetCurrentUserId() userId: number) {
      return this.authservice.logout(userId);
    }
  
    @UseGuards(AuthGuard('jwt-refresh'))
    @Post('refresh')
    @HttpCode(HttpStatus.OK)
    refresh(
      @GetCurrentUserId() userId: number,
      @GetCurrentUser('refreshToken') refreshToken: string,
    ) {
      return this.authservice.refreshTokens(userId, refreshToken);
}
}