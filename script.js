const slides = document.querySelectorAll('.slide');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
let currentSlide = 0;

// Product Catalog
const products = [
    { id: '1', name: 'Fresh Apple', price: 150, image: 'img/product/1.jpg', category: 'Fruit' },
    { id: '2', name: 'Organic Banana', price: 60, image: 'img/product/2.jpg', category: 'Fruit' },
    { id: '3', name: 'Fresh Orange', price: 100, image: 'img/product/3.jpg', category: 'Fruit' },
    { id: '4', name: 'Green Grapes', price: 120, image: 'img/product/4.jpg', category: 'Fruit' },
    { id: '5', name: 'Fresh Strawberry', price: 200, image: 'img/product/5.jpg', category: 'Fruit' },
    { id: '6', name: 'Organic Tomato', price: 40, image: 'img/product/6.jpg', category: 'Vegetable' },
    { id: '7', name: 'Fresh Broccoli', price: 80, image: 'img/product/7.jpg', category: 'Vegetable' },
    { id: '8', name: 'Organic Carrot', price: 50, image: 'img/product/8.jpg', category: 'Vegetable' }
];

function showSlide(index) {
    if (!slides.length) return;
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (i === index) {
            slide.classList.add('active');
        }
    });
}

function nextSlide() {
    if (!slides.length) return;
    currentSlide++;
    if (currentSlide >= slides.length) {
        currentSlide = 0;
    }
    showSlide(currentSlide);
}

function prevSlide() {
    if (!slides.length) return;
    currentSlide--;
    if (currentSlide < 0) {
        currentSlide = slides.length - 1;
    }
    showSlide(currentSlide);
}

if (nextBtn) nextBtn.addEventListener('click', nextSlide);
if (prevBtn) prevBtn.addEventListener('click', prevSlide);

// Auto slide
if (slides.length > 0) {
    setInterval(nextSlide, 5000);
}

// Toast Notification
function showToast(message, type = 'success') {
    let toast = document.getElementById('toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast';
        toast.className = 'toast';
        document.body.appendChild(toast);
    }
    
    toast.textContent = message;
    toast.className = `toast show ${type}`;
    
    setTimeout(() => {
        toast.className = toast.className.replace('show', '');
    }, 3000);
}

// Cart Functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartCount() {
    const countElements = document.querySelectorAll('.cart-btn .count');
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    countElements.forEach(el => el.textContent = totalItems);
}

function addToCart(id, name, price, image, quantity = 1) {
    const existingItem = cart.find(item => item.id === id);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ id, name, price, image, quantity: quantity });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showToast(`${quantity} x ${name} added to cart!`);
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    renderCart();
}

function renderCart() {
    const cartContent = document.getElementById('cart-content');
    const cartTotal = document.getElementById('cart-total');
    
    if (!cartContent) return;

    if (cart.length === 0) {
        cartContent.innerHTML = '<p>Your cart is empty.</p>';
        cartTotal.innerHTML = '';
        return;
    }

    let html = `
        <table class="cart-table">
            <thead>
                <tr>
                    <th>Image</th>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
    `;

    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        html += `
            <tr>
                <td><img src="${item.image}" alt="${item.name}" class="cart-item-img"></td>
                <td>${item.name}</td>
                <td>₹${item.price}</td>
                <td>${item.quantity}</td>
                <td>₹${itemTotal}</td>
                <td><i class="fas fa-trash remove-btn" onclick="removeFromCart('${item.id}')"></i></td>
            </tr>
        `;
    });

    html += `</tbody></table>`;
    cartContent.innerHTML = html;
    cartTotal.innerHTML = `Total: ₹${total}`;
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    renderCart();

    // Add event listeners to "Add to Cart" buttons
    const addToCartBtns = document.querySelectorAll('.add-cart');
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const card = btn.closest('.product-card');
            const id = card.dataset.id;
            const name = card.dataset.name;
            const price = parseFloat(card.dataset.price);
            const image = card.querySelector('.product-img img').src;
            const qtyInput = card.querySelector('.qty-input');
            const quantity = qtyInput ? parseInt(qtyInput.value) : 1;
            
            addToCart(id, name, price, image, quantity);
        });
    });

    // Shop Filtering & Search
    const filterBtns = document.querySelectorAll('.filter-btn');
    const searchInput = document.getElementById('shop-search');
    const productCards = document.querySelectorAll('.product-card');

    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all
                filterBtns.forEach(b => b.classList.remove('active'));
                // Add active to clicked
                btn.classList.add('active');
                
                const filterValue = btn.getAttribute('data-filter');
                filterProducts(filterValue, searchInput ? searchInput.value : '');
            });
        });
    }

    if (searchInput) {
        searchInput.addEventListener('keyup', (e) => {
            const searchValue = e.target.value.toLowerCase();
            const activeFilter = document.querySelector('.filter-btn.active');
            const filterValue = activeFilter ? activeFilter.getAttribute('data-filter') : 'all';
            
            filterProducts(filterValue, searchValue);
        });
    }

    function filterProducts(category, searchText) {
        productCards.forEach(card => {
            const productCategory = card.getAttribute('data-category');
            const productName = card.getAttribute('data-name').toLowerCase();
            
            const matchesCategory = category === 'all' || productCategory === category;
            const matchesSearch = productName.includes(searchText.toLowerCase());
            
            if (matchesCategory && matchesSearch) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Checkout Logic
    renderCheckout();

    // Product Details Logic
    renderProductDetails();

    const placeOrderBtn = document.getElementById('place-order-btn');
    if (placeOrderBtn) {
        placeOrderBtn.addEventListener('click', () => {
            const form = document.getElementById('checkout-form');
            if (form.checkValidity()) {
                cart = [];
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCartCount();
                showToast('Order placed successfully!', 'success');
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 2000);
            } else {
                form.reportValidity();
                showToast('Please fill in all required fields.', 'error');
            }
        });
    }

    // Contact Form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showToast('Message sent successfully!', 'success');
            contactForm.reset();
        });
    }
});

function renderProductDetails() {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');
    
    if (!productId) return;

    const product = products.find(p => p.id === productId);
    
    if (product) {
        const pImage = document.getElementById('p-image');
        if (pImage) {
            pImage.src = product.image;
            document.getElementById('p-name').textContent = product.name;
            document.getElementById('p-price').textContent = `₹${product.price}.00`;
            document.getElementById('p-category').textContent = product.category;
            
            const addBtn = document.getElementById('p-add-btn');
            addBtn.addEventListener('click', () => {
                const qty = parseInt(document.getElementById('p-qty').value);
                addToCart(product.id, product.name, product.price, product.image, qty);
            });
        }
    }
}

function renderCheckout() {
    const checkoutItems = document.getElementById('checkout-items');
    const checkoutTotal = document.getElementById('checkout-total');
    
    if (!checkoutItems) return;

    if (cart.length === 0) {
        // If cart is empty, redirect to shop (optional, but good UX)
        // window.location.href = 'shop.html';
        checkoutItems.innerHTML = '<p>Your cart is empty.</p>';
        return;
    }

    let html = '';
    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        html += `
            <div style="display: flex; justify-content: space-between; margin-bottom: 10px; font-size: 14px;">
                <span>${item.name} x ${item.quantity}</span>
                <span>₹${itemTotal}</span>
            </div>
        `;
    });

    checkoutItems.innerHTML = html;
    checkoutTotal.textContent = `₹${total}`;
}