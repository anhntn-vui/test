window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY;

            if (scrollPosition > 1) {
                document.body.classList.add('scrolled');
                document.querySelector('.btn_pagetop').classList.add('is-show');
            } else {
                document.body.classList.remove('scrolled');
                document.querySelector('.btn_pagetop').classList.remove('is-show');
            }
        });


 document.addEventListener("DOMContentLoaded", () => {
            const cartItemsContainer = document.getElementById('cart-items');
            const totalAmount = document.getElementById('total-amount');
            const subtotal = document.getElementById('subtotal');
            const emptyCart = document.getElementById('empty-cart');
            const cartTableWrapper = document.querySelector('.cart-table-wrapper');
            const cartTotal = document.querySelector('.cart-total');
            let total = 0;

            // Save scroll position
            function saveScrollPosition() {
                sessionStorage.setItem('scrollPosition', window.pageYOffset);
            }

            // Restore scroll position
            function restoreScrollPosition() {
                const scrollPosition = sessionStorage.getItem('scrollPosition');
                if (scrollPosition) {
                    window.scrollTo(0, parseInt(scrollPosition));
                    sessionStorage.removeItem('scrollPosition');
                }
            }

            // Format currency
            function formatCurrency(amount) {
                return new Intl.NumberFormat('vi-VN', {
                    style: 'currency',
                    currency: 'VND'
                }).format(amount);
            }

            // Get cart from localStorage
            const cart = JSON.parse(localStorage.getItem('cart')) || [];

            if (cart.length === 0) {
                emptyCart.classList.remove('d-none');
                cartTableWrapper.classList.add('d-none');
                cartTotal.classList.add('d-none');
            } else {
                cart.forEach(item => {
                    const itemTotal = item.price * item.quantity;
                    total += itemTotal;

                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>
                            <div class="d-flex align-items-center">
                                <img src="${item.image}" alt="${item.name}" class="me-3">
                                <div>
                                    <h6 class="product-title">${item.name}</h6>
                                    <small class="product-category">${item.category}</small>
                                </div>
                            </div>
                        </td>
                        <td>${formatCurrency(item.price)}</td>
                        <td>
                            <div class="quantity-control">
                                <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">
                                    <i class="fas fa-minus"></i>
                                </button>
                                <input type="number" class="quantity-input" value="${item.quantity}" min="1" 
                                    onchange="updateQuantity(${item.id}, this.value)"
                                    onkeypress="return event.charCode >= 48 && event.charCode <= 57">
                                <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">
                                    <i class="fas fa-plus"></i>
                                </button>
                            </div>
                        </td>
                        <td>${formatCurrency(itemTotal)}</td>
                        <td>
                            <button class="btn btn-link text-danger" onclick="removeItem(${item.id})">
                                <i class="fas fa-trash"></i>
                            </button>
                        </td>
                    `;
                    cartItemsContainer.appendChild(row);
                });

                subtotal.textContent = formatCurrency(total);
                totalAmount.textContent = formatCurrency(total);
            }

            // Login State Check with Animation
            const loginBtn = document.getElementById("loginLink");
            const currentUser = localStorage.getItem("currentUser");

            function updateLoginButton(isLoggedIn, userName = '') {
                if (isLoggedIn && userName) {
                    loginBtn.textContent = `Xin chào, ${userName}`;
                    loginBtn.href = "#";
                    loginBtn.classList.add('logged-in');
                    loginBtn.title = 'Click để đăng xuất';

                    loginBtn.onclick = (e) => {
                        e.preventDefault();
                        if (confirm('Bạn muốn đăng xuất?')) {
                            loginBtn.style.transform = 'scale(0.95)';
                            setTimeout(() => {
                                localStorage.removeItem("currentUser");
                                updateLoginButton(false);
                                loginBtn.style.transform = 'scale(1)';
                            }, 200);
                        }
                    };
                } else {
                    loginBtn.textContent = "Đăng Nhập";
                    loginBtn.href = "dangnhap.html";
                    loginBtn.classList.remove('logged-in');
                    loginBtn.title = '';
                    loginBtn.onclick = null;
                }
            }

            // Initialize login button state
            if (currentUser) {
                const user = JSON.parse(currentUser);
                updateLoginButton(true, user.name);
            } else {
                updateLoginButton(false);
            }

            // Restore scroll position after page load
            restoreScrollPosition();
        });

        function updateQuantity(itemId, change) {
            saveScrollPosition();
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            const itemIndex = cart.findIndex(item => item.id === itemId);

            if (itemIndex !== -1) {
                if (typeof change === 'number') {
                    cart[itemIndex].quantity += change;
                } else {
                    cart[itemIndex].quantity = parseInt(change) || 1;
                }

                if (cart[itemIndex].quantity < 1) {
                    cart[itemIndex].quantity = 1;
                }

                localStorage.setItem('cart', JSON.stringify(cart));
                window.location.reload();
            }
        }

        function removeItem(itemId) {
            if (confirm('Bạn có chắc muốn xóa sản phẩm này?')) {
                const row = event.target.closest('tr');
                row.classList.add('removing');

                setTimeout(() => {
                    const cart = JSON.parse(localStorage.getItem('cart')) || [];
                    const updatedCart = cart.filter(item => item.id !== itemId);
                    localStorage.setItem('cart', JSON.stringify(updatedCart));
                    window.location.reload();
                }, 300);
            }
        }

        function checkout() {
            alert('Chức năng thanh toán đang được phát triển!');
        }

        function continueShopping() {
            window.location.href = 'trangchu.html';
        }

        // Header Scroll Effect
        const header = document.querySelector('.header');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });

        // Save scroll position before leaving page
        window.addEventListener('beforeunload', saveScrollPosition);