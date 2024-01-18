
// RECUPERATION DES PROJETS DANS L API POUR LA PAGE D'ACCUEIL
//On crée une variable allworks et on définit ses propriétés
//On crée la fonction getWorks
//Avec Fetch, on récupère les travaux dans l'API a l'adresse donnée dans le SWAGGER
//Puis on crée les données du fichier .json, dans la fonction showWorks
//Si une promesse du Fetch est rejetée, elle est attrapée par ".catch", qui retourne une erreur
//On charge getWorks
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

//CREATION DE LA GALERIE D'IMAGE
//On vide la class.gallery avec inner.HTML =""
//Dans la fonction showWorks, pour chaque projet, on récupère sa categorie et son id
//Pour chaque projet (forEach(work, index))
//On crée une figure
//On crée une image, on lui attribue une source et un Alt. Puis on la lie a son noeud parent (figure)
//On crée figcaption, qui contient (innerText) le titre du projet. Puis on le lie a son noeud parent (figure)
//On lie newfigure a son noeud parent grace a la classe sélectionnée (.gallery)
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
//On crée un bouton, et on le nomme "Tous", avec innerText
//On le place (appenchild) dans son noeud parent avec la class ".category"
//On écoute ce bouton, et a chaque clic, on lance la fonction showWorks
let newButton = document.createElement('button');
        newButton.innerText = "Tous";
    document.querySelector(".category").appendChild(newButton);
    newButton.addEventListener("click",() => {
    showWorks()
    })

//AFFICHAGE DES CATEGORIES DANS LA PAGE D'ACCUEIL
//On crée la fonction getCategory
//Avec Fetch, on récupère les travaux dans l'API a l'adresse donnée dans le SWAGGER
//Puis on crée les données du fichier .json
//Pour chaque categorie (forEach(category, index)), on crée un bouton, qui contient le nom de la categorie
//On rattache ce bouton a son noeud parent (appenchild) grace a la classe ".category"
//On ecoute ce bouton avec addEventListener
//A chaque clic sur ce bouton, on charge showWorksWorks en précisant la categorie (category.id)
//On lance la fonction getCategory
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
//On affiche le token dans la console
const logged = sessionStorage.getItem('data.token')
console.log(logged)
    
//CREATION DU "MODE EDITION"
//On crée la fonction switchToEditMode
//On verifie si le token et le user.id sont bien stockes dans sessionStorage (local)
function switchToEditMode() {
    if(sessionStorage.getItem('data.token')!= null && localStorage.getItem('userId')!= null) {
        //CREATION DE LA BANNIERE NOIRE "MODE EDITION"
        //On crée "editBanner",une div avec la classe (.edit-banner)
        //On crée "editMode", une div
        //On crée "editModeIcon", une image et on lui indique sa source (assets/etc...)
        //On crée un paragraphe (p) qui contient le innerText "Mode édition"
        //On crée la constante body. On  insère la bannière avant le body (before)
        //On crée "header" en selectionnant la classe (.header). On y ajoute du margin
        //On relie les éléments créés a leur noeud parent avec appendChild
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
        //On crée "pictureEditButton", une div et on lui attribue deux classes (btn-edit et btn-edit-picture)
        //On crée "pictureEditIcon", une image et on indique sa source (assets/icons/etc...)
        //On crée "pictureEditText", un paragraphe et on y insère le texte "modifier" avec innerText
        //On crée "modifyProjects" en selectionnant l'id "#updateWorks h2"
        //On insère les éléments créés avec (insertAdjacentElement)
        //On précise " A l'intérieur du noeud, avant son premier élément enfant" avec (afterbegin)
        //On précise "Après l'élément lui-même" avec (afterend)
        //On ajoute le texte dans le noeud parent avec "appenchild"
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
        //On crée une constante "login" en sélectionnant la classe (.nav-login)
        //On y insère un texte "logout" avec innerText, et une classe (.nav-logout)
        //On écoute le "login", et a chaque clic, on lance la fonction "logout()"
        const logIn = document.querySelector(".nav-login");
            logIn.innerText = "logout";
            logIn.classList.add("nav-logout");
        logIn.addEventListener("click",() => logOut());
        //MASQUAGE DES CATEGORIES DANS LE "MODE EDITION"
        //On crée une variable "filters" en selectionnant la classe (.category)
        //On l'empêche d'apparaitre, en lui attribuant un "style.display = none"
        let filters = document.querySelector(".category")
            filters.style.display = "none"; 
        //CREATION D'UNE FONCTION POUR OUVRIR LA PREMIERE FENETRE MODALE, EN CLIQUANT SUR LE BOUTON "MODIFIER"
        //On crée "openModalBtn" en sélectionnant la classe (.btn-edit)
        //On écoute cet élément, et a chaque clic, on lance la fonction "openModal"
        let openModalBtn = document.querySelector(".btn-edit")
        openModalBtn.addEventListener("click",() => {
            openModal()
        })       
    }
}
switchToEditMode()  //Ici, on lance le "Mode édition" 

