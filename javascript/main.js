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
        btn.innerHTML = '<svg viewBox="0 0 448 512" width="28" height="28" fill="currentColor"><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-18.1 16.3-24.1 1.8-1.1 3.4-2.5 5.1-3.7 1.7-1.3 3.3-3.3 4.9-5.5 1.6-2.2 2.2-3.7 3.3-6.2 1.1-2.5.6-4.7-.3-6.6-.8-1.9-12.4-29.6-17-40.5-4.5-10.5-9.1-9.1-12.5-9.3-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/></svg>';
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
                    btn.innerHTML = '&#10003; ¡Enviado!';
                    btn.style.background = '#28a745';
                }
                showNotification('¡Mensaje enviado! Te contactaremos pronto.');
                setTimeout(function() { form.reset(); if (btn) { btn.innerHTML = '<svg class="icon" viewBox="0 0 512 512" width="16" height="16" fill="currentColor"><use href="icons.svg#paper-plane"/></svg> Enviar Mensaje'; btn.style.background = ''; } }, 3000);
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
