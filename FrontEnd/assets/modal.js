// Ajout des projets dans la gallerie, avec Fetch
const container = document.querySelector(".gallery");
console.log(container);


const getWorks = () =>{ 

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
getWorks()