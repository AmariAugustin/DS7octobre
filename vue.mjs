export function displayProduct(product) {
    const tab = document.getElementById('productTab');
    tab.innerHTML = "";
    for (let p of product) {
        let rowHtml;
        if (p.stocked){
            rowHtml = `
            <tr >
                <td>${p.name}</td>
                <td>${p.price}</td>
            </tr>
        `;
        }
        else {
            rowHtml = `
            <tr>
                <td class = "outOfStock">${p.name}</td>
                <td>${p.price}</td>
            </tr>
        `;
        }
        tab.insertAdjacentHTML('beforeend', rowHtml);
        
    }
}