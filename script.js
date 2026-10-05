document.addEventListener("DOMContentLoaded", () => {

    const body = document.body;

    const cursor = document.createElement("div");
    cursor.className = "custom-cursor";
    body.appendChild(cursor);

    const cursorDot = document.createElement("div");
    cursorDot.className = "cursor-dot";
    body.appendChild(cursorDot);

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    document.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.15;
        cursorY += (mouseY - cursorY) * 0.15;

        cursor.style.transform =
            `translate3d(${cursorX}px, ${cursorY}px, 0)`;

        cursorDot.style.transform =
            `translate3d(${mouseX}px, ${mouseY}px, 0)`;

        requestAnimationFrame(animateCursor);
    }

    animateCursor();


    const interactiveElements = document.querySelectorAll(
        "a, button, .card, .image-frame, .nav-button"
    );

    interactiveElements.forEach((element) => {

        element.addEventListener("mouseenter", () => {
            cursor.classList.add("cursor-hover");
        });

        element.addEventListener("mouseleave", () => {
            cursor.classList.remove("cursor-hover");
        });

    });


    const revealElements = document.querySelectorAll(
        ".section, .card, .terminal, .image-frame, .cta-box, .stats div"
    );

    const revealObserver = new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {
                    entry.target.classList.add("revealed");
                    revealObserver.unobserve(entry.target);
                }

            });

        },
        {
            threshold: 0.12
        }
    );

    revealElements.forEach((element) => {
        element.classList.add("reveal");
        revealObserver.observe(element);
    });


    const parallaxElements = document.querySelectorAll(
        ".hero-visual, .image-frame"
    );

    window.addEventListener("scroll", () => {

        const scrollY = window.scrollY;

        parallaxElements.forEach((element) => {

            const speed = element.classList.contains("image-frame")
                ? 0.08
                : 0.03;

            element.style.transform =
                `translateY(${scrollY * speed}px)`;

        });

    });


    const heroTitle = document.querySelector(".hero h1");

    if (heroTitle) {

        heroTitle.addEventListener("mousemove", (e) => {

            const rect = heroTitle.getBoundingClientRect();

            const x =
                (e.clientX - rect.left) / rect.width - 0.5;

            const y =
                (e.clientY - rect.top) / rect.height - 0.5;

            heroTitle.style.transform =
                `perspective(600px)
                 rotateY(${x * 4}deg)
                 rotateX(${y * -4}deg)`;

        });

        heroTitle.addEventListener("mouseleave", () => {

            heroTitle.style.transform =
                "perspective(600px) rotateY(0) rotateX(0)";

        });

    }


    const image = document.querySelector(".image-frame img");

    if (image) {

        image.addEventListener("mousemove", (e) => {

            const rect = image.getBoundingClientRect();

            const x =
                (e.clientX - rect.left) / rect.width - 0.5;

            const y =
                (e.clientY - rect.top) / rect.height - 0.5;

            image.style.transform =
                `scale(1.04)
                 rotateY(${x * 6}deg)
                 rotateX(${y * -6}deg)`;

        });

        image.addEventListener("mouseleave", () => {

            image.style.transform =
                "scale(1) rotateY(0) rotateX(0)";

        });

    }


    const terminal = document.querySelector(".terminal-body");

    if (terminal) {

        const lines = [
            "Initializing security system...",
            "Loading encryption modules...",
            "Checking network integrity...",
            "Analyzing active connections...",
            "Scanning security layers...",
            "Firewall status: ACTIVE",
            "Threat detection: ACTIVE",
            "Privacy layer: ACTIVE",
            "NOSEC SYSTEM: SECURE"
        ];

        const originalContent = terminal.innerHTML;

        terminal.innerHTML = "";

        let lineIndex = 0;

        function typeTerminalLine() {

            if (lineIndex >= lines.length) {
                terminal.innerHTML += `
                    <p class="final-line">
                        root@nosec:~$ <span class="terminal-cursor">_</span>
                    </p>
                `;
                return;
            }

            const line = document.createElement("p");

            if (
                lines[lineIndex].includes("ACTIVE") ||
                lines[lineIndex].includes("SECURE")
            ) {
                line.innerHTML =
                    `[ <b>OK</b> ] ${lines[lineIndex]}`;
            } else {
                line.textContent = lines[lineIndex];
            }

            terminal.appendChild(line);

            lineIndex++;

            setTimeout(typeTerminalLine, 450);
        }

        setTimeout(() => {

            terminal.innerHTML = "";

            typeTerminalLine();

        }, 700);

    }


    const glitchElements = document.querySelectorAll(
        ".logo, .hero h1 span, .section h2 span"
    );

    glitchElements.forEach((element) => {

        setInterval(() => {

            if (Math.random() > 0.92) {

                element.style.transform =
                    `translate(${Math.random() * 4 - 2}px,
                               ${Math.random() * 2 - 1}px)`;

                element.style.textShadow =
                    `${Math.random() * 4 - 2}px 0 #fff`;

                setTimeout(() => {

                    element.style.transform = "";
                    element.style.textShadow = "";

                }, 80);

            }

        }, 500);

    });


    const counters = document.querySelectorAll(
        ".stats strong"
    );

    const counterObserver = new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) return;

                const element = entry.target;
                const value = element.textContent.trim();

                if (value.includes("%")) {

                    let current = 0;
                    const target = parseFloat(value);

                    const interval = setInterval(() => {

                        current += 1;

                        element.textContent =
                            current.toFixed(1) + "%";

                        if (current >= target) {
                            clearInterval(interval);
                            element.textContent = value;
                        }

                    }, 25);

                }

                counterObserver.unobserve(element);

            });

        },
        {
            threshold: 0.8
        }
    );

    counters.forEach((counter) => {
        counterObserver.observe(counter);
    });


    const marquee = document.querySelector(".marquee-track");

    if (marquee) {

        let position = 0;

        function animateMarquee() {

            position -= 0.35;

            if (Math.abs(position) > marquee.scrollWidth / 2) {
                position = 0;
            }

            marquee.style.transform =
                `translateX(${position}px)`;

            requestAnimationFrame(animateMarquee);
        }

        animateMarquee();

    }


    const navLinks = document.querySelectorAll(
        "nav a"
    );

    navLinks.forEach((link) => {

        link.addEventListener("click", () => {

            navLinks.forEach((item) => {
                item.classList.remove("active");
            });

            link.classList.add("active");

        });

    });


    const pageLoader = document.createElement("div");

    pageLoader.className = "page-loader";

    pageLoader.innerHTML = `
        <div class="loader-logo">NO<span>SEC</span></div>
        <div class="loader-line">
            <div></div>
        </div>
        <div class="loader-status">
            INITIALIZING SECURITY SYSTEM
        </div>
    `;

    document.body.prepend(pageLoader);

    window.addEventListener("load", () => {

        setTimeout(() => {
            pageLoader.classList.add("loaded");
        }, 600);

    });


    document.querySelectorAll("a[href]").forEach((link) => {

        const href = link.getAttribute("href");

        if (
            !href ||
            href.startsWith("#") ||
            href.startsWith("mailto:") ||
            href.startsWith("http")
        ) {
            return;
        }

        link.addEventListener("click", (e) => {

            e.preventDefault();

            document.body.classList.add("page-exit");

            setTimeout(() => {
                window.location.href = href;
            }, 350);

        });

    });


    const clock = document.querySelector(".system-time");

    if (clock) {

        function updateClock() {

            const now = new Date();

            clock.textContent =
                now.toLocaleTimeString("de-DE", {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit"
                });

        }

        updateClock();

        setInterval(updateClock, 1000);

    }


    const magneticButtons = document.querySelectorAll(
        ".primary-button, .secondary-button, .nav-button"
    );

    magneticButtons.forEach((button) => {

        button.addEventListener("mousemove", (e) => {

            const rect = button.getBoundingClientRect();

            const x =
                e.clientX - rect.left - rect.width / 2;

            const y =
                e.clientY - rect.top - rect.height / 2;

            button.style.transform =
                `translate(${x * 0.12}px, ${y * 0.12}px)`;

        });

        button.addEventListener("mouseleave", () => {

            button.style.transform =
                "translate(0, 0)";

        });

    });


    document.addEventListener("keydown", (e) => {

        if (e.key === "Escape") {

            document.body.classList.toggle("reduced-motion");

        }

    });

});
