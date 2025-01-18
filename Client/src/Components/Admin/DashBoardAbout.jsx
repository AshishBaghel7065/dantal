import React, { useState } from 'react'

import { useNavigate } from 'react-router-dom';
function DashBoardAbout() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();


  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);


  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "20%" }}>
        <div className="spinner-border" role="status" />
        <p>Loading Dashboard...</p>
      </div>
    );
  }
  return (
    <div>
      jhkjl;
    
    </div>
  )
}

export default DashBoardAbout