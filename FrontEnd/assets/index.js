// RECUPERATION DES PROJETS DANS L API POUR LA PAGE D'ACCUEIL
//Avec Fetch, on récupère les travaux dans l'API à l'adresse donnée dans le SWAGGER
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

//AFFICHAGE DES PROJETS DANS LA PAGE D'ACCUEIL
//On vide la class (.gallery) avec inner.HTML =""
//ShowWorks, pour chaque projet, crée une figure, une image, figcaption dans (.gallery)
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

//CREATION DU BOUTON "TOUS" DANS LES CATEGORIES DE LA PAGE D'ACCUEIL
//Création du bouton, nommé "Tous". A chaque clic, on lance la fonction showWorks
let newButton = document.createElement('button');
        newButton.innerText = "Tous";
    document.querySelector(".category").appendChild(newButton);
    newButton.addEventListener("click",() => {
    showWorks()
    })

//AFFICHAGE DES PROJETS SELON LEUR CATEGORIE, DANS LA PAGE D'ACCUEIL
//GetCategory récupère les catégories dans l'API a l'adresse donnée dans le SWAGGER
//A chaque clic, showWorks affiche les projets, selon la categorie
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

//On crée une constante logged, qui récupere le token stocké dans sessionStorage
const logged = sessionStorage.getItem('data.token')
console.log(logged)
    
//CREATION DU "MODE EDITION"
//La fonction switchToEditMode vérifie si le token et le user.id sont bien stockés dans sessionStorage (local)
function switchToEditMode() {
    if(sessionStorage.getItem('data.token')!= null && localStorage.getItem('userId')!= null) {
        //CREATION DE LA BANNIERE NOIRE "MODE EDITION"
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
        //CREATION DE L'ICONE ET DU BOUTON "MODIFIER PROJET" DANS LE "MODE EDITION", POUR POUVOIR OUVRIR LA FENETRE MODALE
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
        //AFFICHAGE DE "LOGOUT" A LA PLACE DE "LOGIN" DANS LE "MODE EDITION"
        //Un clic sur "logout" déconnecte l'utilisateur
        const logIn = document.querySelector(".nav-login");
            logIn.innerText = "logout";
            logIn.classList.add("nav-logout");
        logIn.addEventListener("click",() => logOut());
        //MASQUAGE DES CATEGORIES DANS LE "MODE EDITION"
        //La variable "filters" masque les catégories avec "style.display = none"
        let filters = document.querySelector(".category")
            filters.style.display = "none"; 
        //CREATION D'UNE FONCTION POUR OUVRIR LA PREMIERE FENETRE MODALE, EN CLIQUANT SUR LE BOUTON "MODIFIER"
        //Chaque clic sur "openModalBtn" ouvre la première modale
        let openModalBtn = document.querySelector(".btn-edit")
        openModalBtn.addEventListener("click",() => {
            openModal()
        })       
    }
}
switchToEditMode()  //Ici, on lance le "Mode édition" 

//GESTION DU "LOGOUT" POUR SE DECONNECTER DU "MODE EDITION"
//Chaque clic sur "logout" supprime les informations de connexion du sessionStorage et renvoie sur la "Page d'accueil"
document.querySelector('.nav-logout').addEventListener('click', function(event) {
    event.preventDefault();
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('data.token');
    window.location.replace('index.html');
})

