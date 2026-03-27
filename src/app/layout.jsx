import '../index.css';
import Header from '../components/Header';
import AdminPanel from '../components/AdminPanel';

export const metadata = {
    title: 'SwachhGrid',
    description: 'Manage smart dustbins efficiently',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <Header />
                <main className="container animate-slide-up">
                    {children}
                </main>
                <AdminPanel />
            </body>
        </html>
    );
}
