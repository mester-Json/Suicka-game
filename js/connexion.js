function envoyerConnexion() {
    const userName = document.getElementById('UserName').value;
    const mail = document.getElementById('Mail').value;
    const password = document.getElementById('Password').value;

    const formData = {
        userName: userName,
        mail: mail,
        password: password
    };

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:3000/connexion', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                console.log('Connexion réussie');
                window.location.href = 'http://192.168.1.71:3000/index.html';
            } else {
                console.log('La connexion a échoué');
            }
        }
    };
    xhr.send(JSON.stringify(formData));
}
