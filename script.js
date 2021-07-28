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

  const addition = () => {
    //array that holds the possible numbers that when added can give the correct answer
    let possibleNumbers = [];
    const createNumbers = () => {
      for (i = 1; i <= dom.givenNumber.textContent; i++) {
        possibleNumbers.push(i);
      }
    };

    createNumbers();
    console.log(possibleNumbers);

    let sum = Number(dom.givenNumber.textContent);
    console.log(sum);
    console.log(dom.givenNumber.textContent);

    document.getElementById("number").textContent = sum;

    // splice certain elements according to the sum number's value.
    //i.e. if it's big, remove more. Why?
    //if not, the algorithm always looks for the easiest solution. Like 106+1=107 etc.
    let poppedNumbers;

    if (sum < 10) {
      poppedNumbers = possibleNumbers.splice(0, 1);
    } else if (sum > 10 && sum < 50) {
      poppedNumbers = possibleNumbers.splice(1, 23);
    } else if (sum > 50 && sum < 100) {
      poppedNumbers = possibleNumbers.splice(1, 57);
    } else if (sum > 100 && sum < 150) {
      poppedNumbers = possibleNumbers.splice(1, 103);
    } else if (sum > 150 && sum <= 200) {
      poppedNumbers = possibleNumbers.splice(1, 157);
    }

    console.log(poppedNumbers);

    //logic that gives the two numbers that gives the correct answer when added to each other
    function detectPair(sum, poppedNumbers) {
      for (i = 0; i < poppedNumbers.length; i++) {
        for (j = 0; j < poppedNumbers.length; j++) {
          if (i == j) continue;
          else if (poppedNumbers[i] + poppedNumbers[j] === sum)
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
            "+" +
            (Math.floor(Math.random() * dom.givenNumber.textContent) + 1);
        } else {
          /*these if statements prevent the case in which the number has no divisors in poppedNumbers, 
but obviously have in possibleNumbers( like 1 and the number itself)  */
          if (detectPair(sum, poppedNumbers) == null) {
            card.textContent =
              detectPair(sum, possibleNumbers)[0] +
              "+" +
              detectPair(sum, possibleNumbers)[1];
            correctAnswer.classList.remove("correct-answer");
            correctAnswer.classList.add("card-operation");
          } else {
            card.textContent =
              detectPair(sum, poppedNumbers)[0] +
              "+" +
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

  const multiplication = () => {
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

  const subtraction = () => {
    //array that holds the possible numbers that when added can give the correct answer
    let possibleNumbers = [];
    const createNumbers = () => {
      for (i = 1; i <= dom.givenNumber.textContent + 250; i++) {
        possibleNumbers.push(i);
      }
    };

    createNumbers();
    console.log(possibleNumbers);

    let sum = Number(dom.givenNumber.textContent);
    console.log(sum);
    console.log(dom.givenNumber.textContent);

    document.getElementById("number").textContent = sum;

    // splice certain elements according to the sum number's value.
    //i.e. if it's big, remove more. Why?
    //if not, the algorithm always looks for the easiest solution. Like 106+1=107 etc.
    let poppedNumbers;

    if (sum < 10) {
      poppedNumbers = possibleNumbers.splice(0, 1);
    } else if (sum > 10 && sum < 50) {
      poppedNumbers = possibleNumbers.splice(0, 7);
    } else if (sum > 50 && sum < 100) {
      poppedNumbers = possibleNumbers.splice(0, 57);
    } else if (sum > 100 && sum < 150) {
      poppedNumbers = possibleNumbers.splice(0, 103);
    } else if (sum > 150 && sum <= 200) {
      poppedNumbers = possibleNumbers.splice(0, 157);
    }

    console.log(poppedNumbers);

    //logic that gives the two numbers that gives the correct answer when added to each other
    function detectPair(sum, poppedNumbers) {
      for (i = 0; i < poppedNumbers.length; i++) {
        for (j = 0; j < poppedNumbers.length; j++) {
          if (i == j) continue;
          else if (poppedNumbers[i] - poppedNumbers[j] === sum)
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
            "-" +
            (Math.floor(Math.random() * dom.givenNumber.textContent) + 1);
        } else {
          /*these if statements prevent the case in which the number has no divisors in poppedNumbers, 
but obviously have in possibleNumbers( like 1 and the number itself)  */
          if (detectPair(sum, poppedNumbers) == null) {
            card.textContent =
              detectPair(sum, possibleNumbers)[0] +
              "-" +
              detectPair(sum, possibleNumbers)[1];
            correctAnswer.classList.remove("correct-answer");
            correctAnswer.classList.add("card-operation");
          } else {
            card.textContent =
              detectPair(sum, poppedNumbers)[0] +
              "-" +
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
  const division = () => {
    //array that holds the possible numbers that when divided can give the correct answer
    let possibleNumbers = [];
    const createNumbers = () => {
      for (i = 1; i <= dom.givenNumber.textContent + 250; i++) {
        possibleNumbers.push(i);
      }
    };

    createNumbers();
    console.log(possibleNumbers);

    let sum = Number(dom.givenNumber.textContent);
    // console.log(sum);
    console.log(dom.givenNumber.textContent);

    document.getElementById("number").textContent = sum;

    //with this random number the division return something interesting other than /2 or /3 all the time
    //I use it in splice, you can see it in line 337

    let randomizeNum = Math.floor(Math.random() * 3) + 1; //the + 1 makes it so its not 0.

    // //slice the first element of the array so that the answer cannot be " the given number / 1" all the time
    let poppedNumbers = possibleNumbers.splice(0, randomizeNum);
    console.log(poppedNumbers);

    //logic that gives the two numbers that gives the correct answer when multiplied to each other
    function detectPair(sum, poppedNumbers) {
      for (i = 0; i < poppedNumbers.length; i++) {
        for (j = 0; j < poppedNumbers.length; j++) {
          if (i == j) continue;
          else if (poppedNumbers[i] / poppedNumbers[j] === sum)
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
            "/" +
            (Math.floor(Math.random() * dom.givenNumber.textContent) + 1);
        } else {
          /*these if statements prevent the case in which the number has no divisors in poppedNumbers, 
    but obviously have in possibleNumbers( like 1 and the number itself)  */
          if (detectPair(sum, poppedNumbers) == null) {
            card.textContent =
              detectPair(sum, possibleNumbers)[0] +
              "/" +
              detectPair(sum, possibleNumbers)[1];
            correctAnswer.classList.remove("correct-answer");
            correctAnswer.classList.add("card-operation");
          } else {
            card.textContent =
              detectPair(sum, poppedNumbers)[0] +
              "/" +
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
  return { multiplication, addition, subtraction, division, createSumNumber };
})();
/*will use this array to change levels
how?
if the array length is greater than 4, change to division for instance
if it's greater than 8, change to addition and so on */
let arr = [];
//this array contains different operation functions from the module
const functionArray = [
  gamePlayModule.division,
  gamePlayModule.subtraction,
  gamePlayModule.multiplication,
  gamePlayModule.addition,
];

dom.startBtn.addEventListener("click", () => {
  //push something to array on start
  arr.push(1);
  console.log(arr);
  dom.innerCards.forEach((card) => {
    card.style.transform = "rotateY(180deg)";
  });
  //call the multiplication function
  gamePlayModule.createSumNumber(10);
  gamePlayModule.multiplication();
});

//when the next level button is clicked, the game will be played again
dom.nextLevelButton.addEventListener("click", () => {
  //should return a random number between 0-3 (including 3)
  let randomizeNum = Math.floor(Math.random() * 4);

  //push something to array on each click
  arr.push(1);
  console.log(arr);
  dom.innerCards.forEach((card) => {
    card.style.transform = "rotateY(180deg)";
  });
  //The only problem is that when the number is big, it goes outside of the card.
  //The solution: Make the font smaller.
  gamePlayModule.createSumNumber(50);
  // if (arr.length <= 4) {
  //   gamePlayModule.multiplication();
  // } else {
  //   gamePlayModule.addition();
  // }
  // gamePlayModule.division();
  //call a random operation on each click
  functionArray[randomizeNum]();
});
