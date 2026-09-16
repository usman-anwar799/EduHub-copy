const uni = async () => {
  try {
    const url =
      "https://api-dev.eduhubpak.com/wp-json/wp/v2/program?per_page=100";

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const data = await response.json();

    console.log("Program API data:", data);

    let filteredData = [...data];

    const container = document.querySelector(".container");

    if (!container) {
      throw new Error(".container not found");
    }

    const containercontact =
      document.querySelector(".container-contant");

    if (!containercontact) {
      throw new Error(".container-contant not found");
    }

    container.innerHTML = "";
    container.appendChild(containercontact);
    containercontact.innerHTML = "";

    const container1 = document.createElement("div");

    container1.className = "container1";

    container.appendChild(container1);
    container1.appendChild(containercontact);

    const cardsCount = document.createElement("li");

    cardsCount.className = "cards-count";

    cardsCount.innerText =
      `${filteredData.length} Programs Available`;

    containercontact.appendChild(cardsCount);

    const mainHeading = document.createElement("h1");

    mainHeading.className = "main-heading";

    mainHeading.innerText =
      "Find Programs That Fit You";

    containercontact.appendChild(mainHeading);

    const line1 = document.createElement("li");

    line1.innerText =
      "Explore verified programs, check eligibility, and find the right study option.";

    line1.className = "line1-filter";

    containercontact.appendChild(line1);

    const line2 = document.createElement("li");

    line2.innerText =
      "Search and filter programs by name, level, location, and type.";

    line2.className = "line2-filter";

    containercontact.appendChild(line2);

    const searchContainer = document.createElement("div");

    searchContainer.className = "search-container";

    containercontact.appendChild(searchContainer);

    const searchbar = document.createElement("input");

    searchbar.className = "search-bar";
    searchbar.type = "search";
    searchbar.placeholder =
      "Search program by name, type ...";

    searchContainer.appendChild(searchbar);

    const searchBtn = document.createElement("button");

    searchBtn.innerText = "Search";
    searchBtn.className = "search-btn";

    searchContainer.appendChild(searchBtn);

    const headingSection =
      document.createElement("div");

    headingSection.className = "heading-section";

    const headingCard =
      document.createElement("h1");

    headingCard.id = "title-result";
    headingCard.innerText = "Program Result";

    headingSection.appendChild(headingCard);
    container.appendChild(headingSection);

    const cardsSection =
      document.createElement("div");

    cardsSection.className = "cards-section";

    const cardsContainer =
      document.createElement("div");

    cardsContainer.classList.add("cards-container");

    cardsSection.appendChild(cardsContainer);
    container.appendChild(cardsSection);

    const paginationSection =
      document.createElement("div");

    paginationSection.className =
      "pagination-section";

    const pagination =
      document.createElement("div");

    pagination.className = "pagination";

    paginationSection.appendChild(pagination);
    container.appendChild(paginationSection);

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

    const getProgramType = (program) => {
      const acf = program?.acf || {};

      const possibleTypes = [
        acf.type,
        acf.program_type,
        acf.category,
        acf.banner_section?.type,
        acf.banner_section?.program_type
      ];

      for (const value of possibleTypes) {
        if (!value) {
          continue;
        }

        if (typeof value === "string") {
          return value.trim().toLowerCase();
        }

        if (
          typeof value === "object" &&
          value !== null
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

    const getEducationLevel = (program) => {
      const acf = program?.acf || {};

      const possibleLevels = [
        acf.education_level,
        acf.level,
        acf.degree_level,
        acf.banner_section?.education_level,
        acf.banner_section?.level
      ];

      for (const value of possibleLevels) {
        if (!value) {
          continue;
        }

        if (typeof value === "string") {
          return value.trim().toLowerCase();
        }

        if (Array.isArray(value)) {
          const result = value
            .map((item) => {
              if (typeof item === "string") {
                return item.trim();
              }

              if (
                typeof item === "object" &&
                item !== null
              ) {
                return (
                  item.name ||
                  item.title ||
                  item.value ||
                  item.label ||
                  ""
                );
              }

              return "";
            })
            .filter(Boolean)
            .join(", ");

          if (result) {
            return result.toLowerCase();
          }
        }

        if (
          typeof value === "object" &&
          value !== null
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

    const getLocation = (program) => {
      const acf = program?.acf || {};

      const possibleLocations = [
        acf.location,
        acf.province,
        acf.city,
        acf.location_details,
        acf.banner_section?.province,
        acf.banner_section?.city,
        acf.banner_section?.location
      ];

      for (const location of possibleLocations) {
        if (!location) {
          continue;
        }

        if (typeof location === "string") {
          return location.trim().toLowerCase();
        }

        if (
          typeof location === "object" &&
          location !== null
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

    const getDescription = (program) => {
      const acf = program?.acf || {};

      const description =
        acf.about_section?.description ||
        acf.about_section?.discription ||
        acf.description ||
        program?.content?.rendered ||
        "";

      if (!description) {
        return "No description available.";
      }

      const tempDiv =
        document.createElement("div");

      tempDiv.innerHTML = String(description);

      const cleanDescription =
        tempDiv.textContent ||
        tempDiv.innerText ||
        "";

      const words = cleanDescription
        .trim()
        .split(/\s+/)
        .filter(Boolean);

      return (
        words.slice(0, 18).join(" ") +
        (words.length > 18 ? "..." : "")
      );
    };

    const showCards = (page) => {
      cardsContainer.innerHTML = "";

      const start =
        (page - 1) * cardsPerPage;

      const end =
        start + cardsPerPage;

      const currentCards =
        filteredData.slice(start, end);

      cardsCount.innerText =
        `${filteredData.length} Programs Available`;

      headingCard.innerText =
        filteredData.length === 0
          ? "No Program Found"
          : "Program Result";

      if (currentCards.length === 0) {
        const noResult =
          document.createElement("p");

        noResult.className = "no-result";

        noResult.innerText =
          "No program found.";

        cardsContainer.appendChild(noResult);

        createPagination();
        return;
      }

      currentCards.forEach((program) => {
        try {
          const box =
            document.createElement("div");

          box.classList.add("active-box");

          const firstPart =
            document.createElement("div");

          firstPart.className = "first-part";

          box.appendChild(firstPart);

          const icon1 =
            document.createElement("div");

          icon1.className = "icon1";

          icon1.innerHTML = `
            <i class="fa-solid fa-graduation-cap"></i>
          `;

          firstPart.appendChild(icon1);

          const typeBadge =
            document.createElement("div");

          typeBadge.className = "type-badge";

          const type =
            getProgramType(program);

          typeBadge.innerText =
            type || "normal";

          firstPart.appendChild(typeBadge);

          const secondPart =
            document.createElement("div");

          secondPart.className = "second-part";

          box.appendChild(secondPart);

          const heading =
            document.createElement("h3");

          heading.classList.add("titling");

          heading.innerText =
            getValue(
              program?.title?.rendered
            ) || "Program Name";

          secondPart.appendChild(heading);

          const btn1 =
            document.createElement("div");

          btn1.className = "program-info";

          secondPart.appendChild(btn1);

          const levelLi =
            document.createElement("li");

          const level =
            getEducationLevel(program);

          levelLi.innerText =
            level || "Level not available";

          btn1.appendChild(levelLi);

          const locationLi =
            document.createElement("li");

          const location =
            getLocation(program);

          locationLi.innerText =
            location ||
            "Location not available";

          btn1.appendChild(locationLi);

          const description =
            document.createElement("p");

          description.className =
            "program-description";

          description.innerText =
            getDescription(program);

          secondPart.appendChild(description);

          const hr1 =
            document.createElement("div");

          hr1.className =
            "card-divider";

          secondPart.appendChild(hr1);

          const li45par =
            document.createElement("div");

          li45par.className =
            "buttons-parent";

          secondPart.appendChild(li45par);

          const li4 =
            document.createElement("button");

          li4.innerText = "View Details";

          li4.className =
            "view-details-btn";

          li45par.appendChild(li4);

          const li5 =
            document.createElement("button");

          li5.innerText = "Apply";

          li5.className =
            "apply-btn";

          li45par.appendChild(li5);

          li4.addEventListener(
            "click",
            (event) => {
              event.stopPropagation();

              if (program?.link) {
                window.open(
                  program.link,
                  "_blank"
                );
              }
            }
          );

          li5.addEventListener(
            "click",
            (event) => {
              event.stopPropagation();

              if (program?.link) {
                window.open(
                  program.link,
                  "_blank"
                );
              }
            }
          );

          cardsContainer.appendChild(box);

        } catch (error) {
          console.error(
            "Error creating program card:",
            program,
            error
          );
        }
      });

      createPagination();
    };

    const createPagination = () => {
      pagination.innerHTML = "";

      const totalPages =
        Math.ceil(
          filteredData.length /
            cardsPerPage
        );

      if (totalPages <= 1) {
        return;
      }

      for (
        let i = 1;
        i <= totalPages;
        i++
      ) {
        const pageButton =
          document.createElement("button");

        pageButton.innerText = i;

        if (i === currentPage) {
          pageButton.classList.add("active");
        }

        pageButton.addEventListener(
          "click",
          () => {
            currentPage = i;

            showCards(currentPage);

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

    const searchPrograms = () => {
      const searchText =
        getValue(
          searchbar.value
        ).toLowerCase();

      const optText =
        getValue(
          searchopt1?.value
        ).toLowerCase();

      const opt2Text =
        getValue(
          searchopt2?.value
        ).toLowerCase();

      const opt3Text =
        getValue(
          opt3?.value
        ).toLowerCase();

      filteredData =
        data.filter((program) => {
          const programName =
            getValue(
              program?.title?.rendered
            ).toLowerCase();

          const location =
            getLocation(program);

          const type =
            getProgramType(program);

          const level =
            getEducationLevel(program);

          const searchMatch =
            searchText === "" ||
            programName.includes(searchText) ||
            type.includes(searchText) ||
            level.includes(searchText) ||
            location.includes(searchText);

          const provinceMatch =
            optText === "" ||
            optText === "all" ||
            location.includes(optText);

          const cityMatch =
            opt2Text === "" ||
            opt2Text === "all" ||
            location.includes(opt2Text);

          const typeMatch =
            opt3Text === "" ||
            opt3Text === "all" ||
            type === opt3Text ||
            type.includes(opt3Text);

          return (
            searchMatch &&
            provinceMatch &&
            cityMatch &&
            typeMatch
          );
        });

      currentPage = 1;

      showCards(currentPage);

      console.log("Search:", searchText);
      console.log(
        "Results:",
        filteredData.length
      );
    };

    searchbar.addEventListener(
      "input",
      searchPrograms
    );

    searchBtn.addEventListener(
      "click",
      searchPrograms
    );

    if (searchopt1) {
      searchopt1.addEventListener(
        "change",
        searchPrograms
      );
    }

    if (searchopt2) {
      searchopt2.addEventListener(
        "change",
        searchPrograms
      );
    }

    if (opt3) {
      opt3.addEventListener(
        "change",
        searchPrograms
      );
    }

    showCards(currentPage);

  } catch (error) {
    console.error(
      "Program Error:",
      error
    );
  }
};

uni();