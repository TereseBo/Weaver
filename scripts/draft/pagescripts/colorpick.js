function addOptionColor(rgb, thread) {//adds a color to the color pto the previous  color select?
    let option=document.createElement('div');
    let container=document.getElementById(`${thread}-box`);
    option.id=rgb;
    option.classList.add('thread');
    option.style.backgroundColor=rgb;
    option.addEventListener('click', ()=>{setColorPicker(rgb)});
    container.appendChild(option);
}
function displayPreviousColors(thread){//displays the previous colors in the color select
    let container=document.getElementById(`previous-colors-container`);
    let select=document.getElementById(`${thread}-color-container`);
   select.removeAttribute('style');
   container.removeAttribute("style");
}
function setColorPicker(rgb){
    document.getElementById('currentcolor').value=rgb;
}

function isNewColor(rgb, thread) {//checks if the color is new
    let select=document.getElementById(`${thread}-box`);
    let options=select.querySelectorAll('div');
    if(Array.from(options).find(option=>option.id===rgb)){
        return false;
    }
    else{
        return true;
    }   

}

function updateColorbox(rgb, thread){
   if( isNewColor(rgb, thread)){
         displayPreviousColors(thread);
    addOptionColor(rgb, thread);
   }
}

export{updateColorbox, setColorPicker, isNewColor}

