'use strict';

var img1 = document.getElementById('img1');
var img2 = document.getElementById('img2');
var img3 = document.getElementById('img3');
var imgSection = document.getElementById('pictureSection');
var resultList = document.getElementById('resultsList');

var ImageList = ['bag','banana', 'bathroom','boots', 'breakfast', 'bubblegum', 'chair','cthulhu','dog-duck','dragon','pen','pet-sweep','scissors','shark','sweep','tauntaun','unicorn','usb','water-can','wine-glass'];
var allItems = [];
//var prevItem = [];
var newArray = [];
var labelArray = [];
var viewsArray = [];
var votesArray = [];
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
  } while (pic1 === pic2 || pic2 === pic3 || pic1 === pic3 || newArray.includes(pic1) || newArray.includes(pic2) || newArray.includes(pic3));{
    allItems[pic1].viewed++;
    allItems[pic2].viewed++;
    allItems[pic3].viewed++;
  }

  // reset the New array
  // newArray = [];

  // loops through each Image and applies the information
  //alert(imgSection.childElementCount+1);

  var numberImages = imgSection.childElementCount;

  for (var i = 1; i < numberImages + 1; i++){
    var objectName = `img${i}`;
    var indexID = `pic${i}`;

    // adds to newArray max 2 turns

    var clicks = 2;
    var picShown = clicks * numberImages;

    if(newArray.length >= picShown){
      newArray.unshift(eval(indexID));
    } else {
      newArray.push(eval(indexID));
    }

    console.log(newArray);
    
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
    listItem.textContent = `${allItems[i].title}:  ${allItems[i].clicked} votes  --  viewed ${allItems[i].viewed} times. `;
    resultList.appendChild(listItem); // add the table to my global table body\
  }
}

function renderCanvas(){
var ctx = document.getElementById('barChart');
var myChart = new Chart(ctx, {
  type: 'bar',
  data: {
      labels: labelArray,
      datasets: [{
          label: '# of Votes',
          data: viewsArray,
          backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
      }]
  },
  options: {
      scales: {
          yAxes: [{
              ticks: {
                  beginAtZero: true
              }
          }]
      }
  }
});
}