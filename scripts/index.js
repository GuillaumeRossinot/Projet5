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
                            <p>Nom : ${produit.name}</p>
                            <p>Description : ${produit.description}<p>
                            <p>Prix : ${produit.price} €</p>
                            <a href="./pages/produit.html?:_id=${produit._id}" class="btn btn-primary btn-lg active" role="button" aria-pressed="true">Commander</a>
                        </section>
                    </div>`
        }
    })
    .catch(function(error)
    {
        console.log(error);
    });
    
