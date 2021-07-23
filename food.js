var foodName = document.querySelector('.foodname')
var foodSummary = document.querySelector('.foodsummary')

function dietRestrict() {


}


function foodApi(diet) {
    
    var requestUrl = 'https://api.spoonacular.com/recipes/random?number=1&diet=Whole30&type=dinner&instructionsRequired=true&apiKey=a939fe0838e141e2b66bcd66bed659ff';
  
    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data)
        var img = document.getElementById("meal-pic");
        img.src = data.recipes[0].image;

        var summary = document.createElement('p');
        summary.innerHTML = data.recipes[0].summary;
        foodSummary.appendChild(summary);

        var link = document.createElement('a');
        var namelink = document.createTextNode(data.recipes[0].title);
        link.appendChild(namelink);
        link.title = data.recipes[0].title;
        link.href = data.recipes[0].sourceUrl;
        foodName.appendChild(link);

      });
  }
  
  foodApi(diet)