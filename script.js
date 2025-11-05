const productNameInput = document.getElementById('product-name');
const productPriceInput = document.getElementById('product-price');
const addProductButton = document.getElementById('add-product');
const cart = document.getElementById('cart');
const totalPriceSpan = document.getElementById('total-price');

let totalPrice = 0;

//  Update total price
function updateTotalPrice() {
  let total = 0;
  const items = cart.querySelectorAll('li');
  items.forEach(item => {
    const price = parseFloat(item.dataset.price);
    const quantity = parseInt(item.querySelector('.quantity').value);
    total += price * quantity;
  });
  totalPrice = total;
  totalPriceSpan.textContent = total.toFixed(2);
}

//  Remove item
function removeItem(event) {
  const item = event.target.closest('li');
  item.remove();
  updateTotalPrice();
}

//  Update quantity manually
function updateItem(event) {
  const item = event.target.closest('li');
  const quantityInput = item.querySelector('.quantity');
  const quantity = parseInt(quantityInput.value);
  if (quantity < 1 || isNaN(quantity)) {
    alert("Please enter a valid quantity.");
    quantityInput.value = 1;
  }
  updateTotalPrice();
}

//  Add product to cart
addProductButton.addEventListener('click', () => {
  const name = productNameInput.value.trim();
  const price = parseFloat(productPriceInput.value);

  if (!name || isNaN(price) || price <= 0) {
    alert("Please enter a valid product name and price.");
    return;
  }

  const li = document.createElement('li');
  li.className = 'cart-item';
  li.dataset.price = price;

  li.innerHTML = `
    <span>${name} - $${price.toFixed(2)}</span>
    Qty: <input type="number" class="quantity" value="1" min="1" />
    <button class="update-btn">Update</button>
    <button class="remove-btn">Remove</button>
  `;

  cart.appendChild(li);
  updateTotalPrice();

  productNameInput.value = '';
  productPriceInput.value = '';
});

//  Event delegation
cart.addEventListener('click', (e) => {
  if (e.target.classList.contains('remove-btn')) {
    removeItem(e);
  }
  if (e.target.classList.contains('update-btn')) {
    updateItem(e);
  }
});
