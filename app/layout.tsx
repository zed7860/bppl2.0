import './globals.css';
export const metadata={
 title:'Bhoruka Park | Building Tomorrow, Responsibly.',
 description:'Sustainable, intelligent and architecturally significant commercial spaces in Bengaluru.',
 icons:{icon:'/main-logo-transparent.png',shortcut:'/main-logo-transparent.png',apple:'/main-logo-transparent.png'}
};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
