'use strict';

var img1 = document.getElementById('img1');
var img2 = document.getElementById('img2');
var img3 = document.getElementById('img3');
var imgSection = document.getElementById('pictureSection');
var resultList = document.getElementById('resultsList');

var ImageList = ['bag','banana', 'bathroom','boots', 'breakfast', 'bubblegum', 'chair','cthulhu','dog-duck','dragon','pen','pet-sweep','scissors','shark','sweep','tauntaun','unicorn','usb','water-can','wine-glass'];
var allItems = [];
var prevItem = [];
var newArray = [];
var timesClicked = 0;


// Object Function
function ItemImage(src, alt, title){
    this.src = src;
    this.alt = alt;
    this.title = title; 
    this.clicked = 0;
    this.viewed = 0;
    allItems.push(this);
}

// randomizes the image index
function randomImage(max){
    return Math.floor(Math.random() * max);
}

// setup the Images
function setupImages(){

    // keep randomizing Images (until)
    do{
        var pic1 = randomImage(allItems.length);
        var pic2 = randomImage(allItems.length);
        var pic3 = randomImage(allItems.length);
    
    // if pics equal to each other -- random number is included in array
    // - add viewed tally to the object
    }  while (pic1 === pic2 || pic2 === pic3 || pic1 === pic3 || newArray.includes(pic1) || newArray.includes(pic2) || newArray.includes(pic3)){     
        allItems[pic1].viewed++;
        allItems[pic2].viewed++;
        allItems[pic3].viewed++;
    }

    // reset the New array
    newArray = [];

    // loops through each Image and applies the information
    for (var i = 1; i < 4; i++){
        var objectName = `img${i}`;
        var indexID = `pic${i}`;
        newArray.push(eval(indexID));

        eval(objectName).src = allItems[eval(indexID)].src;
        eval(objectName).title = allItems[eval(indexID)].title;
        eval(objectName).alt = allItems[eval(indexID)].alt;
    }
}


// this sets up all my images - based on the array 'ImageList'
for (var x = 0; x < ImageList.length; x++){
    var name = ImageList[x];
    var src = `img/${name}.jpg`;
    new ItemImage(src, name, name);
}

// Call initial Image Setup
setupImages(allItems.length);

imgSection.addEventListener('click', handleclick);

function handleclick(e){

    if (timesClicked < 25){
        var clickedPicture = e.target.title;

        for(var i=0; i < allItems.length; i++){
            if(allItems[i].title === clickedPicture){
                allItems[i].clicked++;
            }
        }
        
        setupImages();
        timesClicked++; 

    } else if (timesClicked === 25) {
        timesClicked++; 
        reportInfo();
    }

}


function reportInfo(){
    for(var i= 0; i<allItems.length; i++){
        var listItem = document.createElement('li');      // create my table Row
        listItem.textContent = `${allItems[i].title}:  ${allItems[i].clicked} votes  --  viewed ${allItems[i].viewed} times. `
        resultsList.appendChild(listItem);                    // add the table to my global table body\
    }
}

