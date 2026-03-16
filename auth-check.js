
/**
 * Kimetsu no Yaiba - Auth Check
 * Kiểm tra trạng thái đăng nhập và cập nhật giao diện
 */

document.addEventListener('DOMContentLoaded', function() {
    // Kiểm tra trạng thái đăng nhập
    function checkLoginStatus() {
        const loginBtn = document.getElementById('loginBtn');
        if (!loginBtn) return;

        const currentUser = localStorage.getItem('currentUser') || sessionStorage.getItem('currentUser');
        
        if (currentUser) {
            const user = JSON.parse(currentUser);
            // Cập nhật nút đăng nhập thành thông tin người dùng
            loginBtn.innerHTML = `|  <i class="fas fa-user me-2"> </i>  Xin chào, <strong>${user.name}</strong>`;
            loginBtn.classList.add('dropdown-toggle');
            loginBtn.setAttribute('data-bs-toggle', 'dropdown');
            loginBtn.setAttribute('aria-expanded', 'false');
            
            // Tạo dropdown menu
            const dropdownMenu = document.createElement('ul');
            dropdownMenu.className = 'dropdown-menu dropdown-menu-end';
            
            // Thêm các mục vào dropdown
            dropdownMenu.innerHTML = `
                <li><span class="dropdown-item-text">Xin chào, <strong>${user.name}</strong></span></li>
                <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item" href="#"><i class="fas fa-user-circle me-2"></i>Hồ sơ</a></li>
                <li><a class="dropdown-item" href="#"><i class="fas fa-heart me-2"></i>Yêu thích</a></li>
                <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item text-danger" href="#" id="logoutBtn"><i class="fas fa-sign-out-alt me-2"></i>Đăng xuất</a></li>
            `;
            
            // Thêm dropdown vào DOM
            const parentElement = loginBtn.parentElement;
            parentElement.classList.add('dropdown');
            parentElement.appendChild(dropdownMenu);
            
            // Xử lý đăng xuất
            const logoutBtn = document.getElementById('logoutBtn');
            logoutBtn.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Hiển thị confirm dialog
                if (confirm('Bạn có chắc chắn muốn đăng xuất?')) {
                    // Xóa thông tin người dùng
                    localStorage.removeItem('currentUser');
                    sessionStorage.removeItem('currentUser');
                    
                    // Tải lại trang
                    window.location.reload();
                }
            });
        } else {
            // Người dùng chưa đăng nhập
            loginBtn.innerHTML = `<i class="fas fa-sign-in-alt me-2"></i>Đăng Nhập`;
            loginBtn.href = 'dangnhap.html';
        }
    }





    

    // Thêm hiệu ứng scroll cho header
    function handleScroll() {
        const header = document.querySelector('header');
        if (!header) return;
        
        const scrollPosition = window.scrollY;
        
        if (scrollPosition > 100) {
            header.classList.add('scrolled');
            header.style.backgroundColor = 'rgba(26, 26, 46, 0.95)';
            header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
        } else {
            header.classList.remove('scrolled');
            header.style.backgroundColor = 'rgba(26, 26, 46, 0.8)';
            header.style.boxShadow = 'none';
        }
    }

    // Hiệu ứng cho nút Back to Top
    function handleBackToTopButton() {
        const backToTopBtn = document.getElementById('backToTop');
        if (!backToTopBtn) return;
        
        const scrollPosition = window.scrollY;
        
        if (scrollPosition > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    }
    
    // Hiệu ứng cuộn lên đầu trang
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    // Thiết lập sự kiện
    window.addEventListener('scroll', function() {
        handleScroll();
        handleBackToTopButton();
    });
    
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', scrollToTop);
    }

    // Hiệu ứng khi scroll qua các phần của trang
    function handleSectionAnimation() {
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight * 0.75) {
                section.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', handleSectionAnimation);

    // Hiệu ứng cho màn hình chia đôi khi scroll
    function handleSplitScreenEffect() {
        const left = document.querySelector('.left');
        const right = document.querySelector('.right');
        
        if (!left || !right) return;
        
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        
        if (scrollPosition > windowHeight * 0.5) {
            const translateValue = Math.min((scrollPosition - windowHeight * 0.5) * 0.15, 50);
            left.style.transform = `translateX(-${translateValue}%)`;
            right.style.transform = `translateX(${translateValue}%)`;
        } else {
            left.style.transform = 'translateX(0)';
            right.style.transform = 'translateX(0)';
        }
    }
    
    window.addEventListener('scroll', handleSplitScreenEffect);

    // Gọi các hàm khi trang được tải
    checkLoginStatus();
    handleScroll();
    handleBackToTopButton();
    handleSectionAnimation();
    handleSplitScreenEffect();
});
