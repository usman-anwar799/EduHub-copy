const menuBtn = document.querySelector(".three-lines");
const navMenu = document.querySelector(".nav-options");

menuBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    navMenu.classList.toggle("show");
});

navMenu.addEventListener("click", (e) => {
    e.stopPropagation();
});

document.addEventListener("click", () => {
    navMenu.classList.remove("show");
});