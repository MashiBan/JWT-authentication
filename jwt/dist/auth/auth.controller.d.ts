import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { Tokens } from './types';
export declare class AuthController {
    private authservice;
    constructor(authservice: AuthService);
    signupLocal(dto: AuthDto): Promise<Tokens>;
    signinLocal(dto: AuthDto): Promise<Tokens>;
    logout(userId: number): Promise<void>;
    refresh(userId: number, refreshToken: string): Promise<Tokens>;
}
