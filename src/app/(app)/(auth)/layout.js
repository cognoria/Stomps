import { Inter } from "next/font/google";
import MainNav from "../../../components/navigation/mainNav";
import { redirect } from "next/navigation";
import { headers } from 'next/headers';

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({ children }) {
    const { INSTALLATION_KEY, PURCHASE_EMAIL, ADMIN_APP_CODE } = process.env;
    const adminAppUrl = process.env.NODE_ENV === 'production' ? 'https://app.stomps.io' : 'http://localhost:3000';

    // Get the instance URL from headers
    const header = headers();
    const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
    const instanceUrl = `${protocol}://${header.get('host')}`;

    if (!instanceUrl.includes('localhost') &&
        ADMIN_APP_CODE !== 'stomps_admin_access_demo' &&
        instanceUrl !== adminAppUrl) {
        if (!INSTALLATION_KEY || !PURCHASE_EMAIL) {
            redirect('/licence-invalid');
        }

        const res = await fetch(`https://api.stomps.io/${INSTALLATION_KEY}/validate/${PURCHASE_EMAIL}?website=${instanceUrl}`);

        if (!res.ok) {
            redirect('/licence-invalid');
        }
        const data = await res.json();
        console.log(data);
        if (!data.valid) {
            redirect('/licence-invalid');
        }
    }

    return (
        <div>
            <div className={inter.className}>
                <MainNav />
                {children}
            </div>
        </div>
    );
}
