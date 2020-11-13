var url = new URL(window.location.href);
var teddyId = url.searchParams.get(":_id");
var teddyAPI = 'http://localhost:3000/api/teddies/' + teddyId;

fetch(teddyAPI)
    .then(function (response) {
        return response.json();
    })
    .then(function (produit) {
        // console.log(produit);
        const images1 = document.getElementById("produitsdetails");
        images1.innerHTML += `<div class="col-sm">
            <section class="ours">
                <img src="${produit.imageUrl}" alt="${produit.name}"></br>
            </section>
        </div>
        <div class="col-sm">
            Nom : ${produit.name}</br>
            Couleur : ${produit.colors}</br>
            Description : ${produit.description}</br>
            prix : ${produit.price}</br>
                    <button id="ajoutPanier">
                    ajouter au panier
                    </button>
        </div>`;

        var ajoutpanier = document.getElementById("ajoutPanier");
        var idp = produit._id;
        var quantityp = 1; 
        
        ajoutpanier.onclick = function () {
            var addproduit = true;

            var descproduit = { idp, quantityp};
            
            var storedValue = localStorage.getItem("panier");// recup les donnée
            if (storedValue == null) {
                var panierLinea = new Array();
            }
            else {
                var panierLinea = JSON.parse(storedValue);    // parser les données du json
            }

            // je verifie si le produit est deja dans le panier
            // parcourir panierLinea
            for (produitpanier of panierLinea) {
                    // si l'id correspond avec l'id du produit
                if (descproduit.idp == produitpanier.idp) {
                    //si oui je rajoute +1 quantite
                    produitpanier.quantityp++;
                    addproduit = false;
                }
            }
            
            if (addproduit == true) {
                panierLinea.push(descproduit);
            }
                 
                    //si non je rajoute le produit dans le tableau
            //panierLinea.push(descproduit);  //  ajout les nouvelles données
            storedValue = JSON.stringify(panierLinea); /*   stringify les données */
            localStorage.setItem("panier", storedValue);/*    mettre a jour les données */
        }

    });
        










        
 