//CREATION DE LA PREMIERE FENETRE MODALE
//getWorksInModal récupère les travaux dans l'API a l'adresse donnée dans le SWAGGER
//On vide le container de la modale (div-modal-content) avec innerHTML=""
const getWorksInModal = () => { 
    fetch("http://localhost:5678/api/works") 
    .then(function(response) {
        if(response.ok) {
            return response.json();
        }
    })
    .then(function(data) {
        let works = data;
        document.querySelector("div.modal-content").innerHTML="";
        console.log(works);      
        works.forEach((work, index) => {
            //Pour chaque projet (work), on crée une image et un nom
            //On récupère l'Id du projet(work) dans l'API (Utilisation de backticks)
            let newFigure = document.createElement('figure');
                newFigure.setAttribute('class', `work-item category-id-0 category-id-${work.categoryId}`);
                newFigure.setAttribute('id', `work-item-${work.id}`);
            let workId = `${work.id}`
                console.log(workId)
            let newImg = document.createElement('img');
                newImg.setAttribute('src', work.imageUrl);
                newImg.setAttribute('alt', work.title);
                newFigure.appendChild(newImg);
            //INSERTION DE L'ICONE "CORBEILLE" SUR CHAQUE IMAGE DE LA GALERIE
            //On crée une icone avec un nom, une classe et un Id
            let newIcon = document.createElement('i');
                newIcon.setAttribute('class',"fa-solid fa-trash-can");
                newIcon.classList.add("trashIcon");
                newIcon.setAttribute("id","trashIcon")
                newIcon.style = "color: #f1f2f3"; 
                newFigure.appendChild(newIcon);
            //A CHAQUE CLIC SUR LA CORBEILLE, on SUPPRIME L'IMAGE SELECTIONNEE 
            //Demande de confirmation avant suppression, avec (confirm), puis suppression du projet
            //e.preventDefault() pour ne pas recharger la page entière
            //On ferme la modale, on charge les projets, on re-ouvre la modale avec les projets actualisés
            newIcon.addEventListener('click', (e) => {   
                let confirmation = confirm('Voulez-vous supprimer ce projet ?')
                if (confirmation == true) {
                    deleteWorkById(work.id);
                    e.preventDefault();
                    closeModal();
                    getWorks();
                    openModal();
                }          
            })
            //On affiche tout ce qu'on vient de créér (newFigure) dans la modale 
            document.querySelector("div.modal-content").appendChild(newFigure);
        });
    })
    .catch(function(err) {
        console.log(err);
    });  
}
   
//VARIABLES POUR OUVERTURE ET FERMETURE DE LA MODALE
//".modal" pour la modale entière, ".modalWrapper" pour la partie centrale blanche
let modal = document.querySelector(".modal")
let modalWrapper = document.querySelector(".modalWrapper")

//FONCTION POUR AFFICHER LA PREMIERE MODALE
function openModal() {
    modal.style.display = "flex";
}
 
//CLIQUER SUR LE BOUTON "AJOUTER PHOTO" POUR OUVRIR LA SECONDE MODALE
//"event.preventDefault" pour éviter le rechargement de la page
//A chaque clic sur le bouton, on cache la première modale et on affiche la deuxième modale
document.getElementById("addPicture").addEventListener('click', function(event) {
    event.preventDefault();
    let modalWrapperBtn = document.querySelector(".modalWrapper");
    modalWrapperBtn.style.display = "none";
    let modalEditBtn = document.getElementById("modal-edit");
    modalEditBtn.style.display = "flex";
})

 //FONCTION POUR FERMER LES MODALES EN CLIQUANT A L'EXTERIEUR DES MODALES
 //Au clic dans la fenêtre, on n'affiche plus la modale
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none"
    }
}

 //BOUTON X POUR FERMER LA PREMIERE MODALE
 //Chaque clic sur la croix ferme la modale
const closeModal = function() {
    modal.style.display = "none"
    }
let closeModalBtn = document.querySelector("#close-modal")
    closeModalBtn.addEventListener("click",() => {
    closeModal();
})

//BOUTON X POUR FERMER LA SECONDE MODALE
 //chaque clic sur la croix ferme la modale
let closeModalEditBtn = document.querySelector("#close-modalEdit")
    closeModalEditBtn.addEventListener("click",() => {
    closeModal();
})

//FONCTION POUR PASSER DE LA DEUXIEME A LA PREMIERE MODALE
function showFirstModal() {
    let modalEditReturnBtn = document.querySelector(".modal-edit-work");
    modalEditReturnBtn.style.display = "none";
    let modalWrapperBtn = document.querySelector(".modalWrapper");
    modalWrapperBtn.style.display = "flex";
}

//FONCTION POUR RE-INITIALISER LE FORMULAIRE D'AJOUT DE PROJET
function resetForm() {
    if(document.getElementById('form-image-preview') != null) {
        document.getElementById('form-image-preview').remove()
        let iconNewPhoto = document.getElementById('photo-add-icon');
            iconNewPhoto.style.display = "flex";
        let buttonNewPhoto = document.getElementById('new-image');
            buttonNewPhoto.style.display= "flex";
        let photoMaxSize = document.getElementById('photo-size');
            photoMaxSize.style.display= "flex";
        document.getElementById('modal-edit-work-form').reset();
        document.getElementById('submit-new-work').style.backgroundColor= "#A7A7A7";
    }
}
//BOUTON "FLECHE GAUCHE" POUR REVENIR A LA PREMIERE MODALE
//A chaque clic, retour à la première modale et reset du formulaire d'ajout de projet
document.getElementById("returnArrow").addEventListener('click', function(returnFirstModal) {
    returnFirstModal.preventDefault();
        showFirstModal();
        resetForm();
    
})
 
