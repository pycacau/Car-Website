const items = document.querySelectorAll('.item');
const indicators = document.querySelectorAll('.indicators ul li');
const number = document.querySelector('.indicators .number');
let current = 0;

function showItem(index) {
  items.forEach((item, i) => {
    item.style.opacity = i === index ? '1' : '0';
    item.style.zIndex = i === index ? '1' : '0';
    item.style.transform = i === index ? 'translateX(0)' : 'translateX(100%)';
    indicators[i].classList.toggle('active', i === index);
  });
  number.textContent = `0${index + 1}`;
}

document.querySelectorAll('.arrows button').forEach((btn, idx) => {
  btn.addEventListener('click', () => {
    current = idx === 0 ? (current - 1 + items.length) % items.length : (current + 1) % items.length;
    showItem(current);
  });
});

window.addEventListener('DOMContentLoaded', () => {
  items.forEach(item => {
    item.style.transition = 'transform 0.6s ease, opacity 0.6s ease';
  });
  showItem(current);
});
