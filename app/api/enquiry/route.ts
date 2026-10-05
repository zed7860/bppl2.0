import {NextResponse} from 'next/server';
import {field,validEmail,sendSubmission} from '@/lib/mail';
export const runtime='nodejs';
export async function POST(req:Request){
 let data;
 try{if(Number(req.headers.get('content-length'))>16000)return NextResponse.json({error:'Submission too large'},{status:413});const body=await req.json();data={name:field(body.name,150),email:field(body.email,254),phone:field(body.phone,50),interest:field(body.interest||'',150),message:field(body.message||'',5000)};if(!data.name||!data.phone||!validEmail(data.email))throw new Error('Required fields');}catch{return NextResponse.json({error:'Please provide a name, valid email and phone number.'},{status:400});}
 try{await sendSubmission('enquiry',data.email,Object.entries(data).map(([key,value])=>`${key}: ${value}`).join('\n\n'));return NextResponse.json({ok:true});}catch{console.error('Enquiry email delivery failed');return NextResponse.json({error:'Email delivery is unavailable. Please try again later or contact us directly.'},{status:503});}
}
