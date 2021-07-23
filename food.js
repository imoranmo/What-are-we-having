var foodName = document.querySelector('.foodname')
var foodSummary = document.querySelector('.foodsummary')
var submitBtn = document.querySelector ('#submit')

function dietRestrict() {
  var f= document.getElementById("food");
  var result = f.options[f.selectedIndex].value;
  
  if(result === 'Select...'){
    return
  } else if ( result === 'No Restrictions'){

    var diet = 'Whole30';
  } else {

    diet = result
  }
   

  foodApi(diet)

}

function foodApi(diet) {

   var restrict = diet
    
    var requestUrl = 'https://api.spoonacular.com/recipes/random?number=1&diet=' + restrict + '&type=dinner&instructionsRequired=true&apiKey=a939fe0838e141e2b66bcd66bed659ff';
   
    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data)
        var img = document.getElementById("meal-pic");
        img.src = data.recipes[0].image;

        var summary = document.createElement('span');
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
  


  submitBtn.addEventListener('click', dietRestrict)

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