//GESTION DU "LOGOUT" POUR SE DECONNECTER DU "MODE EDITION"
//On sélectionne la balise "logout", avec la classe (.nav-logout)
//On l'écoute avec "addEventListener", et a chaque clic
//On supprime les informations de connexion du sessionStorage (userId et data.token)
//On retourne a la "Page d'accueil" avec (replace)
document.querySelector('.nav-logout').addEventListener('click', function(event) {
    event.preventDefault();
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('data.token');
    window.location.replace('index.html');
})

//CREATION DE LA PREMIERE FENETRE MODALE
// Ajout des projets dans la gallerie de la Modale, avec Fetch.
//On crée la fonction getWorksInModal
//Avec Fetch, on récupère les travaux dans l'API a l'adresse donnée dans le SWAGGER
//Puis on crée les données du fichier .json
//On vide le container de la modale (div-modal-content) avec innerHTML=""
//On affiche la liste des projets avec console.log pour vérification
//Pour chaque projet (work, index) on crée les éléments suivants (Voir plus bas)
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
            //Pour chaque projet (work), on crée les éléments qui vont le composer
            //On crée l'élément "figure"
            //On lui attribue une classe qui récupère l' Id de la categorie dans l'API (Utilisation de backticks)
            //On lui attribue un Id qui récupère  l'Id du projet(work) dans l'API (Utilisation de backticks)
            //On crée la variable "WorkId" et on l'affiche avec console.log pour vérification
            //On crée l'image, et on lui attribue une source (src) et un titre (alt)
            //On rattache l'image créée à son noeud parent (newFigure) avec "appenChild"
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
            //On crée une icone "i"
            //On lui attribue un nom, une classe et un Id
            //On lui donne une couleur avec "style = color"
            //On la rattache a son noeud parent (newFigure) avec "appenchild"
            let newIcon = document.createElement('i');
                newIcon.setAttribute('class',"fa-solid fa-trash-can");
                newIcon.classList.add("trashIcon");
                newIcon.setAttribute("id","trashIcon")
                newIcon.style = "color: #f1f2f3"; 
                newFigure.appendChild(newIcon);
            //CREATION D'UNE FONCTION D'ECOUTE SUR LA CORBEILLE, POUR SUPPRIMER L'IMAGE SELECTIONNEE A CHAQUE CLIC
            //On écoute l'icone corbeille grace a "addEventListener" et a chaque clic
            //On crée une variable qui demande confirmation dans une boite de dialogue, avant suppression, avec (confirm)
            //On crée une condition avec "if", et si la valeur est "true" (Si on clique sur OK dans la boite de dialogue)
            //On lance la fonction "deleteWorkById()" pour chaque projet (work.id)
            //e.preventDefault() pour ne pas recharger la page entière
            //On ferme la fenetre modale avec closeModal()
            //On charge les projets actualisés avec getWorks()
            //On re-ouvre la fenetre modale avec les projets actualisés
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
            //On affiche tout ce qu'on vient de créér (newFigure) dans le container de la modale (modal-content)
            document.querySelector("div.modal-content").appendChild(newFigure);
        });
    })
    //Si une promesse du Fetch est rejetée, elle est attrapée par ".catch", qui retourne une erreur
    .catch(function(err) {
        console.log(err);
    });  
}
   
