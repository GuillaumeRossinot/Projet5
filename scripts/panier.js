let panierLinea = localStorage.getItem("panier");
let panierJson = JSON.parse(panierLinea);
var totalpanier = [];
var totalproduit = 0;

function plusTeddy(idTeddy, prixTeddy) {//todo
    let LSpanier = localStorage.getItem("panier");
    let panierD = JSON.parse(LSpanier);

    for (produit of panierD) {
        let idp = produit.idp;
        //console.log("id = " + idp + " quantite = " + quantityp);
        if (idp == idTeddy) {
            produit.quantityp += 1;
            totalpanier[idTeddy] += prixTeddy;
            document.getElementById('quantiteProduit' + idTeddy).innerHTML = produit.quantityp;
            document.getElementById('totalproduit' + idTeddy).innerHTML = produit.quantityp * prixTeddy;
        }
    }
    let panierDjson = JSON.stringify(panierD);
    localStorage.setItem("panier", panierDjson);
}

function moinsTeddy(idTeddy, prixTeddy) {//todo
    let LSpanier = localStorage.getItem("panier");
    let panierD = JSON.parse(LSpanier);

    for (produit of panierD) {
        let idp = produit.idp;
        //console.log("id = " + idp + " quantite = " + quantityp);
        if (idp == idTeddy && produit.quantityp > 1) {
            produit.quantityp -= 1;
            totalpanier[idTeddy] -= prixTeddy;
            document.getElementById('quantiteProduit' + idTeddy).innerHTML = produit.quantityp;
            document.getElementById('totalproduit' + idTeddy).innerHTML = produit.quantityp * prixTeddy;
        }
        else if(idp == idTeddy && produit.quantityp == 1){
            delete totalpanier[idTeddy];
            console.log("log panierD : " + panierD.indexOf(produit));
            panierD.splice(panierD.indexOf(produit), 1);
            document.getElementById("listeproduits" + idTeddy).innerHTML = "";
        }
    }
    let panierDjson = JSON.stringify(panierD);
    localStorage.setItem("panier", panierDjson);
}

function calculTotalPrixpanier() {
    //console.log("blah " + totalpanier.length);
    let totalpanierprix = 0;
    for ( var key in totalpanier){
    console.log ('id : ' + key + ' val : ' + totalpanier[key]);
    totalpanierprix += totalpanier[key];
    }
    document.getElementById('totalpanier').innerHTML = totalpanierprix;
}


if (panierLinea != null) {

    for (produit of panierJson) {

        let teddyId = produit.idp;
        let teddyAPI = 'http://localhost:3000/api/teddies/' + teddyId;
        let quantityp = produit.quantityp;
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
        <div class="col-sm" id="listeproduits${teddyId}">
            <div class="imageproduit">
                <img src="${infoproduit.imageUrl}" alt="${infoproduit.name}"></br>
            </div>
            <div class="infosproduit">
                Nom : ${infoproduit.name}</br>
                prix : ${infoproduit.price}</br>
                quantité :
                <button onclick="moinsTeddy('${teddyId}',${infoproduit.price});calculTotalPrixpanier();">
                -
                </button>
                <div id="quantiteProduit${teddyId}">
                ${quantityp}
                </div>
                <button onclick="plusTeddy('${teddyId}',${infoproduit.price});calculTotalPrixpanier();">
                +
                </button>
                </br>
                total produit :
                <div id="totalproduit${teddyId}">${totalproduit}
                </div></br>
            </div>
        </div>`;
                totalpanier[teddyId] = Number(totalproduit);
                //console.log( totalpanier);
                calculTotalPrixpanier();
            })  
    }
}
else {
    document.getElementById('produits').innerHTML = `Votre panier est vide.`;
}



