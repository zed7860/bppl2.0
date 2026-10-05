import nodemailer from 'nodemailer';
export function field(value: unknown, max = 2000): string { if(typeof value !== 'string' || value.length > max) throw new Error('Invalid field'); return value.trim(); }
export function validEmail(value: string) { return value.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value); }
export async function sendSubmission(kind: 'enquiry' | 'careers', replyTo: string, text: string, attachments: {filename: string; content: Buffer}[] = []) {
 const {SMTP_HOST,SMTP_USER,SMTP_PASSWORD,SMTP_FROM,MAIL_TO,ENQUIRY_TO,CAREERS_TO}=process.env;
 const to=(kind==='careers'?CAREERS_TO:ENQUIRY_TO)||MAIL_TO;
 if(!SMTP_HOST||!SMTP_USER||!SMTP_PASSWORD||!to) throw new Error('SMTP configuration missing');
 const port=Number(process.env.SMTP_PORT||465);
 const transport=nodemailer.createTransport({host:SMTP_HOST,port,secure:port===465,requireTLS:port!==465,auth:{user:SMTP_USER,pass:SMTP_PASSWORD},connectionTimeout:15000,greetingTimeout:15000,socketTimeout:30000});
 try {const result=await transport.sendMail({from:SMTP_FROM||SMTP_USER,to,replyTo,subject:kind==='careers'?'Bhoruka Park — Career application':'Bhoruka Park — Website enquiry',text,attachments,disableFileAccess:true,disableUrlAccess:true});if(!result.accepted.length||result.rejected.length)throw new Error('Email not accepted');}finally{transport.close();}
}
