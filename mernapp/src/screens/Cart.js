import React,{useState} from 'react'
import DeleteIcon from '@mui/icons-material/Delete';

import { useCart, useDispatchCart } from '../components/ContextReducer';
export default function Cart() {
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);

  let data = useCart();
  let dispatch = useDispatchCart();
  if (data.length === 0) {
    return (
      <div>
        <div className='m-5 w-100 text-center fs-3 text-light'>The Cart is Empty!</div>
      </div>
    )
  }
  const applyCoupon = () => {
    if (couponCode === "RANDOMCOUPON") {
      const couponDiscount = Math.floor(totalPrice * 0.2); // 20% discount
      setDiscount(couponDiscount);
    } else {
      setDiscount(0);
      alert("Invalid coupon code");
    }
  };
  // const handleRemove = (index)=>{
  //   console.log(index)
  //   dispatch({type:"REMOVE",index:index})
  // }

  const handleCheckOut = async () => {
    let userEmail = localStorage.getItem("userEmail");
    // console.log(data,localStorage.getItem("userEmail"),new Date())
    let response = await fetch("http://localhost:5000/api/orderData", {
      // credentials: 'include',
      // Origin:"http://localhost:3000/login",
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        order_data: data,
        email: userEmail,
        order_date: new Date().toDateString()
      })
    });
    console.log("Order RESPONSE:", response.status)
    if (response.status === 200) {
      dispatch({ type: "DROP" })
    }
  }

  let totalPrice = data.reduce((total, food) => total + food.price, 0);
  totalPrice -= discount;
  return (
    <div>

      {console.log(data)}
      <div className='container m-auto mt-5 table-responsive  table-responsive-sm table-responsive-md' >
        <table className='table table-hover '>
          <thead className=' text-success fs-4'>
            <tr>
              <th scope='col' >#</th>
              <th scope='col' >Name</th>
              <th scope='col' >Quantity</th>
              <th scope='col' >Option</th>
              <th scope='col' >Amount</th>
              <th scope='col' ></th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr>
                <th className="text-light" scope='row' >{index + 1}</th>
                <td className="text-light">{food.name}</td>
                <td className="text-light">{food.qty}</td>
                <td className="text-light">{food.size}</td>
                <td className="text-light">{food.price}</td>
                <td><button type="button" className="btn p-0"><DeleteIcon color="primary" onClick={() => { dispatch({ type: "REMOVE", index: index }) }} /></button> </td></tr>
            ))}
          </tbody>
        </table>
        <div>
          <label htmlFor="couponCode" className="form-label text-light">Coupon Code</label>
          <input
            type="text"
            className="form-control"
            id="couponCode"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
          />
        </div>
        <div>
          <button className="btn bg-primary text-light mt-3" onClick={applyCoupon}>
            Apply Coupon
          </button>
        </div>


        <div><h1 className='fs-2 text-light'>Total Price: {totalPrice}/-</h1></div>
        <div>
          <button className='btn bg-success mt-5 text-light' onClick={handleCheckOut} > Check Out </button>
        </div>
      </div>



    </div>
  )
}
