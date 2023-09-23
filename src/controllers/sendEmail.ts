import { RequestHandler } from 'express';
import { SentMessageInfo } from 'nodemailer';
import mailSender from '../services/email';
import arrayToCSV from '../services/arrayToCSV';
import { BadRequest } from '../errors';
import { StatusCodes } from 'http-status-codes';

type SendMailRequest = { receivers: Array<string> };
type SendMailResponse = { sentStatus: SentMessageInfo };
type SendMailHandler = RequestHandler<
    object,
    SendMailResponse,
    SendMailRequest
>;

const sendEmail: SendMailHandler = async function (req, res) {
    const receiversList = arrayToCSV(req.body.receivers);
    if (!receiversList || receiversList.length == 0) {
        throw new BadRequest('Provide a Receiver');
    }

    const sentStatus = await mailSender(receiversList);

    res.status(StatusCodes.OK).json({ sentStatus });
};

export { sendEmail };
