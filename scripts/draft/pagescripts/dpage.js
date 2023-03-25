import { draftSetUp, getThredlePreference, getShaftPreference  } from "./dchart.js";
import { addInfo } from "./dinfo.js";



document.addEventListener("DOMContentLoaded", function () {//Runs after page-load
    draftSetUp( getShaftPreference(), getThredlePreference());
    addInfo();
    
});
