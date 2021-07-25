var submitBtn1 = document.querySelector("#submit");
var drinkNameSpan = document.querySelector(".drinkNameSpan");
var drinkIngrUL = document.querySelector(".drinkIngrUL");
var drinkInstSpan = document.querySelector(".drinkInstSpan");
var drinksavelist = document.querySelector('#drinklist');
var drinksaveBtn = document.querySelector('.drink-save');
var drinkarray=[];
var drinkidarray =[];
var saveddrinkarray=[];
var savedIDarray =[];

submitBtn1.addEventListener("click", drinkChoice);


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
  var cocktailid = cocktail.drinks[num].idDrink;
  drinkidarray.push(cocktailid);

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
diffDrink.addEventListener("click", drinkChoice);
drinksaveBtn.addEventListener('click',saveRecipe);

function saveRecipe() {

  var drinklength = drinkarray.length -1;
  var title = drinkarray[drinklength];
  var id = drinkidarray[drinklength];
  console.log(title);
  console.log (drinkarray.includes(title));
  console.log(saveddrinkarray);

 if (!saveddrinkarray.includes(title)){
  var newdrink= document.createElement('button');
  newdrink.textContent = title;
  newdrink.setAttribute('ID', id)
  drinksavelist.appendChild(newdrink);
  saveddrinkarray.push(title);
  savedIDarray.push(id);
  localStorage.setItem('drink IDs', savedIDarray);
  localStorage.setItem('drink recipes', saveddrinkarray);
 
 }
 };

