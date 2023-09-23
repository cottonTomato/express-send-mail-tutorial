import { RequestHandler } from 'express';
import mailSender from '../services/email';
import { SentMessageInfo } from 'nodemailer';
import { BadRequest } from '../errors';
import { StatusCodes } from 'http-status-codes';

type SendMailRequest = { receivers: Array<string> };
type SendMailResponse = { sentStatus: Array<SentMessageInfo> };
type SendMailHandler = RequestHandler<
    object,
    SendMailResponse,
    SendMailRequest
>;

const sendEmail: SendMailHandler = async function (req, res) {
    const receiversList = req.body.receivers;
    if (!receiversList || receiversList.length == 0) {
        throw new BadRequest('Provide a Receiver');
    }

    let sentStatus: Array<SentMessageInfo> = [];

    for (const receiver of receiversList) {
        sentStatus.push(mailSender(receiver));
    }

    sentStatus = await Promise.all(sentStatus);

    res.status(StatusCodes.OK).json({ sentStatus });
};

export { sendEmail };
