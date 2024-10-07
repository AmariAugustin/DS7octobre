import { productSearch } from "./modele.js";
import { displayProduct } from "./vue.mjs";
import { loadData } from "./dataLoader.mjs";

const data = loadData();
displayProduct(data);

document.getElementById('searchBar').addEventListener('input', () => {
    const searchTerm = document.getElementById('searchBar').value;
    const inStockOnly = document.getElementById('onlyStock').checked;
    const filteredProducts = productSearch(searchTerm, inStockOnly);
    displayProduct(filteredProducts);
});

document.getElementById('onlyStock').addEventListener('change', () => {
    const searchTerm = document.getElementById('searchBar').value;
    const inStockOnly = document.getElementById('onlyStock').checked;
    const filteredProducts = productSearch(searchTerm, inStockOnly);
    displayProduct(filteredProducts);
});