window.array = [{"img":"","title":"","txt":"","url":""},{"img":"","title":"","txt":"","url":""}];

var x = 1

function appendCard() {
  var d = document.getElementById('carousel');
  
  createCardsFromJson();

  var currentInner = d.innerHTML;

  var y = '-appended-' + x++
  
  
  d.innerHTML = currentInner +  '<div class="carousel-cell card" id="sf-slide' + y + '"><button class="fa BtnHandle">&#xf0b2;</button><input class="imgUpload" id="imgUpload' + y + '" type="file"><img class="cardContent" id="cardContent' + y + '"><input type="text" maxlength="25" id="addTitle' + y + '" placeholder="Title" class="addTitle"><textarea placeholder="Text" maxlength="88" class="addTxt" id="addTxt' + y + '" name="w3review" rows="4"></textarea><input type="text" maxlength="25" id="fomBtn' + y + '" placeholder="Url" class="fomBtn"><input id="BtnDelete' + y + '" type="button" class="BtnDelete" value="&#xf014;"></div>';
  
  
 
  
  getDeleteBtn();
}


/*Delete btn function*/

function getDeleteBtn(){
var btn = document.getElementsByClassName('BtnDelete')



for (var i = 0; i < btn.length; i++) {
  btn[i].addEventListener('click', function(e) {
  if (btn.length !== 1){
    e.currentTarget.parentNode.remove();
  feedJson();
  }else{
      alert("Last remaining slide can not be deleted.");
    };
  }, false);
  
}
}

document.getElementById("addSlide").onclick = function(){
  feedJson();
  
	appendCard();
  forUploadingImg();
};

window.onload = function() {
  getDeleteBtn();
};


/* Sortable */

 new Sortable(carousel, {
   handle: '.BtnHandle', // handle's class
   animation: 150,
   ghostClass: 'sortable-ghost'
 });




/* Feed json */
function feedJson(){
  array = [];
  var divs = document.querySelectorAll(".card");
for(var i = 0; i < divs.length; i++){
  
  var currDiv = divs[i];
    array.push({
     img: currDiv.children.item(2).src,
     title: currDiv.children.item(3).value,
     txt: currDiv.children.item(4).value,
     url: currDiv.children.item(5).value
    });

}
}


function createCardsFromJson(){

  for (var i = 0; i < array.length; i++) {

  var d = document.getElementById('carousel');
  
  var cImg;  
    
  if (array[i].img != ""){
    cImg = 'src="' + array[i].img + '"';
  }else{
    cImg = "";
  }
    
  const nextSlide = '<div class="carousel-cell card" id="sf-slide' + i + '"><button class="fa BtnHandle">&#xf0b2;</button><input class="imgUpload" id="imgUpload' + i + '" type="file" value><img ' + cImg +'  class="cardContent" id="cardContent' + i + '"><input type="text" maxlength="25" id="addTitle' + i + '" placeholder="Title" class="addTitle" value="'+  array[i].title +'"><textarea placeholder="Text" maxlength="88" class="addTxt" id="addTxt' + i + '" name="w3review" rows="4">'+  array[i].txt +'</textarea><input type="text" maxlength="25" id="fomBtn' + i + '" placeholder="Url" class="fomBtn" value="'+  array[i].url +'"><input id="BtnDelete' + i + '" type="button" class="fa BtnDelete" value="&#xf014;"></div>';

  if (i != 0){
    d.innerHTML += nextSlide;
  }else{
    d.innerHTML = nextSlide;
  }
  
}
  
  forUploadingImg();
}



/*Upload image*/

function forUploadingImg(){

const divs = document.querySelectorAll('.imgUpload');

divs.forEach(el => el.addEventListener('change', event => {
  var id = event.target.getAttribute("id");
  
    var output = document.getElementById(id).nextElementSibling;
  
  output.src = URL.createObjectURL(event.target.files[0]);
  
feedJson();
}));
}


window.addEventListener('load', createCardsFromJson);