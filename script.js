const items = document.querySelectorAll(".item");
const indicators = document.querySelectorAll(".indicators ul li");
const number = document.querySelector(".indicators .number");
const btnPrev = document.getElementById("prev");
const btnNext = document.getElementById("next");

let current = 0;
let autoPlayInterval = null;
const AUTO_PLAY_DELAY = 6000;

function updateCarousel(index) {
  items.forEach((item, i) => {
    item.classList.toggle("active", i === index);
    if (indicators[i]) {
      indicators[i].classList.toggle("active", i === index);
    }
  });

  const displayNumber = (index + 1).toString().padStart(2, "0");
  if (number) {
    number.textContent = displayNumber;
  }
}

function goToNext() {
  current = (current + 1) % items.length;
  updateCarousel(current);
}

function goToPrev() {
  current = (current - 1 + items.length) % items.length;
  updateCarousel(current);
}

function startAutoPlay() {
  if (autoPlayInterval) return;
  autoPlayInterval = setInterval(goToNext, AUTO_PLAY_DELAY);
}

function resetAutoPlay() {
  if (autoPlayInterval) {
    clearInterval(autoPlayInterval);
    autoPlayInterval = null;
  }
  startAutoPlay();
}

window.addEventListener("DOMContentLoaded", () => {
  if (!items.length) return;

  // Setup click on arrows
  if (btnNext) {
    btnNext.addEventListener("click", () => {
      goToNext();
      resetAutoPlay();
    });
  }

  if (btnPrev) {
    btnPrev.addEventListener("click", () => {
      goToPrev();
      resetAutoPlay();
    });
  }

  // Setup click on indicators
  indicators.forEach((indicator, idx) => {
    indicator.addEventListener("click", () => {
      current = idx;
      updateCarousel(current);
      resetAutoPlay();
    });
  });

  updateCarousel(current);
  startAutoPlay();
});
