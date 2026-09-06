const menuBtn = document.querySelector(".three-lines");
const navMenu = document.querySelector(".nav-options");

menuBtn.addEventListener("click", (e) => {
    e.stopPropagation(); // Prevent document click
    navMenu.classList.toggle("show");
});

navMenu.addEventListener("click", (e) => {
    e.stopPropagation(); // Keep menu open when clicking inside it
});

document.addEventListener("click", () => {
    navMenu.classList.remove("show");
});