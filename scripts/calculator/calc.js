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
function calculateItemsLength( items, weaveIn, shrink){
    console.log(items)
    items=items.reduce((a,b)=>Number(a)+Number(b),0)
    items= items*(1+weaveIn/100)
    items= items*(1+shrink/100)
    items= roundToTwoDec(items)
    return items
}
function calculateFixedLength( ...fixed){//sums all params
    let sum = fixed.reduce((a,b)=>Number(a)+Number(b),0)
    return sum
}
function warpLength(items, fixed){
    return items+fixed
}
function isZeroish(number) {
    return number == 0;
}
function roundToTwoDec(nr){
    return Math.round(nr*100)/100;
}

export { calculateWeaveWidth, calculateWarpEpc, calculateWarpEnds, calculateEpcFromReed, isZeroish, calculateFixedLength, calculateItemsLength, warpLength };