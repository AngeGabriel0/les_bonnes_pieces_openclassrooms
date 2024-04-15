const response = await fetch ("pieces-autos.json");
const pieces = await response.json();

const article = pieces[0];

const imageElement = document.createElement("img");
imageElement.src = article.image;

const nomElement = document.createElement("h2");
nomElement.innerText = article.nom;

const prixElement = document.createElement("p");
prixElement.innerText = `Prix: ${article.prix} € (${article.prix < 35 ? "$" : "$$$"})`;

const categorieElement = document.createElement("p");
categorieElement.innerText = article.categorie;

const descriptionElement = document.createElement("p");
descriptionElement.innerText = article.description ?? "Pas de description";

const disponibiliteElement = document.createElement("p");
disponibiliteElement.innerText = article.disponibilite ? "En stock" : "Rupture de stock";




//Rattachement des balises au DOM
const sectionFiches = document.querySelector(".fiches");
sectionFiches.appendChild(imageElement);
sectionFiches.appendChild(nomElement);
sectionFiches.appendChild(prixElement);
sectionFiches.appendChild(categorieElement);
sectionFiches.appendChild(descriptionElement);
sectionFiches.appendChild(disponibiliteElement);