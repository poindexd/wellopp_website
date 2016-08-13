<<<<<<< HEAD
var words = document.getElementsByClassName('word');
var wordArray = [];
var currentWord = 0;

words[currentWord].style.opacity = 1;
for (var i = 0; i < words.length; i++) {
  splitLetters(words[i]);
}

function changeWord() {
  var cw = wordArray[currentWord];
  var nw = currentWord == words.length-1 ? wordArray[0] : wordArray[currentWord+1];
  for (var i = 0; i < cw.length; i++) {
    animateLetterOut(cw, i);
  }
  
  for (var i = 0; i < nw.length; i++) {
    nw[i].className = 'letter behind';
    nw[0].parentElement.style.opacity = 1;
    animateLetterIn(nw, i);
  }
  
  currentWord = (currentWord == wordArray.length-1) ? 0 : currentWord+1;
}

function animateLetterOut(cw, i) {
  setTimeout(function() {
		cw[i].className = 'letter out';
  }, i*80);
}

function animateLetterIn(nw, i) {
  setTimeout(function() {
		nw[i].className = 'letter in';
  }, 340+(i*80));
}

function splitLetters(word) {
  var content = word.innerHTML;
  word.innerHTML = '';
  var letters = [];
  for (var i = 0; i < content.length; i++) {
    var letter = document.createElement('span');
    letter.className = 'letter';
    letter.innerHTML = content.charAt(i);
    word.appendChild(letter);
    letters.push(letter);
  }
  
  wordArray.push(letters);
}

setTimeout(function(){
  changeWord();
  setInterval(changeWord, 4000);
}, 4000);
=======
function changeWord(){for(var r=wordArray[currentWord],e=currentWord==words.length-1?wordArray[0]:wordArray[currentWord+1],t=0;t<r.length;t++)animateLetterOut(r,t);for(var t=0;t<e.length;t++)e[t].className="letter behind",e[0].parentElement.style.opacity=1,animateLetterIn(e,t);currentWord=currentWord==wordArray.length-1?0:currentWord+1}function animateLetterOut(r,e){setTimeout(function(){r[e].className="letter out"},80*e)}function animateLetterIn(r,e){setTimeout(function(){r[e].className="letter in"},340+80*e)}function splitLetters(r){var e=r.innerHTML;r.innerHTML="";for(var t=[],n=0;n<e.length;n++){var a=document.createElement("span");a.className="letter",a.innerHTML=e.charAt(n),r.appendChild(a),t.push(a)}wordArray.push(t)}var words=document.getElementsByClassName("word"),wordArray=[],currentWord=0;words[currentWord].style.opacity=1;for(var i=0;i<words.length;i++)splitLetters(words[i]);setTimeout(function(){changeWord(),setInterval(changeWord,4e3)},4e3);
>>>>>>> 68011d226251434205e4b284cf013233145c31fe
