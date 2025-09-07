"use strict";

// Sidebar toggle
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");
const elementToggleFunc = (elem) => elem.classList.toggle("active");
sidebarBtn.addEventListener("click", () => elementToggleFunc(sidebar));

// Form validation and submission
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

formInputs.forEach((input) => {
  input.addEventListener("input", () => {
    form.checkValidity()
      ? formBtn.removeAttribute("disabled")
      : formBtn.setAttribute("disabled", "");
  });
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = {};
  formInputs.forEach((input) => (formData[input.name] = input.value));

  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const result = await res.json();

    if (result.result === "success") {
      document.getElementById("popupOverlay").style.display = "block";
      document.getElementById("popupMessage").style.display = "block";
      form.reset();
      formBtn.setAttribute("disabled", "");
    } else {
      alert("Error sending message: " + result.message);
    }
  } catch (err) {
    console.error("Error!", err);
    alert("Something went wrong. Please try again.");
  }
});

// Popup overlay close
document.getElementById("popupOverlay").addEventListener("click", () => {
  document.getElementById("popupOverlay").style.display = "none";
  document.getElementById("popupMessage").style.display = "none";
});

// Navigation
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");
navigationLinks.forEach((link, idx) => {
  link.addEventListener("click", () => {
    pages.forEach((page, i) => {
      if (link.innerHTML.toLowerCase() === page.dataset.page) {
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
