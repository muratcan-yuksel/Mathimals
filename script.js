const dom = {
  startBtn: document.querySelector(".start-btn"),
  innerCards: document.querySelectorAll(".card-inner"),
  //get the text content in each card element
  cardOperations: document.querySelectorAll(".card-operation")
};

//array that holds the possible numbers that when multiplied can give the correct answer
let possibleNumbers =[]
const createNumbers= () => {
  for (i=1; i<=6; i++){
    possibleNumbers.push(i);
  }
}


createNumbers();
console.log(possibleNumbers);

//slice the last element of the array so that the answer cannot be "1 * the given number" all the time
let poppedNumbers = possibleNumbers.slice(0,-1);
console.log(poppedNumbers);
let sum = 6;
//logic that gives the two numbers that gives the correct answer when multiplied to each other
function detectPair(sum, poppedNumbers) {
  for (i=0; i<poppedNumbers.length; i++) {
    for (j=0; j<poppedNumbers.length; j++) {
      if (i == j) continue;
      else if (poppedNumbers[i] * poppedNumbers[j] === sum) return [poppedNumbers[i], poppedNumbers[j]];
    }
  }; return null;
}

console.log(detectPair(sum, poppedNumbers)); 

//function to get a random element from an array
const getRandomElement = (array) => {
  return array[Math.floor(Math.random() * array.length)]; 
};
  //get a random element from the card operations array
  const correctAnswer= getRandomElement(dom.cardOperations)
  console.log(correctAnswer);
  //remove its class
  correctAnswer.classList.remove("card-operation");
  //add a new one
  correctAnswer.classList.add("correct-answer");

dom.startBtn.addEventListener("click", () => {
  dom.innerCards.forEach((card) => {
    card.style.transform = "rotateY(180deg)";
  });


  //generate a random operation between numbers 1-10 on start game button click
dom.cardOperations.forEach((card) => {
if (card.className != "correct-answer"){
  card.textContent=  (Math.floor(Math.random() * 6) + 1) + "x" + (Math.floor(Math.random() * 6) + 1);
}else {
card.textContent= (detectPair(sum, poppedNumbers))[0] + "x" + (detectPair(sum, poppedNumbers))[1];
}

});
});


console.log( getRandomElement(dom.cardOperations));

