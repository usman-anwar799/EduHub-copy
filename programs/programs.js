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

    if (!Array.isArray(data)) {
      throw new Error("API did not return an array");
    }

    const container = document.querySelector(".container");

    if (!container) {
      throw new Error(".container not found");
    }

    const containercontact =
      document.querySelector(".container-contant");

    if (!containercontact) {
      throw new Error(".container-contant not found");
    }

    let filteredData = [...data];
    let currentPage = 1;
    const cardsPerPage = 9;

    container.innerHTML = "";
    container.appendChild(containercontact);
    containercontact.innerHTML = "";

    const getValue = (value) => {
      if (value === null || value === undefined) {
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
        if (!value) continue;

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
        if (!value) continue;

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
        if (!location) continue;

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

      const tempDiv = document.createElement("div");

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

    const container1 = document.createElement("div");

    Object.assign(container1.style, {
      width: "100%",
      margin: "20px 10px",
      boxSizing: "border-box",
      display: "block"
    });

    container.appendChild(container1);

    const cardsCount = document.createElement("div");

    cardsCount.innerText =
      `${filteredData.length} Programs Available`;

    Object.assign(cardsCount.style, {
      listStyle: "none",
      fontSize: "13px",
      color: "blue",
      backgroundColor: "rgba(38, 51, 231, 0.12)",
      fontWeight: "100",
      padding: "4px 8px",
      display: "inline-block",
      borderRadius: "5px",
      border: "0"
    });

    container1.appendChild(cardsCount);

    const mainHeading = document.createElement("h1");

    mainHeading.innerText =
      "Find Programs That Fit You";

    mainHeading.style.marginTop = "15px";

    container1.appendChild(mainHeading);

    const line1 = document.createElement("p");

    line1.innerText =
      "Explore verified programs, check eligibility, and find the right study option.";

    line1.className = "line1-filter";

    container1.appendChild(line1);

    const line2 = document.createElement("p");

    line2.innerText =
      "Search and filter programs by name, level, location, and type.";

    line2.className = "line2-filter";

    container1.appendChild(line2);

    const searchContainer =
      document.createElement("div");

    Object.assign(searchContainer.style, {
      width: "100%",
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      marginTop: "20px",
      boxSizing: "border-box",
      gap: "10px"
    });

    container1.appendChild(searchContainer);

    const searchbar =
      document.createElement("input");

    searchbar.className = "search-bar";
    searchbar.type = "search";
    searchbar.placeholder =
      "Search program by name, type, level, location...";

    Object.assign(searchbar.style, {
      width: "900px",
      maxWidth: "100%",
      display: "block",
      boxSizing: "border-box"
    });

    searchContainer.appendChild(searchbar);
    const searchBtn =
    document.createElement("button");

    searchBtn.innerText = "Search";
    searchBtn.className = "search-btn";

    Object.assign(searchBtn.style, {
      display: "block",
      fontSize: "20px",
      padding: "14px 30px",
      cursor: "pointer",
      border: "0",
      borderRadius: "10px",
      color: "white",
      backgroundColor: "rgb(97, 130, 228)"
    });
    
    searchContainer.appendChild(searchBtn);
    const headingPop = document.createElement("div");
    headingPop.className = "popular-heading";
    headingPop.innerHTML = `
    <h3>Popular program</h3>
    <ul>
        <li class="pop-li">Start with high-interest programs, then compare universities.</li>
    </ul>
   `;
    searchContainer.appendChild(headingPop);
    
    const headingSection =
      document.createElement("div");

    Object.assign(headingSection.style, {
      width: "100%",
      display: "block",
      clear: "both",
      boxSizing: "border-box"
    });

    const popularResult = document.createElement("div");
    // <h3 class="p-title">Popular programs</h3>
    popularResult.className = "cards-container1"
    headingSection.appendChild(popularResult)
    data.forEach((programData)=>{
          const card = document.createElement("div");
          card.innerHTML = ` 
          <div class="active-box">
      
                  <div class="first-part">
                      <div class="icon-box">
                          <i class="fa-solid fa-graduation-cap"></i>
                      </div>
      
                      <h3 class="titling">
                          ${programData.slug}
                      </h3>
                      <div class="type-badge">
                          Popular
                      </div>
                  </div>
      
              </div>`

          popularResult.appendChild(card)
        })
    const headingCard =
      document.createElement("h1");

    headingCard.id = "title-result";
    headingCard.innerText = "Program Result";

    headingCard.style.margin =
      "30px 0px 50px 0px";

    headingSection.appendChild(headingCard);
    container1.appendChild(headingSection);

    const cardsSection =
      document.createElement("div");

    Object.assign(cardsSection.style, {
      width: "100%",
      display: "block",
      clear: "both",
      boxSizing: "border-box"
    });

    const cardsContainer =
      document.createElement("div");

    cardsContainer.classList.add(
      "cards-container"
    );

    Object.assign(cardsContainer.style, {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-around",
      alignItems: "flex-start",
      gap: "30px",
      width: "100%",
      boxSizing: "border-box"
    });

    cardsSection.appendChild(cardsContainer);
    container1.appendChild(cardsSection);

    const paginationSection =
      document.createElement("div");

    Object.assign(paginationSection.style, {
      width: "100%",
      display: "block",
      clear: "both",
      boxSizing: "border-box"
    });

    const pagination =
      document.createElement("div");

    Object.assign(pagination.style, {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "10px",
      margin: "30px 0",
      flexWrap: "wrap",
      width: "100%",
      boxSizing: "border-box"
    });

    paginationSection.appendChild(pagination);
    container1.appendChild(paginationSection);

    const createPagination = () => {
      pagination.innerHTML = "";

      const totalPages = Math.ceil(
        filteredData.length / cardsPerPage
      );

      if (totalPages <= 1) {
        return;
      }

      for (let i = 1; i <= totalPages; i++) {
        const pageButton =
          document.createElement("button");

        pageButton.innerText = i;

        Object.assign(pageButton.style, {
          padding: "10px 15px",
          border: "none",
          borderRadius: "7px",
          cursor: "pointer",
          fontSize: "16px",
          backgroundColor:
            i === currentPage
              ? "blue"
              : "#eee",
          color:
            i === currentPage
              ? "white"
              : "black"
        });

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

        pagination.appendChild(pageButton);
      }
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

        noResult.innerText =
          "No program found.";

        Object.assign(noResult.style, {
          fontSize: "18px",
          color: "grey",
          margin: "30px"
        });

        cardsContainer.appendChild(noResult);

        createPagination();
        return;
      }

      currentCards.forEach((program) => {
        try {
          const box =
            document.createElement("div");

          Object.assign(box.style, {
            backgroundColor: "#fff",
            display: "flex",
            marginBottom: "25px",
            flexDirection: "column",
            padding: "10px",
            borderRadius: "20px",
            width: "340px",
            maxWidth: "100%",
            transition: "all 0.2s",
            cursor: "pointer",
            boxSizing: "border-box",
            transform: "scale(1)"
          });

          box.addEventListener(
            "mouseenter",
            () => {
              box.style.transform =
                "scale(1.04)";
            }
          );

          box.addEventListener(
            "mouseleave",
            () => {
              box.style.transform =
                "scale(1)";
            }
          );

          const firstPart =
            document.createElement("div");

          Object.assign(firstPart.style, {
            width: "100%",
            display: "flex",
            position: "relative"
          });

          box.appendChild(firstPart);

          const icon1 =
            document.createElement("div");

          Object.assign(icon1.style, {
            fontSize: "30px",
            backgroundColor:
              "rgba(128, 128, 128, 0.23)",
            padding: "8px",
            width: "fit-content",
            borderRadius: "10px",
            color: "blue"
          });

          icon1.innerHTML = `
            <i class="fa-solid fa-graduation-cap"></i>
          `;

          firstPart.appendChild(icon1);

          const typeBadge =
            document.createElement("div");

          Object.assign(typeBadge.style, {
            padding: "1.9px 6px",
            borderRadius: "5px",
            backgroundColor: "#9395ff7a",
            color: "purple",
            position: "absolute",
            right: "10px",
            transform: "scale(0.9)",
            height: "fit-content",
            fontSize: "12px"
          });

          const type =
            getProgramType(program);

          typeBadge.innerText =
            type || "Popular";

          firstPart.appendChild(typeBadge);

          const secondPart =
            document.createElement("div");

          Object.assign(secondPart.style, {
            width: "100%",
            padding: "10px 6px"
          });

          box.appendChild(secondPart);

          const heading =
            document.createElement("h3");

          Object.assign(heading.style, {
            margin: "20px 0 15px 0",
            maxWidth: "100%",
            fontFamily:
              "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif"
          });

          heading.classList.add("titling");

          heading.innerText =
            getValue(
              program?.title?.rendered
            ) || "Program Name";

          secondPart.appendChild(heading);

          const btn1 =
            document.createElement("div");

          btn1.style.width = "96%";
          btn1.style.fontSize = "15px";

          secondPart.appendChild(btn1);

          const levelLi =
            document.createElement("div");

          const level =
            getEducationLevel(program);

          levelLi.innerText =
            level || "Level not available";

          levelLi.style.color = "#000000ae";

          btn1.appendChild(levelLi);

          const locationLi =
            document.createElement("div");

          const location =
            getLocation(program);

          locationLi.innerText =
            location || "Location not available";

          Object.assign(locationLi.style, {
            color: "#000000ae",
            marginTop: "5px"
          });

          btn1.appendChild(locationLi);

          const description =
            document.createElement("p");

          Object.assign(description.style, {
            color: "grey",
            fontSize: "14px",
            marginTop: "14px",
            lineHeight: "1.5"
          });

          description.innerText =
            getDescription(program);

          secondPart.appendChild(description);

          const hr1 =
            document.createElement("div");

          Object.assign(hr1.style, {
            height: "1px",
            width: "92%",
            marginTop: "10px",
            marginBottom: "10px",
            backgroundColor:
              "rgba(128, 128, 128, 0.20)"
          });

          secondPart.appendChild(hr1);

          const li45par =
            document.createElement("div");

          Object.assign(li45par.style, {
            display: "flex",
            justifyContent: "space-around",
            width: "100%"
          });

          secondPart.appendChild(li45par);

          const li4 =
            document.createElement("button");

          li4.innerText = "View Details";

          Object.assign(li4.style, {
            width: "100%",
            padding: "7px",
            fontSize: "18px",
            display: "inline-flex",
            justifyContent: "center",
            marginTop: "13px",
            borderRadius: "7px",
            fontWeight: "540",
            border: "0",
            color: "blue",
            cursor: "pointer",
            fontFamily:
              "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif"
          });

          li45par.appendChild(li4);

          li4.addEventListener(
            "click",
            (event) => {
              event.stopPropagation();

              if (program?.link) {
                window.open(
                  program.link,
                  "_blank",
                  "noopener,noreferrer"
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

    const searchPrograms = () => {
      popularResult.style.display = "none"
      headingPop.style.display = "none"
      const searchText =
        searchbar.value
          .trim()
          .toLowerCase();

      filteredData = data.filter(
        (program) => {
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

          return (
            searchText === "" ||
            programName.includes(searchText) ||
            type.includes(searchText) ||
            level.includes(searchText) ||
            location.includes(searchText)
          );
        }
      );

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

    searchbar.addEventListener(
      "keydown",
      (event) => {
        if (event.key === "Enter") {
          searchPrograms();
        }
      }
    );

    showCards(currentPage);

  } catch (error) {
    console.error(
      "Program Error:",
      error
    );
  }
};

uni();
