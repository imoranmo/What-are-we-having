var foodName = document.querySelector(".foodname");
var foodSummary = document.querySelector(".foodsummary");
var foodNameSpan = document.querySelector(".foodNameSpan");
var foodSumSpan = document.querySelector(".foodSumSpan");
var submitBtn = document.querySelector("#submit");

function dietRestrict() {
  var f = document.getElementById("food");
  var d = document.getElementById("Drink");
  var result = f.options[f.selectedIndex].value;
  var result2 = d.options[d.selectedIndex].value;
  var diet = "Whole30";

  if (result === "Select..." || result2 === "Select...") {
    return;
  } else if (result !== "No Restrictions") {
    diet = result;
  }

  foodApi(diet);
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

function foodApi(diet) {
  var restrict = diet;

  var requestUrl =
    "https://api.spoonacular.com/recipes/random?number=1&diet=" +
    restrict +
    "&type=dinner&instructionsRequired=true&apiKey=c1a6609bf5cd459b8edf7e10b8005c91";

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var img = document.getElementById("meal-pic");
      img.src = data.recipes[0].image;

      foodSumSpan.innerHTML = data.recipes[0].summary;

      // var link = document.createElement('a');
      // var namelink = document.createTextNode(data.recipes[0].title);//
      //  link.appendChild(namelink);//
      foodNameSpan.innerHTML = data.recipes[0].title.toUpperCase();
      //link.title = data.recipes[0].title;//
      foodNameSpan.href = data.recipes[0].sourceUrl;

      // foodNameSpan.innerHTML = link;

	  
    });
}

submitBtn.addEventListener("click", dietRestrict);
diffFood.addEventListener("click", foodApi);
