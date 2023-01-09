function calculateWeaveWidth(ends, epc ){
    if(isZero(ends) || isZero(epc)) {
        return 0;
    }

    return roundToTwoDec(ends / epc);
}
function calculateWarpEpc(ends, width){
    if(isZero(ends) || isZero(width)) {
        return 0;
    }
 return Math.round(ends / width);
}
function calculateWarpEnds(epc, width){
    if(isZero(epc) || isZero(width)) {
        return 0;
    }
    return Math.round(epc * width);
}
function calculateEpcFromReed(dents, cm, threads){
    return Math.round((dents/cm)*threads);
}
function isZero(number) {
    return number == 0;
}
function roundToTwoDec(nr){
    return Math.round(nr*100)/100;
}

export { calculateWeaveWidth, calculateWarpEpc, calculateWarpEnds, calculateEpcFromReed };