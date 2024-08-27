import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import './CategoryDisplay.css'


import adddimage_icon from '../../assets/upload.png'
import { serverUrl } from '../../Service/serverUrl';
import arrow from '../../assets/arrow.png'



function CategoryDisplay() {

  const { productId } = useParams()
  const [image, setImage] = useState(false)
  const [showProduct, setShowProduct] = useState([])

  const [productdetails, setProductDetails] = useState({
    product_category_title: "",
    product_name: "",
    offer_price: "",
    old_price: "",
    pack_gram: "",
    description: "",
    image: "",
    sub_products: [
      {
        sub_name: "",
        sub_image: "",
        sub_price: "",
        sub_weight: ""
      }
    ]
  })



  const imageHandler = (e) => {
    setImage(e.target.files[0])
  }

  const changehandler = (e) => {
    const { name, value } = e.target;
    setProductDetails({
      ...productdetails,
      [name]: name === 'offer_price' || name === 'old_price' ? parseFloat(value) : value
    });
  };


  const addProduct = async () => {
    console.log(productdetails);
    let responseData;
    let product = productdetails

    let formData = new FormData()
    formData.append('product', image)

    await fetch(`${serverUrl}/upload`, {
      method: 'POST',
      headers: {
        Accept: 'application/json'
      },
      body: formData
    })
      .then((resp) => resp.json())
      .then((data) => { responseData = data })

    if (responseData.success) {
      product.image = responseData.image_url
      console.log(product);

      await fetch(`${serverUrl}/category/${productId}/product`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
      })
        .then(response => response.json())
        .then(data => {

          if (data.success) {
            alert('Product added successfully');

            // Reset form fields
            setProductDetails({
              product_category_title: "",
              product_name: "",
              offer_price: "",
              old_price: "",
              pack_gram: "",
              description: "",
              image: "",
              sub_products: [{
                sub_name: "",
                sub_image: "",
                sub_price: "",
                sub_weight: ""
              }]
            });
            setImage(null); // Reset file input
          } else {
            alert('Failed to add product');
          }
          console.log('Success:', data);
        })
        .catch(error => {
          console.error('Error:', error);
        });

    }
  }
  const fetchData = async () => {
    try {
      const response = await fetch(`${serverUrl}/category/${productId}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setShowProduct(data);
      console.log(showProduct);
    } catch (error) {
      console.error('Error fetching data:', error);
    }

  };

  const removeProduct = async (id) => {
    try {
      const response = await fetch(`${serverUrl}/removeproduct`, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ productId: id })
      });

      const result = await response.json();

      if (response.ok) {
        alert(result.message);
        await fetchData();
      } else {
        alert(result.error);
      }
    } catch (error) {
      console.error('Error removing product:', error);
      alert('Failed to remove product. Please try again.');
    }
  };



  const addToDailyDeal = async (product) => {
    try {
      const response = await fetch(`${serverUrl}/add-to-daily-deal`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ product })
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
      } else {
        alert(data.message || 'Failed to add product to Daily Deal');
      }
    } catch (error) {
      console.error('Error adding to Daily Deal:', error);
      alert('An error occurred while adding to Daily Deal.');
    }
  };

  const addtoFlashsale = async (product) => {
    try {
      const response = await fetch(`${serverUrl}/flash-sale`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ product })
      })

      const data = await response.json()

      if (response.ok) {
        alert(data.message)
      } else {
        alert(data.message || 'Failed to add product to Flash Sale');
      }
    }
    catch (error) {
      console.error('Error adding to Flash sale:', error);
      alert('An error occurred while adding to flash sale.');
    }
  }







  useEffect(() => {
    fetchData()
    console.log('Product ID:', productId)
  }, [productId])
  return (

    <>
      <div className='categories'>
        <Link to={'/'} > <img src={arrow} alt="" />Back to home</Link>


        <div className="row">

          <div className="product-data">


            <div className="product-name-title">
              <div className="categorydisplay-itemfield">
                <label>Product category title</label>
                <input value={productdetails.product_category_title} onChange={changehandler} type="text" placeholder='enter product category title' name='product_category_title' />
              </div>

              <div className="categorydisplay-itemfield">
                <label>Product Name</label>
                <input value={productdetails.product_name} onChange={changehandler} type="text" placeholder='enter product name' name='product_name' />
              </div>
            </div>

            <div className="product-data2">


              <div className='product-img-price' >

                <div className="product-img">
                  <div className="categorydisplay-itemfield">
                    <label className='img-label' htmlFor="file-input">
                      <img src={image ? URL.createObjectURL(image) : adddimage_icon} alt="" />
                    </label>
                    <input onChange={imageHandler} type="file" hidden name='image' id='file-input' />
                  </div>
                </div>
                <div className="product-price-pack">
                  <div className="categorydisplay-itemfield">
                    <label>Old Price :</label>
                    <input value={productdetails.old_price} onChange={changehandler} type="text" placeholder='enter old price' name='old_price' />
                  </div>

                  <div className="categorydisplay-itemfield">
                    <label>Offer Price :</label>
                    <input value={productdetails.offer_price} onChange={changehandler} type="text" placeholder='enter offer price' name='offer_price' />
                  </div>

                  <div className="categorydisplay-itemfield">
                    <label>No.of Pack/Grams :</label>
                    <input value={productdetails.pack_gram} onChange={changehandler} type="text" placeholder='eg: 1(pack)/500(g)' name='pack_gram' />
                  </div>
                </div>
              </div>

              <div className="product-description">
                <div className="categorydisplay-itemfield">
                  <label>Add description</label>
                  <textarea value={productdetails.description} onChange={changehandler} name="description" placeholder='add description' id=""></textarea>
                </div>
              </div>
            </div>

            <div className='product-btn'>
              <button onClick={() => addProduct()}>Add Product</button>
            </div>

          </div>



        </div>


      </div>

      <div className='show-products-data'>
        <h1>Product Details</h1>
        <div className="show-products">
          {showProduct.success ? (
            showProduct.products && showProduct.products.length > 0 ? (
              showProduct.products.map((product, index) => (
                <div key={index} className='admin-card'>
                  <img className='admincard-image' src={`${serverUrl}/images/` + product.image} fluid alt='...' />
                  <div>
                    <h5>{product.product_name}</h5>
                    <div className='prices'>
                      <p className='old_price'>₹{product.old_price}</p>
                      <p className='offer_price'>₹{product.offer_price}</p>
                    </div>
                    <div className='admincard-body'>
                      <button className='dailydeal-btn' onClick={() => addToDailyDeal(product)}>Add to Daily Deal</button>
                      <button className='flashsale-btn' onClick={() => { addtoFlashsale(product) }}>Add to Flashsale</button>
                      <button className='remove-btn' onClick={() => { removeProduct(product.id) }} >Remove Product</button>
                    </div>
                  </div>
                </div >
              ))
            ) : (
              <p>No products found</p>
            )
          ) : (
            <p>{showProduct.message}</p>
          )}

        </div>
      </div>


    </>
  )
}

export default CategoryDisplay