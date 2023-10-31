
let cartItems = [];

// Function to update the quantity of items in the cart
function updateCartItemQuantity(title, newQuantity) {
  const cartItem = cartItems.find((item) => item.title === title);
  if (cartItem) {
    cartItem.quantity = newQuantity;
    renderCart();
  }
}

// Function to render cart items
function renderCart() {
  const cartContainer = document.getElementById('cart');
  // Clear the previous cart items
  cartContainer.innerHTML = '';

  cartItems.forEach((item) => {
    const cartCard = document.createElement('div');
    cartCard.classList.add('card', 'cart-card');

    const title = document.createElement('h1');
    title.classList.add('card-title');
    title.textContent = item.title;
    cartCard.appendChild(title);

    const imageWrapper = document.createElement('div');
    imageWrapper.classList.add('image-wrapper');
    const image = document.createElement('img');
    image.src = item.image;
    image.alt = item.title;
    image.classList.add('card-image');
    imageWrapper.appendChild(image);
    cartCard.appendChild(imageWrapper);

    const description = document.createElement('p');
    description.textContent = item.description;
    cartCard.appendChild(description);

    const category = document.createElement('p');
    category.classList.add('category');
    category.textContent = item.category;
    cartCard.appendChild(category);

    const rate = document.createElement('p');
    rate.textContent = `Rate: ${item.rate}`;
    cartCard.appendChild(rate);

    const count = document.createElement('p');
    count.textContent = `Count: ${item.count}`;
    cartCard.appendChild(count);

    const price = document.createElement('p');
    price.textContent = `Price: $${item.price}`;
    cartCard.appendChild(price);

    const quantityWrapper = document.createElement('div');
    quantityWrapper.classList.add('card-quantity');
    const decreaseButton = document.createElement('button');
    decreaseButton.classList.add('decrease-btn');
    decreaseButton.textContent = '-';
    decreaseButton.addEventListener('click', () => decreaseQuantity(item.title));
    quantityWrapper.appendChild(decreaseButton);
    const quantity = document.createElement('span');
    quantity.classList.add('quantity');
    quantity.textContent = item.quantity;
    quantityWrapper.appendChild(quantity);
    const increaseButton = document.createElement('button');
    increaseButton.classList.add('increase-btn');
    increaseButton.textContent = '+';
    increaseButton.addEventListener('click', () => increaseQuantity(item.title));
    quantityWrapper.appendChild(increaseButton);
    cartCard.appendChild(quantityWrapper);


    cartContainer.appendChild(cartCard);
  });

  updateCartItemsCount();
}

// Function to update the cart items count
function updateCartItemsCount() {
  const cartCount = document.getElementById('cart-count');
  const totalItems = cartItems.reduce((count, item) => count + item.quantity, 0);
  cartCount.textContent = totalItems;
}

// Function to increase quantity of cart item
function increaseQuantity(title) {
  const cartItem = cartItems.find((item) => item.title === title);
  if (cartItem) {
    cartItem.quantity++;
    renderCart();
  }
}

// Function to decrease quantity of cart item
function decreaseQuantity(title) {
  const cartItem = cartItems.find((item) => item.title === title);
  if (cartItem && cartItem.quantity > 0) {
    cartItem.quantity--;
    renderCart();
  }
}

// Event listener for DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  
  // Fetch product data and populate cartItems array
  fetch('https://fakestoreapi.com/products')
    .then((response) => response.json())
    .then((productData) => {
      cartItems = productData.map((product) => ({
        title: product.title,
        price: product.price,
        quantity: 0,
        image: product.image,
        description: product.description,
        category: product.category,
        rate: product.rating.rate,
        count: product.rating.count
      }));

      renderCart(); // Render the initial cart items
    })
    .catch((err) => {
      console.log(err);
    });
});

// Event listener for click on "decrease" button
document.addEventListener('click', (event) => {
  if (event.target.classList.contains('decrease-btn')) {
    const title = event.target.dataset.title;
    decreaseQuantity(title);
  }
});

// Event listener for click on "increase" button
document.addEventListener('click', (event) => {
  if (event.target.classList.contains('increase-btn')) {
    const title = event.target.dataset.title;
    increaseQuantity(title);
  }
});
