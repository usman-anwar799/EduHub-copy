const uni = async () => {
const url =
"https://api-dev.eduhubpak.com/wp-json/wp/v2/university?per_page=100";

const response = await fetch(url);

if (!response.ok) {
throw new Error("Failed to fetch university data");
}

const data = await response.json();

let filteredData = data;

const container = document.querySelector(".container");
const containercontact = document.querySelector(".container-contant");

if (!container || !containercontact) {
throw new Error("Required container not found");
}

const cardsPerPage = 9;
let currentPage = 1;

const elements = crElement();

const getUniversityType = (university) => {
const type =
university.acf?.banner_section?.type ||
university.acf?.banner_section?.university_type ||
university.acf?.banner_section?.institution_type ||
university.acf?.type ||
university.acf?.university_type ||
university.university_type ||
university.type;

if (typeof type === "string") {
return type.toLowerCase().trim();
}

if (type && typeof type === "object") {
return String(
type.name ||
type.title ||
type.value ||
type.label ||
""
)
.toLowerCase()
.trim();
}

return "";

};

const showCards = () => {
elements.cardsContainer.innerHTML = "";

const start = (currentPage - 1) * cardsPerPage;
const end = start + cardsPerPage;

const currentCards = filteredData.slice(start, end);

elements.cardsCount.innerText =
`${filteredData.length} Universities Available`;

elements.headingCard.innerText =
filteredData.length === 0
? "No Universities Found"
: "University Result";

if (currentCards.length === 0) {
const noResult = document.createElement("p");

noResult.innerText = "No universities found.";
noResult.className = "no-result-byJs";

elements.cardsContainer.appendChild(noResult);

createPagination();

return;
}

currentCards.forEach((university) => {
crElement("card", university);
});

createPagination();

};

const createPagination = () => {
elements.pagination.innerHTML = "";

const totalPages = Math.ceil(
filteredData.length / cardsPerPage
);

if (totalPages <= 1) {
return;
}

for (let i = 1; i <= totalPages; i++) {
const button = document.createElement("button");

button.innerText = i;
button.className = "pagination-button-byJs";

if (i === currentPage) {
button.classList.add("active-byJs");
}

button.addEventListener("click", () => {
currentPage = i;

showCards();

elements.cardsSection.scrollIntoView({
  behavior: "smooth",
  block: "start",
});

});

elements.pagination.appendChild(button);
}

};

const searchopt1 = document.querySelector(".opt1");
const searchopt2 = document.querySelector(".opt2");
const opt3 = document.querySelector(".opt3");

const searchUniversities = () => {
const searchText =
elements.searchbar.value.toLowerCase().trim();

const provinceText =
searchopt1?.value?.toLowerCase().trim() || "";

const cityText =
searchopt2?.value?.toLowerCase().trim() || "";

const typeText =
opt3?.value?.toLowerCase().trim() || "";

filteredData = data.filter((university) => {
const universityName =
university.title?.rendered?.toLowerCase() || "";

const location =
university.acf?.banner_section?.location_details;

let city = "";
let province = "";

if (typeof location === "string") {
city = location.toLowerCase().trim();
province = location.toLowerCase().trim();
}

if (location && typeof location === "object") {
city =
location.city?.toLowerCase().trim() || "";

province =
  location.province?.toLowerCase().trim() || "";

}

const type = getUniversityType(university);

const searchMatch =
searchText === "" ||
universityName.includes(searchText) ||
city.includes(searchText) ||
province.includes(searchText) ||
type.includes(searchText);

const provinceMatch =
provinceText === "" ||
provinceText === "all" ||
province.includes(provinceText);

const cityMatch =
cityText === "" ||
cityText === "all" ||
city.includes(cityText);

const typeMatch =
typeText === "" ||
typeText === "all" ||
type.includes(typeText);

return (
searchMatch &&
provinceMatch &&
cityMatch &&
typeMatch
);
});

currentPage = 1;

showCards();

};

elements.searchbar.addEventListener(
"input",
searchUniversities
);

if (searchopt1) {
searchopt1.addEventListener(
"change",
searchUniversities
);
}

if (searchopt2) {
searchopt2.addEventListener(
"change",
searchUniversities
);
}

if (opt3) {
opt3.addEventListener(
"change",
searchUniversities
);
}

elements.searchBtn.addEventListener(
"click",
searchUniversities
);

showCards();

function crElement(type, university) {
if (!type) {
containercontact.innerHTML = "";

const container1 = document.createElement("div");
container1.className = "container1-byJs";

const cardsCount = document.createElement("li");
cardsCount.innerText =
`${filteredData.length} Universities Available`;
cardsCount.className = "cards-count-byJs";

const mainHeading = document.createElement("h1");
mainHeading.innerText =
"Find Universities in Pakistan";
mainHeading.className = "main-heading-byJs";

const line1 = document.createElement("li");
line1.innerText =
"Explore verified universities across Pakistan by location, type, admission cycle, and accreditation.";
line1.className = "line1-filter";

const line2 = document.createElement("li");
line2.innerText =
"Compare institution profiles, campuses, programs, and admissions details before you shortlist.";
line2.className = "line2-filter";

const searchContainer = document.createElement("div");
searchContainer.className =
"search-container-byJs";

const searchbar = document.createElement("input");
searchbar.className = "search-bar";
searchbar.type = "search";
searchbar.placeholder =
"Search name, city, province, accreditation ...";

const li6 = document.createElement("li");
li6.innerText =
"Looking for a specific degree instead?";
li6.className = "li6-byJs";

const searchBtn = document.createElement("button");
searchBtn.innerText = "Search";
searchBtn.className = "search-btn";

searchContainer.appendChild(searchbar);
searchContainer.appendChild(searchBtn);

container1.appendChild(cardsCount);
container1.appendChild(mainHeading);
container1.appendChild(line1);
container1.appendChild(line2);
container1.appendChild(searchContainer);
container1.appendChild(li6);

containercontact.appendChild(container1);

const headingSection = document.createElement("div");
headingSection.className =
"heading-section-byJs";

const headingCard = document.createElement("h1");
headingCard.id = "title-result";
headingCard.innerText = "University Result";

headingSection.appendChild(headingCard);
container.appendChild(headingSection);

const cardsSection = document.createElement("div");
cardsSection.className =
"cards-section-byJs";

const cardsContainer = document.createElement("div");
cardsContainer.className = "cards-container";

cardsSection.appendChild(cardsContainer);
container.appendChild(cardsSection);

const paginationSection = document.createElement("div");
paginationSection.className =
"pagination-section-byJs";

const pagination = document.createElement("div");
pagination.className = "pagination-byJs";

paginationSection.appendChild(pagination);
container.appendChild(paginationSection);

return {
cardsCount,
searchbar,
searchBtn,
headingCard,
cardsSection,
cardsContainer,
pagination,
};
}

if (type === "card") {
const box = document.createElement("div");
box.className = "active-box";

const firstPart = document.createElement("div");
firstPart.className = "first-part-byJs";

const icon1 = document.createElement("div");
icon1.className = "icon1-byJs";
icon1.innerHTML =
'<i class="fa-solid fa-building-columns"></i>';

const hec = document.createElement("div");
hec.className = "hec-byJs";
hec.innerText = "HEC";

const pec = document.createElement("div");
pec.className = "pec-byJs";
pec.innerText = "PEC";

firstPart.appendChild(icon1);
firstPart.appendChild(hec);
firstPart.appendChild(pec);

const secondPart = document.createElement("div");
secondPart.className = "second-part-byJs";

const heading = document.createElement("h3");
heading.className = "titling";
heading.innerText =
university.title?.rendered ||
"University Name";

const btn1 = document.createElement("div");
btn1.className = "btn1-byJs";

const i2 = document.createElement("i");
i2.className = "fa-solid fa-hotel";

const publicLi = document.createElement("li");
publicLi.className =
"university-type-byJs";

const type = getUniversityType(university);

publicLi.innerText = type
? type.charAt(0).toUpperCase() +
type.slice(1)
: "Not Available";

const trophy = document.createElement("i");
trophy.className =
"fa-solid fa-trophy trophy-1";

const rankedLi = document.createElement("li");
rankedLi.innerText = "Not Ranked";
rankedLi.className =
"ranked-li-byJs";

btn1.appendChild(i2);
btn1.appendChild(publicLi);
btn1.appendChild(trophy);
btn1.appendChild(rankedLi);

const description = document.createElement("p");
description.className =
"description-byJs";

const descriptionText =
university.acf?.about_section?.description ||
university.acf?.about_section?.discription ||
"No description available.";

const tempDiv = document.createElement("div");
tempDiv.innerHTML = descriptionText;

const cleanDescription =
tempDiv.textContent ||
tempDiv.innerText ||
"";

const words = cleanDescription
.trim()
.split(/\s+/)
.filter(Boolean);

description.innerText =
words.slice(0, 18).join(" ") +
(words.length > 18 ? "..." : "");

const hr1 = document.createElement("div");
hr1.className = "hr1-byJs";

const viewDetails = document.createElement("button");
viewDetails.innerText = "View Details";
viewDetails.className =
"view-details-byJs";

viewDetails.addEventListener("click", (event) => {
event.stopPropagation();

if (university.link) {
  window.open(
    university.link,
    "\_blank"
  );
}

});

secondPart.appendChild(heading);
secondPart.appendChild(btn1);
secondPart.appendChild(description);
secondPart.appendChild(hr1);
secondPart.appendChild(viewDetails);

box.appendChild(firstPart);
box.appendChild(secondPart);

elements.cardsContainer.appendChild(box);
}

}
};

uni();
crElement({
action: "createCard",
university,
cardsContainer,
getUniversityType
});

crElement("card", university);

const elements = crElement();

crElement()