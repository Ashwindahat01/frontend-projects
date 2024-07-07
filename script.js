// Function to show a specific section
function showSection(sectionId) {
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');

    // Fetch and display data based on the section
    switch (sectionId) {
        case 'home':
            displayProducts();   
            break;
        case 'profile':
            displayUserInfo();
            break;
        case 'cart':
            displayCart();
            break;
        default:
            break;
    }
}

// Function to display products
function displayProducts() {
    fetch('http://localhost:3000/api/products')
        .then(response => response.json())
        .then(data => {
            const productList = document.querySelector('.product-list');
            productList.innerHTML = '';
            data.forEach(product => {
                const productItem = document.createElement('div');
                productItem.className = 'product-item';
                productItem.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <div class="product-info">
                        <h3>${product.name}</h3>
                        <p>Price: ${product.price}</p>
                        <button class="add-to-cart" onclick="addToCart(${product.id})">Add to Cart</button>
                    </div>
                `;
                productList.appendChild(productItem);
            });
        });
}

// Function to display user info
function displayUserInfo() {
    fetch('http://localhost:3000/api/user')
        .then(response => response.json())
        .then(data => {
            const userInfo = document.querySelector('.user-info');
            userInfo.innerHTML = `
                <img src="${data.profilePicture}" alt="Profile Picture">
                <p>Username: ${data.username}</p>
                <p>Email: ${data.email}</p>
            `;
        });
}

// Function to display cart items
function displayCart() {
    fetch('http://localhost:3000/api/cart')
        .then(response => response.json())
        .then(data => {
            const cartItems = document.querySelector('.cart-items');
            cartItems.innerHTML = '';
            data.forEach(item => {
                const cartItem = document.createElement('div');
                cartItem.className = 'cart-item';
                cartItem.innerHTML = `
                    <img src="${item.image}" alt="${item.name}">
                    <div class="cart-info">
                        <h3>${item.name}</h3>
                        <p>Price: ${item.price}</p>
                        <button class="remove-from-cart" onclick="removeFromCart(${item.id})">Remove</button>
                    </div>
                `;
                cartItems.appendChild(cartItem);
            });
        });
}

// Function to add product to cart
function addToCart(productId) {
    fetch(`http://localhost:3000/api/cart`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ productId })
    })
    .then(response => response.json())
    .then(data => {
        alert('Product added to cart');
    });
}

// Function to remove product from cart
function removeFromCart(productId) {
    fetch(`http://localhost:3000/api/cart/${productId}`, {
        method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => {
        alert('Product removed from cart');
        displayCart();
    });
}

// Event listeners for form submissions
document.getElementById('signupForm').addEventListener('submit', function(e) {
    e.preventDefault();
    // Perform signup operation
});

document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    // Perform login operation
});
