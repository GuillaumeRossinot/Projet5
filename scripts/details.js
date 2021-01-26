var url = new URL(window.location.href);
var teddyId = url.searchParams.get(":_id");
var teddyAPI = 'http://localhost:3000/api/teddies/' + teddyId;

function displayHtmlProduct(divToModify, produitToDisplay){
    divToModify.innerHTML += `<div class="col-sm">
            <section class="ours">
                <img src="${produitToDisplay.imageUrl}" alt="${produitToDisplay.name}"></br>
            </section>
        </div>
        <div class="col-sm">
            Nom : ${produitToDisplay.name}</br></br>
            Couleur :
            <select id="color-select">
                <option value="NO_USE">--Please choose an option--</option>
            </select><br /><br />
            Description : ${produitToDisplay.description}</br></br>
            prix : ${produitToDisplay.price} €</br>
                    <button id="ajoutPanier">
                    ajouter au panier
                    </button>
        </div>`;


        addColorList(document.getElementById('color-select'), produitToDisplay.colors);
    
}

function addColorList(sel, colors) {
    
    for (const color in colors) {
        let colorValue = colors[color];
        opt = document.createElement('option'); 
        opt.value = colorValue; 
        opt.innerHTML = colorValue; 
        sel.appendChild(opt); 
    }
};

fetch(teddyAPI)
    .then(function (response) {
        return response.json();
    })
    .then(function (produit) {
        // console.log(produit);
        const images1 = document.getElementById("produitsdetails");
        
        displayHtmlProduct(images1, produit);

        var ajoutpanier = document.getElementById("ajoutPanier");
        var idp = produit._id;
        var quantityp = 1; 
        
        ajoutpanier.onclick = function () {
            var addproduit = true;

            var colorp = document.getElementById("color-select").value;
            if (colorp == 'NO_USE') {
                document.getElementById('displayError').style.color = 'red';
                document.getElementById('displayError').innerHTML = 'Veuillez sélectionner une couleur.';
                return 0;
            }
            else {
                document.getElementById('displayError').style.color = 'green';
                document.getElementById('displayError').innerHTML = 'Produit ajouté au panier';
            }
            var descproduit = { idp, colorp, quantityp};
            
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
                if (descproduit.idp == produitpanier.idp && descproduit.colorp == produitpanier.colorp) {
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
            NbArticlePanier();
        }
    });
        










        
 


