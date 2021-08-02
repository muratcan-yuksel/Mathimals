import { animalArr } from "./animalArr.js";
console.log(animalArr);

const dom = {
  startBtn: document.querySelector(".start-btn"),
  innerCards: document.querySelectorAll(".card-inner"),
  totalTime: document.querySelector("#total-time"),
  nameForm: document.querySelector("#name-form"),
  nameInput: document.querySelector("#name-input"),
  playerData: document.querySelector(".player-data"),
  playerUsername: document.querySelector("#player-username"),

  //get the text content in each card element
  cardOperations: document.querySelectorAll(".card-operation"),
  //given sum number
  givenNumber: document.getElementById("number"),
  nextLevelButton: document.getElementById("next-level-btn"),
  animalForm: document.querySelector("#animal-form"),
  animalInput: document.querySelector("#animal-input"),
  animalPic: document.querySelectorAll(".animal-pic"),
  animalName: document.querySelectorAll(".animal-name"),
  animalString: document.querySelectorAll(".animalString"),
};
//the following array will be used to make the start button unclickable before the user writes his/her name
const reqForStartBtn= []

console.log(dom.animalPic.src);
dom.nameForm.addEventListener("submit", () => {
  reqForStartBtn.push(1);
  console.log(reqForStartBtn)
  dom.nameForm.style.display = "none";
  dom.playerUsername.textContent = dom.nameInput.value;
  dom.playerData.style.display = "flex";
});

