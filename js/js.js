



// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.querySelector('.navbar');

    // Mobile menu toggle
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (navMenu.classList.contains('active') &&
                !navMenu.contains(e.target) &&
                !hamburger.contains(e.target)) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });

        // Close mobile menu when clicking on a nav link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });
    }

    // Login State Check with Animation
    function updateLoginState(isLoggedIn, userName = '') {
        const loginBtn = document.getElementById('loginLink');
        if (!loginBtn) return;

        // Add fade out effect
        loginBtn.style.opacity = '0';
        loginBtn.style.transition = 'opacity 0.3s ease';

        setTimeout(() => {
            if (isLoggedIn && userName) {
                loginBtn.innerHTML = `
                    <div class="user-menu">
                        <a class="nav-link user-link" href="#">
                            <i class="fas fa-user me-2"></i>Xin chào, ${userName}
                        </a>
                        <div class="user-dropdown">
                            <a href="#" class="dropdown-item" onclick="logout()">
                                <i class="fas fa-sign-out-alt me-2"></i>Đăng xuất
                            </a>
                        </div>
                    </div>
                `;
            } else {
                loginBtn.innerHTML = `
                    <div class="login-text">
                        <i class="fas fa-sign-in-alt"></i>
                        <span>Đăng Nhập</span>
                    </div>
                `;
                loginBtn.href = "dangnhap.html";
            }

            // Add fade in effect
            setTimeout(() => {
                loginBtn.style.opacity = '1';
            }, 50);
        }, 300);
    }

    // Check login status on page load with animation
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        const user = JSON.parse(currentUser);
        updateLoginState(true, user.name);
    } else {
        updateLoginState(false);
    }

    // Scroll Effect for Navbar
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // Active link highlighting
    function setActiveLink() {
        const currentPath = window.location.pathname;
        navLinks.forEach(link => {
            if (link.getAttribute('href') === currentPath ||
                (currentPath === '/' && link.getAttribute('href') === 'trangchu.html')) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    setActiveLink();

    // Back to Top Button
    const backToTop = document.querySelector('.btn_pagetop');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTop.classList.add('is-show');
            } else {
                backToTop.classList.remove('is-show');
            }
        });
    }

    // Initialize AOS
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

    // Logout functionality with confirmation
    window.logout = function() {
        if (confirm('Bạn có chắc chắn muốn đăng xuất?')) {
            localStorage.removeItem('currentUser');

            // Add fade out effect before reload
            const loginBtn = document.getElementById('loginLink');
            if (loginBtn) {
                loginBtn.style.opacity = '0';
                setTimeout(() => {
                    window.location.reload();
                }, 300);
            } else {
                window.location.reload();
            }
        }
    };
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Add loading animation for images
document.addEventListener("DOMContentLoaded", () => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', () => {
            img.classList.add('fade-in');
        });
    });
});

// Character Card Animation
const characterCards = document.querySelectorAll('.character-card');
characterCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateX(10px)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateX(0)';
    });
});

// News Card Hover Effect
const newsCards = document.querySelectorAll('.news-card');
newsCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});


AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: true,
            mirror: false
        });

