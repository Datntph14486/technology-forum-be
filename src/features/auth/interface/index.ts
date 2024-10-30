import { TOKEN_TYPE } from 'src/common/constants';
import { AuthSignInDto } from '../dto/signin.dto';
import { SignupDTO } from '../dto/signup.dto';
import { TAuth, TTokens } from '../type';
import { ForgotPasswordDto } from '../dto/forgot-password.dto';
import { ResetPasswordDto } from '../dto/reset-password.dto';

export interface IAuthService {
    signup(dto: SignupDTO): Promise<TAuth>;

    signIn(dto: AuthSignInDto): Promise<TAuth>;

    updateRefreshTokenHash(userId: number, refreshToken: string): Promise<void>;

    refreshTokens(userId: number, refreshToken: string): Promise<TAuth>;

    generateTokens(userId: number, email: string): Promise<TTokens>;

    logout(userId: number): Promise<void>;

    verifyToken(accessToken: string, tokenType: TOKEN_TYPE): Promise<any>;

    forgotPassword(dto: ForgotPasswordDto): Promise<boolean>;

    resetPassword(dto: ResetPasswordDto): Promise<boolean>;

    getRoleByUserId(userId: number): Promise<string>;
}
