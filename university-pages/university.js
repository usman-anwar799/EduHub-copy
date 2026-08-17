const uni = async () => {
    let url = "https://api-dev.eduhubpak.com/wp-json/wp/v2/university?per_page=100";

    let response = await fetch(url);
    let data = await response.json();

    let titleOutput = data[0].slug;

    let title = document.querySelector(".uni-title1");
    title.innerText = titleOutput;
};

uni();