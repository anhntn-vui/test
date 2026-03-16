 AOS.init({
            duration: 800,
            easing: 'ease-out',
            once: true
        });

        // Scroll Effect
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

        // Smooth Scroll
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();

                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.getBoundingClientRect().top + window.pageYOffset - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Scroll to Top Function
        function scrollToTop() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }

        // Pagination
        let currentPage = 1;
        const totalPages = 3;

        function changePage(page) {
            // Handle next/prev
            if (page === 'next') {
                page = Math.min(currentPage + 1, totalPages);
            } else if (page === 'prev') {
                page = Math.max(currentPage - 1, 1);
            }

            if (page === currentPage) return;

            // Hide all character cards
            document.querySelectorAll('.page-1, .page-2, .page-3').forEach(card => {
                card.style.display = 'none';
            });

            // Show only cards for current page
            const pageClass = `page-${page}`;
            const defaultCards = document.querySelectorAll(`.col-lg-4:not(.page-2):not(.page-3)`);

            if (page === 1) {
                defaultCards.forEach(card => {
                    card.style.display = 'block';
                });
            } else {
                document.querySelectorAll(`.${pageClass}`).forEach(card => {
                    card.style.display = 'block';
                });
            }

            // Update active page in pagination
            document.querySelectorAll('.pagination .page-item').forEach((item, index) => {
                if (index > 0 && index <= totalPages) {
                    if (index === page) {
                        item.classList.add('active');
                    } else {
                        item.classList.remove('active');
                    }
                }
            });

            currentPage = page;

            // Refresh AOS animations
            AOS.refresh();

            // IMPORTANT: Don't scroll to top when changing pages
            // This is intentional to maintain the current scroll position
        }

        // Login Check
        document.addEventListener('DOMContentLoaded', function() {
            const currentUser = localStorage.getItem('currentUser');
            const loginBtn = document.getElementById('loginBtn');

            if (currentUser) {
                const user = JSON.parse(currentUser);
                loginBtn.textContent = user.name;
                loginBtn.href = "#";
                loginBtn.classList.add('logged-in');
                loginBtn.title = 'Đăng xuất';

                loginBtn.addEventListener('click', function(e) {
                    e.preventDefault();

                    if (confirm('Bạn có muốn đăng xuất không?')) {
                        localStorage.removeItem('currentUser');
                        window.location.reload();
                    }
                });
            }

            // Character Filter
            const filterBtn = document.getElementById('filterBtn');
            if (filterBtn) {
                filterBtn.addEventListener('click', filterCharacters);
            }

            function filterCharacters() {
                const role = document.getElementById('filterRole').value.toLowerCase();
                const name = document.getElementById('searchName').value.toLowerCase();
                const cards = document.querySelectorAll('.character-card');

                cards.forEach(card => {
                    const cardRole = card.querySelector('.character-role').textContent.toLowerCase();
                    const cardName = card.querySelector('.character-name').textContent.toLowerCase();
                    const parent = card.parentElement;

                    const roleMatch = !role || cardRole.includes(role);
                    const nameMatch = !name || cardName.includes(name);

                    if (roleMatch && nameMatch) {
                        parent.style.display = 'block';
                    } else {
                        parent.style.display = 'none';
                    }
                });

                // Reset to page 1 after filtering
                changePage(1);
            }
        });