//create a module to keep things in order
const gamePlayModule = (() => {
  const displayCards = () => {
    //shufle the animal array
    const shuffled = animalArr.sort(() => 0.5 - Math.random());
    //get random 3 element from the shuffled array
    let selected = shuffled.slice(0, 3);
    console.log(shuffled);
    console.log(selected);
    console.log(selected[1].imageSrc);
    console.log(dom.animalPic.length);
    //give each card an animal and a name
    dom.animalPic[0].src = selected[0].imageSrc;
    dom.animalName[0].src = selected[0].nameSrc;
    dom.animalString[0].alt = selected[0].nameString;
    dom.animalPic[1].src = selected[1].imageSrc;
    dom.animalName[1].src = selected[1].nameSrc;
    dom.animalString[1].alt = selected[1].nameString;
    dom.animalPic[2].src = selected[2].imageSrc;
    dom.animalName[2].src = selected[2].nameSrc;
    dom.animalString[2].alt = selected[2].nameString;
  };
  const displayObjects = () => {
    const shuffled = animalArr.sort(() => 0.5 - Math.random());
    let selected = shuffled.slice(0, 3);
    console.log(shuffled);
    console.log(selected);
  };
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
      for (let i = 1; i <= dom.givenNumber.textContent; i++) {
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
      for (let i = 0; i < poppedNumbers.length; i++) {
        for (let j = 0; j < poppedNumbers.length; j++) {
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

    sessionStorage.setItem("answer", correctAnswer.parentNode.children[2].alt);

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
      for (let i = 1; i <= dom.givenNumber.textContent; i++) {
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
      for (let i = 0; i < poppedNumbers.length; i++) {
        for (let j = 0; j < poppedNumbers.length; j++) {
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

    sessionStorage.setItem("answer", correctAnswer.parentNode.children[2].alt);

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
      for (let i = 1; i <= dom.givenNumber.textContent + 250; i++) {
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
      for (let i = 0; i < poppedNumbers.length; i++) {
        for (let j = 0; j < poppedNumbers.length; j++) {
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

    sessionStorage.setItem("answer", correctAnswer.parentNode.children[2].alt);

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
      for (let i = 1; i <= dom.givenNumber.textContent + 250; i++) {
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
      for (let i = 0; i < poppedNumbers.length; i++) {
        for (let j = 0; j < poppedNumbers.length; j++) {
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

    sessionStorage.setItem("answer", correctAnswer.parentNode.children[2].alt);

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
  return {
    multiplication,
    addition,
    subtraction,
    division,
    displayCards,
    createSumNumber,
  };
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
  if(reqForStartBtn.length >0){
//push something to array on start
arr.push(1);
console.log(arr);
dom.innerCards.forEach((card) => {
  card.style.transform = "rotateY(180deg)";
});
//call the multiplication function
gamePlayModule.createSumNumber(10);
gamePlayModule.displayCards();

gamePlayModule.multiplication();
console.log(sessionStorage.getItem("answer"));

start();
  }else {
    alert("please enter your name!")
  }
  
});

//when the next level button is clicked, the game will be played again
dom.nextLevelButton.addEventListener("click", (e) => {
  //prevent default behavior so that the page wouldn't refresh time to time
  e.preventDefault;
     //save the storage in a const to use it properly, otherwise it's slippery
     const answer = sessionStorage.getItem("answer");
      //save the input value too, otherwise it's slippery
    const input = dom.animalInput.value;
  if(input !== "" && input.toLowerCase() == answer){
    console.log(dom.animalInput.value);
    // const correctAnswer = document.querySelector(".correct-answer");
    // console.log(correctAnswer);
    // if (dom.animalInput.value) {
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
  
    //the following creates many bugs for some reason. Like, the sum and the numbers don't match up.
  
    // if (arr.length < 4) {
    //   gamePlayModule.createSumNumber(10);
    //   functionArray[randomizeNum]();
    // } else if (arr.length > 4 && arr.length < 8) {
    //   gamePlayModule.createSumNumber(20);
    //   functionArray[randomizeNum]();
    // } else if (arr.length > 8 && arr.length < 12) {
    //   gamePlayModule.createSumNumber(30);
    //   functionArray[randomizeNum]();
    // } else if (arr.length > 12 && arr.length < 16) {
    //   gamePlayModule.createSumNumber(50);
    //   functionArray[randomizeNum]();
    // }
  
 
    //this order of action is important. Change it and the algorithm breaks.
    gamePlayModule.displayCards();
    //call a random operation on each click
    functionArray[randomizeNum]();
  
    console.log(sessionStorage.getItem("answer"));
   
    console.log(input);
  
  
    // }
  }
  dom.animalInput.value = "";

 
});

// Counter Stuff

let milli = 0;
let seconds = 0;
let minutes = 0;
let onOff = 0;
function startCounting() {
  if (milli > 999) {
    milli = 0;
    if (seconds < 60) {
      seconds += 1;
    }
  } else {
    milli += 1;
  }
  if (seconds > 59) {
    seconds = 0;
    minutes += 1;
  }

  if (milli > 10) {
    txtMilli.innerHTML = "0" + milli;
  }
  if (milli < 10) {
    txtMilli.innerHTML = "" + milli;
  }
}
let timeBegan = null,
  timeStopped = null,
  stoppedDuration = 0,
  started = null;

function start() {
  if (timeBegan === null) {
    timeBegan = new Date();
  }

  if (timeStopped !== null) {
    stoppedDuration += new Date() - timeStopped;
  }
  console.log(stoppedDuration);

  started = setInterval(clockRunning, 10);
}

function stop() {
  timeStopped = new Date();
  clearInterval(started);

  //get the DOM string
  // let result = document.querySelector("#display-area").textContent;

  let result = totalTime.textContent;
  console.log(result);
  console.log(result.split(""));

  //split the string into an array
  let splitted = result.split("");

  //take the hours part of the array
  let hours = splitted.slice(0, 2);
  //create an empty hours array
  let hoursArr = [];
  //add the splitted digits into the hours array, mostly it'll stay as 00
  hours.forEach((item) => hoursArr.push(Number(item)));

  console.log(hoursArr);

  //do the same for minutes
  let mins = splitted.slice(3, 5);
  let minsArr = [];
  mins.forEach((item) => minsArr.push(Number(item)));
  console.log(minsArr);

  //do the same for seconds
  let secsArr = [];
  let secs = splitted.slice(6, 8);
  secs.forEach((item) => secsArr.push(Number(item)));
  console.log(secsArr);

  //do the same for miliseconds
  let milisecsArr = [];
  let milisecs = splitted.slice(9, 12);
  milisecs.forEach((item) => milisecsArr.push(Number(item)));
  console.log(milisecsArr);

  //concat these arrays
  let concatArr = hoursArr.concat(minsArr).concat(secsArr.concat(milisecsArr));
  console.log(concatArr);

  //turn this new concatted array to number so that you can later decide which score is the smallest number amongst all
  let numberedConcatArr = Number(concatArr.join(""));
  console.log(numberedConcatArr);
  console.log(concatArr);

  // once you compare the above number and decide which is the best (smallest) score,
  // turn this number into a string that can be displayed on the page
  /*  A top 10 scores array can be created and changed, ordered in real time   */

  concatArr.splice(2, 0, ":");
  concatArr.splice(5, 0, ":");
  concatArr.splice(8, 0, ".");
  console.log(concatArr);
  //and this will be the score that will be displayed on the board
  let userScore = concatArr.join("");
  console.log(userScore);
}

function clockRunning() {
  let currentTime = new Date(),
    timeElapsed = new Date(currentTime - timeBegan - stoppedDuration),
    hour = timeElapsed.getUTCHours(),
    min = timeElapsed.getUTCMinutes(),
    sec = timeElapsed.getUTCSeconds(),
    ms = timeElapsed.getUTCMilliseconds();

  // document.getElementById("display-area").innerHTML =
  dom.totalTime.textContent =
    (hour > 9 ? hour : "0" + hour) +
    ":" +
    (min > 9 ? min : "0" + min) +
    ":" +
    (sec > 9 ? sec : "0" + sec) +
    "." +
    (ms > 99 ? ms : ms > 9 ? "0" + ms : "00" + ms);
}
