const dom = {
  startBtn: document.querySelector(".start-btn"),
  innerCards: document.querySelectorAll(".card-inner"),
  //get the text content in each card element
  cardOperations: document.querySelectorAll(".card-operation"),
  //given sum number
  givenNumber: document.getElementById("number"),
};

//create a module to keep things in order
const gamePlayModule = (() => {
  const createSumNumber = () => {
    //gave 5 instead of the usual 1 so that the array is not empty
    dom.givenNumber.textContent = Math.floor(Math.random() * 15) + 5;
  };
  createSumNumber();
  console.log(dom.givenNumber);

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
  //return only the function(s) needed
  return { generateOperation };
})();

dom.startBtn.addEventListener("click", () => {
  dom.innerCards.forEach((card) => {
    card.style.transform = "rotateY(180deg)";
  });
  //call the generateOperation function
  gamePlayModule.generateOperation();
});

// console.log(getRandomElement(dom.cardOperations));
