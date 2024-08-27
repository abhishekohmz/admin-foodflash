import React, { useEffect, useState } from 'react'
import icon from '../../assets/upload.png'
import './Sidebar.css'
import { serverUrl } from '../../Service/serverUrl'
import { Link } from 'react-router-dom'


function Sidebar() {

    const [image, setImage] = useState(false)
    const [productdetails, setProductDetails] = useState({
        category_title: "",
        category_name: "",
        category_image: ""
    })

    const changehandler = (e) => {
        setProductDetails({
            ...productdetails, [e.target.name]: e.target.value
        })
    }

    const imageHandler = (e) => {
        setImage(e.target.files[0])
    }

    const Add_Category = async () => {
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
        }).then((resp) => resp.json()).then((data) => { responseData = data })

        if (responseData.success) {
            product.category_image = responseData.image_url
            console.log(product);
            await fetch(`${serverUrl}/category`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(product)
            })
                .then((resp) => resp.json())
                .then((data) => {
                    if (data.success) {
                        data.success ? alert('Category added succesfully') : alert('failed')
                    }
                })


        }


    }
    return (
        <div>

            <div className='sidebar'>
                <div className='addcategory'>
                    <div className="addcategory-itemfield">
                        <label htmlFor="category_name">category :</label>
                        <input value={productdetails.category_name} onChange={changehandler} type="text" id='category_name' placeholder='eg:fish/mutton/chicken/fruits/veg...' name='category_name' />
                    </div>

                    <div className="addcategory-itemfield">
                        <label htmlFor="category_title">enter category title :</label>
                        <input value={productdetails.category_title} id='category_title' onChange={changehandler} type="text" placeholder='type category title' name='category_title' />
                    </div>

                    <div className="addcategory-itemfield">
                        <label htmlFor="file-input">
                            <img src={image ? URL.createObjectURL(image) : icon} alt="" />
                        </label>
                        <input name='category_image' type="file" onChange={imageHandler} id='file-input' hidden />
                    </div>

                    <button onClick={() => { Add_Category() }}>create category</button>

                </div>

                <div className="buttons">
                    <div className="dailydeal-box">
                        <Link to={'/dailydeal'} style={{ textDecoration: 'none' }}>
                            <button>
                                Daily Deals
                            </button>
                        </Link>
                    </div>
                    <div className="flashsale-box">
                        <Link to={'/flashsale'} style={{ textDecoration: 'none' }}>
                            <button>
                                Flash Sale
                            </button>
                        </Link>
                    </div>


                    <div className="orders-box">
                        <Link to={'/orders'} style={{ textDecoration: 'none' }}>
                            <button>
                                Orders
                            </button>
                        </Link>
                    </div>
                </div>
            </div>



        </div>
    )
}

export default Sidebar