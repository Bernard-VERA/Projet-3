// Récupération des projets de l'architecte avec fetch pour page d'accueil

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

// Création du bouton "Tous" dans les catégories de la page d'accueil

let newButton = document.createElement('button');
    newButton.innerText = "Tous";
    document.querySelector(".category").appendChild(newButton);
    newButton.addEventListener("click",() => {
    showWorks()
    })

// Affichage des catégories dans la page d'accueil

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
    



// création du "mode édition"

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

        // Afficher logout à la place de login dans le "mode édition"
        const logIn = document.querySelector(".nav-login");
        logIn.innerText = "logout";
        logIn.classList.add("nav-logout");
        logIn.addEventListener("click",() => logOut());

        // Effacement des categories dans le "mode édition"
        let filters = document.querySelector(".category")
        filters.style.display = "none"; 

        //ouvrir la première modale avec le bouton "modifier"
        let openModalBtn = document.querySelector(".btn-edit")
        openModalBtn.addEventListener("click",() => {
            openModal()
        })








        
    }
}
switchToEditMode()

//Cliquer sur "logout" pour se déconnecter
    document.querySelector('.nav-logout').addEventListener('click', function(event) {
    event.preventDefault();
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('token');
    window.location.replace('index.html');
})

//Remplissage de la première fenêtre modale
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
            
            

// insertion de l'icone corbeille sur chaque image dans la modale
            let newIcon = document.createElement('i');
            newIcon.setAttribute('class',"fa-solid fa-trash-can");
            newIcon.classList.add("trashIcon");
            newIcon.setAttribute("id","trashIcon")
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

// Fonction pour afficher la modale en cliquant sur "modifier"
function openModal() {
    modal.style.display = "flex";
}

     
// Bouton "Ajouter une photo"  pour ouvrir la seconde modale
document.getElementById("addPicture").addEventListener('click', function(event) {
    event.preventDefault();
    let modalWrapperBtn = document.querySelector(".modalWrapper");
    modalWrapperBtn.style.display = "none";
    let modalEditBtn = document.getElementById("modal-edit");
    modalEditBtn.style.display = "flex";
})

 // Fonction pour fermer les modales en cliquant à l'extèrieur des modales
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none"
    }
}

 //Bouton x  pour fermer la première modale  
    const closeModal = function() {
    modal.style.display = "none"
}
let closeModalBtn = document.querySelector("#close-modal")
    closeModalBtn.addEventListener("click",() => {
    closeModal();
})

// Bouton x pour fermer la deuxième modale
let closeModalEditBtn = document.querySelector("#close-modalEdit")
    closeModalEditBtn.addEventListener("click",() => {
    closeModal();
})

// Bouton flèche gauche pour revenir à la première modale
document.getElementById("returnArrow").addEventListener('click', function(event) {
    event.preventDefault();
    let modalEditReturnBtn = document.querySelector(".modal-edit-work");
    modalEditReturnBtn.style.display = "none";
    let modalWrapperBtn = document.querySelector(".modalWrapper");
    modalWrapperBtn.style.display = "flex";
})
 
//Suppression d'une image avec l'icone "Corbeille" NE MARCHE PAS
document.querySelector('#trashIcon').addEventListener('click', function(event) {
    event.preventDefault();})




if(confirm("Voulez-vous supprimer cet élément ?")) {
fetch(`http://localhost:5678/api/works/${work.id}`,{
    method: 'DELETE',
    headers: {
        'Content-Type': 'application/JSON',
        'Authorization': 'Bearer' + sessionStorage.getItem('token')
    }
})
.then(function(response) {
    switch(response.status) {
        case 404:
        alert("Erreur dans l'identifiant ou le mot de passe");
        break;
    case 401:
        alert("Suppression impossible");
        break;
    case 200:
        console.log("Projet supprimé");
        document.querySelector(`work-item-${work.id}`).remove();
        break;
    }
}) 
.catch(function(err) {
    console.log(err)
})
}

