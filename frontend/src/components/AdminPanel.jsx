import React, { useState } from 'react'

function AdminPanel({ products, onSave, onDelete, onClose }) {

  let [productData, setProductData] = useState({
    productId: "",
    productName: "",
    productPrice: "",
    productCategory: "",
    productImage: ""
  })

  const saveData = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    let dataToSend = {
      ...productData,
      productId: productData.productId ? parseInt(productData.productId) : 0,
      productPrice: parseFloat(productData.productPrice)
    }
    onSave(dataToSend)
    setProductData({
      productId: "",
      productName: "",
      productPrice: "",
      productCategory: "",
      productImage: ""
    })
  }

  const editProduct = (product) => {
    setProductData({
      productId: product.productId,
      productName: product.productName,
      productPrice: product.productPrice,
      productCategory: product.productCategory,
      productImage: product.productImage
    })
  }

  return (
    <div className="admin-panel">

      <div className="admin-header">
        <h2>Admin Panel</h2>
        <button onClick={onClose}>✕ Close</button>
      </div>

      {/* ── Add / Update Form ── */}
      <form onSubmit={handleSubmit}>
        <input type="text" name="productId" placeholder="Product Id (for update)"
          value={productData.productId} onChange={saveData} /><br /><br />
        <input type="text" name="productName" placeholder="Product Name"
          value={productData.productName} onChange={saveData} /><br /><br />
        <input type="text" name="productPrice" placeholder="Product Price"
          value={productData.productPrice} onChange={saveData} /><br /><br />
        <input type="text" name="productCategory" placeholder="Category"
          value={productData.productCategory} onChange={saveData} /><br /><br />
        <input type="text" name="productImage" placeholder="Image URL"
          value={productData.productImage} onChange={saveData} /><br /><br />
        <button type="submit">Add / Update</button>
      </form>

      <br />

      {/* ── Products List ── */}
      <table border={1} cellSpacing={0} cellPadding={5} width={600}>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <td>{product.productId}</td>
              <td>{product.productName}</td>
              <td>₹{product.productPrice}</td>
              <td>{product.productCategory}</td>
              <td>
                <button onClick={() => editProduct(product)}>Edit</button>
                &nbsp;
                <button onClick={() => onDelete(product.productId)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  )
}

export default AdminPanel