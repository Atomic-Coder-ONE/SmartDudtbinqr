import { useSearchParams, useNavigate } from 'react-router-dom';
import { AlertCircle, Trash, QrCode } from 'lucide-react';

export default function Home() {
    const [searchParams] = useSearchParams();
    const binId = searchParams.get('bin_id') || 'BIN-DEFAULT';
    const navigate = useNavigate();

    return (
        <div className="flex flex-col gap-6 w-full">
            <div className="text-center mt-4 animate-slide-up" style={{ animationDelay: '0.1s' }}>
                <div className="flex justify-center mb-4">
                    <div className="glass-panel" style={{ padding: '20px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }}>
                        <QrCode size={48} className="text-accent" />
                    </div>
                </div>
                <h2 className="text-2xl font-bold mb-2">Connected to <span className="text-accent">{binId}</span></h2>
                <p className="text-dim">What would you like to report for this smart dustbin?</p>
            </div>

            <div className="flex flex-col gap-4 mt-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                {/* Fill Report Option */}
                <button
                    onClick={() => navigate(`/report-fill?bin_id=${binId}`)}
                    className="glass-panel flex items-start p-6 gap-4 hover-scale"
                    style={{ cursor: 'pointer', textAlign: 'left', border: '1px solid var(--accent-primary)', background: 'rgba(16, 185, 129, 0.05)', transition: 'transform 0.2s ease, box-shadow 0.2s ease' }}
                >
                    <div style={{ background: 'rgba(16, 185, 129, 0.2)', padding: '12px', borderRadius: '12px', flexShrink: 0 }}>
                        <Trash size={28} className="text-accent" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold" style={{ color: 'white' }}>Dustbin is Full</h3>
                        <p className="text-sm text-dim mt-2" style={{ lineHeight: '1.5' }}>Tap here if the bin has reached its maximum capacity. We will dispatch a collection vehicle.</p>
                    </div>
                </button>

                {/* Issue Report Option */}
                <button
                    onClick={() => navigate(`/report-issue?bin_id=${binId}`)}
                    className="glass-panel flex items-start p-6 gap-4 hover-scale"
                    style={{ cursor: 'pointer', textAlign: 'left', transition: 'transform 0.2s ease, box-shadow 0.2s ease' }}
                >
                    <div style={{ background: 'rgba(239, 68, 68, 0.1)', padding: '12px', borderRadius: '12px', flexShrink: 0 }}>
                        <AlertCircle size={28} style={{ color: 'var(--danger)' }} />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold" style={{ color: 'white' }}>Report an Issue</h3>
                        <p className="text-sm text-dim mt-2" style={{ lineHeight: '1.5' }}>Tap here to report damage, bad odor, broken sensors, or other operational issues.</p>
                    </div>
                </button>
            </div>
        </div>
    );
}
