import '../index.css';
import Header from '../components/Header';

export const metadata = {
    title: 'Smart Dustbin QR',
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
            </body>
        </html>
    );
}
