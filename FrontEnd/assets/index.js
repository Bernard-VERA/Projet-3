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
    if(sessionStorage.getItem('data.token')!= null && localStorage.getItem('userId')!= null) {
        
        // Création du bandeau noir "mode édition"
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

        // Création du bouton "modifier" projet
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
    sessionStorage.removeItem('data.token');
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
            let workId = `${work.id}`
            console.log(workId)
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
            //Au clic sur une corbeille, supprimer l'image selectionnée
            newIcon.addEventListener('click', (e) => {
                deleteWorkById(work.id);
                e.preventDefault();
                closeModal();
                getWorks();
                openModal();
  
            })
            document.querySelector("div.modal-content").appendChild(newFigure);
        });
    })
    .catch(function(err) {
        console.log(err);
    });  
}

    
//Variables pour l'ouverture et fermeture de la modale
let modal = document.querySelector(".modal")
let modalWrapper = document.querySelector(".modalWrapper")

// Fonction pour afficher la modale en cliquant sur "modifier" ou sur l'icone "square-pen"
function openModal() {
    modal.style.display = "flex";
}
    
// Cliquer sur le bouton "Ajouter une photo" pour ouvrir la seconde modale
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
    //si on a importé une image dans la deuxième modale, la supprimer
    if(document.getElementById('form-image-preview') != null) {
        document.getElementById('form-image-preview').remove()
        let iconNewPhoto = document.getElementById('photo-add-icon');
                iconNewPhoto.style.display = "flex";
                let buttonNewPhoto = document.getElementById('new-image');
				buttonNewPhoto.style.display= "flex";
				let photoMaxSize = document.getElementById('photo-size');
				photoMaxSize.style.display= "flex";
    }
})
 
//Suppression d'une image avec l'icone "Corbeille"
function deleteWorkById(id) {
    console.log(id)
    let token = sessionStorage.getItem('data.token')
    console.log(token)
    fetch(`http://localhost:5678/api/works/${id}`, {
        method: 'DELETE',
        headers: {
            accept: '*/*',
            Authorization: `Bearer ${token}`,
        }       
    })
    .then(function(response) {
        switch(response.status) {
            case 500:
            alert("Comportement inattendu");
            break;
        case 401:
            alert("Non autorisé");
            break;
        case 200:
        case 204:
            alert("Projet supprimé");
            document.getElementById(`work-item-${id}`).remove();
           
            break;
        }
    })
    .catch(function(err) {
        console.log(err)
    })
}


// Vérification des 3 champs du formulaire d'ajout de projet
document.getElementById('form-title').addEventListener('input', verifyNewProject);
document.getElementById('form-category').addEventListener('input', verifyNewProject);
document.getElementById('form-image').addEventListener('input', verifyNewProject);

function verifyNewProject() {
    let title = document.getElementById('form-title');
    let category = document.getElementById('form-category');
    let image = document.getElementById('form-image');
    let addProject = document.getElementById('submit-new-work')
    addProject.addEventListener('click', () => {
       closeModal();
      
    })

    let validAddProject = document.getElementById('submit-new-work');
        if(title.value != "" && category.value != "" ) {
            validAddProject.style.backgroundColor= "#1D6154";
            return true;
        } 
        else {
            return false;
        }   
        
        
}


// Importation d'une nouvelle image dans la deuxième modale
document.getElementById('form-image').addEventListener('change', () => {
    let fileInput = document.getElementById('form-image');
    const maxFileSize = 4 * 1024 * 1024;
    const fileType = 'image/jpg, image/png';
    if(fileInput.files[0].size > maxFileSize) {
        alert("Fichier trop volumineux.");
        document.getElementById('form-image').value = '';
    } else
        {
        let previewImage = document.createElement('img');
        previewImage.setAttribute('id', 'form-image-preview');
        previewImage.src = URL.createObjectURL(fileInput.files[0]);
        document.querySelector('#modal-edit-new-photo').appendChild(previewImage);
        previewImage.style.display = "block";
        previewImage.style.height = "169px";
        let iconNewPhoto = document.getElementById('photo-add-icon');
        iconNewPhoto.style.display = "none";
        let buttonNewPhoto = document.getElementById('new-image');
		buttonNewPhoto.style.display= "none";
		let photoMaxSize = document.getElementById('photo-size');
		photoMaxSize.style.display= "none";
        let modalEditPhoto = document.getElementById('modal-edit-new-photo');
        modalEditPhoto.style.padding = "0";
        }        
});

// ajout du choix des catégories avec fetch, dans l'input "categories" de la deuxième modale
fetch("http://localhost:5678/api/categories")
        .then(function(response) {
            if(response.ok) {
            return response.json();
            }
        })
        .then(function(data) {
            let categories = data;
            categories.forEach((category, index) => {
                let option = document.createElement('option');
                option.setAttribute('value', category.id);
                option.textContent = category.name;
                document.querySelector(".choice-category").appendChild(option);             
            });
        })
        .catch(function(error) {
            console.log(error);
    });

// Ajout d'un nouveau projet dans la deuxième modale
    document.getElementById('modal-edit-work-form').addEventListener('submit', function(add) {
        add.preventDefault();
        let formData = new FormData();
        let token = sessionStorage.getItem('data.token')
        formData.append('title', document.getElementById('form-title').value);
        formData.append('category', document.getElementById('form-category').value);
        formData.append('image',document.getElementById('form-image').files[0]);
        fetch(`http://localhost:5678/api/works`, {
            method: 'POST',
            headers: {
                accept: '*/*',
                Authorization: `Bearer ${token}`,
            },
            body: formData     
        })
        .then(function(response) {
            switch(response.status) {
                case 500:
                alert("Comportement inattendu");
                break;
                case 401:
                alert("Non autorisé");
                break;
                case 400:
                alert("Requète invalide");
                break
                case 201:
                case 200:
                alert("Nouveau projet créé !");
                return response.json();
                default: alert("Erreur inconnue.");
                break
            }
        })
        .then(function(json) {
            
            let newFigure = document.createElement('figure');
                newFigure.setAttribute('class', `work-item category-id-0 category-id-${json.categoryId}`);
                newFigure.setAttribute('id', `work-item-${json.id}`);
            let newImage = document.createElement('img');
                newImage.setAttribute('src', json.imageUrl);
                newImage.setAttribute('alt', json.title);
                newFigure.appendChild(newImage);
            let newFigcaption = document.createElement('figcaption');
                newFigcaption.innerText = json.title;
                newFigure.appendChild(newFigcaption);
            document.querySelector(".gallery").appendChild(newFigure);
        // Retourner  à la première modale
            let modalEditReturnBtn = document.querySelector(".modal-edit-work");
            modalEditReturnBtn.style.display = "none";
            let modalWrapperBtn = document.querySelector(".modalWrapper");
            modalWrapperBtn.style.display = "flex";
            //si on a importé une image dans la deuxième modale, la supprimer
            if(document.getElementById('form-image-preview') != null) {
                document.getElementById('form-image-preview').remove()
                let iconNewPhoto = document.getElementById('photo-add-icon');
                        iconNewPhoto.style.display = "flex";
                        let buttonNewPhoto = document.getElementById('new-image');
                        buttonNewPhoto.style.display= "flex";
                        let photoMaxSize = document.getElementById('photo-size');
                        photoMaxSize.style.display= "flex";
                       
            }
           
          
    
        })
       
      
        .catch(function(err) {
            console.log(err)
    })
})







//getWorksInModal transféré ici depuis la ligne 191 pour englober tout. Eventuellement à replacer à la ligne 191
getWorksInModal()


 



