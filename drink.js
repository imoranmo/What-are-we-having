var submitBtn1 = document.querySelector("#submit");
var drinkNameSpan = document.querySelector(".drinkNameSpan");
var drinkIngrUL = document.querySelector(".drinkIngrUL");
var drinkInstSpan = document.querySelector(".drinkInstSpan");
var drinksavelist = document.querySelector('#drinklist');
var drinksaveBtn = document.querySelector('.drink-save');
var drinkarray=[];
var saveddrinkarray=[];


function drinkChoice() {
  var d = document.getElementById("Drink");
  var inputPosition = d.options[d.selectedIndex];
  var drinkPref = inputPosition.value;

  getCocktail(drinkPref);
}

function getCocktail(drinkPref) {
  var requestUrl =
    "https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=" + drinkPref;

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })

    .then(function (data) {
      displayCocktail(data);
    });
}

function displayCocktail(cocktail) {
  var num = Math.floor(Math.random() * cocktail.drinks.length);

  let drinkSection = document.querySelector(".drink-name");
  let drinkName = document.createElement("span");

  drinkNameSpan.innerHTML = cocktail.drinks[num].strDrink;
  drinkSection.appendChild(drinkName);
  var cocktailname = cocktail.drinks[num].strDrink;
  drinkarray.push(cocktailname);

  let img = document.getElementById("drink-pic");
  img.src = cocktail.drinks[num].strDrinkThumb;

  var requestUrl2 =
    "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" +
    cocktail.drinks[num].idDrink;

  fetch(requestUrl2)
    .then(function (response2) {
      return response2.json();
    })
    .then(function (drink) {
		drinkIngrUL.innerHTML = "";
		console.log("test");

      for (let i = 1; i < 16; i++) {
        console.log(drink);

        if (
          drink.drinks[0][`strIngredient${i}`] == null &&
          drink.drinks[0][`strMeasure${i}`] == null
        ) {
          break;
        }
        if (drink.drinks[0][`strIngredient${i}`] == null) {
          drink.drinks[0][`strIngredient${i}`] = "";
        } else if (drink.drinks[0][`strMeasure${i}`] == null) {
          drink.drinks[0][`strMeasure${i}`] = "";
        }

        let listEl = document.createElement("li");
        listEl.innerHTML =
         drink.drinks[0][`strMeasure${i}`] +
          " " +
        drink.drinks[0][`strIngredient${i}`];
		
		    drinkIngrUL.appendChild(listEl);
      }

      drinkInstSpan.innerHTML = drink.drinks[0].strInstructions;

    });
}

function saveDrinkRecipe() {

  var drinklength = drinkarray.length -1;
  var title = drinkarray[drinklength];
  console.log(title);
  console.log (drinkarray.includes(title));
  console.log(saveddrinkarray);

 if (!saveddrinkarray.includes(title)){
  var newdrink= document.createElement('button');
  newdrink.textContent = title;
  newdrink.setAttribute('name', title)
  drinksavelist.appendChild(newdrink);
  saveddrinkarray.push(title);
  localStorage.setItem('drink recipes', JSON.stringify(saveddrinkarray));
 
 }
 };

 function getsavedDrinkRecipe() {

  var storeddrinkarray = JSON.parse(localStorage.getItem("drink recipes"));

  console.log(title);
  console.log (drinkarray.includes(title));
  console.log(saveddrinkarray);
  console.log(storeddrinkarray);

  if (storeddrinkarray === null){

    return
   }
    if (storeddrinkarray !== null) {
      saveddrinkarray = storeddrinkarray;
      console.log(saveddrinkarray);
    }
  
 if (saveddrinkarray !== ""){

  for (var i = 0; i < saveddrinkarray.length; i++){
  var title = saveddrinkarray[i];
  var newdrink= document.createElement('button');
  newdrink.textContent = title;
  newdrink.setAttribute('name', title)
  drinksavelist.appendChild(newdrink);
 
 }}
 };

 function DrinksavedApi(event) {
  var name = event.target.getAttribute ('name');

  var requestUrl =
    "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" +
    name ;

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
     
      let drinkSection = document.querySelector(".drink-name");
      let drinkName = document.createElement("span");


      console.log(data)
      console.log(data.drinks[0].strDrink)
      drinkNameSpan.innerHTML = data.drinks[0].strDrink;
      
      drinkSection.appendChild(drinkName);

      let img = document.getElementById("drink-pic");
      img.src = data.drinks[0].strDrinkThumb;
      
      drinkIngrUL.innerHTML = "";
  
        for (let i = 1; i < 16; i++) {
          console.log(drink);
  
          if (
            data.drinks[0][`strIngredient${i}`] == null &&
            data.drinks[0][`strMeasure${i}`] == null
          ) {
            break;
          }
          if (data.drinks[0][`strIngredient${i}`] == null) {
            data.drinks[0][`strIngredient${i}`] = "";
          } else if (data.drinks[0][`strMeasure${i}`] == null) {
            data.drinks[0][`strMeasure${i}`] = "";
          }
  
          let listEl = document.createElement("li");
          listEl.innerHTML =
           data.drinks[0][`strMeasure${i}`] +
            " " +
          data.drinks[0][`strIngredient${i}`];
      
          drinkIngrUL.appendChild(listEl);
        }
  
        drinkInstSpan.innerHTML = data.drinks[0].strInstructions;
  

    });
}


 submitBtn1.addEventListener("click", drinkChoice);
 diffDrink.addEventListener("click", drinkChoice);
 drinksaveBtn.addEventListener('click',saveDrinkRecipe);
 drinksavelist.addEventListener("click", DrinksavedApi);

 getsavedDrinkRecipe()