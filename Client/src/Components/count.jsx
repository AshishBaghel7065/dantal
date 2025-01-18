import React, { useState, useEffect } from 'react';

const CountUp = ({ target, duration = 2 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = target / (duration * 1000 / 16); // Increment per frame (~60fps)
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.ceil(start));
      }
    }, 20); // 16ms for ~60fps

    return () => clearInterval(timer); // Cleanup on component unmount
  }, [target, duration]);

  return <span className='target-no'>{count}</span>;
};

export default CountUp;
