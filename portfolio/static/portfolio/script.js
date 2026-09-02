/* ================= CURRENT YEAR ================= */

document.getElementById("year").textContent = new Date().getFullYear();


/* ================= DARK MODE ================= */

const themeButton = document.getElementById("themeButton");

themeButton.addEventListener("click", function () {

    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {

        themeButton.innerHTML = '<i class="bi bi-sun"></i>';

        localStorage.setItem("theme", "dark");

    } else {

        themeButton.innerHTML = '<i class="bi bi-moon"></i>';

        localStorage.setItem("theme", "light");

    }

});


/* ================= LOAD SAVED THEME ================= */

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {

    document.body.classList.add("dark-mode");

    themeButton.innerHTML = '<i class="bi bi-sun"></i>';

}


/* ================= MOBILE NAVBAR ================= */

const navLinks = document.querySelectorAll(".nav-link");

const navbarMenu = document.getElementById("navbarMenu");

navLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        if (navbarMenu.classList.contains("show")) {

            const navbarToggle =
                document.querySelector(".navbar-toggler");

            navbarToggle.click();

        }

    });

});


/* ================= SCROLL TO TOP ================= */

const topButton = document.getElementById("topButton");

window.addEventListener("scroll", function () {

    if (window.scrollY > 400) {

        topButton.style.display = "block";

    } else {

        topButton.style.display = "none";

    }

});


topButton.addEventListener("click", function () {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


/* ================= CONTACT FORM ================= */

const contactForm = document.getElementById("contactForm");

const formMessage = document.getElementById("formMessage");


contactForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const name =
        document.getElementById("name").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const message =
        document.getElementById("message").value.trim();


    if (!name || !email || !message) {

        formMessage.innerHTML =
            '<p class="text-danger mt-3">Please fill in all fields.</p>';

        return;

    }


    /*
        This is only frontend validation.

        A static HTML website cannot actually send
        an email by itself.

        Connect this form to Formspree or another
        form service before using it publicly.
    */

    formMessage.innerHTML =
        '<p class="text-success mt-3">Thank you! Your message is ready to send.</p>';

    contactForm.reset();
});

/* ================= ACTIVE NAVIGATION ================= */

const sections =
    document.querySelectorAll("section[id]");

window.addEventListener("scroll", function () {

    let current = "";

    sections.forEach(function (section) {

        const sectionTop =
            section.offsetTop - 150;

        if (window.scrollY >= sectionTop) {

            current = section.getAttribute("id");

        }

    });


    navLinks.forEach(function (link) {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {

            link.classList.add("active");

        }

    });

});