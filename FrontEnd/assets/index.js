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

let newButton = document.createElement('button');
    newButton.innerText = "Tous";
    document.querySelector(".category").appendChild(newButton);
    newButton.addEventListener("click",() => {
    showWorks()
    })

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

function switchToEditMode() {
    // Bandeau d'édition //
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
    header.style.margin = "0";
    header.style.marginTop = "100px";

    editBanner.appendChild(editMode);
    editMode.appendChild(editModeIcon);
    editMode.appendChild(editModeText);

// bouton modifier projet
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

switchToEditMode()