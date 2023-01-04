function addItemToWarp(itemNr){
    const itemBox = document.getElementById("item-box");
    let clone = itemBox.cloneNode(true);
    clone.setAttribute("id", `item-${itemNr}`);
    clone.querySelector("h6").textContent = `Item ${itemNr}`;
    clone.removeAttribute("style");
    document.getElementById("items-container").appendChild(clone);
}
function removeItemFromWarp(itemNr){

}

function addElements(start, nrOfItems, callback){
    for (let i = start; i <= nrOfItems; i++) {
        callback(i);
    }
}
function removeElements(stop, nrOfItems, callback){

}

function countChildren(id){
    const children = document.getElementById(id).children;
    return children.length;
}


function addEventListenersWarpLength(){
    console.log("change")
    document.getElementById("items").addEventListener("input", (e)=>{
        let visibleItems = countChildren('items-container');
        visibleItems<e.target.value ? addElements(visibleItems, e.target.value, addItemToWarp) : console.log("no items added");
        
    });
}

document.addEventListener("DOMContentLoaded", function () {//Runs after page-load
console.log("calcPage.js loaded");
addEventListenersWarpLength();
});