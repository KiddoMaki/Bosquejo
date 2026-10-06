"use strict";

const landingView = document.querySelector("#landingView");
const menuView = document.querySelector("#menuView");
const siteFooter = document.querySelector("#contacto");
const menuNavButton = document.querySelector("#menuNavButton");
const menuTitle = document.querySelector("#menuTitle");
const reservationForm = document.querySelector("#reservationForm");
const reservationName = document.querySelector("#reservationName");
const reservationDate = document.querySelector("#reservationDate");
const reservationFeedback = document.querySelector("#reservationFeedback");
let menuOpener;

function updateMinimumReservationDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1);
  const day = String(today.getDate());
  const formattedMonth = month.length === 1 ? `0${month}` : month;
  const formattedDay = day.length === 1 ? `0${day}` : day;

  reservationDate.min = `${year}-${formattedMonth}-${formattedDay}`;
}

function closeMobileNavigation() {
  const navigation = document.querySelector("#mainNavigation");

  if (navigation.classList.contains("show")) {
    document.querySelector(".navbar-toggler").click();
  }
}

function showMenu(event) {
  menuOpener = event.currentTarget;
  landingView.hidden = true;
  menuView.hidden = false;
  siteFooter.hidden = true;
  menuNavButton.setAttribute("aria-expanded", "true");
  document.body.classList.add("menu-view-active");
  closeMobileNavigation();
  window.scrollTo({ top: 0, behavior: "smooth" });
  menuTitle.focus();
}

function showLanding() {
  const menuWasVisible = !menuView.hidden;

  menuView.hidden = true;
  landingView.hidden = false;
  siteFooter.hidden = false;
  menuNavButton.setAttribute("aria-expanded", "false");
  document.body.classList.remove("menu-view-active");

  if (menuWasVisible && !window.location.hash) {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

document.querySelectorAll("[data-open-menu]").forEach((button) => {
  button.addEventListener("click", showMenu);
});

document.querySelectorAll("[data-close-menu]").forEach((button) => {
  button.addEventListener("click", () => {
    showLanding();
    document.querySelector("#inicio").scrollIntoView({ behavior: "smooth" });
    const mobileNavigationToggle = document.querySelector(".navbar-toggler");
    const openerIsInMobileNavigation =
      menuOpener.closest("#mainNavigation") &&
      mobileNavigationToggle.getClientRects().length > 0;

    (openerIsInMobileNavigation ? mobileNavigationToggle : menuOpener).focus();
    menuOpener = null;
  });
});

menuNavButton.addEventListener("click", showMenu);

document.querySelectorAll("[data-landing-link]").forEach((link) => {
  link.addEventListener("click", () => {
    showLanding();
    closeMobileNavigation();
  });
});

updateMinimumReservationDate();
const clearReservationFeedback = () => {
  reservationFeedback.hidden = true;
};

reservationForm.addEventListener("input", clearReservationFeedback);
reservationForm.addEventListener("change", clearReservationFeedback);

reservationName.addEventListener("input", () => {
  reservationName.setCustomValidity("");
});

reservationDate.addEventListener("change", () => {
  reservationDate.setCustomValidity("");
});

reservationForm.addEventListener("submit", (event) => {
  event.preventDefault();
  updateMinimumReservationDate();

  if (reservationDate.value < reservationDate.min) {
    reservationDate.setCustomValidity("No se puede reservar en una fecha pasada.");
    reservationDate.reportValidity();
    return;
  }

  reservationDate.setCustomValidity("");

  const formData = new FormData(reservationForm);
  const customerName = String(formData.get("nombre")).trim();

  if (!customerName) {
    reservationName.setCustomValidity("Ingresa tu nombre.");
    reservationName.reportValidity();
    return;
  }

  const reservationDay = reservationDate.value.split("-").map(Number);
  const formattedDate = new Date(
    reservationDay[0],
    reservationDay[1] - 1,
    reservationDay[2],
  ).toLocaleDateString("es-EC", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  reservationFeedback.replaceChildren();
  const message = document.createElement("p");
  message.textContent = `Gracias, ${customerName}. Recibimos tu solicitud para el ${formattedDate} a las ${formData.get("hora")}. Para confirmar disponibilidad, comunícate con Domus Fuego al `;

  const phoneLink = document.createElement("a");
  phoneLink.href = "tel:0983067670";
  phoneLink.textContent = "0983067670";
  phoneLink.setAttribute("aria-label", "Llamar a Domus Fuego al 0983067670 para confirmar la reserva");
  message.append(phoneLink, ".");

  reservationFeedback.append(message);
  reservationFeedback.hidden = false;
  reservationFeedback.focus();
});
