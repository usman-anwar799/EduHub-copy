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
let input = document.querySelector("#Uni-search");
let output = document.querySelector(".uni-nn h1");
let btn = document.querySelector("#btn-search");
let container = document.querySelector(".output-container");

const uniSearch = async () => {
    if (input.value.trim() === "") return;

    output.innerText = "Loading...";

    container.classList.add("show");

    let url = `http://universities.hipolabs.com/search?name=${input.value}`;

    try {
        let response = await fetch(url);
        let data = await response.json();

        if (data.length > 0) {
            output.innerText = data[0].name;
        } else {
            output.innerText = "University not found";
        }
    } catch (err) {
        output.innerText = "Something went wrong!";
    }
};

btn.addEventListener("click", uniSearch);

input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        uniSearch();
    }
});

document.addEventListener("click", function (e) {

    if (
        !container.contains(e.target) &&
        !btn.contains(e.target) &&
        !input.contains(e.target)
    ) {
        container.classList.remove("show");
    }
});
const slider = document.getElementById("slider");
const value = document.getElementById("value");

slider.oninput = function () {
    const marks = Number(this.value);

    value.textContent = marks + "%";

    if (marks < 40) {
        outputer.innerText = "Poor";
        outputer.style.backgroundColor = "red";
        outputer.style.color = "white";

    } else if (marks < 70) {
        outputer.innerText = "Fair";
        outputer.style.backgroundColor = "orange";
        outputer.style.color = "white";

    } else if (marks < 90) {
        outputer.innerText = "Good";
        outputer.style.backgroundColor = "yellow";
        outputer.style.color = "orange";

    } else {
        outputer.innerText = "Excellent";
        outputer.style.backgroundColor = "greenyellow";
        outputer.style.color = "green";
    }
};
const slider2 = document.getElementById("slider2");
const value2 = document.getElementById("value2");
let outputer = document.querySelector("#outputer")
slider2.oninput = function () {
    value2.textContent = this.value;
};