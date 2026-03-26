import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { AlertCircle, ArrowLeft, CheckCircle2 } from 'lucide-react';

export default function ReportIssue() {
    const [searchParams] = useSearchParams();
    const binId = searchParams.get('bin_id') || 'BIN-DEFAULT';
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const [issueType, setIssueType] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!issueType) return alert('Please select an issue type.');

        setIsSubmitting(true);
        fetch('http://localhost:5001/api/reports/issue', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                bin_id: binId,
                issue_type: issueType,
                description: description
            })
        })
            .then(res => {
                if (!res.ok) throw new Error('Failed to submit');
                return res.json();
            })
            .then(() => {
                setIsSubmitting(false);
                setIsSuccess(true);
            })
            .catch(err => {
                console.error('Error submitting report:', err);
                setIsSubmitting(false);
                alert('Failed to submit report. Please try again or check if the server is running.');
            });
    };

    if (isSuccess) {
        return (
            <div className="flex flex-col items-center justify-center gap-6 mt-8 animate-slide-up text-center w-full">
                <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '24px', borderRadius: '50%' }}>
                    <CheckCircle2 size={64} className="text-accent" />
                </div>
                <h2 className="text-3xl font-bold">Issue Reported!</h2>
                <p className="text-dim text-lg">Thank you for reporting the issue with <strong>{binId}</strong>. Our maintenance team has been notified.</p>
                <button className="btn btn-secondary mt-6" onClick={() => navigate('/')}>Return Home</button>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6 w-full animate-slide-up">
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-dim mt-2 transition-all hover-scale"
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
            >
                <ArrowLeft size={20} /> <span className="font-medium">Back</span>
            </button>

            <div className="glass-panel p-6 mt-2">
                <div className="flex items-center gap-4 mb-6">
                    <div style={{ background: 'rgba(239, 68, 68, 0.1)', padding: '12px', borderRadius: '12px' }}>
                        <AlertCircle size={28} style={{ color: 'var(--danger)' }} />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold">Report an Issue</h2>
                        <p className="text-sm text-dim">Target: {binId}</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                        <label className="font-medium">Issue Type *</label>
                        <select
                            className="input-field"
                            value={issueType}
                            onChange={(e) => setIssueType(e.target.value)}
                            required
                            style={{ display: 'block' }}
                        >
                            <option value="" disabled>Select issue type...</option>
                            <option value="damage">Physical Damage to Bin</option>
                            <option value="odor">Severe Bad Odor</option>
                            <option value="spill">Waste Spilled Around Bin</option>
                            <option value="sensor">Sensor/IoT Module Broken</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="font-medium">Additional Details (Optional)</label>
                        <textarea
                            className="input-field"
                            placeholder="Describe the issue in more detail..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary w-full p-6 text-lg mt-2"
                        disabled={isSubmitting}
                        style={{ padding: '16px' }}
                    >
                        {isSubmitting ? 'Submitting...' : 'Submit Report'}
                    </button>
                </form>
            </div>
        </div>
    );
}
