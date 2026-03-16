
/**
 * Kimetsu no Yaiba - Authentication JS
 * Quản lý đăng nhập và đăng ký tài khoản
 */

document.addEventListener('DOMContentLoaded', function() {
    // Chọn các elements
    const loginTab = document.getElementById('login-tab');
    const registerTab = document.getElementById('register-tab');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const loginButton = document.getElementById('loginButton');
    const registerButton = document.getElementById('registerButton');

    // Chuyển đổi giữa các tab
    loginTab.addEventListener('click', function(e) {
        e.preventDefault();
        switchToLogin();
    });

    registerTab.addEventListener('click', function(e) {
        e.preventDefault();
        switchToRegister();
    });

    function switchToLogin() {
        loginTab.classList.add('active');
        registerTab.classList.remove('active');
        loginForm.classList.remove('d-none');
        registerForm.classList.add('d-none');
    }

    function switchToRegister() {
        registerTab.classList.add('active');
        loginTab.classList.remove('active');
        registerForm.classList.remove('d-none');
        loginForm.classList.add('d-none');
    }

    // Thiết lập trạng thái loading cho nút
    function setLoadingState(button, isLoading) {
        const spinner = button.querySelector('.spinner-border');
        const text = button.querySelector('.button-text');

        if (isLoading) {
            spinner.classList.remove('d-none');
            text.style.opacity = '0';
            button.disabled = true;
        } else {
            spinner.classList.add('d-none');
            text.style.opacity = '1';
            button.disabled = false;
        }
    }

    // Kiểm tra định dạng email
    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // Kiểm tra định dạng mật khẩu
    function validatePassword(password) {
        return password.length >= 6;
    }

    // Lưu thông tin người dùng vào localStorage
    function saveUser(user) {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
    }

    // Tìm người dùng theo email
    function findUser(email) {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        return users.find(user => user.email === email);
    }

    // Xử lý đăng nhập
    loginButton.addEventListener('click', function() {
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        const messageElement = document.getElementById('login-message');
        const rememberMe = document.getElementById('remember-me').checked;

        messageElement.textContent = '';
        messageElement.className = 'mt-3 text-center';

        if (!email || !password) {
            messageElement.textContent = 'Vui lòng điền đầy đủ thông tin!';
            messageElement.classList.add('text-danger');
            return;
        }

        if (!validateEmail(email)) {
            messageElement.textContent = 'Email không hợp lệ!';
            messageElement.classList.add('text-danger');
            return;
        }

        setLoadingState(loginButton, true);

        setTimeout(() => {
            const user = findUser(email);
            
            if (user && user.password === password) {
                messageElement.textContent = 'Đăng nhập thành công!';
                messageElement.classList.add('text-success');
                
                if (rememberMe) {
                    localStorage.setItem('currentUser', JSON.stringify(user));
                } else {
                    sessionStorage.setItem('currentUser', JSON.stringify(user));
                }
                
                // Chuyển hướng về trang chủ sau khi đăng nhập
                setTimeout(() => {
                    window.location.href = 'trangchu.html';
                }, 1000);
            } else {
                messageElement.textContent = 'Email hoặc mật khẩu không chính xác!';
                messageElement.classList.add('text-danger');
            }
            
            setLoadingState(loginButton, false);
        }, 1000);
    });

    // Xử lý đăng ký
    registerButton.addEventListener('click', function() {
        const name = document.getElementById('register-name').value;
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;
        const messageElement = document.getElementById('register-message');

        messageElement.textContent = '';
        messageElement.className = 'mt-3 text-center';

        if (!name || !email || !password) {
            messageElement.textContent = 'Vui lòng điền đầy đủ thông tin!';
            messageElement.classList.add('text-danger');
            return;
        }

        if (!validateEmail(email)) {
            messageElement.textContent = 'Email không hợp lệ!';
            messageElement.classList.add('text-danger');
            return;
        }

        if (!validatePassword(password)) {
            messageElement.textContent = 'Mật khẩu phải có ít nhất 6 ký tự!';
            messageElement.classList.add('text-danger');
            return;
        }

        if (findUser(email)) {
            messageElement.textContent = 'Email đã được đăng ký!';
            messageElement.classList.add('text-danger');
            return;
        }

        setLoadingState(registerButton, true);

        setTimeout(() => {
            const user = { 
                name, 
                email, 
                password,
                favoriteCharacters: [],
                registerDate: new Date().toISOString()
            };
            
            saveUser(user);
            messageElement.textContent = 'Đăng ký thành công!';
            messageElement.classList.add('text-success');
            
            setLoadingState(registerButton, false);

            // Chuyển sang form đăng nhập sau khi đăng ký thành công
            setTimeout(() => {
                switchToLogin();
                document.getElementById('login-email').value = email;
            }, 1000);
        }, 1000);
    });

    // Thêm hiệu ứng cho inputs
    const inputs = document.querySelectorAll('.form-control');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
            this.parentElement.style.transition = 'transform 0.3s';
        });

        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
        });
    });

    // Kiểm tra người dùng đã đăng nhập
    const currentUser = localStorage.getItem('currentUser') || sessionStorage.getItem('currentUser');
    if (currentUser) {
        const user = JSON.parse(currentUser);
        // Nếu đã đăng nhập, chuyển hướng về trang chủ
        window.location.href = 'trangchu.html';
    }
});
