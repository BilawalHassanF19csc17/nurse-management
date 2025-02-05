import nodemailer from 'nodemailer';
import { addTimers, expiredTimers } from '../../../lib/timers';

const sendNotification = async (bed, room, timestamp)=>{
    const emails = ['Iconnect1412@gmail.com','maryamashfaq986@gmail.com','']
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'medisyncalerthub@gmail.com',
            pass: 'tawt ifec atpf ezzp'
        }
    });

    //emails.join(',')
    const mailOptions = {
        from: 'medisyncalerthub@gmail.com',
        to: emails,
        subject: `Patient alert: Bed ${bed}, Room ${room}`,
        html: `<h3>Unattended Alarm</h3><p>Dear Head of Nurse,</p>
        <p>For your kind information there was an unattended Alarm from <b>bed no.${bed}</b> from <b>room no.${room}</b> at <b>${timestamp}</b>. kindly look into this issue.</p>
        <p>Thank you</p>`
    }

    try {
        await transporter.sendMail(mailOptions);
        console.log('notification sent');
    } catch (error) {
        console.error('Error sending email:', error);
    }
}

export default async function handler(req,res){
    if(req.method === 'POST'){
        const {bed, room, timestamp} = req.body;

        const id = `${bed}-${room}`;

        const key ={
            id: id,
            bed: bed,
            room: room,
            timestamp: timestamp,
            timeoutID:setTimeout(async() => {
                await sendNotification(bed, room, timestamp);
                expiredTimers(id); 
             }, 2*60*1000) 
        }
        
        addTimers(key);

        res.status(200).json({message: `Alarm for ${bed} and ${room} at ${timestamp}` });
    }
}