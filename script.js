document.addEventListener('DOMContentLoaded', () => {
  const items = document.querySelectorAll('.timeline-carousel .carousel-item');
  const leftBtn = document.querySelector('.carousel-arrow.left');
  const rightBtn = document.querySelector('.carousel-arrow.right');
  const timelinePoints = document.querySelectorAll('.timeline-point');
  const timelineProgress = document.querySelector('.timeline-progress');
  const frame = document.querySelector('.timeline-carousel .carousel-frame');

  let current = 0;
  let startX = null;
  let isTouching = false;

  function showItem(idx) {
    items.forEach((item, i) => {
      item.classList.toggle('active', i === idx);
    });
    timelinePoints.forEach((point, i) => {
      point.classList.toggle('active', i === idx);
    });
    const progressPercent = (idx) / (items.length - 1) * 100;
    timelineProgress.style.width = progressPercent + '%';
    current = idx;
  }

  // دعم السحب للجوال
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
    if (endX - startX > 50) {
      current = (current - 1 + items.length) % items.length;
      showItem(current);
    } else if (startX - endX > 50) {
      current = (current + 1) % items.length;
      showItem(current);
    }
    startX = null;
    isTouching = false;
  });

  if (leftBtn && rightBtn) {
    leftBtn.addEventListener('click', () => {
      current = (current - 1 + items.length) % items.length;
      showItem(current);
    });

    rightBtn.addEventListener('click', () => {
      current = (current + 1) % items.length;
      showItem(current);
    });
  }

  timelinePoints.forEach(point => {
    point.addEventListener('click', () => {
      const idx = parseInt(point.dataset.index, 10);
      showItem(idx);
    });
  });

  showItem(0); // عرض أول صورة عند التحميل

  // ===== Scroll Fade-in Effect =====
  const fadeIns = document.querySelectorAll(".fade-in-image, .fade-in-caption, .fade-in-text");

  function checkFadeIn() {
    fadeIns.forEach(el => {
      const top = el.getBoundingClientRect().top;
      if (top < window.innerHeight - 100) {
        el.classList.add("show");
        console.log("عنصر ظهر:", el);
      }
    });
  }

  // ✅ تشغيل التحقق عند تحميل الصفحة + أثناء التمرير
  window.addEventListener("load", checkFadeIn);
  window.addEventListener("scroll", checkFadeIn);

  // ===== تشغيل الموسيقى =====
  const audio = document.getElementById('bg-music');
  const playBtn = document.getElementById('play-btn');
  if (audio && playBtn) {
    playBtn.addEventListener('click', () => {
      audio.play().then(() => {
        playBtn.style.display = 'none';
        console.log('✅ الموسيقى شغّلت');
      }).catch((error) => {
        console.log('❌ خطأ في تشغيل الموسيقى:', error);
      });
    });
  }

  // ===== Scroll Hint (اختياري) =====
  const scrollHint = document.getElementById('scroll-hint');
  if (scrollHint) {
    window.addEventListener('scroll', () => {
      const scrollPercent = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      if (scrollPercent > 0.1) {
        scrollHint.classList.add('hidden');
      } else {
        scrollHint.classList.remove('hidden');
      }
    });
  }

  // ===== Floating Hearts =====
  const canvas = document.querySelector('.hearts');
  if (canvas) {
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
  }

});