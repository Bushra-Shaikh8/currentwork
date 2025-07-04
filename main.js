const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - sectionHeight / 3) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href").includes(current)) {
            link.classList.add("active");
        }
    });
});


// Toggle hamburger/X icon on navbar collapse
        const toggler = document.querySelector('.navbar-toggler');
        const togglerIcon = toggler.querySelector('.navbar-toggler-icon');
        const closeIcon = toggler.querySelector('.close-icon');
        const navbarCollapse = document.getElementById('navbarNav');

        navbarCollapse.addEventListener('show.bs.collapse', function () {
            togglerIcon.classList.add('d-none');
            closeIcon.classList.remove('d-none');
        });
        navbarCollapse.addEventListener('hide.bs.collapse', function () {
            togglerIcon.classList.remove('d-none');
            closeIcon.classList.add('d-none');
        });

        // Auto-close navbar on nav-link click (mobile)
        navbarCollapse.querySelectorAll('.nav-link').forEach(function (link) {
            link.addEventListener('click', function () {
                if (window.getComputedStyle(toggler).display !== 'none' && navbarCollapse.classList.contains('show')) {
                    toggler.click(); // Triggers collapse
                }
            });
        });

        const wrapper = document.getElementById("mockup-wrapper");
const images = ["mob5.png", "mob.png", "mob7.png", "mob8.png"];
let index = 0;

setInterval(() => {
    const allImgs = wrapper.querySelectorAll(".mockup-img");

    // Save current srcs
    const leftSrc = allImgs[0].src;
    const centerSrc = allImgs[1].src;
    const rightSrc = allImgs[2].src;

    // Rotate classes
    allImgs[0].className = "mockup-img right-img";
    allImgs[1].className = "mockup-img left-img";
    allImgs[2].className = "mockup-img center-img";

    // DOM order ko bhi rotate karo (taaki z-index sahi rahe)
    wrapper.appendChild(allImgs[0]); // left ab right ban gaya, end pe bhej do

    // Update src of new right image (jo ab left se right gaya)
    index = (index + 1) % images.length;
    wrapper.querySelector(".right-img").src = images[(index + 2) % images.length];

}, 3000);

// Loader logic for hero section images
window.addEventListener('DOMContentLoaded', function () {
    const loader = document.getElementById('page-loader');
    const heroImgs = document.querySelectorAll('#mockup-wrapper .mockup-img');
    let loaded = 0;
    if (heroImgs.length === 0) {
        loader.style.display = 'none';
        forceNavbarRepaint();
        return;
    }
    function forceNavbarRepaint() {
        // Force reflow on <body> and <html>
        document.body.offsetHeight;
        document.documentElement.offsetHeight;
        // Detach and re-attach navbar
        const navbar = document.querySelector('.custom-navbar');
        if (navbar && navbar.parentNode) {
            const parent = navbar.parentNode;
            const next = navbar.nextSibling;
            parent.removeChild(navbar);
            // Small timeout to ensure DOM update
            setTimeout(() => {
                if (next) {
                    parent.insertBefore(navbar, next);
                } else {
                    parent.appendChild(navbar);
                }
            }, 10);
        }
    }
    function hideLoaderAndRepaintNavbar() {
        loader.style.display = 'none';
        forceNavbarRepaint();
        // Force browser to recalculate layout (fixes toggle overflow on first scroll)
        window.dispatchEvent(new Event('resize'));
    }
    heroImgs.forEach(img => {
        if (img.complete) {
            loaded++;
        } else {
            img.addEventListener('load', () => {
                loaded++;
                if (loaded === heroImgs.length) {
                    hideLoaderAndRepaintNavbar();
                }
            });
            img.addEventListener('error', () => {
                loaded++;
                if (loaded === heroImgs.length) {
                    hideLoaderAndRepaintNavbar();
                }
            });
        }
    });
    if (loaded === heroImgs.length) {
        hideLoaderAndRepaintNavbar();
    }
});