//SUPPRESSION D'UNE IMAGE AVEC L'ICONE "CORBEILLE"
//On crée la fonction (deleteWorkById()) et on vérifie l'Id avec console.log
//Après vérification du "token", execution de Fetch avec méthode DELETE
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
    //Envoi de différents messages, selon la réponse de l'API
    //Suppression du projet selon son Id  (work-item)+${id} (Utilisation de backticks)
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

//VERIFICATION DES CHAMPS DU FORMULAIRE D'AJOUT DE PROJET                
//Vérification de la validité du nom et de la catégorie
document.getElementById('form-title').addEventListener('change', verifyNewProject);
document.getElementById('form-category').addEventListener('input', verifyNewProject);
document.getElementById('form-image').addEventListener('input', verifyNewProject);
function verifyNewProject() {
    let photo = document.getElementById('form-image');
    let title = document.getElementById('form-title');
    let category = document.getElementById('form-category');
    let addProject = document.getElementById('submit-new-work')
//Envoi de messages, si les inputs ne sont pas correctement remplis
//Si tout est correct, le bouton "Valider" devient actif et change de couleur
    if(photo.value != "" && title.value.trim() != "" && category.value != "") {
        setTimeout(alert, 100, ("Cliquez sur Valider pour ajouter ce nouveau projet ?"))
        addProject.style.backgroundColor= "#1D6154";
        return true;
    }  
    else {
        if (photo == "") {
            alert("Veuillez ajouter une image.");
            return false;
        }
        if (title.value.length >= 1 && (title.value.length < 2 || title.value.trim() == "")) {
        alert("Veuillez ajouter un titre valide.");
        return false;    
        }
        if (category == "") {
        alert("Veuillez choisir une catégorie valide.");
        return false;
        }
    }
//Au clic sur le bouton "Valider" sa couleur redevient celle d'origine (Gris clair)
    addProject.addEventListener('click', () => {
        addProject.style.backgroundColor= "#A7A7A7";  
    })   
}

//IMPORTATION D'UNE IMAGE DANS LE PREVIEW DE LA DEUXIEME MODALE
//Si la taille du fichier est supèrieure à la taille maxi, message d'alerte "Fichier trop volumineux."
//Le contenu du formulaire (form-input) est remis à zéro 
document.getElementById('form-image').addEventListener('change', () => {
    let fileInput = document.getElementById('form-image');
    const maxFileSize = 4 * 1024 * 1024;
    const fileType = 'image/jpg, image/png';
    if(fileInput.files[0].size > maxFileSize) {
        alert("Fichier trop volumineux.");
        document.getElementById('form-image').value = '';
    } else
    //Sinon, on crée une "previewImage" avec un Id  et une source
    //Affichage de l'image avec une hauteur de 169px. Les autres éléments du preview sont cachés.
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

//AJOUT DU CHOIX DES CATEGORIES DANS L'INPUT "CATEGORIES" DE LA DEUXIEME MODALE AVEC FETCH
//On crée un option pour chaque catégorie, avec Fetch
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

    //AJOUT D'UN NOUVEAU PROJET DANS LA DEUXIEME MODALE
    //PreventDefault pour éviter le rechargement de la page
    //Vérification de la situation d'utilisateur connecté grace au token dans le sessionStorage
    //Avec l'interface (FormData), envoi de données à l'API avec Fetch (méthode POST)
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
        //Affichage du nouveau projet dans la galerie et dans la modale, retour sur la première modale
        //Envoie de messages selon la situation
        .then(function(response) {
            getWorksInModal();
            getWorks();
            showFirstModal()
            switch(response.status) {
                case 500:
                alert("Comportement inattendu.");
                break;
                case 401:
                alert("Non autorisé.");
                break;
                case 400:
                alert("Requète invalide.");
                break
                case 201:
                case 200:
                alert("Nouveau projet créé !");
                return response.json();
                default: alert("Erreur inconnue.");
                break
            }
        })
        //Remise à l'état d'origine du formulaire d'ajout de photo
        .then(function(e) {
            let modalEditReturnBtn = document.querySelector(".modal-edit-work");
            modalEditReturnBtn.style.display = "none";
            let modalWrapperBtn = document.querySelector(".modalWrapper");
            modalWrapperBtn.style.display = "flex";
            resetForm();
        })
        .catch(function(err) {
            console.log(err)
    })
})

//Dernière actualisation des projets dans la modale
getWorksInModal()

//FIN


 



