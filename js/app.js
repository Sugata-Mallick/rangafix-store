const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.image;
    const { rate, count } = product.rating;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div style="background-color:cadetblue; margin:20px ;" class="single-product">
      <div >
    <img class="product-image" src=${image}></img>
      </div>
      <h3>${product.title}</h3>
      <p>Category: ${product.category}</p>

      <h3>Total rating:${count}</h3>
      <p>Average rating:${rate}</p>
        
      <h2>Price: $ ${product.price}</h2>
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-success">add to cart</button>
      
      
      <button id="details-btn" class="btn btn-danger" >Details</button></div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};
// const showDetails = (price, rating) => {
//   console.log(price, rating);
//   document.getElementById("modal-body").innerHTML = `
//   <div class="p-3">
//   <p>Rating:${Array.from(Array(parseInt(rating)).keys()).map(
//     (r) => '<i class="bi bi-star-fill text-warning"></i>'
//   )}</p>
//   <h2>price: $ ${price}</h2>
//   </div>
// `;
// };
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
  updateTotal();
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseInt(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  console.log(total, typeof total);
  document.getElementById(id).innerText = total.toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = Math.round(value);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  console.log(getInputValue("price"), getInputValue("delivery-charge"), getInputValue("total-tax"));
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") + getInputValue("total-tax");
  console.log(grandTotal);
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};
