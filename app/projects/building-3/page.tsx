import Link from 'next/link';
import {Shell,PageHero} from '@/components/Site';

export default function Page(){return <Shell>
  <PageHero eyebrow="UPCOMING SOON" title="Building 3" text="The next chapter in the evolution of Bhoruka Tech Park." image="/images/building-2/green-podium.jpg"/>
  <section className="section upcomingProject">
    <div className="projectNav"><Link href="/projects/admin-building">Admin Building</Link><Link href="/projects/building-1">Building 1</Link><Link href="/projects/building-2">Building 2</Link><Link href="/projects/building-3">Building 3</Link></div>
    <div className="split"><div><span className="kicker">COMING SOON</span><h2>A new workplace destination is taking shape.</h2></div><div><p className="lead">Building 3 is an upcoming addition to Bhoruka Tech Park. Planning and project information will be shared here as it becomes available.</p><p>The visual shown is representative campus imagery from the Bhoruka Tech Park presentation.</p><Link className="primary" href="/#enquire">Register your interest</Link></div></div>
  </section>
</Shell>}
