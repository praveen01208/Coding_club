import React, { useState, useEffect } from 'react';
import API from '../utils/api';

const STEPS = ['group', 'confirm', 'otp', 'success'];

export default function StudentDashboard({ user, onLogout }) {
  const [step, setStep] = useState('group');
  const [sessionActive, setSessionActive] = useState(null);
  const [otp, setOtp] = useState('');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [record, setRecord] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    checkSession();
    loadHistory();
  }, []);

  const checkSession = async () => {
    try {
      const { data } = await API.get('/sessions/active');
      setSessionActive(data.active ? data : null);
    } catch { setSessionActive(null); }
  };

  const loadHistory = async () => {
    try {
      const { data } = await API.get('/attendance/my-history');
      setHistory(data.records);
    } catch {}
  };

  const goStep = (s) => { setStep(s); setMsg(''); };

  const submitAttendance = async () => {
    if (!otp.trim()) { setMsg('Please enter the OTP.'); return; }
    setLoading(true); setMsg('');
    try {
      const { data } = await API.post('/attendance/mark', { otp: otp.trim() });
      setRecord(data.record);
      goStep('success');
      loadHistory();
    } catch (err) {
      setMsg(err.response?.data?.message || 'Failed to mark attendance.');
    } finally { setLoading(false); }
  };

  const stepIdx = STEPS.indexOf(step) + 1;

  return (
    <div className="wrap animate">
      {/* Header */}
      <div className="header">
        <div className="logo" style={{ fontFamily: 'var(--font-display)', fontSize: '2.4rem', fontWeight: 400 }}>Attendance</div>
        <div className="user-badge" onClick={onLogout}>
          <div className="avatar">{user.name[0]}</div>
          <span>{user.name}</span>
          <span style={{ fontSize: 10, opacity: 0.5 }}>logout</span>
        </div>
      </div>

      {/* Steps */}
      <div className="steps">
        {['Group', 'Confirm', 'OTP', 'Done'].map((lbl, i) => (
          <React.Fragment key={lbl}>
            <div className={`step ${stepIdx > i+1 ? 'done' : stepIdx === i+1 ? 'active' : ''}`}>
              <div className="step-num">{stepIdx > i+1 ? '✓' : i+1}</div>
              <div className="step-lbl">{lbl}</div>
            </div>
            {i < 3 && <div className="step-line" />}
          </React.Fragment>
        ))}
      </div>

      {/* STEP 1: Group */}
      {step === 'group' && (
        <div className="animate">
          <div className="card">
            <div className="card-title"><div className="dot" />Your group assignment</div>
            <div className="info-row">
              <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 4 }}>You are assigned to</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 400, color: 'var(--accent)' }}>Group {user.group}</div>
              <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 4 }}>You can only mark attendance for your group.</div>
            </div>
            {sessionActive
              ? <div className="msg msg-ok">✓ An active session is running. You can mark attendance.</div>
              : <div className="msg msg-info">No active session right now. Wait for admin to start a session.</div>
            }
            <div className="btn-row">
              <button className="btn btn-primary" onClick={() => goStep('confirm')} disabled={!sessionActive}>
                Continue → Confirm Identity
              </button>
              <button className="btn btn-ghost" onClick={checkSession}>Refresh</button>
            </div>
          </div>

          {history.length > 0 && (
            <div className="card">
              <div className="card-title"><div className="dot" />My attendance history</div>
              <div className="tbl-wrap">
                <table>
                  <thead><tr><th>Date</th><th>Time</th><th>Status</th></tr></thead>
                  <tbody>
                    {history.map((r, i) => (
                      <tr key={i}>
                        <td>{r.sessionDate}</td>
                        <td style={{ fontFamily: 'DM Mono', fontSize: 12 }}>{new Date(r.markedAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</td>
                        <td><span className="badge badge-present">Present</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* STEP 2: Confirm */}
      {step === 'confirm' && (
        <div className="animate">
          <div className="card">
            <div className="card-title"><div className="dot" />Confirm your identity</div>
            <div className="info-row">
              <div className="info-grid">
                <div><div className="info-label">Full name</div><div className="info-val">{user.name}</div></div>
                <div><div className="info-label">Group</div><div className="info-val" style={{ color: 'var(--accent)' }}>Group {user.group}</div></div>
                <div><div className="info-label">Username</div><div className="info-val">{user.username}</div></div>
                <div><div className="info-label">Role</div><div className="info-val">Student</div></div>
              </div>
            </div>
            <p style={{ fontSize: 13, color: 'var(--muted)', margin: '0.75rem 0 1rem' }}>
              Since you are logged in with your own account, your identity is already verified. You cannot mark attendance for anyone else.
            </p>
            <div className="btn-row">
              <button className="btn btn-primary" onClick={() => goStep('otp')}>Yes, this is me → Enter OTP</button>
              <button className="btn btn-ghost" onClick={() => goStep('group')}>← Back</button>
            </div>
          </div>
        </div>
      )}

      {/* STEP 3: OTP */}
      {step === 'otp' && (
        <div className="animate">
          <div className="card">
            <div className="card-title"><div className="dot" />Enter session OTP</div>
            <p style={{ fontSize: 13, color: 'var(--muted)', marginBottom: '1.25rem' }}>
              Enter the 6-digit OTP displayed by your admin on the projector or board. It expires in a few minutes.
            </p>
            <div className="field">
              <label>OTP Code</label>
              <input className="otp-input" type="text" maxLength={6} placeholder="——————" value={otp} onChange={e => setOtp(e.target.value.replace(/[^0-9]/g, ''))} onKeyDown={e => e.key === 'Enter' && submitAttendance()} />
            </div>
            {msg && <div className="msg msg-err">{msg}</div>}
            <div className="btn-row">
              <button className="btn btn-success" onClick={submitAttendance} disabled={loading}>
                {loading ? 'Marking...' : 'Mark Present ✓'}
              </button>
              <button className="btn btn-ghost" onClick={() => goStep('confirm')}>← Back</button>
            </div>
          </div>
        </div>
      )}

      {/* STEP 4: Success */}
      {step === 'success' && record && (
        <div className="animate">
          <div className="card" style={{ textAlign: 'center', padding: '3rem 2rem' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>✅</div>
            <div style={{ fontFamily: 'Syne', fontSize: '1.5rem', fontWeight: 800, marginBottom: 8, color: 'var(--accent2)' }}>Attendance Marked!</div>
            <div style={{ color: 'var(--muted)', fontSize: 14, marginBottom: '1.5rem' }}>Your presence has been recorded for today's session.</div>
            <div className="info-row" style={{ textAlign: 'left' }}>
              <div className="info-grid">
                <div><div className="info-label">Name</div><div className="info-val">{record.name}</div></div>
                <div><div className="info-label">Group</div><div className="info-val">Group {record.group}</div></div>
                <div><div className="info-label">Date</div><div className="info-val">{record.date}</div></div>
                <div><div className="info-label">Time</div><div className="info-val">{record.time}</div></div>
              </div>
            </div>
            <button className="btn btn-ghost" onClick={onLogout} style={{ marginTop: '1rem' }}>Sign out</button>
          </div>
        </div>
      )}
    </div>
  );
}
