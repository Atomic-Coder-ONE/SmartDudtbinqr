import { Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <header className="glass-panel" style={{ margin: '16px auto 0 auto', maxWidth: '600px', width: 'calc(100% - 32px)', borderRadius: '16px', padding: '16px 24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ background: 'var(--accent-primary)', padding: '8px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Trash2 size={24} color="white" />
            </div>
            <div>
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <h1 className="font-bold text-xl" style={{ color: 'white' }}>SmartBin Hub</h1>
                </Link>
                <p className="text-sm text-dim" style={{ marginTop: '2px' }}>Eco-friendly Waste Management</p>
            </div>
        </header>
    );
}
