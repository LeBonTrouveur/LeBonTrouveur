function AffichageHTML(Informations) {
    var Taille = Informations.length;

    for (var i = 1; i < Informations[0].length; i++) {
        // crée un nouvel élément div 
        var newDiv = document.createElement("div");
        // Création du  contenu  :
        var texte = "Titre : " + Informations[0][i]  + " Categorie : " + Informations[1][i] + " Prix : " + Informations[2][i] + " €" ;
        var newContent = document.createTextNode(texte);
        // ajoute le noeud texte au nouveau div créé
        newDiv.appendChild(newContent);

        // ajoute le nouvel élément créé et son contenu dans le DOM 
        var currentDiv = document.getElementById("Resultats");
        document.body.insertBefore(newDiv, currentDiv);

    }

}

function Affichage_(Tableau2dim) {
    for (var i = 1; i < (Tableau2dim[0]).length; i++) {
        console.log("n° : " + i + " Titre : " + Tableau2dim[1][i - 1] + " Categorie : " + Tableau2dim[1][i - 1] + " Prix :" + Tableau2dim[2][i - 1] + " Localisation : " + Tableau2dim[3][i - 1]) ;
    }

}