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
		
		document.querySelector("div.modal-content").appendChild(newFigure);
	});
})
.catch(function(err) {
	console.log(err);
});
}
getWorksInModal()


// Création d'un bouton "modifier" dans index.html, pour lancer la modale

let modal = document.querySelector(".modal")

//Bouton pour afficher la modale
//NE MARCHE PAS ????

const openModal = function() {
    const modal = document.querySelector(".modal");
	modal.style.display = "flex";
}
let openModalBtn = document.querySelector(".btn-edit")
openModalBtn = addEventListener("click",() => {
	openModal();
})


//Bouton pour fermer la modale

const closeModal = function() {
	modal.style.display = "none"

}
let closeModalBtn = document.querySelector("#close-modal")
closeModalBtn = addEventListener("click",() => {
	closeModal();
})
