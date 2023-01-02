function calculateWeaveWidth(ends, epc ){
    if(isZero(ends) || isZero(epc)) {
        return 0;
    }

    return ends / epc;
}
function calculateWarpEpi(ends, width){
    if(isZero(ends) || isZero(width)) {
        return 0;
    }
 return ends / width;
}
function calculateWarpEnds(epc, width){
    if(isZero(epc) || isZero(width)) {
        return 0;
    }
    return epc * width;
}

function isZero(number) {
    return number === 0;
}

export { calculateWeaveWidth, calculateWarpEpi, calculateWarpEnds };