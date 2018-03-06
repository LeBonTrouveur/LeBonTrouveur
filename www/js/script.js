/*
 Allorigins.me permet d'éviter des erreurs de type CORS 'Cross-Origin Resource Sharing', plus d'info sur : http://www.whateverorigin.org/ , https://www.thepolyglotdeveloper.com/2014/08/bypass-cors-errors-testing-apis-locally/ et  https://medium.freecodecamp.org/client-side-web-scraping-with-javascript-using-jquery-and-regex-5b57a271cb86 Dans cordova cela ne devrais pas posse de probleme avec un allow origine
*/
const TITREVENTE = "item_title";

function GestionNull_ ( Verif){
    if (Verif == null){
                Verif = "";
            }else{
                Verif = Verif [1];
            }
    //match revoit un tableau de taille 2, la 2eme case contiens le résultat
    return Verif;
}

function Decoupage_(TableauAnnonce) {
    var Categorie = [];
    var Titres = [];
    var Donnes = [];
    var Prix = [];
    var Localisation = [];
    var Localisation2 = [];
    var Taille = TableauAnnonce.length;

    if (Taille > 1) {
        for (var i = 1; i < Taille; i++) {
            TableauAnnonce[i] = TableauAnnonce[i].replace(/\n|\r/g, ''); // supression des retour lignes
            
            Categorie[i - 1] = (TableauAnnonce[i].match(/<p class="item_supp" itemprop="category" content="((?:.|\n)*?)">/)); 
            Titres[i - 1] = (TableauAnnonce[i].match(/<h2 class="item_title" itemprop="name">((?:.|\n)*?)<\/h2>/)); 
            Prix[i - 1] = ((TableauAnnonce[i]).match(/<h3 class="item_price" itemprop="price" content="((?:.|\d)*?)">/)) ;  
            Localisation [i - 1] = ((TableauAnnonce[i]).match(/<p class="item_supp" itemprop="availableAtOrFrom" itemscope itemtype="http:\/\/schema.org\/Place">((?:.|\n)*?)\//)) ; 

            
            // gestion des valeur null ou undefine
            Prix[i - 1] = GestionNull_ (Prix[i-1]);
            Titres[i - 1] = GestionNull_ (Titres[i - 1]);
            Categorie[i - 1] = GestionNull_ (Categorie[i - 1]);
            Localisation[i - 1] = GestionNull_(Localisation[i - 1]);

            
        }
        Donnes[0] = Titres;
        Donnes[1] = Categorie;
        Donnes[2] = Prix ;
        Donnes[3] = Localisation;

        return Donnes;
    } else {
        return false; // cas où il n'y a rien dans le tableau
    }
}

function Affichage_(Tableau2dim) {
    for (var i = 1; i < (Tableau2dim[0]).length; i++) {
        console.log("n° : " + i  + " Titre : " + Tableau2dim[0][i - 1] + " Categorie : " + Tableau2dim[1][i - 1] + " Prix :" + Tableau2dim[2][i-1] + " Localisation : " + Tableau2dim[3][i-1] );
    }

}

$.get( 'https://allorigins.me/get?method=raw&url=' + encodeURIComponent('https://www.leboncoin.fr/annonces/offres/midi_pyrenees/') + '&callback=?'
    /*'http://127.0.0.1:59967/pageLeboncoin.html'*/,
    function (data) {
        var Offres = []; //tableau de tableau : 0 : Titre ; 1 : Categorie
        var divOffre = data.split('<li itemscope itemtype="http://schema.org/Offer">');
        // Tableau contenant toutes la page web, de 1 à n : contient les annonces
        console.log("Taille du tableau: " + divOffre.length);
        Offres = Decoupage_(divOffre);
        if (Offres != false){
            Affichage_(Offres);
        }else{
            alert("Erreur");
        }
        

    });
