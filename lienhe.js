window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY;

            if (scrollPosition > 100) {
                document.body.classList.add('scrolled');
                document.querySelector('.btn_pagetop').classList.add('is-show');
            } else {
                document.body.classList.remove('scrolled');
                document.querySelector('.btn_pagetop').classList.remove('is-show');
            }
        });
 document.addEventListener("DOMContentLoaded", function() {
            const loginBtn = document.getElementById("loginLink");
            const currentUser = localStorage.getItem("currentUser");

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

            // Scrollspy highlight effect
            const navLinks = document.querySelectorAll('#scrollspy .nav-link');
            
            navLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    
                    const targetId = link.getAttribute('href');
                    const targetElement = document.querySelector(targetId);
                    
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                });
            });

            // Add active class on scroll
            window.addEventListener('scroll', () => {
                let current = '';
                const sections = document.querySelectorAll('section');
                
                sections.forEach(section => {
                    const sectionTop = section.offsetTop - 150;
                    if (pageYOffset >= sectionTop) {
                        current = section.getAttribute('id');
                    }
                });
                
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${current}`) {
                        link.classList.add('active');
                    }
                });
            });
        });

        // Success message function
        function showSuccessMessage() {
            const successModal = new bootstrap.Modal(document.getElementById('successModal'));
            successModal.show();
            
            // Clear form fields
            document.querySelectorAll('.contact-form').forEach(form => {
                form.reset();
            });
        }