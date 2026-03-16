document.addEventListener("DOMContentLoaded", function() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartCount = document.getElementById('cart-count');
    const loginBtn = document.getElementById("loginLink");
    const currentUser = localStorage.getItem("currentUser");

    // Update cart count on load
    updateCartCount();

    // Login State Check with Animation
    function updateLoginButton(isLoggedIn, userName = '') {
        if (isLoggedIn && userName) {
            loginBtn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                loginBtn.textContent = `Xin chào, ${userName}`;
                loginBtn.href = "#";
                loginBtn.classList.add('logged-in');
                loginBtn.title = 'Click để đăng xuất';
                loginBtn.style.transform = 'scale(1)';
            }, 200);

            loginBtn.onclick = (e) => {
                e.preventDefault();
                if (confirm('Bạn muốn đăng xuất?')) {
                    loginBtn.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        localStorage.removeItem("currentUser");
                        updateLoginButton(false);
                    }, 200);
                }
            };
        } else {
            loginBtn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                loginBtn.textContent = "Đăng Nhập";
                loginBtn.href = "dangnhap.html";
                loginBtn.classList.remove('logged-in');
                loginBtn.title = '';
                loginBtn.style.transform = 'scale(1)';
                loginBtn.onclick = null;
            }, 200);
        }
    }

    // Initialize login button state
    if (currentUser) {
        const user = JSON.parse(currentUser);
        updateLoginButton(true, user.name);
    } else {
        updateLoginButton(false);
    }

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const productName = this.getAttribute('data-name');
            const productPrice = parseInt(this.getAttribute('data-price'));
            const productImage = this.getAttribute('data-image');
            const productCategory = this.getAttribute('data-category');

            // Add animation class
            this.classList.add('clicked');

            // Remove animation class after animation completes
            setTimeout(() => {
                this.classList.remove('clicked');
            }, 500);

            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            const existingProduct = cart.find(item => item.name === productName);

            if (existingProduct) {
                existingProduct.quantity++;
            } else {
                cart.push({ 
                    id: Date.now(), // Unique ID for each product
                    name: productName, 
                    price: productPrice, 
                    quantity: 1,
                    image: productImage,
                    category: productCategory
                });
            }

            localStorage.setItem('cart', JSON.stringify(cart));

            // Show floating notification
            showNotification(`${productName} đã được thêm vào giỏ hàng!`);

            // Update cart count
            updateCartCount();
        });
    });

    // Cart button click handler
    document.getElementById('cart-button').addEventListener('click', function() {
        window.location.href = 'giohang.html';
    });
});

// Function to show floating notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #28a745;
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 1000;
        animation: slideIn 0.5s ease forwards;
    `;
    notification.innerHTML = message;
    document.body.appendChild(notification);

    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.5s ease forwards';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 500);
    }, 3000);
}

// Function to update cart count
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCount = document.getElementById('cart-count');
    cartCount.textContent = totalItems;

    // Add animation if count changes
    cartCount.style.animation = 'none';
    cartCount.offsetHeight; // Trigger reflow
    cartCount.style.animation = 'addToCart 0.5s ease';
}

// Add keyframe animations to document
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }

// Header Scroll Effect
document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
});

    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    @keyframes addToCart {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);

let progress = 0;
let progressBar = document.getElementById('progress-bar');

let loading = setInterval(() => {
    if (progress < 100) {
        progress += 1;
        progressBar.style.width = progress + '%';
        progressBar.setAttribute('aria-valuenow', progress);
    } else {
        clearInterval(loading);
    }
}, 30); // Tốc độ load

window.onload = function() {
    clearInterval(loading);
    progressBar.style.width = '100%';
    progressBar.setAttribute('aria-valuenow', '100');

    setTimeout(() => {
        document.getElementById('loader').style.display = 'none';
    }, 500); // Thời gian chờ để hoàn thành hiệu ứng
}