import express, {NextFunction, Request, Response} from 'express';
import {check, validationResult} from 'express-validator';
//import {RequestValidationError} from '../errors/request-validation-error';
//import {DatabaseConnectionError} from '../errors/database-connection-error';

const router = express();

router.post(
    '/api/users/signup',
    [
        check('email')
            .isEmail()
            .withMessage('Email must be valid'),
        check('password')
            .trim()
            .isLength({min: 4, max: 20})
            .withMessage('Password must be between 4 and 20 characters')
    ],
    async (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);

        try {
            if (!errors.isEmpty()) {
                throw new Error('invalid email or password');

                //throw new RequestValidationError(errors.array());
            } else {
                console.log('Creating a user...');
                throw new Error('Error connecting to database');
                res.send({});
            }
            //throw new DatabaseConnectionError();

        } catch (err) {
            next(err)
        }


    }
);

export {router as signupRouter};
