import {NextFunction, Response} from 'express';
import {UploadedFile} from 'express-fileupload';

import {IRequestExtended} from '../interfaces';
import {constants, fileType} from '../constants';
import {ErrorHandler} from '../error';

class FileMiddleware {
    async checkUserAvatar(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            if (!req.files?.avatar) {
                next();
                return;
            }

            const {name, size, mimetype} = req.files?.avatar as UploadedFile;

            if (size > constants.PHOTO_MAX_SIZE) {
                next(new ErrorHandler(`File ${name} is too big`));
                return;
            }

            if (!fileType.IMAGES.includes(mimetype)) {
                next(new ErrorHandler(`File ${name} Unsupported Media Type`, 415));
                return;
            }

            next();
        } catch (e: any) {
            next(e);
        }
    }
}

export const fileMiddleware = new FileMiddleware();