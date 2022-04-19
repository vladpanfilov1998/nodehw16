import {NextFunction, Request, Response} from 'express';
import {UpdateResult} from 'typeorm';
import {UploadedFile} from 'express-fileupload';

import {ActionTokenEnum, constants, EmailActionEnum} from '../constants';
import {IUser} from '../entity';
import {IRequestExtended, ITokenData} from '../interfaces';
import {actionTokenRepository, tokenRepository, userRepository} from '../repositories';
import {
    authService, emailService, s3Service, tokenService, userService,
} from '../services';

class AuthController {
    public async registration(req: Request, res: Response, next: NextFunction): Promise<Response<ITokenData | Error> | undefined> {
        try {
            const avatar = req.files?.avatar as UploadedFile;

            const createdUser = await userService.createUser(req.body);

            await emailService.sendMail(req.body.email, EmailActionEnum.WELCOME, {userName: req.body.firstName});

            if (avatar) {
                const uploadedFile = await s3Service.uploadFile(avatar, 'user', createdUser.id);

                await userRepository.updateUser(createdUser.id, {avatar: uploadedFile.Location});
            }

            const tokenData = await authService.getTokenData(createdUser);

            return res.status(201)
                .json(tokenData);
        } catch (e: any) {
            next(e);
        }
    }

    public async logout(req: IRequestExtended, res: Response, next: NextFunction): Promise<Response<string | Error> | undefined> {
        try {
            const {id} = req.user as IUser;

            await tokenService.deleteUserTokenPair(id);

            return res.sendStatus(204);
        } catch (e: any) {
            next(e);
        }
    }

    public async login(req: IRequestExtended, res: Response, next: NextFunction): Promise<Response<Response | Error> | undefined> {
        try {
            const {
                id,
                email,
                password: hashPassword,
            } = req.user as IUser;
            const {password} = req.body;

            await userService.compareUserPasswords(password, hashPassword);

            const {
                refreshToken,
                accessToken,
            } = tokenService.generateTokenPair({
                userId: id,
                userEmail: email,
            });

            await tokenRepository.createToken({
                refreshToken,
                accessToken,
                userId: id,
            });

            return res.status(200)
                .json({
                    refreshToken,
                    accessToken,
                    user: req.user,
                });
        } catch (e: any) {
            next(e);
        }
    }

    public async refresh(req: IRequestExtended, res: Response, next: NextFunction): Promise<Response | undefined | Error> {
        try {
            const {
                id,
                email,
            } = req.user as IUser;

            await tokenService.deleteUserTokenPair(id);

            const {
                refreshToken,
                accessToken,
            } = tokenService.generateTokenPair({
                userId: id,
                userEmail: email,
            });

            await tokenRepository.createToken({
                refreshToken,
                accessToken,
                userId: id,
            });

            return res.status(200).json({
                refreshToken,
                accessToken,
                user: req.user,
            });
        } catch (e: any) {
            next(e);
        }
    }

    public async sendForgotPassword(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const {id, email, firstName} = req.user as IUser;

            const actionToken = tokenService.generateActionToken({
                userId: id,
                userEmail: email,
            });

            await actionTokenRepository.createToken({actionToken, userId: id, type: ActionTokenEnum.FORGOT_PASSWORD});

            await emailService.sendMail(
                email,
                EmailActionEnum.CHANGE_PASSWORD,
                {userName: firstName, frontendUrl: `${constants.FRONT_END_URL}?token=${actionToken}`},
            );

            return res.status(204);
        } catch (e: any) {
            next(e);
        }
    }

    public async updatePassword(req: IRequestExtended, res: Response, next: NextFunction):
        Promise<Response<UpdateResult | Error> | undefined> {
        try {
            const {
                password,
            } = req.body;
            const {id} = req.user as IUser;
            const updatedUser = await userService.updateUser(id, password);
            return res.status(201).json(updatedUser);
        } catch (e: any) {
            next(e);
        }
    }
}

export const authController = new AuthController();