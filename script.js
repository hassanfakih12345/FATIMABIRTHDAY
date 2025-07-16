document.addEventListener('DOMContentLoaded', function () {
  const items = document.querySelectorAll('.timeline-carousel .carousel-item');
  const leftBtn = document.querySelector('.timeline-carousel .carousel-arrow.left');
  const rightBtn = document.querySelector('.timeline-carousel .carousel-arrow.right');
  let current = 0;

  function showItem(idx) {
    items.forEach((item, i) => {
      item.classList.toggle('active', i === idx);
    });
  }

  leftBtn.addEventListener('click', () => {
    current = (current - 1 + items.length) % items.length;
    showItem(current);
  });

  rightBtn.addEventListener('click', () => {
    current = (current + 1) % items.length;
    showItem(current);
  });

  // دعم السحب للجوال
  let startX = null;
  let isTouching = false;
  const frame = document.querySelector('.timeline-carousel .carousel-frame');

  frame.addEventListener('touchstart', e => {
    isTouching = true;
    startX = e.touches[0].clientX;
  });

  frame.addEventListener('touchmove', e => {
    if (!isTouching) return;
    e.preventDefault();
  }, { passive: false });

  frame.addEventListener('touchend', e => {
    if (!isTouching || startX === null) return;
    let endX = e.changedTouches[0].clientX;
    if (endX - startX > 50) { // سحب يمين
      current = (current - 1 + items.length) % items.length;
      showItem(current);
    } else if (startX - endX > 50) { // سحب يسار
      current = (current + 1) % items.length;
      showItem(current);
    }
    startX = null;
    isTouching = false;
  });

  showItem(current);
});


const scrollHint = document.getElementById('scroll-hint');

window.addEventListener('scroll', () => {
  const scrollPercent = window.scrollY / (document.body.scrollHeight - window.innerHeight);

  if (scrollPercent > 0.1) {
    scrollHint.classList.add('hidden'); // إخفاء العنصر
  } else {
    scrollHint.classList.remove('hidden'); // إظهاره
  }
});

// Floating hearts animation
const canvas = document.querySelector('.hearts');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const hearts = [];

function Heart() {
  this.x = Math.random() * canvas.width;
  this.y = canvas.height + Math.random() * 100;
  this.size = 15 + Math.random() * 10;
  this.speed = 1 + Math.random();
  this.alpha = 0.5 + Math.random() * 0.5;
}

Heart.prototype.draw = function () {
  ctx.globalAlpha = this.alpha;
  ctx.fillStyle = 'pink';
  ctx.beginPath();
  ctx.moveTo(this.x, this.y);
  ctx.bezierCurveTo(this.x + this.size, this.y - this.size,
    this.x + this.size * 2, this.y + this.size,
    this.x, this.y + this.size * 2);
  ctx.bezierCurveTo(this.x - this.size * 2, this.y + this.size,
    this.x - this.size, this.y - this.size,
    this.x, this.y);
  ctx.fill();
};

Heart.prototype.update = function () {
  this.y -= this.speed;
  if (this.y < -this.size * 2) {
    this.y = canvas.height + Math.random() * 100;
    this.x = Math.random() * canvas.width;
  }
};

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  while (hearts.length < 20) {
    hearts.push(new Heart());
  }
  hearts.forEach(h => {
    h.update();
    h.draw();
  });
  requestAnimationFrame(animate);
}

animate();

// Scroll Reveal for Elements
const fadeIns = document.querySelectorAll(".fade-in-image, .fade-in-caption, .fade-in-text");

window.addEventListener("scroll", () => {
  fadeIns.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < window.innerHeight - 100) {
      el.classList.add("show");
    }
  });
});

// 🟡 تشغيل الموسيقى عند أول Scroll
let musicStarted = false;
window.addEventListener("scroll", () => {
  if (!musicStarted) {
    const audio = document.getElementById("bg-music");
    audio.play().catch(err => console.log("فشل تشغيل الصوت:", err));
    musicStarted = true;
  }
});

// Floating Hearts Animation
const canvas2 = document.querySelector('.hearts');
const ctx2 = canvas2.getContext('2d');
canvas2.width = window.innerWidth;
canvas2.height = window.innerHeight;

const hearts2 = [];

function Heart2() {
  this.x = Math.random() * canvas2.width;
  this.y = canvas2.height + Math.random() * 100;
  this.size = 15 + Math.random() * 10;
  this.speed = 1 + Math.random();
  this.alpha = 0.5 + Math.random() * 0.5;
}

Heart2.prototype.draw = function () {
  ctx2.globalAlpha = this.alpha;
  ctx2.fillStyle = 'pink';
  ctx2.beginPath();
  ctx2.moveTo(this.x, this.y);
  ctx2.bezierCurveTo(this.x + this.size, this.y - this.size,
    this.x + this.size * 2, this.y + this.size,
    this.x, this.y + this.size * 2);
  ctx2.bezierCurveTo(this.x - this.size * 2, this.y + this.size,
    this.x - this.size, this.y - this.size,
    this.x, this.y);
  ctx2.fill();
};

Heart2.prototype.update = function () {
  this.y -= this.speed;
  if (this.y < -this.size * 2) {
    this.y = canvas2.height + Math.random() * 100;
    this.x = Math.random() * canvas2.width;
  }
};

function animate2() {
  ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
  while (hearts2.length < 20) {
    hearts2.push(new Heart2());
  }
  hearts2.forEach(h => {
    h.update();
    h.draw();
  });
  requestAnimationFrame(animate2);
}

animate2();

const audio = document.getElementById('bg-music');
const playBtn = document.getElementById('play-btn');

playBtn.addEventListener('click', () => {
  audio.play().then(() => {
    playBtn.style.display = 'none';
    console.log('✅ الموسيقى شغّلت');
  }).catch((error) => {
    console.log('❌ خطأ في تشغيل الموسيقى:', error);
  });
});
