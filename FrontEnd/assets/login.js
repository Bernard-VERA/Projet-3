//CREATION DE LA CONNEXION EN TANT QU'UTILISATEUR CONNECTE
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('formulary').addEventListener('submit', function(event) {
        event.preventDefault();
        //Récupération des informations: e-mail et mot de passe de l'utilisateur
        const user = {
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
        };
        //Tentative d'envoi des information à l'API avec Fetch, méthode POST
        fetch('http://localhost:5678/api/users/login', {
            method: "POST",
            headers: {'accept': 'application/json',
                'Content-Type': 'application/json; charset=utf-8',},
            body: JSON.stringify(user)
        })  
        .then(function(response) {
            switch(response.status) {
                case 404:
                    alert("Erreur dans l'identifiant ou le mot de passe.");
                    break;
                case 401:
                    alert("Non autorisé. Mot de passe invalide.");
                    break;
                case 200:
                    return response.json();
            }
            //En cas d'erreur, envoi d'un message et retour au login d'origine
            console.log(alert)
            window.location.replace('login.html')          
        //Si les informations sont valides, envoi des information à l'API
        })
        .then(function(data) {
            console.log(data.token);
            console.log(data.token.length);
            const token = user
            sessionStorage.setItem('token', JSON.stringify(token));
            sessionStorage.setItem('data.token',data.token);
            sessionStorage.setItem('userId', JSON.stringify(user));
            sessionStorage.setItem('data.userId', JSON.stringify(data.userId))
            //Si les informations existent bien dans sessionStorage, affichage de la page d'accueil en "MODE EDITION"
            if(sessionStorage.getItem('data.token')!= null && sessionStorage.getItem('userId') != null) {
            window.location.replace('index.html');
            switchToEditMode();
            console.log(user)
            console.log(token)
            }                
        })
        .catch(function(error) {
            console.log(error);
        })
    })
})



