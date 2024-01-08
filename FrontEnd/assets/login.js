document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('formulary').addEventListener('submit', function(event) {
        event.preventDefault();

        const user = {
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
        };
    
        fetch('http://localhost:5678/api/users/login', {
            method: "POST",
            headers: {'accept': 'application/json',
                'Content-Type': 'application/json; charset=utf-8',},
            body: JSON.stringify(user)
        })  
        .then(function(response) {
            switch(response.status) {
                case 404:
                    alert("Erreur dans l'identifiant ou le mot de passe");
                    break;
                case 401:
                    alert("Non autorisé");
                    break;
                case 200:
                    return response.json();
            }
            console.log(alert)
            window.location.replace('login.html')
            
        
        })
        .then(function(data) {
            console.log(data.token);
            console.log(data.token.length);
            sessionStorage.setItem('token', 'data.token');
            sessionStorage.setItem('userId', 'data.userId');
            if(sessionStorage.getItem('token')!= null && sessionStorage.getItem('userId') != null) {
            window.location.replace('index.html');
            switchToEditMode();
            }
            
                 
        })
        .catch(function(error) {
            console.log(error);
        })
    })
})



