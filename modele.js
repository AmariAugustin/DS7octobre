import { loadData } from "./dataLoader.mjs";

const data = loadData();

export function productSearch(searchText, inStockOnly) {
    return data.filter(product => 
        (!inStockOnly || product.stocked) && 
        product.name.toLowerCase().startsWith(searchText.toLowerCase())
    );
}