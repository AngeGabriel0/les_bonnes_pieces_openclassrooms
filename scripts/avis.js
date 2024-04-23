// Définition de la fonction 'ajoutListenersAvis'
export function ajoutListenersAvis() {
    // Sélection de tous les boutons dans les articles de la classe 'fiches'
    const piecesElements = document.querySelectorAll(".fiches article button");

    // Boucle sur chaque bouton sélectionné
    for (let i = 0; i < piecesElements.length; i++) {
        piecesElements[i].addEventListener("click", async function (event) {
            // Récupération de l'ID de la pièce à partir de l'attribut 'data-id' du bouton cliqué
            const id = event.target.dataset.id;

            // Envoi d'une requête à l'API pour récupérer les avis de la pièce avec l'ID récupéré
            const reponse = await fetch("http://localhost:8081/pieces/" + id + "/avis");

            // Conversion de la réponse de l'API en JSON
            const avis = await reponse.json();

            // Stockage des avis dans le localStorage sous la clé 'avis-piece-' suivie de l'ID de la pièce
            window.localStorage.setItem("avis-piece-" + id, JSON.stringify(avis));

            // Récupération de l'élément parent du bouton cliqué (l'article)
            const pieceElement = event.target.parentElement;

            // Appel de la fonction 'afficherAvis' avec l'article et les avis récupérés
            afficherAvis(pieceElement, avis);
        });
    }
}

export function afficherAvis(pieceElement, avis) {
    const avisElement = document.createElement("p");
    for (let i = 0; i < avis.length; i++) {
        avisElement.innerHTML += `${avis[i].utilisateur}: ${avis[i].commentaire} <br>`;
    }

    pieceElement.appendChild(avisElement);

}


export function ajoutListenerEnvoyerAvis() {
    const formulaireAvis = document.querySelector(".formulaire-avis");
    formulaireAvis.addEventListener("submit", function (event) {
        event.preventDefault();
        // Création de l’objet du nouvel avis.
        const avis = {
            pieceId: parseInt(event.target.querySelector("[name=piece-id]").value),
            utilisateur: event.target.querySelector("[name=utilisateur").value,
            commentaire: event.target.querySelector("[name=commentaire]").value,
            nbEtoiles: event.target.querySelector("[name=etoiles]").value,

        };

        // Conversion de l’objet en JSON.
        const chargeUtile = JSON.stringify(avis);
        /** Appel de la fonction fetch avec les informations nécessaire
        * methode (GET ou POST), headers et body
        */
        fetch("http://localhost:8081/avis", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: chargeUtile
        })
    });
}
