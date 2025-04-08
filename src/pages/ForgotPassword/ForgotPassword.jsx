import React, { useState } from 'react';
import './ForgotPassword.css'; // Make sure this is named exactly as the CSS file
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebase';
import back_arrow_icon from '../../assets/back_arrow_icon.png';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isSending, setIsSending] = useState(false);

  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (!email.trim()) {
      setError('Please enter your email.');
      return;
    }

    setIsSending(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('✅ Password reset email sent. Check your inbox!');
    } catch (err) {
      setError(`❌ ${err.message}`);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="forgot-password-container">
      <img
        src={back_arrow_icon}
        alt="Back"
        className="back-arrow"
        onClick={() => navigate('/login')}
      />

      <div className="forgot-box">
        <h2>Reset Your Password</h2>

        <form onSubmit={handleResetPassword}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isSending}
          />

          <button type="submit" disabled={isSending}>
            {isSending ? 'Sending...' : 'Send Reset Email'}
          </button>
        </form>

        {message && <p className="reset-message success">{message}</p>}
        {error && <p className="reset-message error">{error}</p>}
      </div>
    </div>
  );
};

export default ForgotPassword;
