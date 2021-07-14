const dom = {
  startBtn: document.querySelector(".start-btn"),
  innerCards: document.querySelectorAll(".card-inner"),
};

dom.startBtn.addEventListener("click", () => {
  dom.innerCards.forEach((card) => {
    card.style.transform = "rotateY(180deg)";
  });
});
