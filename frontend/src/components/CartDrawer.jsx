import React from 'react'

function CartDrawer({ cart, open, onClose, onRemove, onIncreaseQty, onDecreaseQty, onPlaceOrder }) {

  let cartTotal = cart.reduce((sum, i) => sum + Number(i.productPrice) * i.qty, 0)

  if (!open) return null

  return (
    <div className="cart-overlay">
      <div className="cart-drawer">

        <div className="cart-header">
          <h2>Your Cart</h2>
          <button onClick={onClose}>✕ Close</button>
        </div>

        {cart.length === 0 ? (
          <p className="empty-cart">Your cart is empty</p>
        ) : (
          <>
            <table border={1} cellSpacing={0} cellPadding={5} width="100%">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Qty</th>
                  <th>Subtotal</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item, index) => (
                  <tr key={index}>
                    <td>{item.productName}</td>
                    <td>₹{item.productPrice}</td>
                    <td>
                      <button onClick={() => onDecreaseQty(item.productId)}>-</button>
                      &nbsp;{item.qty}&nbsp;
                      <button onClick={() => onIncreaseQty(item.productId)}>+</button>
                    </td>
                    <td>₹{item.productPrice * item.qty}</td>
                    <td>
                      <button onClick={() => onRemove(item.productId)}>Remove</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <br />
            <p className="cart-total">Total: ₹{cartTotal}</p>
            <br />
            <button className="place-order-btn" onClick={onPlaceOrder}>
              Place Order
            </button>
          </>
        )}

      </div>
    </div>
  )
}

export default CartDrawer