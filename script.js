/**
 * Bar-Orian Brand Hub - Interactive Scripts
 */

// DOM Ready
document.addEventListener('DOMContentLoaded', function() {
    initUSPTabs();
    initPersonaCards();
    initSmoothScroll();
    initNavHighlight();
});

/**
 * USP Tabs - Switch between different USP messages
 */
function initUSPTabs() {
    const tabs = document.querySelectorAll('.usp-tab');
    const panels = document.querySelectorAll('.usp-panel');

    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetPanel = this.dataset.tab;

            // Remove active from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            // Add active to clicked tab
            this.classList.add('active');

            // Hide all panels
            panels.forEach(p => p.classList.remove('active'));
            // Show target panel
            document.querySelector(`.usp-panel[data-panel="${targetPanel}"]`).classList.add('active');
        });
    });
}

/**
 * Persona Cards - Expand/collapse details
 */
function initPersonaCards() {
    const cards = document.querySelectorAll('.persona-card');

    cards.forEach(card => {
        const expandBtn = card.querySelector('.btn-expand');

        expandBtn.addEventListener('click', function() {
            // Toggle expanded class
            card.classList.toggle('expanded');

            // Update button text
            if (card.classList.contains('expanded')) {
                this.textContent = 'סגור';
            } else {
                this.textContent = 'פרטים נוספים';
            }
        });
    });
}

/**
 * Copy Color - Copy HEX code to clipboard
 */
function copyColor(element) {
    const color = element.dataset.color;

    navigator.clipboard.writeText(color).then(function() {
        showToast(`הועתק: ${color}`);
    }).catch(function(err) {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = color;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showToast(`הועתק: ${color}`);
    });
}

/**
 * Show Toast Notification
 */
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 2000);
}

/**
 * Smooth Scroll - For navigation links
 */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const navHeight = document.querySelector('.main-nav').offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Navigation Highlight - Highlight current section in nav
 */
function initNavHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    function highlightNav() {
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightNav);
    highlightNav(); // Run once on load
}

/**
 * Animation on Scroll - Add fade-in effect to elements
 */
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe brand blocks and persona cards
    document.querySelectorAll('.brand-block, .persona-card').forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
}

// Add active style for nav links
const style = document.createElement('style');
style.textContent = `
    .nav-links a.active {
        color: var(--color-orange);
    }

    .animate-on-scroll {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }

    .animate-on-scroll.visible {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);

// Initialize scroll animations
document.addEventListener('DOMContentLoaded', initScrollAnimations);
