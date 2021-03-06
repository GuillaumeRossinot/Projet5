let panierLinea = localStorage.getItem("panier");
let panierJson = JSON.parse(panierLinea);
var totalpanier = [];
var totalproduit = 0;

function plusTeddy(idTeddy, colorTeddy, prixTeddy) {//todo
    let LSpanier = localStorage.getItem("panier");
    let panierD = JSON.parse(LSpanier);

    for (produit of panierD) {
        let idp = produit.idp;
        let colorp = produit.colorp;
        let quantityp = produit.quantityp;
        //console.log("id = " + idp + " quantite = " + quantityp);
        if (idp == idTeddy && colorp == colorTeddy) {
            produit.quantityp += 1;
            totalpanier[idTeddy][colorTeddy] += prixTeddy;
            document.getElementById('quantiteProduit' + idTeddy + colorp).innerHTML = produit.quantityp;
            document.getElementById('totalproduit' + idTeddy + colorp).innerHTML = produit.quantityp * prixTeddy + ' €';
        }
    }
    let panierDjson = JSON.stringify(panierD);
    localStorage.setItem("panier", panierDjson);
    NbArticlePanier();
}

function moinsTeddy(idTeddy, colorTeddy, prixTeddy) {//todo
    let LSpanier = localStorage.getItem("panier");
    let panierD = JSON.parse(LSpanier);

    for (produit of panierD) {
        let idp = produit.idp;
        let colorp = produit.colorp;
        //console.log("id = " + idp + " quantite = " + quantityp);
        if (idp == idTeddy && produit.quantityp > 1 && colorp == colorTeddy) {
            produit.quantityp -= 1;
            totalpanier[idTeddy][colorTeddy]  -= prixTeddy;
            document.getElementById('quantiteProduit' + idTeddy + colorp).innerHTML = produit.quantityp;
            document.getElementById('totalproduit' + idTeddy + colorp).innerHTML = produit.quantityp * prixTeddy + ' €';
        }
        else if(idp == idTeddy && produit.quantityp == 1 && colorp == colorTeddy){
            delete totalpanier[idTeddy][colorTeddy];
            //console.log("log panierD : " + panierD.indexOf(produit));
            panierD.splice(panierD.indexOf(produit), 1);
            document.getElementById("listeproduits" + idTeddy + colorp).innerHTML = "";
        }
    }
    let panierDjson = JSON.stringify(panierD);
    localStorage.setItem("panier", panierDjson);
    NbArticlePanier();
}

function calculTotalPrixpanier() {
    //console.log("blah " + totalpanier.length);
    let totalpanierprix = 0;
    for (var keyid in totalpanier) {
        for (var keycolor in totalpanier[keyid]) {
            totalpanierprix += totalpanier[keyid][keycolor];
        }
    }
    document.getElementById('totalpanier').innerHTML = totalpanierprix + ' €';
}


/**
 * sends a request to the specified url from a form. this will change the window location.
 * @param {string} path the path to send the post request to
 * @param {object} params the paramiters to add to the url
 * @param {string} [method=post] the method to use on the form
 */
function postPanier(path, ListeProduit, method = 'post') {
         

    var contact = new Object();

    contact.firstName = document.getElementById('prenomContact').value;
    contact.lastName = document.getElementById('nomContact').value;
    contact.address = document.getElementById('adresseContact').value;
    contact.city = document.getElementById('villeContact').value;
    contact.email = document.getElementById('emailContact').value;
    //console.log(contact);
    

    var params = new Object();
    params.contact = contact;
    params.products = ListeProduit;

    var http = new XMLHttpRequest();
    http.open(method, path, true);
    http.setRequestHeader("Content-type", "application/json");
    http.send(JSON.stringify(params));
    http.onload = function () {
        var reponsePanierJSON = http.responseText;
        var reponsePanier = JSON.parse(reponsePanierJSON);
        localStorage.setItem("commandeValidee", reponsePanierJSON);
        var orderId = reponsePanier.orderId;
        //console.log(reponsePanier);
        //console.log('orderId : ' + orderId);

        
        
        location.href = "./confcommande.html";
        // TODO : appeler la "page" de confirmation de commande.
    }
}

var formValid = document.getElementById('EnvoieCommande');
formValid.addEventListener('click', validationForm);
            
