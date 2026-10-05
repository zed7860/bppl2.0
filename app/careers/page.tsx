'use client';
import {useState} from 'react';
import {Header,Footer,PageHero,Enquiry,PopupEnquiry,MotionEffects} from '@/components/Site';
import {ArrowRight} from 'lucide-react';

const roles=['Project / Construction Management','Facility Management','Leasing & Business Development','Finance & Accounts','HR & Administration','IT / Digital','Other / General Application'];

export default function Page(){
 const [status,setStatus]=useState('');
 const [busy,setBusy]=useState(false);
 async function submit(e:React.FormEvent<HTMLFormElement>){
  e.preventDefault();
  if(busy)return;
  const form=e.currentTarget;
  const fd=new FormData(form);
  const resume=fd.get('resume');
  if(resume instanceof File&&resume.size>5*1024*1024){setStatus('Please attach a résumé smaller than 5 MB.');return}
  setBusy(true);setStatus('Submitting…');
  try{const r=await fetch('/api/careers',{method:'POST',body:fd});const result=await r.json();setStatus(r.ok?'Your application and résumé have been emailed to our team.':result.error||'Unable to submit. Please try again.');if(r.ok)form.reset()}
  catch{setStatus('Unable to connect. Please try again or email info@bhorukapark.com.')}
  finally{setBusy(false)}
 }
 return <>
  <Header/>
  <main>
   <PageHero eyebrow="CAREERS" title="Build a meaningful career with us." text="Join an environment that values talent, innovation, responsibility and purpose." image="/images/building-2/collaboration-lounge.jpg"/>
   <section className="section">
    <div className="careerWrap careerApplyOnly">
     <div className="careerIntro"><span className="kicker">WORK WITH US</span><h2>Find where you can make an impact.</h2><p className="lead">Whether you are starting out or bring years of experience, we welcome applications from people who want to build purposeful, high-performing workplaces.</p><p>Select the department that best matches your experience and share your résumé with our team.</p></div>
     <form className="careerForm" onSubmit={submit}>
      <h2 className="full">Apply now</h2>
      <input name="name" required placeholder="Full name *"/>
      <input name="phone" required placeholder="Mobile number *"/>
      <input name="email" required type="email" placeholder="Email address *"/>
      <input name="location" placeholder="Current location"/>
      <select name="role" required defaultValue=""><option value="" disabled>Role / department *</option>{roles.map(role=><option key={role}>{role}</option>)}</select>
      <input name="experience" required placeholder="Total experience (years) *"/>
      <input name="currentCompany" placeholder="Current company"/>
      <input name="noticePeriod" placeholder="Notice period"/>
      <input name="linkedin" placeholder="LinkedIn URL"/>
      <input name="portfolio" placeholder="Portfolio / website"/>
      <input className="full" name="skills" required placeholder="Key skills *"/>
      <textarea name="message" placeholder="Tell us briefly about yourself and the opportunity you are seeking"/>
      <label className="full">Résumé / CV (PDF, DOC, DOCX — max 5 MB)<br/><input name="resume" required type="file" accept=".pdf,.doc,.docx"/></label>
      <button className="primary" disabled={busy}>Submit application <ArrowRight size={17}/></button>
      <small className="full" role="status" aria-live="polite">{status}</small>
     </form>
    </div>
   </section>
   <Enquiry/>
  </main>
  <Footer/><PopupEnquiry/><MotionEffects/>
 </>
}
