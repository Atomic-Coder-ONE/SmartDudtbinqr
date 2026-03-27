"use client";

import React, { useState, useEffect } from 'react';
import { ShieldAlert, X, LogOut, AlertCircle, Trash2 } from 'lucide-react';

export default function AdminPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'Shaurya' && password === '12345') {
      setIsLoggedIn(true);
      fetchReports();
    } else {
      alert('Invalid credentials');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
    setReports([]);
  };

  const fetchReports = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/reports');
      const data = await res.json();
      if (data.reports) {
        setReports(data.reports);
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (isOpen && isLoggedIn) {
      fetchReports();
    }
  }, [isOpen, isLoggedIn]);

  const fullReports = reports.filter(r => r.report_type === 'full');
  const issueReports = reports.filter(r => r.report_type !== 'full');

  return (
    <>
      <button 
        className="admin-float-btn"
        onClick={() => setIsOpen(true)}
        aria-label="Admin Login"
      >
        <ShieldAlert size={28} />
      </button>

      {isOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-content glass-panel animate-slide-up">
            <button className="admin-modal-close" onClick={() => setIsOpen(false)}>
              <X size={24} />
            </button>
            
            {!isLoggedIn ? (
              <div className="admin-login-container">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 justify-center text-accent">
                  <ShieldAlert /> Admin Access
                </h2>
                <form onSubmit={handleLogin} className="flex flex-col gap-4">
                  <div>
                    <input 
                      type="text" 
                      placeholder="Username" 
                      className="input-field"
                      value={username}
                      onChange={e => setUsername(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <input 
                      type="password" 
                      placeholder="Password" 
                      className="input-field"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary mt-2">
                    Login
                  </button>
                </form>
              </div>
            ) : (
              <div className="admin-dashboard-container">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold flex items-center gap-2 text-accent">
                    <ShieldAlert /> Dashboard
                  </h2>
                  <button onClick={handleLogout} className="btn btn-secondary p-2" title="Logout">
                    <LogOut size={20} />
                  </button>
                </div>

                <div className="dashboard-content">
                  {loading ? (
                    <div className="text-center text-dim p-6">Loading reports...</div>
                  ) : (
                    <div className="reports-sections">
                      <div className="reports-section mb-6">
                        <h3 className="text-xl font-medium mb-4 flex items-center gap-2 text-warning">
                          <Trash2 size={20} /> Full Bins ({fullReports.length})
                        </h3>
                        <div className="reports-list">
                          {fullReports.length === 0 ? (
                            <p className="text-dim">No reported full bins.</p>
                          ) : (
                            fullReports.map(r => (
                              <div key={r.id} className="report-card">
                                <div className="report-header">
                                  <span className="font-bold">Bin: {r.bin_id}</span>
                                  <span className="text-sm text-dim">{new Date(r.timestamp).toLocaleString()}</span>
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                      </div>

                      <div className="reports-section">
                        <h3 className="text-xl font-medium mb-4 flex items-center gap-2 text-danger">
                          <AlertCircle size={20} /> Issues ({issueReports.length})
                        </h3>
                        <div className="reports-list">
                          {issueReports.length === 0 ? (
                            <p className="text-dim">No reported issues.</p>
                          ) : (
                            issueReports.map(r => (
                              <div key={r.id} className="report-card">
                                <div className="report-header">
                                  <span className="font-bold">Bin: {r.bin_id}</span>
                                  <span className="text-sm text-dim">{new Date(r.timestamp).toLocaleString()}</span>
                                </div>
                                {r.issue_description && (
                                  <p className="report-desc mt-2 text-sm text-dim">{r.issue_description}</p>
                                )}
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
