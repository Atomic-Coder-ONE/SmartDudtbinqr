"use client";

import { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Trash, CheckCircle2, ArrowLeft } from 'lucide-react';

function ReportFillContent() {
    const searchParams = useSearchParams();
    const binId = searchParams?.get?.('bin_id') || 'BIN-DEFAULT';
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const res = await fetch('/api/reports/fill', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ bin_id: binId })
            });
            if (!res.ok) throw new Error('Failed to submit');
            setIsSuccess(true);
        } catch (err) {
            console.error('Error submitting report:', err);
            alert('Failed to submit report. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="flex flex-col items-center justify-center gap-6 mt-8 animate-slide-up text-center w-full">
                <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '24px', borderRadius: '50%' }}>
                    <CheckCircle2 size={64} className="text-accent" />
                </div>
                <h2 className="text-3xl font-bold">Report Received!</h2>
                <p className="text-dim text-lg">Thank you for reporting that <strong>{binId}</strong> is full. A collection team will be dispatched shortly.</p>
                <button className="btn btn-secondary mt-6" onClick={() => router.push('/')}>Return Home</button>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6 w-full animate-slide-up">
            <button
                onClick={() => router.back()}
                className="flex items-center gap-2 text-dim mt-2 transition-all hover-scale"
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
            >
                <ArrowLeft size={20} /> <span className="font-medium">Back</span>
            </button>

            <div className="glass-panel p-6 mt-2">
                <div className="flex items-center gap-4 mb-6">
                    <div style={{ background: 'rgba(16, 185, 129, 0.2)', padding: '12px', borderRadius: '12px' }}>
                        <Trash size={28} className="text-accent" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold">Report Full Bin</h2>
                        <p className="text-sm text-dim">Target: {binId}</p>
                    </div>
                </div>

                <p className="text-dim mb-6" style={{ lineHeight: '1.6' }}>
                    You are about to report <strong>{binId}</strong> as full. This will alert the municipal collection team. No further details are required.
                </p>

                <button
                    className="btn btn-primary w-full p-6 text-lg"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    style={{ padding: '16px' }}
                >
                    {isSubmitting ? 'Submitting...' : 'Confirm Dustbin is Full'}
                </button>
            </div>
        </div>
    );
}

export default function ReportFill() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ReportFillContent />
        </Suspense>
    );
}