//VARIABLES POUR OUVERTURE ET FERMETURE DE LA MODALE sélectionnées par leur classes
//".modal" pour la modale entière, ".modalWrapper" pour la partie centrale blanche
let modal = document.querySelector(".modal")
let modalWrapper = document.querySelector(".modalWrapper")

//FONCTION POUR AFFICHER LA MODALE avec "style.display = flex"
function openModal() {
    modal.style.display = "flex";
}
 
//CLIQUER SUR LE BOUTON "AJOUTER PHOTO" POUR OUVRIR LA SECONDE MODALE
//On sélectionne le bouton par son id (#addPicture) et on l'écoute avec "addEventListener"
//"event.preventDefault" pour éviter le rechargement de la page
//A chaque clic sur cet élément, on crée 2 actions
//On n'affiche pas (style.display = none) la première modale, sélectionnée par sa classe (.modalWrapper)
//On affiche la deuxième modale (style.display = flex) sélectionnée par son Id (#modal-edit)
document.getElementById("addPicture").addEventListener('click', function(event) {
    event.preventDefault();
    let modalWrapperBtn = document.querySelector(".modalWrapper");
    modalWrapperBtn.style.display = "none";
    let modalEditBtn = document.getElementById("modal-edit");
    modalEditBtn.style.display = "flex";
})

 //FONCTION POUR FERMER LES MODALES EN CLIQUANT A L'EXTERIEUR DES MODALES
 //Si on détecte un clic dans la fenêtre, dont la cible est (modal)
 //On n'affiche plus la modale (style.display = none)
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none"
    }
}

 //BOUTON X POUR FERMER LA PREMIERE MODALE
 //On crée une fonction closeModal, qui n'affiche pas la modale (style.display = none)
 //On écoute l'élément x sélectionné par son Id (#close-modal)
 //A chaque clic sur cet élément, on lance la fonction closeModal, ce qui ferme la modale
const closeModal = function() {
    modal.style.display = "none"
    }
let closeModalBtn = document.querySelector("#close-modal")
    closeModalBtn.addEventListener("click",() => {
    closeModal();
})

//BOUTON X POUR FERMER LA SECONDE MODALE
//On écoute l'élément x sélectionné par son Id (#close-modalEdit)
 //A chaque clic sur cet élément, on lance la fonction closeModal, ce qui ferme la modale
let closeModalEditBtn = document.querySelector("#close-modalEdit")
    closeModalEditBtn.addEventListener("click",() => {
    closeModal();
})

function showFirstModal() {
    let modalEditReturnBtn = document.querySelector(".modal-edit-work");
    modalEditReturnBtn.style.display = "none";
    let modalWrapperBtn = document.querySelector(".modalWrapper");
    modalWrapperBtn.style.display = "flex";
}

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
        document.getElementById('submit-new-work').reset();
    }
}
//BOUTON "FLECHE GAUCHE" POUR REVENIR A LA PREMIERE MODALE
//On sélectionne la "flèche gauche" avec son Id (return-arrow) et on l'écoute avec "addEventListener"
//preventDefault pour éviter le rechargement de la page
//On cache la deuxième modale (style.display = none) sélectionnée par sa classe (.modal-edit-work)
//On fait apparaitre la première modale (style.display = flex) sélectionnée par sa classe (.modalWrapper)

document.getElementById("returnArrow").addEventListener('click', function(returnFirstModal) {
    returnFirstModal.preventDefault();
    showFirstModal();
    //On regarde s'il existe (!= null) une image dans (form-image-preview) de la deuxième modale
    //Si elle existe, on la supprime avec .remove
    //On fait re-apparaitre les 3 élements qui compososent la deuxième modale avec (style.display = flex)
    //l'icone "image" sélectionnée par son Id (#photo-add-icon)
    //le label "Ajouter photo" sélectionné par son Id (#new-image)
    //Le paragraphe "jpg, png, 4Mo max" sélectionné par son Id (#photo-size)
    //On sélectionne le formulaire de la deuxième modale (modal-edit-work-form) et on le réinitialise avec .reset
    //On sélectionne le bouton "valider" de la deuxième modale (submit-new-work) et on le réinitialise avec .reset
   
        resetForm();
    
})
 
