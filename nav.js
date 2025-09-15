/**
 * WIREFRAME NAVIGATION - Accessible Hamburger Menu (needs full testing - updates may come)
 */

document.addEventListener("DOMContentLoaded", function () {
  // Find navigation toggle button
  const navToggle = document.querySelector(".nav-toggle");
  const navList = document.querySelector("nav ul");

  if (!navToggle || !navList) {
    console.warn("Navigation toggle or nav list not found");
    return;
  }

  // Set initial ARIA attributes
  navToggle.setAttribute("aria-expanded", "false");

  // Ensure nav list has an ID
  if (!navList.id) {
    navList.id = "main-nav";
  }
  navToggle.setAttribute("aria-controls", navList.id);

  // Toggle function
  function toggleNav() {
    const isExpanded = navToggle.getAttribute("aria-expanded") === "true";

    navToggle.setAttribute("aria-expanded", !isExpanded);
    navList.setAttribute("aria-expanded", !isExpanded);

    if (!isExpanded) {
      // Opening menu - focus first link
      const firstLink = navList.querySelector("a");
      if (firstLink) {
        setTimeout(() => firstLink.focus(), 100);
      }
    }
  }

  // Close menu function
  function closeNav() {
    navToggle.setAttribute("aria-expanded", "false");
    navList.setAttribute("aria-expanded", "false");
    navToggle.focus();
  }

  // Click event
  navToggle.addEventListener("click", function (e) {
    e.preventDefault();
    toggleNav();
  });

  // Keyboard events
  navToggle.addEventListener("keydown", function (e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleNav();
    }
    if (e.key === "Escape") {
      closeNav();
    }
  });

  // Close on outside click (but not on logo)
  document.addEventListener("click", function (e) {
    const logo = document.querySelector(".nav-logo");
    if (
      !navToggle.contains(e.target) &&
      !navList.contains(e.target) &&
      !logo.contains(e.target)
    ) {
      closeNav();
    }
  });

  // Handle window resize
  window.addEventListener("resize", function () {
    if (window.innerWidth > 768) {
      navToggle.setAttribute("aria-expanded", "false");
      navList.setAttribute("aria-expanded", "false");
    }
  });

  // Escape key from anywhere in the nav
  navList.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeNav();
    }
  });
});
