document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       HEADER / MOBILE MENU
    ========================= */

    const header = document.querySelector(".site-header");
    const menuToggle = document.querySelector(".menu-toggle");
    const nav = document.querySelector(".main-nav");

    if (menuToggle && nav) {

        menuToggle.addEventListener("click", () => {
            const isOpen = header.classList.toggle("menu-open");

            document.body.classList.toggle("menu-is-open", isOpen);

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );
        });

        // Menü linkine basınca kapat
        nav.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                header.classList.remove("menu-open");
                document.body.classList.remove("menu-is-open");
                menuToggle.setAttribute("aria-expanded", "false");
            });
        });

        // ESC ile kapat
        document.addEventListener("keydown", event => {
            if (event.key === "Escape") {
                header.classList.remove("menu-open");
                document.body.classList.remove("menu-is-open");
                menuToggle.setAttribute("aria-expanded", "false");
            }
        });
    }


    /* =========================
       SCROLL HEADER
    ========================= */

    if (header) {

        const checkHeader = () => {
            if (window.scrollY > 30) {
                header.classList.add("is-scrolled");
            } else {
                header.classList.remove("is-scrolled");
            }
        };

        checkHeader();

        window.addEventListener("scroll", checkHeader, {
            passive: true
        });
    }


    /* =========================
       SMOOTH SCROLL
    ========================= */

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", event => {

            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target = document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            const headerHeight = header
                ? header.offsetHeight
                : 0;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.pageYOffset -
                headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });
        });

    });


    /* =========================
       SCROLL REVEAL
    ========================= */

    const revealElements = document.querySelectorAll(
        ".reveal, " +
        ".section-intro, " +
        ".section-heading, " +
        ".section-copy, " +
        ".feature-card, " +
        ".sahibinden-card, " +
        ".gallery-placeholder, " +
        ".founder-card, " +
        ".certificate-placeholder, " +
        ".sell-card, " +
        ".location-info, " +
        ".map-wrapper, " +
        ".contact-card"
    );

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("is-visible");

                        observer.unobserve(entry.target);
                    }

                });

            },
            {
                threshold: 0.12
            }
        );

        revealElements.forEach(element => {
            element.classList.add("reveal");
            observer.observe(element);
        });

    } else {

        revealElements.forEach(element => {
            element.classList.add("is-visible");
        });

    }


    /* =========================
       HERO ANIMATION
    ========================= */

    const heroElements = document.querySelectorAll(
        ".hero .eyebrow, " +
        ".hero h1, " +
        ".hero-description, " +
        ".hero-actions"
    );

    heroElements.forEach((element, index) => {

        element.classList.add("hero-reveal");

        element.style.setProperty(
            "--hero-delay",
            `${index * 120}ms`
        );

    });

    requestAnimationFrame(() => {

        requestAnimationFrame(() => {

            heroElements.forEach(element => {
                element.classList.add("is-visible");
            });

        });

    });


    /* =========================
       CURRENT YEAR
    ========================= */

    document.querySelectorAll("[data-current-year]").forEach(element => {

        element.textContent = new Date().getFullYear();

    });


    /* =========================
       EXTERNAL LINKS
    ========================= */

    document.querySelectorAll('a[target="_blank"]').forEach(link => {

        link.setAttribute("rel", "noopener noreferrer");

    });


    /* =========================
       ESCAPE EMPTY LINKS
    ========================= */

    document.querySelectorAll('a[href="#"]').forEach(link => {

        link.addEventListener("click", event => {
            event.preventDefault();
        });

    });


    /* =========================
       REDUCED MOTION
    ========================= */

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );

    if (reducedMotion.matches) {

        document
            .querySelectorAll(".reveal, .hero-reveal")
            .forEach(element => {

                element.classList.add("is-visible");

            });

    }

});