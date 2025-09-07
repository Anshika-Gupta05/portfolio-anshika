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
const form = document.getElementById("contactForm");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = form.querySelector("[data-form-btn]");
const popupOverlay = document.getElementById("popupOverlay");
const popupMessage = document.getElementById("popupMessage");

// Enable/disable button based on form validity
formInputs.forEach((input) => {
  input.addEventListener("input", () => {
    form.checkValidity()
      ? formBtn.removeAttribute("disabled")
      : formBtn.setAttribute("disabled", "");
  });
});

// Replace this with your Apps Script Web App URL
const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbzhXV3NOOzbQyAy1we4398RsAzn_X5RD58nQUFE1QZQtXudaXfl23IDfVqLfYhPlG1RpA/exec";

// Submit handler
form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(form);

  formBtn.disabled = true;
  formBtn.innerHTML = `<ion-icon name="send-outline"></ion-icon><span>Sending...</span>`;

  try {
    await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      body: formData,
      mode: "no-cors", // bypass CORS issues
    });

    // Show success popup
    popupOverlay.style.display = "block";
    popupMessage.style.display = "block";

    // Reset form
    form.reset();
    formBtn.disabled = true;
    formBtn.innerHTML = `<ion-icon name="paper-plane"></ion-icon><span>Send Message</span>`;
  } catch (error) {
    console.error("Error!", error);
    alert("Something went wrong. Please try again.");
    formBtn.disabled = false;
    formBtn.innerHTML = `<ion-icon name="paper-plane"></ion-icon><span>Send Message</span>`;
  }
});

// Close popup
popupOverlay.addEventListener("click", () => {
  popupOverlay.style.display = "none";
  popupMessage.style.display = "none";
});

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    for (let j = 0; j < pages.length; j++) {
      if (this.innerHTML.toLowerCase() === pages[j].dataset.page) {
        pages[j].classList.add("active");
        navigationLinks[j].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[j].classList.remove("active");
        navigationLinks[j].classList.remove("active");
      }
    }
  });
}
