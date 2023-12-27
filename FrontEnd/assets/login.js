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
                    alert("Connected");
                    return response.json();
            }
            console.log(alert)
        
        })
        .then(function(data) {
            console.log(data);
            localStorage.setItem('token', 'data.token');
            localStorage.setItem('userId', 'data.userId');
            window.location.href = '../index.html';
                 
        })
        .catch(function(error) {
            console.log(error);
        })
    })
})