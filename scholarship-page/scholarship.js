const uni = async () => {
  try {
    const url =
      "https://api-dev.eduhubpak.com/wp-json/wp/v2/scholarship?per_page=100";

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const data = await response.json();

    console.log("Scholarship API data:", data);

    let filteredData = [...data];

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

    container1.style.width = "100%";
    container1.style.margin = "20px 10px";
    container1.style.boxSizing = "border-box";
    container1.style.display = "block";

    container.appendChild(container1);
    container1.appendChild(containercontact);

    const cardsCount =
      document.createElement("li");

    cardsCount.innerText =
      `${filteredData.length} Scholarships Available`;

    cardsCount.style.listStyle = "none";
    cardsCount.style.fontSize = "13px";
    cardsCount.style.color = "blue";
    cardsCount.style.backgroundColor =
      "rgba(38, 51, 231, 0.12)";
    cardsCount.style.fontWeight = "100";
    cardsCount.style.padding = "4px 8px";
    cardsCount.style.display = "inline-block";
    cardsCount.style.borderRadius = "5px";
    cardsCount.style.border = "0px";

    containercontact.appendChild(cardsCount);

    const mainHeading =
      document.createElement("h1");

    mainHeading.innerText =
      "Find Scholarships That Fit You";

    mainHeading.style.marginTop = "15px";

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

    searchContainer.style.width = "100%";
    searchContainer.style.display = "flex";
    searchContainer.style.flexWrap = "wrap";
    searchContainer.style.alignItems = "center";
    searchContainer.style.marginTop = "20px";
    searchContainer.style.boxSizing = "border-box";
    searchContainer.style.gap = "10px";

    containercontact.appendChild(searchContainer);

    const searchbar =
      document.createElement("input");

    searchbar.className =
      "search-bar";

    searchbar.type =
      "search";

    searchbar.placeholder =
      "Search scholarship by name, type ...";

    searchbar.style.width =
      "900px";

    searchbar.style.maxWidth =
      "100%";

    searchbar.style.display =
      "block";

    searchbar.style.boxSizing =
      "border-box";

    searchContainer.appendChild(searchbar);

    const searchBtn =
      document.createElement("button");

    searchBtn.innerText =
      "Search";

    searchBtn.style.display =
      "block";

    searchBtn.style.fontSize =
      "20px";

    searchBtn.style.padding =
      "14px 30px";

    searchBtn.className =
      "search-btn";

    searchBtn.style.cursor =
      "pointer";

    searchBtn.style.border =
      "0px";

    searchBtn.style.borderRadius =
      "10px";

    searchBtn.style.color =
      "white";

    searchBtn.style.marginLeft =
      "10px";

    searchBtn.style.backgroundColor =
      "rgb(97, 130, 228)";

    searchContainer.appendChild(searchBtn);

    const headingSection =
      document.createElement("div");

    headingSection.style.width =
      "100%";

    headingSection.style.display =
      "block";

    headingSection.style.clear =
      "both";

    headingSection.style.boxSizing =
      "border-box";

    const headingCard =
      document.createElement("h1");

    headingCard.id =
      "title-result";

    headingCard.innerText =
      "Scholarship Result";

    headingCard.style.margin =
      "30px 0px 50px 0px";

    headingSection.appendChild(headingCard);

    container.appendChild(headingSection);

    const cardsSection =
      document.createElement("div");

    cardsSection.style.width =
      "100%";

    cardsSection.style.display =
      "block";

    cardsSection.style.clear =
      "both";

    cardsSection.style.boxSizing =
      "border-box";

    const cardsContainer =
      document.createElement("div");

    cardsContainer.classList.add(
      "cards-container"
    );

    cardsContainer.style.display =
      "flex";

    cardsContainer.style.flexWrap =
      "wrap";

    cardsContainer.style.justifyContent =
      "space-around";

    cardsContainer.style.alignItems =
      "flex-start";

    cardsContainer.style.gap =
      "30px";

    cardsContainer.style.width =
      "100%";

    cardsContainer.style.boxSizing =
      "border-box";

    cardsSection.appendChild(cardsContainer);

    container.appendChild(cardsSection);

    const paginationSection =
      document.createElement("div");

    paginationSection.style.width =
      "100%";

    paginationSection.style.display =
      "block";

    paginationSection.style.clear =
      "both";

    paginationSection.style.boxSizing =
      "border-box";

    const pagination =
      document.createElement("div");

    pagination.style.display =
      "flex";

    pagination.style.justifyContent =
      "center";

    pagination.style.alignItems =
      "center";

    pagination.style.gap =
      "10px";

    pagination.style.margin =
      "30px 0px";

    pagination.style.flexWrap =
      "wrap";

    pagination.style.width =
      "100%";

    pagination.style.boxSizing =
      "border-box";

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
        filteredData.slice(
          start,
          end
        );

      cardsCount.innerText =
        `${filteredData.length} Scholarships Available`;

      headingCard.innerText =
        filteredData.length === 0
          ? "No Scholarship Found"
          : "Scholarship Result";

      if (
        currentCards.length === 0
      ) {
        const noResult =
          document.createElement("p");

        noResult.innerText =
          "No scholarship found.";

        noResult.style.fontSize =
          "18px";

        noResult.style.color =
          "grey";

        noResult.style.margin =
          "30px";

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

            box.style.backgroundColor =
              "white";

            box.style.display =
              "flex";

            box.style.marginBottom =
              "25px";

            box.style.flexDirection =
              "column";

            box.style.padding =
              "10px";

            box.style.borderRadius =
              "20px";

            box.style.width =
              "340px";

            box.style.maxWidth =
              "100%";

            box.style.transition =
              "all 0.2s";

            box.style.cursor =
              "pointer";

            box.style.boxSizing =
              "border-box";

            box.style.transform =
              "scale(1.07)";

            box.addEventListener(
              "mouseenter",
              () => {
                box.style.transform =
                  "scale(1.13)";
              }
            );

            box.addEventListener(
              "mouseleave",
              () => {
                box.style.transform =
                  "scale(1.07)";
              }
            );

            const firstPart =
              document.createElement("div");

            firstPart.style.width =
              "100%";

            firstPart.style.display =
              "flex";

            firstPart.style.position =
              "relative";

            box.appendChild(firstPart);

            const icon1 =
              document.createElement("div");

            icon1.style.fontSize =
              "30px";

            icon1.style.backgroundColor =
              "rgba(128, 128, 128, 0.23)";

            icon1.style.padding =
              "8px";

            icon1.style.width =
              "fit-content";

            icon1.style.borderRadius =
              "10px";
            icon1.style.color =
              "blue";

            icon1.innerHTML = `
              <i class="fa-solid fa-award"></i>
            `;

            firstPart.appendChild(icon1);

            const hec =
              document.createElement("div");

            hec.style.padding =
              "1.9px 6px";

            hec.style.borderRadius =
              "5px";

            hec.style.backgroundColor =
              "#9395ff7a";

            hec.style.color =
              "purple";

            hec.style.position =
              "absolute";

            hec.style.right =
              "110px";

            hec.style.transform =
              "scale(0.9)";

            hec.style.height =
              "fit-content";

            hec.style.fontSize =
              "12px";

              let type = scholarship.acf.banner_section.type.name;
            hec.innerText =
              type;

            firstPart.appendChild(hec);

            const pec =
              document.createElement("div");

            pec.style.padding =
              "1.9px 6px";

            pec.style.borderRadius =
              "5px";

            pec.style.backgroundColor =
              "#2634ff46";

            pec.style.color =
              "#1e00ff";

            pec.style.position =
              "absolute";

            pec.style.right =
              "10px";

            pec.style.transform =
              "scale(0.9)";

            pec.style.height =
              "fit-content";

            pec.style.fontSize =
              "12px";
              let fundings = scholarship.acf.banner_section.funding_type.name;
            pec.innerText =
              fundings;

            firstPart.appendChild(pec);

            const secondPart =
              document.createElement("div");

            secondPart.style.width =
              "100%";

            secondPart.style.padding =
              "10px 6px";

            box.appendChild(secondPart);

            const heading =
              document.createElement("h3");

            heading.style.margin =
              "20px 0px 15px 0px";

            heading.style.maxWidth =
              "100%";

            heading.classList.add(
              "titling"
            );

            heading.style.fontFamily =
              "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif";

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

            btn1.style.width =
              "96%";

            btn1.style.fontSize =
              "15px";

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

            publicLi.style.color =
              "#000000ae";

            publicLi.style.listStyle =
              "none";

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

            levelLi.style.color =
              "#000000ae";

            levelLi.style.listStyle =
              "none";

            levelLi.style.marginTop =
              "5px";

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

            rankedLi.style.color =
              "#000000ae";

            rankedLi.style.listStyle =
              "none";

            rankedLi.style.marginTop =
              "5px";

            btn1.appendChild(
              rankedLi
            );

            const description =
              document.createElement("p");

            description.style.color =
              "grey";

            description.style.fontSize =
              "14px";

            description.style.marginTop =
              "14px";

            description.style.lineHeight =
              "1.5";

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

            hr1.style.height =
              "1px";

            hr1.style.width =
              "92%";

            hr1.style.marginTop =
              "10px";

            hr1.style.marginBottom =
              "10px";

            hr1.style.backgroundColor =
              "rgba(128, 128, 128, 0.20)";

            secondPart.appendChild(hr1);
            let li45par = document.createElement("div")
            li45par.style.display = "flex"

            li45par.style.justifyContent = "space-around"

            li45par.style.width = "100%"
            secondPart.appendChild(li45par)
            const li4 =
              document.createElement("button");

            li4.innerText =
              `View Details `;

            li4.style.width =
              "45%";

            li4.style.padding =
              "7px";

            li4.style.fontSize =
              "18px";
            li4.style.display =
              "inline-flex";
            li4.style.justifyContent =
              "center";

            li4.style.marginTop =
              "13px";

            li4.style.borderRadius =
              "7px";

            li4.style.fontWeight =
              "540";

            li4.style.border =
              "0px";

            li4.style.color =
              "blue";


            li4.style.cursor =
              "pointer";

            li4.style.fontFamily =
              "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif";

            li45par.appendChild(
              li4
            );
            const li5 =
              document.createElement("button");

            li5.innerText =
              "Apply";

            li5.style.width =
              "45%";

            li5.style.padding =
              "7px";

            li5.style.fontSize =
              "18px";
            li5.style.display =
              "inline-flex";
            li5.style.justifyContent =
              "center";

            li5.style.marginTop =
              "13px";

            li5.style.borderRadius =
              "7px";

            li5.style.fontWeight =
              "540";

            li5.style.border =
              "0px";

            li5.style.color =
              "blue";

            li5.style.backgroundColor =
              "rgba(0, 0, 0, 0.05)";

            li5.style.cursor =
              "pointer";

            li5.style.fontFamily =
              "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif";

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

            box.classList.add(
              "active-box"
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
            filteredData.length /
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

          pageButton.style.padding =
            "10px 15px";

          pageButton.style.border =
            "none";

          pageButton.style.borderRadius =
            "7px";

          pageButton.style.cursor =
            "pointer";

          pageButton.style.fontSize =
            "16px";

          if (
            i === currentPage
          ) {
            pageButton.style.backgroundColor =
              "blue";

            pageButton.style.color =
              "white";
          } else {
            pageButton.style.backgroundColor =
              "#eee";

            pageButton.style.color =
              "black";
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

        filteredData =
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
          filteredData.length
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