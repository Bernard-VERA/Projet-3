document.addEventListener('content', function(login) {
    document.getElementById('.formulaire').addEventListener('submit', function(event) {
        event.preventDefault();
        const user = {
            email: document.getElementById('#email').value,
            password: document.getElementById('#password').value,
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
                    return response.json();
            }
        
        })
        .then(function(data) {
            console.log(data);
                if (response.status == 200) {
                    document.location.href = "index.html";
                }
                else {
                    document.location.href = "login.html";
                }
                 
        })
        .catch(function(error) {
            console.log(error)
        })
    })
    login()
})