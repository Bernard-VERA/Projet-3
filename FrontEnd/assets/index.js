// Récupération des projets de l'architecte avec fetch
const container = document.querySelector(".gallery");

console.log(container);

const getWorks = () => {
    fetch("http://localhost:5678/api/works")
        .then(function(response1) {
            if(response1.ok) {
            return response1.json();
         }
        })
        .then(response => {
            let project = response;
            console.log(project);
        })
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