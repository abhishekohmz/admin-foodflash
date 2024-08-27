import React, { useState, useEffect } from 'react';
import './Orders.css';
import { serverUrl } from '../../Service/serverUrl';

function Orders() {
    const [usersData, setUsersData] = useState([]);
    const [category, setCategory] = useState([]);
    const [productMap, setProductMap] = useState(new Map());

    const fetchData = async () => {
        try {
            const response = await fetch(`${serverUrl}/users/orders`, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            setUsersData(data.reverse());
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const fetchCategory = async () => {
        try {
            const response = await fetch(`${serverUrl}/allcategory`);
            const data = await response.json();
            setCategory(data);

            const tempProductMap = new Map();
            data.forEach(cat => {
                cat.category_items.forEach(item => {
                    tempProductMap.set(item.id, {
                        product_name: item.product_name,
                        image: item.image
                    });
                });
            });
            setProductMap(tempProductMap);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    useEffect(() => {
        fetchData();
        fetchCategory();
    }, []);
    console.log(usersData);
    

    return (
        <div className='orders'>
            <h1>User Orders</h1>
            {usersData.length === 0 ? (
                <p>No users data found</p>
            ) : (
                <div className="orders-grid">
                    <div className="grid-header">
                        <div>User</div>
                        <div>Address</div>
                        <div>Product</div>
                        <div>Total Amount</div>
                        <div>Payment Method</div>
                    </div>

                    {usersData.map((user, userIndex) => (
                        <React.Fragment key={userIndex}>
                            {user.orders.map((order, orderIndex) => (
                                <React.Fragment key={orderIndex}>
                                    <div className="grid-item">
                                        <p>{`${user.user.first_name} ${user.user.last_name}`}</p>
                                        <p>{user.user.email}</p>
                                        <p>{user.user.mobile}</p>
                                    </div>
                                    <div className="grid-item">
                                        <p>{user.user.address}</p>
                                        <p>{user.user.telephone}</p>
                                        <p>{new Date(order.date).toLocaleDateString()}</p>
                                    </div>
                                    <div className="grid-item">
                                        
                                            {order.order_items.map((item, itemIndex) => {
                                                const product = productMap.get(item.product);
                                                return (
                                                    <div className='product' key={itemIndex}>
                                                        
                                                        {product ? (
                                                            <div className='product_image_name'>
                                                                <img 
                                                                    src={`${serverUrl}/images/${product.image}`} 
                                                                    alt={product.product_name} 
                                                                    className="product-image" 
                                                                />
                                                               <h5>{product.product_name}</h5>
                                                            </div>
                                                        ) : (
                                                            <></>
                                                        )}
                                                        <p>Quantity: {item.quantity}</p>
                                                        
                                                    </div>
                                                );
                                            })}
                                       
                                    </div>
                                    <div className="grid-item">
                                        <h5>₹{order.total_amount}</h5>
                                    </div>
                                    <div className="grid-item">
                                        <h5>{order.payment_method}</h5>
                                    </div>
                                </React.Fragment>
                            ))}
                        </React.Fragment>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Orders;
