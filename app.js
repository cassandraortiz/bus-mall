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

function uniqueNumber(array, number){
  var unique = true;
  if(array.includes(number)){
    console.log(`this number: ${number} was found in: ${array}`);
    unique = false;
  }
  return unique;
}

//=====================================
// DISPLAY all the Random Photos
// -- sets up Dynamic number of photos
// -- varifies unique number (based on unique times clicked)
// -- invoke the function
//------------------------
function displayImages(){

  var displayArray = [];
  var max = allItems.length;

  for(var pic = 0; pic < testImages; pic++){
    var randoPic = randomNumber(max);

    while(!uniqueNumber(displayArray,randoPic) || !uniqueNumber(prevArray,randoPic)){
      randoPic = randomNumber(max);
    }

    displayArray.push(randoPic);
    var i = pic +1;

    var imgID = `img${i}`;
    var indexID = displayArray[pic];
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

//=====================================
// ON CLICK EVENT - pictureSection
// -- limit to 25 clicks
// -- display results (both list & chart) after limit
//------------------------
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
//------------------------

//=====================================
// RENDER INFORMATION
// -- DOM - Add to UnOrdered List in section: resultsList
// -- adds information to canvas: barChart
//------------------------
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
//------------------------