function validationFormBlur(champ) {
    //console.log('champ =' + champ);

    var field = document.getElementById(champ + 'Contact');
    var missField = document.getElementById('miss' + champ);
    var prenomValid = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
    var nomValid = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
    var adresseValid = /(\d+)?\,?\s?(bis|ter|quater)?\,?\s?(rue|avenue|boulevard|r|av|ave|bd|bvd|square|sente|impasse|cours|esplanade|allée|résidence|parc|rond-point|chemin|côte|place|cité|quai|passage|lôtissement|hameau)?\s([a-zA-Zà-ÿ0-9\s]{2,})+$/gi;
    var villeValid = /^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$/;
    var mailValid = /^[-+.\w]{1,64}@[-.\w]{1,64}\.[-.\w]{2,6}$/i;
    var isValid = false;

    //console.log('field.value =' + field.value);
                //Si le champ est vide
                if (field.validity.valueMissing){
                    // event.preventDefault();
                    missField.innerHTML = champ + ' manquant';
                    missField.style.color = 'red';
                    field.style.border = '2px solid red';
                    isValid = false;
                //Si le format de données est incorrect
                }else if ((champ == 'prenom' && prenomValid.test(field.value) == false)
                    || (champ == 'nom' && nomValid.test(field.value) == false)
                    || (champ == 'adresse' && adresseValid.test(field.value) == false)
                    || (champ == 'ville' && villeValid.test(field.value) == false)
                    || (champ == 'email' && mailValid.test(field.value) == false)) {
                    // event.preventDefault();
                    missField.innerHTML = 'Format incorrect';
                    missField.style.color = 'orange';
                    field.style.border = '2px solid orange';
                    isValid = false;
                } else { 
                    missField.innerHTML = '';
                    missField.style.color = 'green';
                    field.style.border = '2px solid green';
                    isValid = true;
    }
    return isValid;
}
            
function validationForm() {
    var isFormValid = true;
    if (!validationFormBlur('prenom')) {
        isFormValid = false;
    }
        if(!validationFormBlur('nom')) {
            isFormValid = false;
        }
        if(!validationFormBlur('adresse')) {
            isFormValid = false;
        }
        if(!validationFormBlur('ville')) {
            isFormValid = false;
        }
        if(!validationFormBlur('email')) {
            isFormValid = false;
    } 
    return isFormValid;
}

    

if (panierLinea != null) {
    var listeDeProduit = new Array();

    for (produit of panierJson) {

        listeDeProduit.push(produit.idp);

        let teddyId = produit.idp;
        let teddyAPI = 'http://localhost:3000/api/teddies/' + teddyId;
        let quantityp = produit.quantityp;
        let colorp = produit.colorp;
        // console.log("id produit " + teddyAPI);
        // console.log("quantite produit " + quantityp); 

        fetch(teddyAPI)
            .then(function (response) {
                return response.json();
            })
            .then(function (infoproduit) {
                totalproduit = infoproduit.price * produit.quantityp;

                const images1 = document.getElementById("produits");
                images1.innerHTML += `
        <div class="col-sm" id="listeproduits${teddyId}${colorp}">
            <div class="imageproduit">
                <img src="${infoproduit.imageUrl}" alt="${infoproduit.name}"></br>
            </div>
            <div class="infosproduit">
                Nom : ${infoproduit.name}</br>
                Coueur : ${colorp}</br>
                Prix : ${infoproduit.price} €</br>
                Description : ${infoproduit.description}</br>
                <div class="modifquantite">
                    Quantité :
                    <button onclick="moinsTeddy('${teddyId}','${colorp}',${infoproduit.price});calculTotalPrixpanier();">
                    -
                    </button>
                    <div id="quantiteProduit${teddyId}${colorp}">
                    ${quantityp}
                    </div>
                    <button onclick="plusTeddy('${teddyId}','${colorp}',${infoproduit.price});calculTotalPrixpanier();">
                    +
                    </button>
                </div>
                </br>
                Total produit :
                <div id="totalproduit${teddyId}${colorp}">${totalproduit} €
                </div></br>
            </div>
        </div>`;
                if(totalpanier[teddyId] == undefined)
                    totalpanier[teddyId] = {};
                totalpanier[teddyId][colorp] = Number(totalproduit);
                //console.log( totalpanier);
                calculTotalPrixpanier();
            })  
    }

    document.getElementById("EnvoieCommande").onclick = function () {
        if (validationForm()) {
            postPanier('http://localhost:3000/api/teddies/order', listeDeProduit, 'post');
        }
    };
}
else {
    document.getElementById('produits').innerHTML = `Votre panier est vide.`;
    console.log("toto");
}
