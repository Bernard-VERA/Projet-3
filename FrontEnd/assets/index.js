// Récupération des projets de l'architecte avec fetch
const container = document.querySelector(".gallery");
console.log(container);

const getWorks = () => {
    fetch("http://localhost:5678/api/works")
        .then(function(response) {
            if(response.ok) {
            return response.json();
         }
        })
        .then(function(data) {
            let works = data;
            console.log(works);
            works.forEach((work, index) => {
                let newFigure = document.createElement('figure');
            let newImage = document.createElement('img');
                newImage.setAttribute('src', work.imageUrl);
                newImage.setAttribute('alt', work.title);
                newFigure.appendChild(newImage);
                let newFigcaption = document.createElement('figcaption');
                newFigcaption.innerText = work.title;
                newFigure.appendChild(newFigcaption);
            document.querySelector(".gallery").appendChild(newFigure);
            });
        })
        .catch(function(error) {
            console.log(error);
        });
    }
getWorks()


const getCategory = () => {
    fetch("http://localhost:5678/api/categories")
        .then(function(response) {
            if(response.ok) {
            return response.json();
            }
        })
        .then(function(data) {
            let categories = data;
            console.log(categories);
            categories.forEach((category, index) => {
                let newButton = document.createElement('button');
                newButton.innerText = category.name;
            document.querySelector(".category").appendChild(newButton);
            })
        })
    }
getCategory()

   
