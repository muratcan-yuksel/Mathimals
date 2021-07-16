const dom = {
  startBtn: document.querySelector(".start-btn"),
  innerCards: document.querySelectorAll(".card-inner"),
  //get the text content in each card element
  cardOperations: document.querySelectorAll(".card-operation")
};

//array that holds the possible numbers that when multiplied can give the correct answer
const possibleNumbers =[]
const createNumbers= () => {
  for (i=1; i<=6; i++){
    possibleNumbers.push(i);
  }
}
createNumbers();
console.log(possibleNumbers);
//logic that gives the 

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

}

});
});


console.log( getRandomElement(dom.cardOperations));