//SUPPRESSION D'UNE IMAGE AVEC L'ICONE "CORBEILLE"
//On crée la fonction (deleteWorkById()) et on vérifie l'Id avec console.log
//On vérifie le "token" pour pouvoir executer un "Fetch avec méthode DELETE"
//On affiche le token avec console.log
//On lance Fetch a l'adresse de l'API, en indiquant l'ID de l'image à supprimer (Utilisation de backticks)
//Méthode DELETE, headers = accept tout type MIME */*,et authorisation = Bearer ${token} comme demandé dans le SWAGGER
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
    //On attend la réponse de l'API
    //Réponse 500 renvoie un message "Comportement inattendu"
    //Réponse 401 renvoie un message "Non autorisé"
    //Réponse 200 ou 204 renvoie le message "Projet supprimé"
    //On sélectionne l'élément par son Id(work-item)+${id} (Utilisation de backticks) et on le supprime avec ".remove()"
    //On fait un "break" a chaque fois pour arrêter l'action
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
    //Si une promesse du Fetch est rejetée, elle est attrapée par ".catch", qui retourne une erreur
    .catch(function(err) {
        console.log(err)
    })    
}


//VERIFICATION DES CHAMPS DU FORMULAIRE D'AJOUT DE PROJET                
//On sélectionne le titre par son Id (form-title), on écoute l'input avec "addEventListener" et on vérifie sa validité avec (verifyNewProject())
//On sélectionne la categorie par son Id (form-category), on écoute l'input avec "addEventListener" et on vérifie sa validité avec (verifyNewProject())
document.getElementById('form-title').addEventListener('input', verifyNewProject);
document.getElementById('form-category').addEventListener('input', verifyNewProject);
//On crée la fonction verifyNewProject
//On crée la variable title en sélectionnant son Id (form-title)
//On crée la variable category en sélectionnant sonId (form-category)
//On crée la variable addproject en sélectionnant son Id (submit-new-work)
function verifyNewProject() {
    let title = document.getElementById('form-title');
    let category = document.getElementById('form-category');
    let addProject = document.getElementById('submit-new-work')
 //Si la case "titre" n'est pas vide (!= "") et si la case "categorie" n'est pas vide (!="")
 //On envoie un message"Cliquez sur valider pour ajouter ce nouveau projet ?"
 //On change la couleur du bouton submit "Valider" en Vert foncé
 //le return est égal a true
 //Sinon, si la case "titre" est vide, on envoie un message "Veuillez ajouter un titre valide."
 //si la case "categorie" est vide, on envoie un message "Veuillez choisir une catégorie valide."
    if(title.value != "" && category.value != "" ) {
        alert("Cliquez sur valider pour ajouter ce nouveau projet ?")
        addProject.style.backgroundColor= "#1D6154";
        return true;
    } 
    else {
        if (title == "") {
        alert("Veuillez ajouter un titre valide.");
        return false;    
        }
        if (category == "") {
        alert("Veuillez choisir une catégorie valide.");
        return false;
        }
    
    }
//On écoute "addProject" (le bouton "Valider") et au clic, on remet sa couleur en Gris clair
    addProject.addEventListener('click', () => {
        addProject.style.backgroundColor= "#A7A7A7";  
    })   
}

