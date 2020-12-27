NbArticlePanier();

function NbArticlePanier() {
    console.log("fonction article panier");
    let panierNbArticle = localStorage.getItem("panier");
    let panierNbArticleJson = JSON.parse(panierNbArticle);
    if (panierNbArticleJson == null) {
        document.getElementById('right-cart-num').innerHTML = 0;
        console.log("panier vide");
    } else {
        let nbArticle = 0;
        for (elementNbArticle of panierNbArticleJson) {
            nbArticle += elementNbArticle.quantityp;
            console.log("panier remplie");
        }       
        document.getElementById('right-cart-num').innerHTML = nbArticle;
        }
    }