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