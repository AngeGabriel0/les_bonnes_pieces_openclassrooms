// Récupération des pièces depuis le fichier JSON
const pieces = await fetch("pieces-autos.json").then(pieces => pieces.json());

function genererPieces(pieces) {
    for (let i = 0; i < pieces.length; i++) {
        const article = pieces[i];
        const sectionFiches = document.querySelector(".fiches");
        const pieceElement = document.createElement("article");
        const imageElement = document.createElement("img");
        imageElement.src = article.image;
        const nomElement = document.createElement("h2");
        nomElement.innerText = article.nom;
        const prixElement = document.createElement("p");
        prixElement.innerText = `Prix: ${article.prix} € (${article.prix < 35 ? "€" : "€€€"})`;
        const categorieElement = document.createElement("p");
        categorieElement.innerText = article.categorie ?? "(aucune catégorie)";
        const descriptionElement = document.createElement("p");
        descriptionElement.innerText = article.description ?? "Pas de description pour le moment.";
        const stockElement = document.createElement("p");
        stockElement.innerText = article.disponibilite ? "En stock" : "Rupture de stock";
        sectionFiches.appendChild(pieceElement);
        pieceElement.appendChild(imageElement);
        pieceElement.appendChild(nomElement);
        pieceElement.appendChild(prixElement);
        pieceElement.appendChild(categorieElement);
        pieceElement.appendChild(descriptionElement);
        pieceElement.appendChild(stockElement);
    }

}

genererPieces(pieces);

/** Tri et affichage des pièces
 *  Fonction trierEtAfficherPieces
 * @param {*} critereTri 
 * @param {*} filtre 
 */
function trierEtAfficherPieces(critereTri, filtre) {
    let piecesOrdonnees = Array.from(pieces);
    if (critereTri) {
        piecesOrdonnees.sort(critereTri);
    }
    if (filtre) {
        piecesOrdonnees = piecesOrdonnees.filter(filtre);
    }
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesOrdonnees);
}

document.querySelector(".btn-trier").addEventListener("click", () => {
    trierEtAfficherPieces((a, b) => a.prix - b.prix);
});

document.querySelector(".btn-filtrer").addEventListener("click", () => {
    trierEtAfficherPieces(null, piece => piece.prix <= 35);
});

document.querySelector(".btn-description").addEventListener("click", () => {
    trierEtAfficherPieces(null, piece => piece.description);
});

document.querySelector(".btn-decroissant").addEventListener("click", () => {
    trierEtAfficherPieces((a, b) => b.prix - a.prix);
});

/** Affichage des pièces abordables directement sur la page
 * Fonction lambda, boucle for et méthode splice
 * Création de liste et ajout des éléments à la liste
 * Ajout d'en-tête et de la liste au bloc résultats filtrés
 */
const noms = pieces.map(piece => piece.nom);
for (let i = pieces.length - 1; i >= 0; i--) {
    if (pieces[i].prix > 35) {
        noms.splice(i, 1)
    }
}
console.log(noms);

//Création de la liste
const abordablesElements = document.createElement('ul');
//Ajout de chaque nom à la liste
for (let i = 0; i < noms.length; i++) {
    const nomElement = document.createElement('li');
    nomElement.innerText = noms[i];
    abordablesElements.appendChild(nomElement)
}
// Ajout de l'en-tête puis de la liste au bloc résultats filtres
document.querySelector('.abordables')
    .appendChild(abordablesElements)


/** Affichage d'une description brève des pièces disonibles, directement sur la page
 * Fonction lamba, boucle for et méthode splice
 * Création de liste et ajout des éléments à la liste
 * Ajout d'en-tête et de la liste au bloc résultats filtrés
 */

const nomsDisponibles = pieces.map(piece => piece.nom);
const prixDisponibles = pieces.filter(piece => piece.prix);
for (let i = pieces.length - 1; i >= 0; i--) {
    if (pieces[i].disponibilite === false) {
        nomsDisponibles.splice(i, 1)
        prixDisponibles.splice(i, 1)
    }
}

//Création de la liste
const disponiblesElements = document.createElement('ul');
//Ajout de chaque nom à la liste
for (let i = 0; i < nomsDisponibles.length; i++) {
    const nomElement = document.createElement('li');
    nomElement.innerText = nomsDisponibles[i] + " - " + prixDisponibles[i].prix + "€";
    disponiblesElements.appendChild(nomElement)
}
// Ajout de l'en-tête puis de la liste au bloc résultats filtres
document.querySelector('.disponibles')
    .appendChild(disponiblesElements)

    const inputPrixMax = document.querySelector("#prixMax");
    
    inputPrixMax.addEventListener("input", () => {
        const piecesFiltrees  = pieces.filter(function(piece) {
            return piece.prix <= inputPrixMax.value;
        });
        document.querySelector(".fiches").innerHTML = "";
        genererPieces(piecesFiltrees);
    });