
var commandeValidee = localStorage.getItem("commandeValidee");
var panier = localStorage.getItem("panier");

var teddyAPI = 'http://localhost:3000/api/teddies/';

var prixTotalTeddy = 0;

function calcTeddyPrice(teddyId, quantiteTeddy) {

    fetch(teddyAPI + teddyId)
        .then(function (response) {
            return response.json();
        })
        .then(function (produit) {
            console.log("priceTeddy = " + produit.price);
            prixTotalTeddy += produit.price * quantiteTeddy;
            document.getElementById('prixTotal').innerHTML = prixTotalTeddy + " €";
        })
}


if (commandeValidee != null && commandeValidee != '' && panier != null && panier != '') {
    let commandeParseJSON = JSON.parse(commandeValidee);
    let panierParseJSON = JSON.parse(panier);

    //let totalPanierEuro = 0;
    for (produitPanier of panierParseJSON) {

        calcTeddyPrice(produitPanier.idp, produitPanier.quantityp);
        //totalPanierEuro += Number(produitPanier.quantityp) * priceTeddy;
    }
    
    let orderId = commandeParseJSON.orderId;
    console.log(orderId);

   // for (produitPanier in commandeParseJSON.products)

    document.getElementById('confCommande').innerHTML = `Votre commande a été validée.</br>
Merci d'avoir commandé chez nous, voici votre numéro de commande : ${orderId}`;
    
    //localStorage.clear();
    localStorage.removeItem('panier');
    localStorage.removeItem('commandeValidee');
}



