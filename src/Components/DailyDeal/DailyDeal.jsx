import React from 'react'
import { useState } from 'react'
import { serverUrl } from '../../Service/serverUrl'
import { useEffect } from 'react'
import './DailyDeal.css'


function DailyDeal() {

  const [dailydeals, setDailydeals] = useState([])
  const [error, setError] = useState(null);

  const fetchDailyDeals = async () => {
    try {
      const response = await fetch(`${serverUrl}/daily-deals`);
      const data = await response.json();

      if (response.ok) {
        setDailydeals(data.dailyDeals || []); // Ensure it's an array
      } else {
        setError(data.message || 'Failed to fetch daily deals');
      }
    } catch (err) {
      setError('Error fetching daily deals');
    }
  };
  console.log(dailydeals);

  useEffect(() => {
    fetchDailyDeals()
  }, [])

  const handleRemove = async (id) => {
    try {
      const response = await fetch(`${serverUrl}/remove-dailydeal`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id })
      });

      const result = await response.json();

      if (response.ok) {
        alert(result.message);
        fetchDailyDeals()
      } else {
        alert(result.message || 'Failed to remove daily deal');
      }
    } catch (error) {
      console.error('Error removing daily deal:', error);
      alert('Failed to remove daily deal. Please try again.');
    }
  };


  return (
    <>
      <div className="dailydeal">
      <h1 className='dailydeal-h1'>Daily Deals</h1>

        <div className="dailydeal-data">
          {dailydeals.length > 0 ? (
            dailydeals.map((item, i) => (

              <div key={i} className='admin-card'>
                <img className='admincard-image' src={`${serverUrl}/images/` + item.image} fluid alt='...' />
                <div className='card-body'>
                  <h5>{item.product_name}</h5>
                  <div className='admin-btn'>
                    <button onClick={() => handleRemove(item.id)}>Remove Product</button>
                  </div>
                </div>
              </div>

            ))
          ) : (
            <p>No daily deals available</p>
          )}
        </div>
      </div>
    </>
  )
}

export default DailyDeal