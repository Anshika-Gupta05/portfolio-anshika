"use strict";

// element toggle function
const elementToggleFunc = function (elem) {
  elem.classList.toggle("active");
};

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () {
  elementToggleFunc(sidebar);
});

// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// enable submit button if form is valid
formInputs.forEach((input) => {
  input.addEventListener("input", function () {
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }
  });
});

// contact form submission
form.addEventListener("submit", function (event) {
  event.preventDefault();

  formBtn.disabled = true;
  formBtn.innerHTML = `<ion-icon name="send-outline"></ion-icon><span>Sending...</span>`;

  const data = {};
  formInputs.forEach((input) => (data[input.name] = input.value));
  data.message = form.querySelector("textarea[name='message']").value;

  fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((result) => {
      if (result.result === "success") {
        document.getElementById("popupOverlay").style.display = "block";
        document.getElementById("popupMessage").style.display = "block";
        form.reset();
        formBtn.disabled = true;
        formBtn.innerHTML = `<ion-icon name="paper-plane"></ion-icon><span>Send Message</span>`;
      } else {
        alert("Something went wrong. Please try again.");
        formBtn.disabled = false;
        formBtn.innerHTML = `<ion-icon name="paper-plane"></ion-icon><span>Send Message</span>`;
      }
    })
    .catch((error) => {
      console.error(error);
      alert("Error sending message.");
      formBtn.disabled = false;
      formBtn.innerHTML = `<ion-icon name="paper-plane"></ion-icon><span>Send Message</span>`;
    });
});

// popup close
document.getElementById("popupOverlay").addEventListener("click", function () {
  document.getElementById("popupOverlay").style.display = "none";
  document.getElementById("popupMessage").style.display = "none";
});

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// page navigation functionality
navigationLinks.forEach((link, index) => {
  link.addEventListener("click", function () {
    pages.forEach((page, i) => {
      if (index === i) {
        page.classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        page.classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    });
  });
});
