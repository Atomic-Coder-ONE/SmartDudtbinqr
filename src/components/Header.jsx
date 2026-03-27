import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
    return (
        <header className="glass-panel" style={{ margin: '16px auto 0 auto', maxWidth: '600px', width: 'calc(100% - 32px)', borderRadius: '16px', padding: '16px 24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ borderRadius: '12px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px' }}>
                <Image src="/logo.jpg" alt="SwachhGrid Logo" width={40} height={40} style={{ objectFit: 'cover' }} />
            </div>
            <div>
                <Link href="/" style={{ textDecoration: 'none' }}>
                    <h1 className="font-bold text-xl" style={{ color: 'var(--text-primary)' }}>SwachhGrid</h1>
                </Link>
                <p className="text-sm text-dim" style={{ marginTop: '2px' }}>Eco-friendly Waste Management</p>
            </div>
        </header>
    );
}
