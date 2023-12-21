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
                newFigcaption.textContent = work.title;
                newFigure.appendChild(newFigcaption);
            document.querySelector("div.gallery").appendChild(newFigure);
            });
        })
        .catch(function(error) {
            console.log(error);
        });
    }
getWorks()


const getCategories = () => {
    fetch("http://localhost:5678/api/categories")
        .then(function(response2) {
            if(response2.ok) {
            return response2.json();
            }
        })
        .then(response => {
            let categories = response
         
            console.log(categories);
        })
    }
    getCategories()

   
/* 
.then(function (data) {
            for(project in data) {
                container.innerHTML +=
                `<figure>
                    <img src="assets/images/abajour-tahina.png" alt="Abajour Tahina">
                    <figcaption>Abajour Tahina</figcaption>
                </figure>`
            
        }})
 
 function createGallery() {
            const createfigure = document.createElement("figure");
            const imageElement = document.createElement("img");
            imageElement.src = project.imageUrl;
            const altElement = document.createElement("alt");
            altElement.innerText = project.title;
            
            const createFigcaption = document.createElement("figcaption");
            createFigcaption.innerText = project.title;
            }


    
            const gallery = document.querySelector(".gallery");
gallery.appendChild(imageElement);
sectionFiches.appendChild(nomElement);
sectionFiches.appendChild(prixElement);
sectionFiches.appendChild(categorieElement);
*/