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
                    alert("user not found");
                    break;
                case 401:
                    alert("Not authorized");
                    break;
                case 200:
                    return response.json();
            }
            console.log(alert)
        
        })
        .then(function(data) {
            console.log(data);
            localStorage.getItem('token', 'data.token');
            localStorage.getItem('userId', 'data.userId');
            window.location.replace('index.html');
                 
        })
        .catch(function(error) {
            console.log(error);
        })
    })
})