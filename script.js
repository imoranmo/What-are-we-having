
submit.onclick = () => {
    const firstPage = document.querySelector(".menu");
    const mainPage = document.querySelector(".main-page");
    
    if (firstPage.classList.contains("show")) {
        firstPage.classList.remove("show");
        firstPage.classList.add("hide");
    }
    if (mainPage.classList.contains("hide")) {
        mainPage.classList.remove("hide");
        mainPage.classList.add("show");
    }
  }