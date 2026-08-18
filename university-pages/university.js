const uni = async () => {
  try {
    let url =
      "https://api-dev.eduhubpak.com/wp-json/wp/v2/university?per_page=100";

    let response = await fetch(url);

    if (!response.ok) {
      throw new Error("API request failed");
    }

    let data = await response.json();

    console.log(data);

    let cardsPerPage = 9;
    let currentPage = 1;

    let container = document.querySelector(".container");

    if (!container) {
      throw new Error("Container not found");
    }

    let pagination = document.createElement("div");

    pagination.style.display = "flex";
    pagination.style.justifyContent = "center";
    pagination.style.alignItems = "center";
    pagination.style.gap = "10px";
    pagination.style.margin = "30px 0";
    pagination.style.flexWrap = "wrap";

    const showCards = (page) => {
      container.innerHTML = "";

      let start = (page - 1) * cardsPerPage;
      let end = start + cardsPerPage;

      let currentCards = data.slice(start, end);

      console.log("Page:", page);
      console.log("Cards:", currentCards);

      currentCards.forEach((university) => {
        let box = document.createElement("div");

        box.style.backgroundColor = "white";
        box.style.display = "inline-flex";
        box.style.margin = "30px";
        box.style.flexDirection = "column";
        box.style.padding = "10px";
        box.style.borderRadius = "20px";
        box.style.width = "340px";
        box.style.marginLeft = "10px";
        box.style.transition = "all 0.2s";
        box.style.cursor = "pointer";
        box.style.boxSizing = "border-box";
        box.style.scale = "1.07";

        box.addEventListener("mouseenter", () => {
          box.style.scale = "1.13";
        });

        box.addEventListener("mouseleave", () => {
          box.style.scale = "1.07";
        });

        let firstPart = document.createElement("div");

        firstPart.style.width = "100%";
        firstPart.style.display = "flex";
        firstPart.style.position = "relative";

        box.appendChild(firstPart);

        let icon1 = document.createElement("div");

        icon1.style.fontSize = "30px";
        icon1.style.backgroundColor = "rgba(128, 128, 128, 0.23)";
        icon1.style.padding = "8px";
        icon1.style.width = "fit-content";
        icon1.style.borderRadius = "10px";

        icon1.innerHTML = `
          <i class="fa-solid fa-building-columns"
          style="color: rgb(0, 138, 247);"></i>
        `;

        firstPart.appendChild(icon1);

        let hec = document.createElement("div");

        hec.style.padding = "1.9px 6px";
        hec.style.borderRadius = "5px";
        hec.style.backgroundColor = "skyblue";
        hec.style.color = "blue";
        hec.style.position = "absolute";
        hec.style.right = "55px";
        hec.style.scale = "0.9";
        hec.style.height = "fit-content";
        hec.style.fontSize = "12px";

        hec.innerText = "HEC";

        firstPart.appendChild(hec);

        let pec = document.createElement("div");

        pec.style.padding = "1.9px 6px";
        pec.style.borderRadius = "5px";
        pec.style.backgroundColor = "yellowgreen";
        pec.style.color = "green";
        pec.style.position = "absolute";
        pec.style.right = "10px";
        pec.style.scale = "0.9";
        pec.style.height = "fit-content";
        pec.style.fontSize = "12px";

        pec.innerText = "PEC";

        firstPart.appendChild(pec);

        let secondPart = document.createElement("div");

        secondPart.style.width = "100%";
        secondPart.style.padding = "10px 6px";

        box.appendChild(secondPart);

        let heading = document.createElement("h3");

        heading.style.margin = "20px 0px 15px 0px";
        heading.style.maxWidth = "100%";

        heading.classList.add("titling");

        heading.style.fontFamily =
          `'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif`;

        heading.innerText =
          university.title?.rendered || "University Name";

        secondPart.appendChild(heading);

        let btn1 = document.createElement("div");

        btn1.style.width = "96%";
        btn1.style.backgroundColor = "rgba(128, 128, 128, 0.119)";
        btn1.style.padding = "10px";
        btn1.style.borderRadius = "10px";
        btn1.style.fontSize = "13px";
        btn1.style.display = "flex";
        btn1.style.flexWrap = "wrap";
        btn1.style.alignItems = "center";

        secondPart.appendChild(btn1);

        let i2 = document.createElement("i");

        i2.className = "fa-solid fa-hotel";
        i2.style.margin = "0px 6px 0px 10px";

        btn1.appendChild(i2);

        let li1 = document.createElement("li");

        li1.innerText = "Public";
        li1.style.paddingLeft = "13px";
        li1.style.margin = "0px 19px 0px 25px";
        li1.style.color = "grey";

        btn1.appendChild(li1);

        let i1 = document.createElement("i");

        i1.innerHTML = `
          <i class="fa-solid fa-trophy trophy-1"></i>
        `;

        i1.style.margin = "0px 19px 0px 0px";

        btn1.appendChild(i1);

        let li2 = document.createElement("li");

        li2.innerText = "Not Ranked";
        li2.style.margin = "0px 0px 0px 15px";
        li2.style.color = "grey";
        li2.style.padding = "0px 0px 0px 12px";

        btn1.appendChild(li2);

        let discription = document.createElement("p");

        discription.style.color = "grey";
        discription.style.fontSize = "14px";
        discription.style.marginTop = "14px";
        discription.style.lineHeight = "1.5";

        let editedDescription =
          university.acf?.about_section?.description ||
          "No description available.";

        let tempDiv = document.createElement("div");

        tempDiv.innerHTML = editedDescription;

        let cleanDescription =
          tempDiv.textContent || tempDiv.innerText || "";

        let words = cleanDescription
          .trim()
          .split(/\s+/)
          .slice(0, 18)
          .join(" ");

        discription.innerText =
          words + (cleanDescription.split(/\s+/).length > 18 ? "..." : "");

        secondPart.appendChild(discription);

        let hr1 = document.createElement("div");

        hr1.style.height = "1px";
        hr1.style.width = "92%";
        hr1.style.marginTop = "10px";
        hr1.style.marginBottom = "10px";
        hr1.style.backgroundColor =
          "rgba(128, 128, 128, 0.20)";

        secondPart.appendChild(hr1);

        let li4 = document.createElement("button");

        li4.innerText = "View Details";

        li4.style.width = "95%";
        li4.style.padding = "7px";
        li4.style.fontSize = "19px";
        li4.style.marginTop = "13px";
        li4.style.borderRadius = "7px";
        li4.style.fontWeight = "540";
        li4.style.border = "0px";
        li4.style.color = "blue";
        li4.style.backgroundColor = "rgba(0, 0, 0, .1)";
        li4.style.cursor = "pointer";

        li4.style.fontFamily =
          `'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif`;

        secondPart.appendChild(li4);

        box.classList.add("active-box");

        container.appendChild(box);
      });

      createPagination();
    };

    const createPagination = () => {
      pagination.innerHTML = "";

      let totalPages = Math.ceil(data.length / cardsPerPage);

      for (let i = 1; i <= totalPages; i++) {
        let pageButton = document.createElement("button");

        pageButton.innerText = i;

        pageButton.style.padding = "10px 15px";
        pageButton.style.border = "none";
        pageButton.style.borderRadius = "7px";
        pageButton.style.cursor = "pointer";
        pageButton.style.fontSize = "16px";

        if (i === currentPage) {
          pageButton.style.backgroundColor = "blue";
          pageButton.style.color = "white";
        } else {
          pageButton.style.backgroundColor = "#eee";
          pageButton.style.color = "black";
        }

        pageButton.addEventListener("click", () => {
          currentPage = i;

          showCards(currentPage);

          container.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });
        });

        pagination.appendChild(pageButton);
      }
    };

    container.parentElement.appendChild(pagination);

    showCards(currentPage);

  } catch (error) {
    console.error("Error:", error);
  }
};

uni();