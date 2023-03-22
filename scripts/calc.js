//Calculations relating to weave width
function calculateWeaveWidth(ends, epc ){
    if(isZeroish(ends) || isZeroish(epc)) {
        return 0;
    }

    return roundToTwoDec(ends / epc);
}
function calculateWarpEpc(ends, width){
    if(isZeroish(ends) || isZeroish(width)) {
        return 0;
    }
 return Math.round(ends / width);
}
function calculateWarpEnds(epc, width){
    if(isZeroish(epc) || isZeroish(width)) {
        return 0;
    }
    return Math.round(epc * width);
}
function calculateEpcFromReed(dents, cm, threads){
    return Math.round((dents/cm)*threads);
}




//Calculations relating to length
function calculateItemsLength( items, shrink, weaveIin){
    console.log(items)
    items.reduce((a,b=>a+b,0))
    console.log(items)
    items=items*shrink*weaveIin
    return items
}
function warpLength(items, fixed){

}
function isZeroish(number) {
    return number == 0;
}
function roundToTwoDec(nr){
    return Math.round(nr*100)/100;
}

export { calculateWeaveWidth, calculateWarpEpc, calculateWarpEnds, calculateEpcFromReed, isZeroish };