//IMPORTATION D'UNE IMAGE DANS LE PREVIEW DE LA DEUXIEME MODALE
//On sélectionne l'input avec son Id (#form-image) et on l'écoute avec "addEventListener"
//On surveille un changement (change)
//On crée la variable "fileinput" qui sélectionne l'Id (#form-image)
//On crée une constante "maxFileSize" avec les paramètres maximum = 4Mo 1024px x 1024px
//on crée une constante "filetype" avec les paramètres jpg et png
//Si la taille du fichier sélectionné est supèrieure à la taille maxi
//On affiche un message d'alerte "Fichier trop volumineux."
//On remet la valeur du (form-input) à zéro ('')
document.getElementById('form-image').addEventListener('change', () => {
    let fileInput = document.getElementById('form-image');
    const maxFileSize = 4 * 1024 * 1024;
    const fileType = 'image/jpg, image/png';
    if(fileInput.files[0].size > maxFileSize) {
        alert("Fichier trop volumineux.");
        document.getElementById('form-image').value = '';
    } else
    //Sinon, on crée une "previewImage" et on lui attribue un Id
    //On définit sa source (src) avec URL.createObjectURL et son adresse
    //On sélectionne le container (#modal-edit-new-photo) et on ajoute l'image à la fin de son noeud parent
    //On affiche l'image avec "style.display = block"
    //On lui donne une hauteur de 169px
    //On cache "iconNewPhoto" sélectionné par son Id (photo-add-icon) avec "style.display = none"
    //On cache "buttonNewPhoto" sélectionné par son Id (new-image) avec "style.display = none"
    //On cache "photoMaxSize" sélectionné par son Id (photo-size) avec "style.display = none"
    //On positionne "modalEditPhoto" sélectionné par son Id (photo-add-icon) avec "style.padding = 0"
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
//On lance fetch avec l'adresse categories de l'API et on récupère la réponse.json
//Puis on récupère les données (data)
//Pour chaque categorie (forEach), on crée un option (option)
//On lui attribue une "valeur = category.id" avec "setAttribute"
//On lui attribue un contenu en texte (category.name)
//On sélectionne la classe (.choice-category) et on en fait le noeud parent de "option" avec "appenchild"
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
        //Si une promesse du Fetch est rejetée, elle est attrapée par ".catch", qui retourne une erreur
        .catch(function(error) {
            console.log(error);
    });

    //AJOUT D'UN NOUVEAU PROJET DANS LA DEUXIEME MODALE
    //On sélectionne le formulaire d'ajout avec son Id (modal-edit-work-form)
    //On écoute l'input du formulaire et on crée la fonction "add"
    //PreventDefault pour éviter le rechargement de la page
    //On crée une variable "formData" pour pouvoir utiliser l'interface (FormData)
    //On vérifie si on est connecté en tant qu'utilisateur grace au token dans le sessionStorage
    //On ajoute la valeur du titre, sélectionnée par son Id (form-title), à la clé du FormData
    //On ajoute la valeur de la categorie, sélectionnée par son Id (form-category), à la clé du FormData
    //On ajoute la valeur de l'image, sélectionné par son Id (form-image), à la clé du FormData
    //On crée le FETCH avec la méthode "POST", qui envoie les données à l'API
    //Les headers sont (accept */*) et (authorization "Bearer ${token"} (Utilisation des backticks)
    //Le body: formData (qui crée des paires Clés/Valeurs)
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
        //Quand on reçoit la réponse 
        //On execute la fonction "getWorksInModal" qui insère le nouveau projet dans la galerie de la modale
        //On execute la fonction "getWorks" qui insère le nouveau projet dans la galerie de la page d'accueil
        //On execute la fonction "closeModal" qui ferme la modale
        //On affiche un message selon la réponse reçue de l'API, et on fait un break après chaque message
        //Cas 500 message "Comportement inattendu" - Cas 401 message "Non autorisé" - Cas 400 message "Requète invalide"
        //Cas 200 et 201 message "Nouveau projet créé !"
        //On retourne la réponse .json, et on prévoit une alerte par défaut en cas d'"erreur inconnue"
        .then(function(response) {
            getWorksInModal();
            getWorks();
            showFirstModal()
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
        .then(function(e) {
            let modalEditReturnBtn = document.querySelector(".modal-edit-work");
            modalEditReturnBtn.style.display = "none";
            let modalWrapperBtn = document.querySelector(".modalWrapper");
            modalWrapperBtn.style.display = "flex";
            resetForm();
        })
        //Si une promesse du Fetch est rejetée, elle est attrapée par ".catch", qui retourne une erreur
        .catch(function(err) {
            console.log(err)
    })
})

//On lance une dernière fois la fonction "getWorksInModal()"" pour actualiser les projets dans la modale
getWorksInModal()

//FIN


 



