import { Request, Response } from 'express';
import { UserDatabase } from '../data/UserDatabase';
import { HashManager } from '../services/HashManager';
import transporter from '../services/mailTransporter';

const sendTemporaryPassByEmail = async(
    req: Request,
    res: Response
):Promise<void> => {
    let errorCode: number = 400;

    try {
        const email = req.body.email;
        console.log(email);
        if(!email){
            errorCode = 422;
            throw new Error("'email' field is empty! Please, check input´s value");
        };

        const isUserExist = await UserDatabase.getUserByEmail(email);

        if(!isUserExist){
            errorCode = 422;
            throw new Error("There is no user registred with the email entered! Please, check 'email' field");
        };

        const temporaryPassword: string = (Date.now() + Math.random()).toString();
        const hashTemporaryPassword = await HashManager.generateHash(temporaryPassword);

        await UserDatabase.changeUserPassword(hashTemporaryPassword, isUserExist.getId());

        const info = await transporter.sendMail({
            from: `<${process.env.NODEMAILER_USER}>`,
            to: email,
            subject: `Senha temporária de acesso - Cookenu`,
            html: `
                <h2>Prezado(a) ${isUserExist.getName()}</h2>
                <p>Uma senha temporária de acesso ao site Cookenu foi gerada!</p>
                <p>nova senha:${temporaryPassword}</p>
                
                <div>Cookenu - Serviços Ltda.<div>
            `,
            text: `Prexado(a) ${isUserExist.getName()}, uma senha temporária de acesso ao
            site Cookenu foi gerada!
                Nova senha:${temporaryPassword}
                Assim que logar, altere sua senha.

                Cookenu - Serviços Ltda.
            `
        });

        res.status(200).send({ message: "New temporary password created and send to user email!"});
    } catch(error) {
        res.status(errorCode).send({ message: error.message? error.message : error.sqlMessage });
    };
};

export default sendTemporaryPassByEmail;