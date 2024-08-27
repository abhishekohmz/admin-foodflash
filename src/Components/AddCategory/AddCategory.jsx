import React, { useEffect, useState } from 'react'
import './AddCategory.css'
import { Link } from 'react-router-dom';
import { serverUrl } from '../../Service/serverUrl';



function AddCategory() {



    const [allCategory, setAllCategory] = useState([])

    const fetchData = async () => {
        await fetch(`${serverUrl}/allcategory`)
            .then((resp) => resp.json())
            .then((data) => { setAllCategory(data) })
    }

    useEffect(() => {
        fetchData()
    }, [])

    const handleRemove = async (id) => {
        await fetch(`${serverUrl}/removecategory`, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: id })
        })
        await fetchData()
    }


    return (
        <>
            <div className="categories-data">
                <div className='admin-list-data'>
                    {allCategory.map((item, i) => {
                        return <div key={i} className='admin-card'>
                            <img
                                className='admincard-image'
                                src={`${serverUrl}/images/${item.category_image}`}
                                fluid
                                alt='...'
                            />
                            <div className='card-body'>
                                <h5>{item.category_title}</h5>
                                <div className='admin-btn'>
                                    <Link to={`/categorydisplay/${item.id}`} style={{ textDecoration: "none" }}>
                                        <button className='add-btn'>Add Products</button>
                                    </Link>
                                    <button className='remove-btn' onClick={() => handleRemove(item.id)}>Remove category</button>
                                </div>
                            </div>
                        </div>
                    })}
                </div>
            </div>
        </>
    )
}

export default AddCategory