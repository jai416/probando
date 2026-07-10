// =====================================================
// MAIN.JS - IP República Bolivariana de Venezuela
// Funcionalidades principales del sitio v3.0
// =====================================================
(function() {
    'use strict';

    // ---------- PRELOADER ----------
    function initPreloader() {
        var preloader = document.getElementById('preloader');
        if (!preloader) return;
        window.addEventListener('load', function() {
            preloader.classList.add('loaded');
            setTimeout(function() { preloader.remove(); }, 600);
        });
    }

    // ---------- DARK MODE ----------
    function initDarkMode() {
        var toggle = document.getElementById('theme-toggle');
        var saved = localStorage.getItem('theme');
        if (saved === 'dark') {
            document.body.classList.add('dark-mode');
        } else if (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.body.classList.add('dark-mode');
        }
        updateToggleIcon();
        if (toggle) {
            toggle.addEventListener('click', function() {
                document.body.classList.toggle('dark-mode');
                localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
                updateToggleIcon();
            });
        }
    }

    function updateToggleIcon() {
        var toggle = document.getElementById('theme-toggle');
        if (toggle) {
            toggle.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
        }
    }

    // ---------- HAMBURGER MENU ----------
    function initHamburger() {
        var hamburger = document.getElementById('hamburger');
        var navMenu = document.querySelector('.nav-menu');
        if (!hamburger || !navMenu) return;

        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
            var expanded = hamburger.getAttribute('aria-expanded') === 'true';
            hamburger.setAttribute('aria-expanded', !expanded);
        });

        navMenu.querySelectorAll('.nav-link').forEach(function(link) {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            });
        });

        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // ---------- BACK TO TOP ----------
    function initBackToTop() {
        var btn = document.getElementById('back-to-top');
        if (!btn) return;

        window.addEventListener('scroll', function() {
            if (window.scrollY > 400) {
                btn.classList.add('show');
            } else {
                btn.classList.remove('show');
            }
        });
        btn.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ---------- SMOOTH SCROLL WITH OFFSET ----------
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
            anchor.addEventListener('click', function(e) {
                var href = this.getAttribute('href');
                if (href === '#') return;
                var target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    var headerHeight = document.querySelector('header') ? document.querySelector('header').offsetHeight : 0;
                    var top = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
                    window.scrollTo({ top: top, behavior: 'smooth' });
                }
            });
        });
    }

    // ---------- PARTICLES ----------
    function initParticles() {
        var container = document.getElementById('particles');
        if (!container) return;
        for (var i = 0; i < 30; i++) {
            var p = document.createElement('div');
            var size = Math.random() * 4 + 2;
            p.style.cssText = 'position:absolute;width:' + size + 'px;height:' + size + 'px;background:rgba(255,255,255,' + (Math.random() * 0.3 + 0.1) + ');border-radius:50%;left:' + Math.random() * 100 + '%;top:' + Math.random() * 100 + '%;animation:float ' + (Math.random() * 20 + 10) + 's infinite linear;animation-delay:' + Math.random() * 10 + 's;pointer-events:none;';
            container.appendChild(p);
        }
    }

    // ---------- HEADER SCROLL ----------
    function initHeaderScroll() {
        var header = document.querySelector('header');
        if (!header) return;
        var lastScroll = 0;

        window.addEventListener('scroll', function() {
            var currentScroll = window.pageYOffset;
            if (currentScroll > 100) {
                header.classList.add('header-scrolled');
            } else {
                header.classList.remove('header-scrolled');
            }
            lastScroll = currentScroll;
        }, { passive: true });
    }

    // ---------- SCROLL ANIMATIONS (Intersection Observer) ----------
    function initScrollAnimations() {
        var elements = document.querySelectorAll('.feature-item, .specialty-card, .stat-card, .content-section, .contact-item, .contact-info-card');
        if (!elements.length) return;

        if (!('IntersectionObserver' in window)) {
            elements.forEach(function(el) { el.style.opacity = '1'; el.style.transform = 'none'; });
            return;
        }

        elements.forEach(function(el) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });

        var observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        elements.forEach(function(el) { observer.observe(el); });
    }

    // ---------- ANIMATED STAT COUNTERS ----------
    function initCounters() {
        var counters = document.querySelectorAll('.stat-number, .student-count, .stat-card .number');
        if (!counters.length) return;

        if (!('IntersectionObserver' in window)) return;

        var animated = new WeakSet();
        var observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting && !animated.has(entry.target)) {
                    animated.add(entry.target);
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(function(c) { observer.observe(c); });
    }

    function animateCounter(el) {
        var text = el.textContent.trim();
        var hasPercent = text.includes('%');
        var target = parseInt(text.replace('%', ''), 10);
        if (isNaN(target)) return;

        var duration = 1500;
        var start = 0;
        var startTime = null;

        function step(timestamp) {
            if (!startTime) startTime = timestamp;
            var progress = Math.min((timestamp - startTime) / duration, 1);
            var eased = 1 - Math.pow(1 - progress, 3);
            var current = Math.floor(eased * target);
            el.textContent = current + (hasPercent ? '%' : '');
            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                el.textContent = text;
            }
        }

        el.textContent = '0' + (hasPercent ? '%' : '');
        requestAnimationFrame(step);
    }

    // ---------- WHATSAPP FLOATING BUTTON ----------
    function initWhatsApp() {
        var existing = document.querySelector('.whatsapp-float');
        if (existing) return;

        var btn = document.createElement('a');
        btn.href = 'https://wa.me/5347526422';
        btn.target = '_blank';
        btn.rel = 'noopener noreferrer';
        btn.className = 'whatsapp-float';
        btn.setAttribute('aria-label', 'Contactar por WhatsApp');
        btn.innerHTML = '<i class="fab fa-whatsapp"></i>';
        document.body.appendChild(btn);
    }

    // ---------- GALLERY LIGHTBOX ----------
    function initLightbox() {
        var images = document.querySelectorAll('.gallery-item img');
        if (!images.length) return;

        var modal = document.createElement('div');
        modal.className = 'lightbox-modal hidden';
        modal.id = 'lightbox';
        modal.innerHTML = '<span class="lightbox-close" role="button" tabindex="0" aria-label="Cerrar">&times;</span><img class="lightbox-content" id="lightbox-img" alt=""><div id="lightbox-caption"></div>';
        document.body.appendChild(modal);

        var img = modal.querySelector('#lightbox-img');
        var caption = modal.querySelector('#lightbox-caption');
        var closeBtn = modal.querySelector('.lightbox-close');

        images.forEach(function(thumb) {
            thumb.style.cursor = 'pointer';
            thumb.addEventListener('click', function() {
                img.src = this.src;
                img.alt = this.alt;
                caption.textContent = this.alt || '';
                modal.classList.remove('hidden');
                document.body.style.overflow = 'hidden';
            });
        });

        function closeLightbox() {
            modal.classList.add('hidden');
            document.body.style.overflow = '';
        }

        closeBtn.addEventListener('click', closeLightbox);
        closeBtn.addEventListener('keypress', function(e) { if (e.key === 'Enter') closeLightbox(); });
        modal.addEventListener('click', function(e) { if (e.target === modal) closeLightbox(); });
        document.addEventListener('keydown', function(e) { if (e.key === 'Escape' && !modal.classList.contains('hidden')) closeLightbox(); });
    }

    // ---------- FORM VALIDATION ----------
    function initFormValidation() {
        var form = document.getElementById('contact-form');
        if (!form) return;

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            var name = form.querySelector('#name');
            var email = form.querySelector('#email');
            var message = form.querySelector('#message');
            var valid = true;

            form.querySelectorAll('.form-error').forEach(function(el) { el.remove(); });

            if (name && !name.value.trim()) {
                showFieldError(name, 'Por favor ingresa tu nombre');
                valid = false;
            }

            if (email && !email.value.trim()) {
                showFieldError(email, 'Por favor ingresa tu correo');
                valid = false;
            } else if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
                showFieldError(email, 'Correo electrónico no válido');
                valid = false;
            }

            if (message && !message.value.trim()) {
                showFieldError(message, 'Por favor escribe tu mensaje');
                valid = false;
            }

            if (valid) {
                var btn = form.querySelector('button[type="submit"]');
                if (btn) {
                    btn.innerHTML = '<i class="fas fa-check"></i> ¡Enviado!';
                    btn.style.background = '#28a745';
                }
                showNotification('¡Mensaje enviado! Te contactaremos pronto.');
                setTimeout(function() { form.reset(); if (btn) { btn.innerHTML = '<i class="fas fa-paper-plane"></i> Enviar Mensaje'; btn.style.background = ''; } }, 3000);
            }
        });

        form.querySelectorAll('input, textarea').forEach(function(field) {
            field.addEventListener('blur', function() {
                var error = this.parentNode.querySelector('.form-error');
                if (error) error.remove();
            });
        });
    }

    function showFieldError(field, msg) {
        var error = document.createElement('span');
        error.className = 'form-error';
        error.textContent = msg;
        error.style.cssText = 'color:#c41e3a;font-size:0.8rem;margin-top:4px;display:block;';
        field.parentNode.appendChild(error);
        field.style.borderColor = '#c41e3a';
        field.addEventListener('input', function handler() {
            field.style.borderColor = '';
            var e = field.parentNode.querySelector('.form-error');
            if (e) e.remove();
            field.removeEventListener('input', handler);
        });
    }

    // ---------- NOTIFICATION ----------
    function showNotification(msg) {
        var existing = document.querySelector('.notification');
        if (existing) existing.remove();

        var div = document.createElement('div');
        div.className = 'notification';
        div.textContent = msg;
        document.body.appendChild(div);

        setTimeout(function() { div.classList.add('show'); }, 10);
        setTimeout(function() { div.classList.remove('show'); setTimeout(function() { div.remove(); }, 300); }, 3000);
    }

    // ---------- PHONE NUMBER COPY ----------
    function initPhoneCopy() {
        document.querySelectorAll('.contact-details p').forEach(function(p) {
            if (p.textContent.includes('#47526422')) {
                p.style.cursor = 'pointer';
                p.title = 'Clic para copiar';
                p.addEventListener('click', function() {
                    navigator.clipboard.writeText('5347526422').then(function() {
                        showNotification('Número copiado al portapapeles');
                    }).catch(function() {});
                });
            }
        });
    }

    // ---------- ACTIVE NAV LINK ----------
    function initActiveNav() {
        var sections = document.querySelectorAll('section[id]');
        var navLinks = document.querySelectorAll('.nav-link[href^="#"]');
        if (!sections.length || !navLinks.length) return;

        var observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    var id = entry.target.getAttribute('id');
                    navLinks.forEach(function(link) {
                        link.classList.toggle('active', link.getAttribute('href') === '#' + id);
                    });
                }
            });
        }, { threshold: 0.3, rootMargin: '-80px 0px -50% 0px' });

        sections.forEach(function(s) { observer.observe(s); });
    }

    // ---------- KEYBOARD NAVIGATION ----------
    function initKeyboardNav() {
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                var chatWidget = document.getElementById('chat-widget');
                if (chatWidget && !chatWidget.classList.contains('hidden')) {
                    chatWidget.classList.add('hidden');
                }
            }
        });
    }

    // ---------- INIT ----------
    function init() {
        initPreloader();
        initDarkMode();
        initHamburger();
        initBackToTop();
        initSmoothScroll();
        initParticles();
        initHeaderScroll();
        initScrollAnimations();
        initCounters();
        initWhatsApp();
        initLightbox();
        initFormValidation();
        initPhoneCopy();
        initActiveNav();
        initKeyboardNav();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
