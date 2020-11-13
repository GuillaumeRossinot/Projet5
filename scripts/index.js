fetch('http://localhost:3000/api/teddies')
    .then(function(response) {
        return response.json()
    })
    .then(function (data) {
        const images1 = document.getElementById("produits");
        for (produit of data) {
            images1.innerHTML += `<div class="col-sm w-100">
                        <section class="produitours">
                            <img src="${produit.imageUrl}" alt="${produit.name}"></br>
                            <p>Nom : <a href="./pages/produit.html?:_id=${produit._id}">${produit.name}</a></p>
                            <p>Description : ${produit.description}<p>
                            <p>Prix : ${produit.price}</p>
                        </section>
                    </div>`
        }
    })