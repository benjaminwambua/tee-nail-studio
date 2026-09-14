 /* ========================================
   TEE NAIL STUDIO
   MAIN JAVASCRIPT
======================================== */


/* ========================================
   MOBILE MENU
======================================== */

const nav = document.querySelector(".nav");
const menuToggle = document.querySelector(".menu-toggle");

if (menuToggle) {

    menuToggle.addEventListener("click", () => {

        const isOpen = nav.classList.toggle("open");

        menuToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

    });

}


/* ========================================
   NAVIGATION
======================================== */

const navLinks = document.querySelectorAll(".nav a");

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        // Remove active state from every link
        navLinks.forEach(item => {
            item.classList.remove("active");
        });

        // Add active state to clicked link
        link.classList.add("active");

        // Close mobile menu
        if (nav) {
            nav.classList.remove("open");
        }

    });

});


/* ========================================
   ACTIVE NAVIGATION WHILE SCROLLING
======================================== */

const sections = document.querySelectorAll(
    "#home, #services, #gallery, #why-tee, #booking, #contact"
);

const updateActiveNavigation = () => {

    let currentSection = "home";

    sections.forEach(section => {

        const sectionTop =
            section.getBoundingClientRect().top;

        /*
           150px gives us a comfortable point
           underneath the sticky navigation.
        */

        if (sectionTop <= 150) {
            currentSection = section.id;
        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") ===
            `#${currentSection}`
        ) {
            link.classList.add("active");
        }

    });

};


window.addEventListener(
    "scroll",
    updateActiveNavigation
);

window.addEventListener(
    "load",
    updateActiveNavigation
);


/* ========================================
   WHATSAPP
======================================== */

const CONFIG = {

    // Replace this with the real TEE WhatsApp number.
    // Digits only, including country code.
    whatsappNumber: "254746063187"

};

const whatsappBase =
    `https://wa.me/${CONFIG.whatsappNumber}`;


const whatsappLink =
    document.querySelector("#whatsapp-link");

if (whatsappLink) {

    whatsappLink.href =
        whatsappBase +
        "?text=" +
        encodeURIComponent(
            "Hi TEE Nail Studio! I'd like to book an appointment."
        );

}


const footerWhatsapp =
    document.querySelector("#footer-whatsapp");

if (footerWhatsapp) {

    footerWhatsapp.href =
        whatsappBase +
        "?text=" +
        encodeURIComponent(
            "Hi TEE Nail Studio! I'd like to make an enquiry."
        );

}


/* ========================================
   BOOKING FORM
======================================== */

const bookingForm =
    document.querySelector("#booking-form");

if (bookingForm) {

    bookingForm.addEventListener(
        "submit",
        (event) => {

            event.preventDefault();

            const name =
                document.querySelector("#name").value.trim();

            const phone =
                document.querySelector("#phone").value.trim();

            const email =
                document.querySelector("#email").value.trim();    

            const service =
                document.querySelector("#service").value;

            const date =
                document.querySelector("#date").value;

            const time =
                document.querySelector("#time").value;

            const notes =
                document.querySelector("#notes").value.trim();


            const message = [

                "Hi TEE Nail Studio! I'd like to book an appointment.",
                "",

                `Name: ${name}`,
                `Phone: ${phone}`,
                `Email: ${email}`,
                `Service: ${service}`,
                `Preferred date: ${date}`,
                `Preferred time: ${time}`,

                notes
                    ? `Notes: ${notes}`
                    : ""

            ]
            .filter(Boolean)
            .join("\n");


            window.open(
                whatsappBase +
                "?text=" +
                encodeURIComponent(message),

                "_blank"
            );

        }
    );

}


/* ========================================
   GALLERY LIGHTBOX
======================================== */

const lightbox =
    document.querySelector("#lightbox");

const lightboxImage =
    document.querySelector("#lightbox-image");


const galleryItems =
    document.querySelectorAll(
        "[data-lightbox]"
    );


galleryItems.forEach(item => {

    item.addEventListener(
        "click",
        () => {

            lightboxImage.src =
                item.dataset.lightbox;

            lightboxImage.alt =
                item.querySelector("img")?.alt ||
                "TEE Nail Studio gallery image";

            lightbox.classList.add("open");

        }
    );

});


const lightboxClose =
    document.querySelector(".lightbox-close");


if (lightboxClose) {

    lightboxClose.addEventListener(
        "click",
        () => {

            lightbox.classList.remove("open");

        }
    );

}


if (lightbox) {

    lightbox.addEventListener(
        "click",
        event => {

            if (event.target === lightbox) {

                lightbox.classList.remove("open");

            }

        }
    );

}


/* ========================================
   ESCAPE KEY FOR LIGHTBOX
======================================== */

document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {

            if (lightbox) {
                lightbox.classList.remove("open");
            }

        }

    }
);


/* ========================================
   FOOTER YEAR
======================================== */

const year =
    document.querySelector("#year");

if (year) {

    year.textContent =
        new Date().getFullYear();

}


/* ========================================
   PREVENT PAST BOOKING DATES
======================================== */

const dateInput =
    document.querySelector("#date");

if (dateInput) {

    dateInput.min =
        new Date()
            .toISOString()
            .split("T")[0];

}