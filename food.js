var foodName = document.querySelector(".foodname");
var foodSummary = document.querySelector(".foodsummary");
var foodNameSpan = document.querySelector(".foodNameSpan");
var foodSumSpan = document.querySelector(".foodSumSpan");
var submitBtn = document.querySelector("#submit");
var foodsaveBtn = document.querySelector('.FoodSave');
var foodsavelist = document.querySelector ('#foodlist');
var foodarray =[];
var foodidarray=[];
var savedfoodarray =[];
var savedIDarray =[];


function dietRestrict(event) {
  event.preventDefault();
  var f= document.getElementById("food");
  var d= document.getElementById("Drink");
  var result = f.options[f.selectedIndex].value;
  var result2 = d.options[d.selectedIndex].value;
  const firstPage = document.querySelector(".menu");
  const mainPage = document.querySelector(".main-page");
  
  if(result === 'main' || result2 === 'main'){
    return
  } else if ( result === 'No Restrictions'){

    var diet = 'Whole30';
  } else {

    diet = result
  }

  if (firstPage.classList.contains("show")) {
      firstPage.classList.remove("show");
      firstPage.classList.add("hide");
  }
  if (mainPage.classList.contains("hide")) {
      mainPage.classList.remove("hide");
      mainPage.classList.add("show");

      getsavedRecipe()
  }

  foodApi(diet)

}

function foodApi(diet) {
  var restrict = diet;

  var requestUrl =
    "https://api.spoonacular.com/recipes/random?number=1&diet=" +
    restrict +
    "&type=dinner&instructionsRequired=true&apiKey=2885da72338b435ab38ea1f0941ae70b";

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var img = document.getElementById("meal-pic");
      img.src = data.recipes[0].image;
      console.log(data)

      foodSumSpan.innerHTML = data.recipes[0].summary;
      foodNameSpan.innerHTML = data.recipes[0].title.toUpperCase();
      foodNameSpan.href = data.recipes[0].sourceUrl;
      var title = data.recipes[0].title.trim();
      foodarray.push(title)
      var id = data.recipes[0].id;
      foodidarray.push(id)

    });
}
function saveRecipe() {

  var foodlength = foodarray.length -1;
  var title = foodarray[foodlength];
  var id = foodidarray[foodlength];
  console.log(title);
  console.log (savedfoodarray.includes(title));
  console.log(savedfoodarray);

 if (!savedfoodarray.includes(title)){
  var newfood= document.createElement('button');
  newfood.textContent = title;
  newfood.setAttribute ('ID', id);
  foodsavelist.appendChild(newfood);
  savedfoodarray.push(title);
  savedIDarray.push(id);
  localStorage.setItem('food recipes', JSON.stringify(savedfoodarray));
  localStorage.setItem('food IDs', JSON.stringify(savedIDarray));
 
 }
 };

 function getsavedRecipe(){
  var storedfoodarray = JSON.parse(localStorage.getItem("food recipes"));
  var storedIDarray = JSON.parse(localStorage.getItem("food IDs"));
  
 if (storedfoodarray === null){

  return
 }
  if (storedfoodarray !== null) {
    savedfoodarray = storedfoodarray;
    savedIDarray = storedIDarray;
  }

  if (savedfoodarray !== "" ){

    for (var i = 0; i <= savedfoodarray.length; i++) {
    var newfood= document.createElement('button');
    var title = savedfoodarray[i];
    console.log(savedfoodarray)
    var id = savedIDarray[i] ; 
    newfood.textContent = title;
    newfood.setAttribute ('ID', id);
    foodsavelist.appendChild(newfood);
   
    }
   }

 };


function foodsavedApi(event) {
  var id = event.target.getAttribute ('ID');

  var requestUrl =
    "https://api.spoonacular.com/recipes/informationBulk?ids=" +
    id +
    "&apiKey=2885da72338b435ab38ea1f0941ae70b";

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var img = document.getElementById("meal-pic");
      img.src = data[0].image;
      console.log(data)

      foodSumSpan.innerHTML = data[0].summary;
      foodNameSpan.innerHTML = data[0].title.toUpperCase();
      foodNameSpan.href = data[0].sourceUrl;
    

    });
}

submitBtn.addEventListener("click", dietRestrict);
foodsaveBtn.addEventListener('click',saveRecipe);
diffFood.addEventListener("click", foodApi);
foodsavelist.addEventListener("click",foodsavedApi)
