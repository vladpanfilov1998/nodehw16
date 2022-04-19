import {IUser} from '../entity';
import {ITokenData} from '../interfaces';
import {tokenService} from './token.service';

class AuthService {
    public async getTokenData(userData: IUser): Promise<ITokenData> {
        const {id, email} = userData;
        const {refreshToken, accessToken} = await tokenService.generateTokenPair({userId: id, userEmail: email});
        await tokenService.saveToken(id, refreshToken, accessToken);

        return {
            accessToken,
            refreshToken,
            userId: id,
            userEmail: email,
        };
    }
}

export const authService = new AuthService();