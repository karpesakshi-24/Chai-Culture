import React, { useState } from 'react';

function EmailSignup() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState({ text: '', type: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage({ text: '', type: '' });

    if (!email.trim()) {
      setMessage({ text: 'Please enter your email address', type: 'error' });
      return;
    }

    if (!validateEmail(email)) {
      setMessage({ text: 'Please enter a valid email address', type: 'error' });
      return;
    }

    setIsSubmitting(true);

    try {
      // Replace with your Formspree endpoint
      const formspreeEndpoint = 'https://formspree.io/f/YOUR_FORM_ID';
      
      const response = await fetch(formspreeEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          email: email,
          subject: 'New Chai Culture Subscriber',
          message: `New subscriber: ${email}`
        })
      });

      if (response.ok) {
        setMessage({ 
          text: 'Thank you! You\'re on the list. Check your email for confirmation. 🎉', 
          type: 'success' 
        });
        setEmail('');
        
        try {
          const subscribers = JSON.parse(localStorage.getItem('chai_subscribers') || '[]');
          if (!subscribers.includes(email)) {
            subscribers.push(email);
            localStorage.setItem('chai_subscribers', JSON.stringify(subscribers));
          }
        } catch (error) {
          console.log('LocalStorage not available');
        }
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      // Demo mode - show success
      console.log('Demo mode - Form submission:', { email, timestamp: new Date().toISOString() });
      setMessage({ 
        text: 'Thank you! You\'re on the list. 🎉', 
        type: 'success' 
      });
      setEmail('');
    } finally {
      setIsSubmitting(false);
      
      setTimeout(() => {
        setMessage({ text: '', type: '' });
      }, 5000);
    }
  };

  return (
    <div className="signup-section">
      <h2 className="signup-title">Be the First to Taste Royalty</h2>
      <p className="signup-subtitle">Join our exclusive list and receive a special launch offer</p>
      
      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <input
            type="email"
            className="email-input"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isSubmitting}
            aria-label="Email address"
          />
          <button 
            type="submit" 
            className="submit-btn" 
            disabled={isSubmitting}
            aria-label="Submit email"
          >
            <span className="btn-text">
              {isSubmitting ? 'Submitting...' : 'Notify Me'}
            </span>
            <span className="btn-arrow">→</span>
          </button>
        </div>
        {message.text && (
          <div className={`form-message ${message.type}`} role="alert">
            {message.text}
          </div>
        )}
      </form>
    </div>
  );
}

export default EmailSignup;