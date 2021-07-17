const dom = {
  startBtn: document.querySelector(".start-btn"),
  innerCards: document.querySelectorAll(".card-inner"),
  //get the text content in each card element
  cardOperations: document.querySelectorAll(".card-operation"),
  //given sum number
  givenNumber: document.getElementById("number"),
  nextLevelButton: document.getElementById("nextLevelBtn"),
};

//create a module to keep things in order
const gamePlayModule = (() => {
  //use this function here to be able to call it outside of the module to create a new number each level
  function createSumNumber(num) {
    dom.givenNumber.textContent = Math.floor(Math.random() * num) + 5;
  }
  // createSumNumber(5);
  console.log(dom.givenNumber);

  const shuffle = () => {
    //array that holds the possible numbers that when multiplied can give the correct answer
    let possibleNumbers = [];
    const createNumbers = () => {
      for (i = 1; i <= dom.givenNumber.textContent; i++) {
        possibleNumbers.push(i);
      }
    };

    createNumbers();
    console.log(possibleNumbers);

    // //slice the last element of the array so that the answer cannot be "1 * the given number" all the time
    let poppedNumbers = possibleNumbers.slice(0, -1);
    console.log(poppedNumbers);

    let sum = Number(dom.givenNumber.textContent);
    // console.log(sum);
    console.log(dom.givenNumber.textContent);

    document.getElementById("number").textContent = sum;

    //logic that gives the two numbers that gives the correct answer when multiplied to each other
    function detectPair(sum, poppedNumbers) {
      for (i = 0; i < poppedNumbers.length; i++) {
        for (j = 0; j < poppedNumbers.length; j++) {
          if (i == j) continue;
          else if (poppedNumbers[i] * poppedNumbers[j] === sum)
            return [poppedNumbers[i], poppedNumbers[j]];
        }
      }
      return null;
    }

    console.log(poppedNumbers[poppedNumbers.length - 1]);

    console.log(detectPair(sum, poppedNumbers));
    console.log(detectPair(sum, possibleNumbers));

    //function to get a random element from an array
    const getRandomElement = (array) => {
      return array[Math.floor(Math.random() * array.length)];
    };
    //get a random element from the card operations array
    const correctAnswer = getRandomElement(dom.cardOperations);
    console.log(correctAnswer);
    //remove its class
    correctAnswer.classList.remove("card-operation");
    //add a new one
    correctAnswer.classList.add("correct-answer");

    //generate a random operation between numbers in the array on start game button click
    const generateOperation = () => {
      dom.cardOperations.forEach((card) => {
        if (card.className != "correct-answer") {
          card.textContent =
            Math.floor(Math.random() * dom.givenNumber.textContent) +
            1 +
            "x" +
            (Math.floor(Math.random() * dom.givenNumber.textContent) + 1);
        } else {
          /*these if statements prevent the case in which the number has no divisors in poppedNumbers, 
    but obviously have in possibleNumbers( like 1 and the number itself)  */
          if (detectPair(sum, poppedNumbers) == null) {
            card.textContent =
              detectPair(sum, possibleNumbers)[0] +
              "x" +
              detectPair(sum, possibleNumbers)[1];
            correctAnswer.classList.remove("correct-answer");
            correctAnswer.classList.add("card-operation");
          } else {
            card.textContent =
              detectPair(sum, poppedNumbers)[0] +
              "x" +
              detectPair(sum, poppedNumbers)[1];
            correctAnswer.classList.remove("correct-answer");
            correctAnswer.classList.add("card-operation");
          }
        }
      });
    };
    //call the function, if not, the cards will not have numbers on them
    generateOperation();
    //empty the arrays so that they won't stack up
    possibleNumbers = [];
    poppedNumbers = [];
  };
  //return only the function(s) needed
  return { shuffle, createSumNumber };
})();

dom.startBtn.addEventListener("click", () => {
  dom.innerCards.forEach((card) => {
    card.style.transform = "rotateY(180deg)";
  });
  //call the shuffle function
  gamePlayModule.createSumNumber(10);
  gamePlayModule.shuffle();
});

//when the next level button is clicked, the game will be played again
dom.nextLevelButton.addEventListener("click", () => {
  dom.innerCards.forEach((card) => {
    card.style.transform = "rotateY(180deg)";
  });
  //call the shuffle function
  //The only problem is that when the number is big, it goes outside of the card.
  //The solution: Make the font smaller.
  gamePlayModule.createSumNumber(200);
  gamePlayModule.shuffle();
});
