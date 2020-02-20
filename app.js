'use strict';

// var img1 = document.getElementById('img1');
// var img2 = document.getElementById('img2');
// var img3 = document.getElementById('img3');
var imgSection = document.getElementById('pictureSection');
var resultList = document.getElementById('resultsList');


var allItems = [];
var prevArray = [];
var labelArray = [];
var viewsArray = [];
var votesArray = [];
var color1Array = [];
var color2Array = [];

var timesClicked = 0;
var testImages = 3;
var uniqueClicks = 2;

//================================================
// Setups the Number of pictures to be selected
// - adds to section: pictureSection
// - invokes function
//------------------------
function setupPictures(numberPictures){
  for(var p = 1; p <= numberPictures; p++){
    var testImage = document.createElement('img');
    testImage.id = `img${p}`;
    console.log(`img${p}`);
    imgSection.appendChild(testImage);
  }
}

setupPictures(testImages);

//=====================================
// [Object]  ItemImage
// -- holds the information about the Image
//------------------------
function ItemImage(src, alt, title){
  this.src = src;
  this.alt = alt;
  this.title = title;
  this.clicked = 0;
  this.viewed = 0;
  this.backgroundColor = getRGBA();
  allItems.push(this);
}

var ImageList = ['bag','banana', 'bathroom','boots', 'breakfast', 'bubblegum', 'chair','cthulhu','dog-duck','dragon','pen','pet-sweep','scissors','shark','sweep','tauntaun','unicorn','usb','water-can','wine-glass'];

// Creates Objects 'ItemImage'
// - Loops through ImageList array
//----------------------------------
for (var x = 0; x < ImageList.length; x++){
  var imgName = ImageList[x];
  var src = `img/${imgName}.jpg`;
  new ItemImage(src, imgName, imgName);
}

//=====================================
// RANDOM FUNCTIONS
//---------------------
function randomNumber(max){
  return Math.floor(Math.random() * max);
}

function getRGBA(){
  var r = randomNumber(255);
  var b = randomNumber(255);
  var g = randomNumber(255);
  var a = Math.random();

  return `rgba(${r},${b},${g},${a})`;
}
//=====================================


function displayImages(){
  var displayArray = [];
  var max = allItems.length;

  

  do{
    //displayArray = [];
    
    for(var pic = 0; pic < testImages; pic++){
      var randoPic = randomNumber(max);
  
      while (prevArray.includes(randoPic)){
        randoPic = randomNumber(max);
      }
      
      if (displayArray.includes(randoPic)){
        displayArray.splice(displayArray.indexOf(randoPic),1);
      } else if (displayArray.length < testImages){
        displayArray.push(randoPic);
      } else {
        displayArray.push(randoPic);
      }

    }
    // for(var pic = 0; pic < testImages; pic++){
    //   var randoPic = randomNumber(max);

    //   if(displayArray.includes(randoPic)){
    //     displayArray[displayArray.indexOf(randoPic)] = randomNumber(max);
    //   } else if (displayArray.length === testImages-1){
    //     displayArray.shift();
    //     displayArray.push(randoPic);
    //   } else {
    //     displayArray.push(randoPic);
    //   }
    // }
  } while (displayArray.length === testImages-1);{
    console.log(`while: prevArray: ${prevArray}  Display array: ${displayArray}`);
  }

  for (var i = 1; i <= testImages; i++){
    var imgID = `img${i}`;
    var indexID = displayArray[i-1];
    var imgElement = document.getElementById(imgID);
    var uniqueImages = uniqueClicks * testImages;

    if(prevArray.length === uniqueImages){
      prevArray.shift();
      prevArray.push(indexID);
    } else {
      prevArray.push(indexID);
    }

    // Applys image element requirements
    imgElement.src = allItems[indexID].src;
    imgElement.title = allItems[indexID].title;
    imgElement.alt = allItems[indexID].alt;
    allItems[indexID].viewed ++;
  }
}


displayImages();


// // setup the Images
// function setupImages(){
//   var showArray = [];
//   // keep randomizing Images (until)
//   do{

//     for(var z = 0; z < testImages; z++){
//       var number = randomNumber(allItems.length);
//       if (!showArray.includes(number)){
//         showArray[z] = number;
//       }
//     }
//     // var pic1 = randomNumber(allItems.length);
//     // var pic2 = randomNumber(allItems.length);
//     // var pic3 = randomNumber(allItems.length);

//     // if pics equal to each other -- random number is included in array
//     // - add viewed tally to the object
//   } while (newArray.includes(showArray)){
//   //   for(var q = 0; q <= testImages; q++){
//   //     allItems[showArray[q]].viewed ++;
//   //   }
//   // }
//   // } while (pic1 === pic2 || pic2 === pic3 || pic1 === pic3 || newArray.includes(pic1) || newArray.includes(pic2) || newArray.includes(pic3));{
//   //   allItems[pic1].viewed++;
//   //   allItems[pic2].viewed++;
//   //   allItems[pic3].viewed++;
//   // }

//   // loops through each Image and applies the information
//   // var numberImages = imgSection.childElementCount;

//   for (var i = 1; i <= testImages; i++){
//     var objectName = `img${i}`;
//     var indexID = `pic${i}`;

//     var element = document.getElementById(objectName);
//     var picShown = uniqueClicks * testImages;

//       if(newArray.length === picShown){
//         newArray.shift();
//         newArray.push(eval(indexID));
//       } else {
//         newArray.push(eval(indexID));
//       }

//     element.src = allItems[eval(indexID)].src;
//     element.title = allItems[eval(indexID)].title;
//     element.alt = allItems[eval(indexID)].alt;
//     allItems[eval(indexID)].viewed ++;


//     // eval(objectName).src = allItems[eval(indexID)].src;
//     // eval(objectName).title = allItems[eval(indexID)].title;
//     // eval(objectName).alt = allItems[eval(indexID)].alt;
//   }
// }




imgSection.addEventListener('click', handleclick);

function handleclick(e){

  if (timesClicked < 25){
    var clickedPicture = e.target.title;

    for(var i=0; i < allItems.length; i++){
      if(allItems[i].title === clickedPicture){
        allItems[i].clicked++;
      }
    }

    displayImages();
    timesClicked++;

  } else if (timesClicked === 25) {
    reportInfo();
    renderCanvas();
    timesClicked++;
  }

}



function reportInfo(){
  for(var i= 0; i<allItems.length; i++){
    var listItem = document.createElement('li'); // create my table Row
    viewsArray[i] = allItems[i].viewed;
    votesArray[i] = allItems[i].clicked;
    labelArray[i] = allItems[i].title;
    color1Array[i] = getRGBA();
    color2Array[i] = getRGBA();
    listItem.textContent = `${allItems[i].title}:  ${allItems[i].clicked} votes  --  viewed ${allItems[i].viewed} times. `;
    resultList.appendChild(listItem); // add the table to my global table body\
  }
}




function renderCanvas(){
  var ctx = document.getElementById('barChart');
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {labels: labelArray,
      datasets: [{label: '# of Clicks per View',
        data: viewsArray,
        backgroundColor: color1Array,
        borderColor: color2Array,
        borderWidth: 1}]},
    options: {scales:{yAxes: [{ticks: {beginAtZero: true}}]}}
  });
}
