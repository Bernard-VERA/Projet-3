// Récupération des projets de l'architecte avec fetch

let allWorks = [];
const getWorks = () => {
    fetch("http://localhost:5678/api/works")
        .then(function(response) {
            if(response.ok) {
            return response.json();
        }
        })
        .then(function(data) {
            allWorks = data
           showWorks()
        })
        .catch(function(error) {
            console.log(error);
        });
    }
getWorks()

const showWorks = (id = null) => {
    document.querySelector(".gallery").innerHTML = ""
    let works = allWorks
        if (id) {
            works = allWorks.filter((work) => {
            return work.categoryId == id
            }) 
        }
   
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
}

// Création du bouton "Tous" dans les catégories

let newButton = document.createElement('button');
    newButton.innerText = "Tous";
    document.querySelector(".category").appendChild(newButton);
    newButton.addEventListener("click",() => {
    showWorks()
    })

// Affichage des catégories

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
                newButton.addEventListener("click",() => {
                    showWorks(category.id)
                })
            })
        })
    }
getCategory()

const logged = sessionStorage.getItem('data.token')
console.log(logged)
    



// Passage en "mode édition"

function switchToEditMode() {
    if(sessionStorage.getItem('token')!= null && localStorage.getItem('userId')!= null) {
        // Bandeau noir "mode édition"
        const editBanner = document.createElement("div");
        editBanner.classList.add("edit-banner");
        const editMode = document.createElement("div");
        const editModeIcon = document.createElement("img");
        editModeIcon.src = "assets/icons/white-pen-to-square.png";
        const editModeText = document.createElement("p");
        editModeText.innerText = "Mode édition";  

        const body = document.querySelector("body");
        body.before(editBanner);
        const header = document.querySelector("header");
        header.style.margin = "auto";
        header.style.marginTop = "100px";

        editBanner.appendChild(editMode);
        editMode.appendChild(editModeIcon);
        editMode.appendChild(editModeText);

        // bouton "modifier" projet
        const pictureEditButton = document.createElement("div");
        pictureEditButton.classList.add("btn-edit", "btn-edit-picture");
        const pictureEditIcon = document.createElement("img");
        pictureEditIcon.src = `assets/icons/pen-to-square.png`;
        const pictureEditText = document.createElement("p");
        pictureEditText.innerText = "modifier";
        
        const modifyProjects = document.querySelector("#updateWorks h2");
        modifyProjects.insertAdjacentElement('afterend',pictureEditButton);
        pictureEditButton.insertAdjacentElement('afterbegin',pictureEditIcon);
        pictureEditButton.appendChild(pictureEditText);

        // bouton logout à la place de login
        const logIn = document.querySelector(".nav-login");
        logIn.innerText = "logout";
        logIn.addEventListener("click",() =>logOut());

        // Effacement des categories
        let filters = document.querySelector(".category")
        filters.style.display = "none";   
    }
}switchToEditMode()



//Remplissage de la fenêtre modale
// Ajout des projets dans la gallerie de la Modale, avec Fetch.

const getWorksInModal = () => { 

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
            newFigure.setAttribute('class', `work-item category-id-0 category-id-${work.categoryId}`);
            newFigure.setAttribute('id', `work-item-${work.id}`);
            
            let newImg = document.createElement('img');
            newImg.setAttribute('src', work.imageUrl);
            newImg.setAttribute('alt', work.title);
            newFigure.appendChild(newImg);
            
            let newLabel = document.createElement('label');
            newLabel.textContent = "Editer";
            newFigure.appendChild(newLabel);

// insertion de l'icone corbeille
            let newIcon = document.createElement('i');
            newIcon.setAttribute('class',"fa-solid fa-trash-can");
            newIcon.classList.add("trashIcon");
            newIcon.style = "color: #f1f2f3";
            newFigure.appendChild(newIcon);
            
            document.querySelector("div.modal-content").appendChild(newFigure);
        });
    })
    .catch(function(err) {
        console.log(err);
    });
    }
    getWorksInModal()
    
    
    
   //Ouverture et fermeture de la modale
    
    let modal = document.querySelector(".modal")
    let modalWrapper = document.querySelector(".modalWrapper")

    //Récupération Bouton "class = btn-edit" pour afficher la modale
    //NE MARCHE PAS ????
    function openModal() {
        modal.style.display = "flex";
    }
    let openModalBtn = document.querySelector(".btn-edit")
    openModalBtn = addEventListener("click",() => {
        openModal()
    })
    
    
   
// Bouton "Ajouter une photo"  pour ouvrir la seconde modale

document.getElementById("addPicture").addEventListener('click', function(event) {
    event.preventDefault();
    let modalWrapper = document.querySelector(".modal");
    modalWrapper.style.display = "none";
    let modalEdit = document.getElementById("#modal-edit");
    modalEdit.style.display = "flex";
})


 //Bouton pour fermer la modale
    
 const closeModal = function() {
    modal.style.display = "none"
}
let closeModalBtn = document.querySelector("#close-modal")
closeModalBtn = addEventListener("click",() => {
    closeModal();
})

