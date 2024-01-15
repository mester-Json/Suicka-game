function envoyerInscription() {
    const userName = document.getElementById('UserName').value;
    const birthday = document.getElementById('Birthday').value;
    const mail = document.getElementById('Mail').value;
    const password = document.getElementById('Password').value;
    const rePassword = document.getElementById('RePassword').value;

    if (password !== rePassword) {
        alert("Les mots de passe ne correspondent pas.");
        return;
    }




    const formData = {
        userName: userName,
        birthday: birthday,
        mail: mail,
        password: password
    };

    const xhr = new XMLHttpRequest();
    xhr.open('POST', '', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                console.log('Inscription réussie');
            } else {
                console.log('L\'inscription a échoué');
            }
        }
    };
    xhr.send(JSON.stringify(formData));
}
