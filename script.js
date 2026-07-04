document.addEventListener("DOMContentLoaded", () => {
    
    // --- Sticky Header Styling on Scroll ---
    const header = document.querySelector(".header");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });

    // --- Mobile Menu Toggle Handler ---
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");
    const navLinks = document.querySelectorAll(".nav-link");

    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
    });

    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            hamburger.classList.remove("active");
            navMenu.classList.remove("active");
        });
    });

    // --- Active Navigation Highlighting (Scroll Spy) ---
    const sections = document.querySelectorAll("section");
    
    window.addEventListener("scroll", () => {
        let currentSectionId = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Evaluates when the scrollbar is roughly inside the targeted viewport element
            if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
                currentSectionId = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${currentSectionId}`) {
                link.classList.add("active");
            }
        });
    });

    // --- Scroll-to-Top Button Functionality ---
    const backToTopBtn = document.getElementById("backToTop");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 400) {
            backToTopBtn.classList.add("show");
        } else {
            backToTopBtn.classList.remove("show");
        }
    });

    backToTopBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    // --- Light Scroll Reveal Animation Engine ---
    const revealElements = document.querySelectorAll(".reveal");

    const revealOnScroll = () => {
        revealElements.forEach(element => {
            const windowHeight = window.innerHeight;
            const elementTop = element.getBoundingClientRect().top;
            const revealPoint = 130; // Threshold boundary (px)

            if (elementTop < windowHeight - revealPoint) {
                element.classList.add("active");
            }
        });
    };

    window.addEventListener("scroll", revealOnScroll);
    // Invoke initially once on page load to display top-fold items
    revealOnScroll();

    // --- Contact Form Input Validation ---
    const contactForm = document.getElementById("contactForm");
    const formSuccessMsg = document.getElementById("formSuccess");

    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        let isFormValid = true;
        const inputs = contactForm.querySelectorAll("input, textarea");

        inputs.forEach(input => {
            const formGroup = input.parentElement;
            
            // Basic value presence verification
            if (!input.value.trim()) {
                formGroup.classList.add("invalid");
                isFormValid = false;
            } else if (input.type === "email") {
                // Regular Expression validation for Email targets
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(input.value.trim())) {
                    formGroup.classList.add("invalid");
                    isFormValid = false;
                } else {
                    formGroup.classList.remove("invalid");
                }
            } else {
                formGroup.classList.remove("invalid");
            }
        });

        if (isFormValid) {
            // Emulate backend receipt handling notification
            formSuccessMsg.style.display = "block";
            contactForm.reset();
            
            setTimeout(() => {
                formSuccessMsg.style.display = "none";
            }, 5000);
        }
    });

    // Remove active alert structures when typing interactively
    contactForm.querySelectorAll("input, textarea").forEach(input => {
        input.addEventListener("input", () => {
            if (input.value.trim()) {
                input.parentElement.classList.remove("invalid");
            }
        });
    });
});