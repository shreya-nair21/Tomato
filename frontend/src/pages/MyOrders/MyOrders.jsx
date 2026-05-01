import './MyOrders.css'
import React, { useContext, useState, useEffect } from 'react'
const MyOrders = () => {

  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);

  const fetchOrders = async () => {
    const response = await axios.post(url + "/api/order/userorders", {}, { headers: { token } })
    setData(response.data.data);

  }

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token])
  return (
    <div className='my-orders'>
      <h2>My Orders</h2>
      <div className="container">
        {data.map((order, index) => {
          return (
            <div key={index} className='my-orders-order'>
              <img src={assets} alt="" />
              <p>{order.items.map((item, index) => {
                if (index === order.items.length - 1) {
                  return item.name + " x " + item.quantity
                }
              })}</p>
            </div>

          )


        })}
      </div>
    </div>
  )
}

export default MyOrders
