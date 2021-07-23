const getDrinkBtn = document.getElementById('getDrink');
const drinkContainer = document.getElementById('drink');

getDrinkBtn.addEventListener('click', beverageChoice);

function beverageChoice() {
	var bevSelect = document.getElementById('bevPref');
	var bevOption = bevSelect.options[bevSelect.selectedIndex];
	var bevChoice = bevOption.value;
	getAlcoholicCocktail(bevChoice)
}


function getAlcoholicCocktail(bevChoice) {
	fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=' + bevChoice)
	.then(
	  function(response) {
		if (response.status !== 200) {
		  console.log('Looks like there was a problem. Status Code: ' +
			response.status);
		  return;
		}
  
		// Examine the text in the response
		response.json().then(function(data) {
		//   console.log(data);
		  displayAlcoholicCocktail(data);
		});
	  }
	)
	.catch(function(err) {
	  console.log('Fetch Error :-S', err);
	});
} 


function displayAlcoholicCocktail(cocktail){
	var num = Math.floor(Math.random() * cocktail.drinks.length);
	console.log(cocktail.drinks[num]);

	let drinkSection = document.querySelector('#drinkBox');

	let drinkName = document.createElement('h2');
	drinkName.innerHTML = cocktail.drinks[num].strDrink;

	drinkSection.appendChild(drinkName);

	let img = document.createElement('img');
	img.src = cocktail.drinks[num].strDrinkThumb;

	drinkSection.appendChild(img);

	fetch ('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=' + cocktail.drinks[num].idDrink)
	.then(function(res){
		return res.json();
	})
	.then(
		function(drink){
			for (let i=1; i<16; i++) {
				console.log(drink);
		
				if(drink.drinks[0][`strIngredient${i}`] == null) {
					break;
				}
		
				let ingredient = document.createElement('li')
				ingredient.innerHTML =drink.drinks[0][`strMeasure${i}`] + ': ' +drink.drinks[0][`strIngredient${i}`];
				// drink.drinks[0][`strMeasure${i}`] + ': ' + 
				drinkSection.appendChild(ingredient);
			
			}
		}
	)
	

}