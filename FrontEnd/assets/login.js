document.addEventListener('content', function() {
    document.getElementById('.formulaire').addEventListener('submit', function(event) {
        event.preventDefault();
        const user = {
            email: document.querySelector('#email').value,
            password: document.querySelector('#password').value,
        };
    
        fetch('http://localhost:5678/api/users/login', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
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
                    break;
            }
        
        })
        .then(function(data) {
            console.log(data);
        })
        .catch(function(error) {
            console.log(error)
        })
    })
})