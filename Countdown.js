import React, { useState, useEffect } from 'react';

function Countdown({ launchDate }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [isLaunched, setIsLaunched] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const distance = new Date(launchDate).getTime() - now;

      if (distance < 0) {
        setIsLaunched(true);
        return null;
      }

      return {
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      };
    };

    // Initial calculation
    const time = calculateTimeLeft();
    if (time) setTimeLeft(time);

    // Update every second
    const timer = setInterval(() => {
      const time = calculateTimeLeft();
      if (time) {
        setTimeLeft(time);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [launchDate]);

  const formatNumber = (num) => String(num).padStart(2, '0');

  if (isLaunched) {
    return (
      <div className="launch-section">
        <div className="launch-message">
          <h2 className="launched-text">We're Live! 🎉</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="launch-section">
      <div className="launch-badge">
        <span className="badge-text">Launching Soon</span>
      </div>
      <div className="countdown">
        {[
          { label: 'Days', value: timeLeft.days },
          { label: 'Hours', value: timeLeft.hours },
          { label: 'Minutes', value: timeLeft.minutes },
          { label: 'Seconds', value: timeLeft.seconds }
        ].map((item, index) => (
          <React.Fragment key={item.label}>
            <div className="countdown-item">
              <span className="countdown-number">
                {formatNumber(item.value)}
              </span>
              <span className="countdown-label">{item.label}</span>
            </div>
            {index < 3 && <div className="countdown-separator">:</div>}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default Countdown;