document.addEventListener("DOMContentLoaded", function() {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

    const loginForm = document.getElementById("login-form");
    const errorMessage = document.getElementById("error-message");

    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();

        // Récupérer les valeurs du formulaire
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        // Exemple de vérification simple (remplacez par votre propre logique d'authentification)
        if (username === "utilisateur" && password === "motdepasse") {
            // Authentification réussie, rediriger ou effectuer d'autres actions ici
            alert("Connexion réussie !");
        } else {
            // Afficher un message d'erreur
            errorMessage.textContent = "Nom d'utilisateur ou mot de passe incorrect.";
        }
    });
    
});
