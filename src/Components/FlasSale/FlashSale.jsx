import React, { useEffect, useState } from 'react'
import './FlashSale.css'
import { serverUrl } from '../../Service/serverUrl'


function FlashSale() {

  const [flashsale, setFlashsale] = useState([])
  const [error, setError] = useState(null);


  const fetchFlashsale = async () => {
    try {
      const response = await fetch(`${serverUrl}/getflashsale`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'aplication/json'
        }
      })

      const data = await response.json()

      if (response.ok) {
        setFlashsale(data.flashsale)
      } else {
        setError(data.message || 'Failed to fetch daily deals');
      }
    } catch (err) {
      setError('Error fetching daily deals');
    }
  }

  useEffect(() => {
    fetchFlashsale()
  }, [])

  const handleRemove = async (id) => {
    try {
      const response = await fetch(`${serverUrl}/remove-flashsale`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id })
      });

      const result = await response.json();

      if (response.ok) {
        alert(result.message);
        fetchFlashsale()
      } else {
        alert(result.message || 'Failed to remove flash sale');
      }
    } catch (error) {
      console.error('Error removing flash sale:', error);
      alert('Failed to remove flash sale. Please try again.');
    }
  };


  return (
    <>
      <h1 className='flashsale-h1'>Flash Sale</h1>
      <div className="flashsale">
        <div className="flashsale-data">
          {flashsale.length > 0 ? (
            flashsale.map((item, i) => (

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
            <p>No Flash Sale available</p>
          )}
        </div>
      </div>
    </>
  )
}

export default FlashSale