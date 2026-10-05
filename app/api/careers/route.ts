import {NextResponse} from 'next/server';
import {field,validEmail,sendSubmission} from '@/lib/mail';
export const runtime='nodejs';
export async function POST(req:Request){
 let data:Record<string,string>,resume:File;
 try{if(Number(req.headers.get('content-length'))>6*1024*1024)return NextResponse.json({error:'Application too large'},{status:413});const fd=await req.formData();data=Object.fromEntries(['name','email','phone','location','role','experience','currentCompany','noticePeriod','linkedin','portfolio','skills','message'].map(key=>[key,field(fd.get(key)||'',key==='message'?5000:1000)]));const file=fd.get('resume');if(!(file instanceof File)||!file.size||file.size>5*1024*1024||!/\.(pdf|doc|docx)$/i.test(file.name))throw new Error('Invalid resume');resume=file;if(!data.name||!validEmail(data.email)||!data.phone||!data.role||!data.experience||!data.skills)throw new Error('Required fields');}catch{return NextResponse.json({error:'Complete the required fields and attach a PDF, DOC or DOCX résumé up to 5 MB.'},{status:400});}
 try{await sendSubmission('careers',data.email,Object.entries(data).map(([key,value])=>`${key}: ${value}`).join('\n\n'),[{filename:resume.name.replace(/[^a-zA-Z0-9._-]/g,'_'),content:Buffer.from(await resume.arrayBuffer())}]);return NextResponse.json({ok:true});}catch{console.error('Career email delivery failed');return NextResponse.json({error:'Email delivery is unavailable. Please try again later or contact us directly.'},{status:503});}
}
