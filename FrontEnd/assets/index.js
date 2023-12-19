// Récupération des projets de l'architecte avec fetch
fetch("http://localhost:5678/api/works")
    .then(function(reponse) {
        if(reponse.ok) {
            return reponse.json();
        }
    })

    .then(function(donneesWorks){
        console.log(donneesWorks)
    })

