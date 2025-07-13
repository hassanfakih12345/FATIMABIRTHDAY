<script>
  const scrollHint = document.getElementById('scroll-hint');

  window.addEventListener('scroll', () => {
    const scrollPercent = window.scrollY / (document.body.scrollHeight - window.innerHeight);

    if (scrollPercent > 0.1) {
      scrollHint.classList.add('hidden'); // إخفاء العنصر
    } else {
      scrollHint.classList.remove('hidden'); // إظهاره
    }
  });
</script>

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

<script>
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
</script>

<script>
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
</script>
