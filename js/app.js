
// Create array to hold opened cards
let cards = ["fa-diamond", "fa-diamond", "fa-paper-plane-o", "fa-paper-plane-o", "fa-anchor", "fa-anchor", "fa-bolt", "fa-bolt", "fa-cube", "fa-cube", "fa-leaf", "fa-leaf", "fa-bicycle", "fa-bicycle", "fa-bomb", "fa-bomb"];
let open_card = [];
let moves = 0;
let counts = 3;
let cardMatch = 0;
let beginGame = false;
let playerRating = "3";
let counter;

// Shuffle cards (function from http://stackoverflow.com/a/2450976)
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

// Creation of each card
function createCard() {
  let cardList = shuffle(cards);
  cardList.forEach(function(card) {
    $(".deck").append('<li><i class="card fa ' + card + '"></i></li>');
  })
}

// code to find matching cards
function findCard() {
  
  $(".card").on("click", function() {
    if ($(this).hasClass("open show")) { return; }
    $(this).toggleClass("animation2 open show");
    open_card.push($(this));
    beginGame = true;
  
    if (open_card.length === 2) {
      if (open_card[0][0].classList[2] === open_card[1][0].classList[2]) {
      open_card[0][0].classList.add("animation4", "match");
      open_card[1][0].classList.add("animation4", "match");
      $(open_card[0]).off('click');
      $(open_card[1]).off('click');
      cardMatch += 1;
      moves++;
      removeopen_cards();
      popCard();
      } else {
      
      open_card[0][0].classList.add("animation3", "unmatched");
      open_card[1][0].classList.add("animation3", "unmatched");
      
      setTimeout(removeClasses, 1100);
      
      setTimeout(removeopen_cards, 1100);
      moves++;
      }
    }
  updateMoves();
  })
}

// Number of moves update
function updateMoves() {
  if (moves === 1) {
    $("#moves-text").text(" Move");
  } else {
    $("#moves-text").text(" Moves");
  }
  $("#moves").text(moves.toString());

  if (moves > 0 && moves < 10) {
    playerRating = playerRating;
  } else if (moves >= 10 && moves <= 18) {
    $("#starOne").removeClass("fa-star");
    playerRating = "2";
  } else if (moves > 18) {
    $("#starTwo").removeClass("fa-star");
    playerRating = "1";
  }
}

// Modal popup when game is completed: www.w3schools.com
function popCard() {

  if (cardMatch === 8) {

    var modal = document.getElementById('win-modal');
    var span = document.getElementsByClassName("close")[0];

    $("#total-moves").text(moves);
    $("#total-stars").text(playerRating);

    modal.style.display = "block";

  // Code to close modal (x)
    span.onclick = function() {
        modal.style.display = "none";
    }

   $("#play-again").on("click", function() {
       location.reload()
   });

   clearInterval(counter);
 }
}

function removeopen_cards() {
  open_card = [];
}

function removeClasses() {
  $(".card").removeClass("show open animation2 animation4 animation3 unmatched");
  removeopen_cards();
}

function disableClick() {
 open_card.forEach(function (card) {
   card.off("click");
  })
}

function startcounter() {
  let clicks = 0;
  $(".card").on("click", function() {
    clicks += 1;
    if (clicks === 1) {
      var sec = 0;
      function time ( val ) { return val > 9 ? val : "0" + val; }
      counter = setInterval( function(){
        $(".seconds").html(time(++sec % 60));
        $(".minutes").html(time(parseInt(sec / 60, 10)));
      }, 1000);
    }
  })
 }

shuffle(cards);
createCard();
findCard();
startcounter();

// Restart game function
function restartGame() {
  $("#restart").on("click", function() {
      location.reload()
  });
  }

restartGame();



