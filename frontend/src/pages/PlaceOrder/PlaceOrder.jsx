import React, { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const PlaceOrder = () => {

  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);
  const navigate = useNavigate();

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  })

  // Update state when user types
  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }))
  }

  // Handle form submission and Razorpay popout
  const placeOrder = async (event) => {
    event.preventDefault();

    let orderItems = [];
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = { ...item };
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    })

    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2, // adding delivery fee
    }

    try {
      // 1. Call our backend to create a Razorpay Order
      let response = await axios.post(url + "/api/order/place", orderData, { headers: { token } });

      if (response.data.success) {
        // 2. We successfully got the Razorpay Order ID!
        const { order } = response.data;

        // 3. Setup Razorpay configuration options
        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Frontend Public Key
          amount: order.amount,
          currency: order.currency,
          name: "Food Del Services",
          description: "Food Delivery Payment",
          order_id: order.id,
          handler: async function (response) {
            // 4. Razorpay sends success signature back to us, so we verify it!
            try {
              const verifyResponse = await axios.post(url + "/api/order/verify", {
                orderId: order.receipt, // We used our mongo order ID as the receipt!
                success: "true",
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature
              }, { headers: { token } });

              if (verifyResponse.data.success) {
                navigate("/myorders");
              } else {
                alert("Payment Verification Failed");
                navigate("/");
              }
            } catch (error) {
              console.log(error);
              alert("Error verifying payment");
            }
          },
          prefill: {
            name: data.firstName + " " + data.lastName,
            email: data.email,
            contact: data.phone
          },
          theme: {
            color: "#ff4c24"
          }
        };

        // 5. Open the Razorpay Popup
        const rzp = new window.Razorpay(options);
        rzp.on('payment.failed', function (response) {
          alert(response.error.description);
        });
        rzp.open();

      } else {
        alert("Error creating order on backend");
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  }


  useEffect(() => {
    if (!token) {
      navigate('/cart')
    }
    else if (getTotalCartAmount() === 0) {
      navigate('/cart')

    }
  }, [token])

  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input required name="firstName" onChange={onChangeHandler} value={data.firstName} type="text" placeholder="First Name" />
          <input required name="lastName" onChange={onChangeHandler} value={data.lastName} type="text" placeholder="Last Name" />
        </div>

        <input required name="email" onChange={onChangeHandler} value={data.email} type="email" placeholder='Email address' />
        <input required name="street" onChange={onChangeHandler} value={data.street} type="text" placeholder='Street' />

        <div className="multi-fields">
          <input required name="city" onChange={onChangeHandler} value={data.city} type="text" placeholder="City" />
          <input required name="state" onChange={onChangeHandler} value={data.state} type="text" placeholder="State" />
        </div>

        <div className="multi-fields">
          <input required name="zipcode" onChange={onChangeHandler} value={data.zipcode} type="text" placeholder="Zipcode" />
          <input required name="country" onChange={onChangeHandler} value={data.country} type="text" placeholder="Country" />
        </div>
        <input required name="phone" onChange={onChangeHandler} value={data.phone} type="text" placeholder='phone' />
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
            </div>
          </div>
          <button type='submit'>PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder