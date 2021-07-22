const getDrinkBtn = document.getElementById('getDrink');
const drinkContainer = document.getElementById('drink');

getDrinkBtn.addEventListener('click',()=> {
	console.log('click');
	fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
	.then(res => res.json())
	.then(res => {
		console.log('res')
		createDrink(res.drinks[0])
	});
});

function createDrink(drink) {
	drinkContainer.innerHTML = `
	<div class = "row">
		<div class = "column five">
			<img src="${drink.strDrinkThumb}" alt = "Drink Image" />
		</div>
	</div>
	
	`;
}


function getAlcoholicCocktail() {
	fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic')
	.then(
	  function(response) {
		if (response.status !== 200) {
		  console.log('Looks like there was a problem. Status Code: ' +
			response.status);
		  return;
		}
  
		// Examine the text in the response
		response.json().then(function(data) {
		  console.log(data);
		});
	  }
	)
	.catch(function(err) {
	  console.log('Fetch Error :-S', err);
	});
} 

getAlcoholicCocktail();