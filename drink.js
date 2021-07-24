//variable for getting drink on submit button
var getDrinkBtn = document.querySelector('#submit');

//variable for gettign drink on Instruction section
var drinkInstructions = document.querySelector('.drinkInstructions');

//adds event listener to submit button that when clicked, the beveragechoice functoin is added
getDrinkBtn.addEventListener('click', beverageChoice);

//function to utilize the dropdown items
function beverageChoice() {
	var bevSelect = document.getElementById('Drink');
	var bevOption = bevSelect.options[bevSelect.selectedIndex];
	var bevChoice = bevOption.value;

    if (bevChoice = "Non-Alcoholic"){

        bevChoice = "Non_Alcoholic"
    }
	getAlcoholicCocktail(bevChoice)
}


//function to fetch from non or with alcoholic beverage
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
		// function that displays the data
		  displayAlcoholicCocktail(data);
		});
	  }
	)
	.catch(function(err) {
	  console.log('Fetch Error :-S', err);
	});
} 

// function that grabs random drink
function displayAlcoholicCocktail(cocktail){
	// randomizer
	var num = Math.floor(Math.random() * cocktail.drinks.length);
	
	console.log(cocktail.drinks[num]);

	//grabs section to put info in
	let drinkSection = document.querySelector('.drinkname');
	// displays the name
	let drinkName = document.createElement('p');
	drinkName.innerHTML = cocktail.drinks[num].strDrink;

	drinkSection.appendChild(drinkName);

	//displays the imag
	let img = document.getElementById('drink-pic');
	img.src = cocktail.drinks[num].strDrinkThumb;


	//works on grabbing id so that the ingredients are displayed
	fetch ('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=' + cocktail.drinks[num].idDrink)
	.then(function(res){
		return res.json();
	})
	.then(
		//loops through array and grabs ingredients
		function(drink){
			for (let i=1; i<16; i++) {
				console.log(drink);
				// if there are no ingredient aka null, then don't display
				if(drink.drinks[0][`strIngredient${i}`]== null || drink.drinks[0][`strMeasure${i}`]== null) {
					break;
				}
				
				//ingredient are put in list form with the measurements
				let ingredient = document.createElement('li')
				ingredient.innerHTML =drink.drinks[0][`strMeasure${i}`] + ': ' +drink.drinks[0][`strIngredient${i}`];

				//appends 
				drinkSection.appendChild(ingredient);
			}
			// instructions are put in paragraph tag
			let instruction = document.createElement('p');
			instruction.innerHTML = drink.drinks[0].strInstructions;

			drinkInstructions.appendChild(instruction);
			console.log(drink.drinks[0].strInstructions);
		
		}
	)
}