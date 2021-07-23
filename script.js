document.querySelector("button").addEventListener("click", () => {
    fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php" + document.querySelector("button").value)
        .then(res => res.json())
        .then(data => {
            if(!data || data.length <= 0){
                throw ("no data received");
            }
            document.querySelector("h2").innerText = data.drinks[0].strDrink;
            document.querySelector("img").src = data.drinks[0].strDrinkThumb;
            document.querySelector("h3").innerText = data.drinks[0].strInstructions;
            document.querySelector("h4").innerText = data.drinks[0].strMeasure;
            document.querySelector("h5").innerText = data.drinks[0].strIngredient;

            if(data.drinks?.length > 1){
                var ctr = 1, index = 1, iterations = 5;
                var x = setDrinks(() => {
                    console.log(data.drinks[index].strDrink)
                    document.querySelector("h2").innerText = data.drinks[index].strDrink;
                    document.querySelector("img").src = data.drinks[index].strDrinkThumb;
                    document.querySelector("h3").innerText = data.drinks[index].strInstructions;
                    document.querySelector("h4").innerText = data.drinks[index].strMeasure;
                    document.querySelector("h5").innerText = data.drinks[index].strIngredient;

                    if (++index >= data.drinks.length) index = 0;
                    if (++ctr >= data.drinks.length * iterations) clearDrinks(x);
                }, interval);
            }
        })

})