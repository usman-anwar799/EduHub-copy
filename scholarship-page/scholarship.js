const uni = async () => {
    try {
        const url =
            "https://api-dev.eduhubpak.com/wp-json/wp/v2/scholarship?per_page=100";

        const response = await fetch(url);
        
        let data = await response.json();
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }


        console.log("Scholarship API data:", data);


        const container =
            document.querySelector(".container");

        if (!container) {
            throw new Error(".container not found");
        }

        const containercontact =
            document.querySelector(".container-contant");

        if (!containercontact) {
            throw new Error(".container-contant not found");
        }

        container.innerHTML = "";

        const container1 =
            document.createElement("div");

        container1.className = "container1";

        container.appendChild(container1);
        container1.appendChild(containercontact);

        const cardsCount =
            document.createElement("li");

        cardsCount.className = "cards-count";

        cardsCount.innerText =
            `${data.length} Scholarships Available`;

        containercontact.appendChild(cardsCount);

        const mainHeading =
            document.createElement("h1");

        mainHeading.className = "main-heading";

        mainHeading.innerText =
            "Find Scholarships That Fit You";

        containercontact.appendChild(mainHeading);

        const line1 =
            document.createElement("li");

        line1.innerText =
            "Compare verified scholarships, check eligibility, and apply through official channels.";

        line1.className =
            "line1-filter";

        containercontact.appendChild(line1);

        const line2 =
            document.createElement("li");

        line2.innerText =
            "Filter by level, type, location, deadline, and coverage to find options you qualify for.";

        line2.className =
            "line2-filter";

        containercontact.appendChild(line2);

        const searchContainer =
            document.createElement("div");

        searchContainer.className =
            "search-container";

        containercontact.appendChild(searchContainer);

        const searchbar =
            document.createElement("input");

        searchbar.className =
            "search-bar";

        searchbar.type =
            "search";

        searchbar.placeholder =
            "Search scholarship by name, type ...";

        searchContainer.appendChild(searchbar);

        const searchBtn =
            document.createElement("button");

        searchBtn.innerText =
            "Search";

        searchBtn.className =
            "search-btn";

        searchContainer.appendChild(searchBtn);

        const headingSection =
            document.createElement("div");

        headingSection.className =
            "heading-section";

        const headingCard =
            document.createElement("h1");

        headingCard.id =
            "title-result";

        headingCard.innerText =
            "Scholarship Result";

        headingSection.appendChild(headingCard);

        container.appendChild(headingSection);

        const cardsSection =
            document.createElement("div");

        cardsSection.className =
            "cards-section";

        const cardsContainer =
            document.createElement("div");

        cardsContainer.classList.add(
            "cards-container"
        );

        cardsSection.appendChild(cardsContainer);

        container.appendChild(cardsSection);

        const paginationSection =
            document.createElement("div");

        paginationSection.className =
            "pagination-section";

        const pagination =
            document.createElement("div");

        pagination.className =
            "pagination";

        paginationSection.appendChild(pagination);

        container.appendChild(
            paginationSection
        );

        const cardsPerPage = 9;

        let currentPage = 1;

        const getValue = (value) => {
            if (
                value === null ||
                value === undefined
            ) {
                return "";
            }

            if (typeof value === "object") {
                return "";
            }

            return String(value).trim();
        };

        const getScholarshipDate =
            (scholarship) => {
                const dates =
                    scholarship?.acf
                        ?.key_dates_section;

                if (!Array.isArray(dates)) {
                    return "";
                }

                const deadline =
                    dates.find((item) => {
                        const label =
                            getValue(
                                item?.label?.name
                            ).toLowerCase();

                        return (
                            label ===
                            "application deadline"
                        );
                    });

                if (deadline?.exact_date) {
                    return getValue(
                        deadline.exact_date
                    );
                }

                return getValue(
                    dates[0]?.exact_date
                );
            };

        const getLocation =
            (scholarship) => {
                const acf =
                    scholarship?.acf || {};

                const possibleLocations = [
                    acf.location,
                    acf.province,
                    acf.city,
                    acf.location_details,
                    acf.banner_section?.province,
                    acf.banner_section?.city
                ];

                for (
                    const location
                    of possibleLocations
                ) {
                    if (!location) {
                        continue;
                    }

                    if (
                        typeof location ===
                        "string"
                    ) {
                        return location
                            .trim()
                            .toLowerCase();
                    }

                    if (
                        typeof location ===
                        "object"
                    ) {
                        const value =
                            location.name ||
                            location.title ||
                            location.value ||
                            location.label;

                        if (value) {
                            return String(value)
                                .trim()
                                .toLowerCase();
                        }
                    }
                }

                return "";
            };

        const getScholarshipType =
            (scholarship) => {
                const acf =
                    scholarship?.acf || {};

                const possibleTypes = [
                    acf.type,
                    acf.scholarship_type,
                    acf.category,
                    acf.banner_section?.type
                ];

                for (
                    const value
                    of possibleTypes
                ) {
                    if (!value) {
                        continue;
                    }

                    if (
                        typeof value ===
                        "string"
                    ) {
                        return value
                            .trim()
                            .toLowerCase();
                    }

                    if (
                        typeof value ===
                        "object"
                    ) {
                        const objectValue =
                            value.name ||
                            value.title ||
                            value.value ||
                            value.label;

                        if (objectValue) {
                            return String(objectValue)
                                .trim()
                                .toLowerCase();
                        }
                    }
                }

                return "";
            };

        const getEducationLevels =
            (scholarship) => {
                const educationLevels =
                    scholarship?.acf
                        ?.banner_section
                        ?.education_level;

                if (!Array.isArray(educationLevels)) {
                    return "";
                }

                return educationLevels
                    .map((level) => {
                        if (
                            typeof level ===
                            "string"
                        ) {
                            return level.trim();
                        }

                        if (
                            typeof level ===
                                "object" &&
                            level !== null
                        ) {
                            return (
                                level.name ||
                                level.title ||
                                level.value ||
                                level.label ||
                                ""
                            );
                        }

                        return "";
                    })
                    .filter(Boolean)
                    .join(", ");
            };

        const showCards = (page) => {
            cardsContainer.innerHTML = "";

            const start =
                (page - 1) *
                cardsPerPage;

            const end =
                start +
                cardsPerPage;

            const currentCards =
                data.slice(
                    start,
                    end
                );

            cardsCount.innerText =
                `${data.length} Scholarships Available`;

            headingCard.innerText =
                data.length === 0
                    ? "No Scholarship Found"
                    : "Scholarship Result";

            if (
                currentCards.length === 0
            ) {
                const noResult =
                    document.createElement("p");

                noResult.className =
                    "no-result";

                noResult.innerText =
                    "No scholarship found.";

                cardsContainer.appendChild(
                    noResult
                );

                createPagination();

                return;
            }

            currentCards.forEach(
                (scholarship) => {
                    try {
                        const box =
                            document.createElement("div");

                        box.className =
                            "active-box";

                        const firstPart =
                            document.createElement("div");

                        firstPart.className =
                            "first-part";

                        box.appendChild(firstPart);

                        const icon1 =
                            document.createElement("div");

                        icon1.className =
                            "icon1";

                        icon1.innerHTML = `
                            <i class="fa-solid fa-award"></i>
                        `;

                        firstPart.appendChild(icon1);

                        const hec =
                            document.createElement("div");

                        hec.className =
                            "hec";

                        let type =
                            scholarship
                                .acf
                                .banner_section
                                .type
                                .name;

                        hec.innerText =
                            type;

                        firstPart.appendChild(hec);

                        const pec =
                            document.createElement("div");

                        pec.className =
                            "pec";

                        let fundings =
                            scholarship
                                .acf
                                .banner_section
                                .funding_type
                                .name;

                        pec.innerText =
                            fundings;

                        firstPart.appendChild(pec);

                        const secondPart =
                            document.createElement("div");

                        secondPart.className =
                            "second-part";

                        box.appendChild(secondPart);

                        const heading =
                            document.createElement("h3");

                        heading.classList.add(
                            "titling"
                        );

                        heading.innerText =
                            getValue(
                                scholarship?.title?.rendered
                            ) ||
                            "Scholarship Name";

                        secondPart.appendChild(
                            heading
                        );

                        const btn1 =
                            document.createElement("div");

                        btn1.className =
                            "scholarship-info";

                        secondPart.appendChild(
                            btn1
                        );

                        const scholarshipDate =
                            getScholarshipDate(
                                scholarship
                            );

                        const publicLi =
                            document.createElement("li");

                        publicLi.innerText =
                            scholarshipDate ||
                            "Deadline not available";

                        btn1.appendChild(
                            publicLi
                        );

                        const levelLi =
                            document.createElement("li");

                        const levels =
                            getEducationLevels(
                                scholarship
                            );

                        levelLi.innerText =
                            levels ||
                            "Level not available";

                        btn1.appendChild(
                            levelLi
                        );

                        const rankedLi =
                            document.createElement("li");

                        const locationSc =
                            getLocation(
                                scholarship
                            );

                        rankedLi.innerText =
                            locationSc ||
                            "Location not available";

                        btn1.appendChild(
                            rankedLi
                        );

                        const description =
                            document.createElement("p");

                        description.className =
                            "scholarship-description";

                        const editedDescription =
                            scholarship?.acf
                                ?.about_section
                                ?.description ||
                            scholarship?.acf
                                ?.about_section
                                ?.discription ||
                            scholarship?.acf
                                ?.description ||
                            scholarship?.content
                                ?.rendered ||
                            "No description available.";

                        const tempDiv =
                            document.createElement("div");

                        tempDiv.innerHTML =
                            editedDescription;

                        const cleanDescription =
                            tempDiv.textContent ||
                            tempDiv.innerText ||
                            "";

                        const descriptionWords =
                            cleanDescription
                                .trim()
                                .split(/\s+/)
                                .filter(Boolean);

                        const words =
                            descriptionWords
                                .slice(0, 18)
                                .join(" ");

                        description.innerText =
                            words +
                            (
                                descriptionWords.length >
                                18
                                    ? "..."
                                    : ""
                            );

                        secondPart.appendChild(
                            description
                        );

                        const hr1 =
                            document.createElement("div");

                        hr1.className =
                            "card-divider";

                        secondPart.appendChild(hr1);

                        const li45par =
                            document.createElement("div");

                        li45par.className =
                            "buttons-parent";

                        secondPart.appendChild(
                            li45par
                        );

                        const li4 =
                            document.createElement("button");

                        li4.className =
                            "view-details-btn";

                        li4.innerText =
                            "View Details ";

                        li45par.appendChild(
                            li4
                        );

                        const li5 =
                            document.createElement("button");

                        li5.className =
                            "apply-btn";

                        li5.innerText =
                            "Apply";

                        li45par.appendChild(
                            li5
                        );

                        li4.addEventListener(
                            "click",
                            (event) => {
                                event.stopPropagation();

                                if (
                                    scholarship?.link
                                ) {
                                    window.open(
                                        scholarship.link,
                                        "_blank"
                                    );
                                }
                            }
                        );

                        cardsContainer.appendChild(
                            box
                        );

                    } catch (error) {
                        console.error(
                            "Error creating scholarship card:",
                            scholarship,
                            error
                        );
                    }
                }
            );

            createPagination();
        };

        const createPagination =
            () => {
                pagination.innerHTML =
                    "";

                const totalPages =
                    Math.ceil(
                        data.length /
                        cardsPerPage
                    );

                if (
                    totalPages <= 1
                ) {
                    return;
                }

                for (
                    let i = 1;
                    i <= totalPages;
                    i++
                ) {
                    const pageButton =
                        document.createElement("button");

                    pageButton.innerText =
                        i;

                    if (
                        i === currentPage
                    ) {
                        pageButton.classList.add(
                            "active"
                        );
                    }

                    pageButton.addEventListener(
                        "click",
                        () => {
                            currentPage = i;

                            showCards(
                                currentPage
                            );

                            cardsSection.scrollIntoView({
                                behavior: "smooth",
                                block: "start"
                            });
                        }
                    );

                    pagination.appendChild(
                        pageButton
                    );
                }
            };

        const searchopt1 =
            document.querySelector(".opt1");

        const searchopt2 =
            document.querySelector(".opt2");

        const opt3 =
            document.querySelector(".opt3");

        const searchUniversities =
            () => {
                const searchText =
                    searchbar.value
                        .toLowerCase()
                        .trim();

                const optText =
                    searchopt1?.value
                        ?.toLowerCase()
                        .trim() || "";

                const opt2Text =
                    searchopt2?.value
                        ?.toLowerCase()
                        .trim() || "";

                const opt3Text =
                    opt3?.value
                        ?.toLowerCase()
                        .trim() || "";

                data =
                    data.filter(
                        (scholarship) => {
                            const scholarshipName =
                                getValue(
                                    scholarship?.title?.rendered
                                ).toLowerCase();

                            const location =
                                getLocation(
                                    scholarship
                                );

                            const type =
                                getScholarshipType(
                                    scholarship
                                );

                            const date =
                                getScholarshipDate(
                                    scholarship
                                ).toLowerCase();

                            const searchMatch =
                                searchText === "" ||
                                scholarshipName.includes(
                                    searchText
                                ) ||
                                type.includes(
                                    searchText
                                ) ||
                                date.includes(
                                    searchText
                                );

                            const provinceMatch =
                                optText === "" ||
                                optText === "all" ||
                                location.includes(
                                    optText
                                );

                            const cityMatch =
                                opt2Text === "" ||
                                opt2Text === "all" ||
                                location.includes(
                                    opt2Text
                                );

                            const typeMatch =
                                opt3Text === "" ||
                                opt3Text === "all" ||
                                type === opt3Text ||
                                type.includes(
                                    opt3Text
                                );

                            return (
                                searchMatch &&
                                provinceMatch &&
                                cityMatch &&
                                typeMatch
                            );
                        }
                    );

                currentPage = 1;

                showCards(
                    currentPage
                );

                console.log(
                    "Search:",
                    searchText
                );

                console.log(
                    "Results:",
                    data.length
                );
            };

        searchbar.addEventListener(
            "input",
            searchUniversities
        );

        searchBtn.addEventListener(
            "click",
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

        showCards(currentPage);

    } catch (error) {
        console.error(
            "Scholarship Error:",
            error
        );
    }
};

uni();