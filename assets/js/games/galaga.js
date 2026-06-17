window.ITM = window.ITM || {};

window.ITM.galaga = (() => {
  const isMobile = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || window.innerWidth < 768;

  const ENEMY_ROWS = isMobile ? 2 : 3;
  const ENEMY_COLS = 6;
  const ENEMY_WIDTH = isMobile ? 26 : 32;
  const ENEMY_HEIGHT = isMobile ? 22 : 28;
  const PLAYER_WIDTH = isMobile ? 28 : 36;
  const PLAYER_HEIGHT = isMobile ? 22 : 28;
  const BULLET_W = 3;
  const BULLET_H = 10;

  let canvas, ctx;
  let player, bullets, enemies, enemyBullets;
  let score, lives, level;
  let gameRunning = false;
  let gameOver = false;
  let gameWon = false;
  const MAX_LEVEL = 5;
  let keys = {};
  let animId = null;
  let enemyDir = 1;
  let enemySpeed = 0.6;
  let moveDownCounter = 0;
  let shootTimer = 0;
  let enemyShootTimer = 0;
  let invulnerable = 0;
  let enemyImg = null;

  // Stars background
  let stars = [];

  const initStars = () => {
    stars = [];
    for (let i = 0; i < 60; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speed: Math.random() * 1.5 + 0.3
      });
    }
  };

  const createPlayer = () => ({
    x: canvas.width / 2 - PLAYER_WIDTH / 2,
    y: canvas.height - 50,
    w: PLAYER_WIDTH,
    h: PLAYER_HEIGHT,
    speed: isMobile ? 6 : 4
  });

  const createEnemies = () => {
    const arr = [];
    const gap = isMobile ? 6 : 10;
    const rowGap = isMobile ? 8 : 12;
    const offsetX = (canvas.width - ENEMY_COLS * (ENEMY_WIDTH + gap)) / 2;
    for (let row = 0; row < ENEMY_ROWS; row++) {
      for (let col = 0; col < ENEMY_COLS; col++) {
        arr.push({
          x: offsetX + col * (ENEMY_WIDTH + gap),
          y: 15 + row * (ENEMY_HEIGHT + rowGap),
          w: ENEMY_WIDTH,
          h: ENEMY_HEIGHT,
          alive: true,
          type: row < 2 ? 'b' : 'a',
          animFrame: 0
        });
      }
    }
    return arr;
  };

  const resetGame = () => {
    if (animId) cancelAnimationFrame(animId);
    player = createPlayer();
    bullets = [];
    enemies = createEnemies();
    enemyBullets = [];
    score = 0;
    lives = isMobile ? 5 : 3;
    level = 1;
    enemyDir = 1;
    enemySpeed = isMobile ? 0.4 : 0.6;
    gameOver = false;
    gameWon = false;
    gameRunning = true;
    moveDownCounter = 0;
    shootTimer = 0;
    enemyShootTimer = 0;
    invulnerable = 0;
    keys = {};
    initStars();
    gameLoop();
  };

  const drawPlayer = () => {
    if (invulnerable > 0 && Math.floor(invulnerable / 4) % 2 === 0) {
      ctx.save(); ctx.restore();
      return;
    }
    ctx.save();
    ctx.translate(player.x + player.w / 2, player.y + player.h / 2);

    // Ship body
    ctx.fillStyle = "#67e8f9";
    ctx.beginPath();
    ctx.moveTo(0, -player.h / 2);
    ctx.lineTo(-player.w / 2, player.h / 2);
    ctx.lineTo(player.w / 2, player.h / 2);
    ctx.closePath();
    ctx.fill();

    // Cockpit
    ctx.fillStyle = "#22c55e";
    ctx.beginPath();
    ctx.arc(0, -3, 5, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  };

  const drawEnemy = (e) => {
    if (!e.alive) return;
    ctx.save();
    ctx.translate(e.x + e.w / 2, e.y + e.h / 2);

    if (enemyImg && enemyImg.complete && enemyImg.naturalWidth > 0) {
      ctx.drawImage(enemyImg, -e.w / 2, -e.h / 2, e.w, e.h);
    } else {
      if (e.type === 'b') {
        ctx.fillStyle = "#f59e0b";
        ctx.strokeStyle = "#f59e0b";
      } else {
        ctx.fillStyle = "#ef4444";
        ctx.strokeStyle = "#ef4444";
      }

      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, -e.h / 2);
      ctx.lineTo(-e.w / 2, 0);
      ctx.lineTo(-e.w / 3, e.h / 2);
      ctx.lineTo(e.w / 3, e.h / 2);
      ctx.lineTo(e.w / 2, 0);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = "#fff";
      ctx.beginPath();
      ctx.arc(-7, -2, 4, 0, Math.PI * 2);
      ctx.arc(7, -2, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#061316";
      ctx.beginPath();
      ctx.arc(-7 + (e.animFrame % 2 === 0 ? 1 : -1), -2, 2, 0, Math.PI * 2);
      ctx.arc(7 + (e.animFrame % 2 === 0 ? 1 : -1), -2, 2, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = e.type === 'b' ? "#f59e0b" : "#ef4444";
      ctx.beginPath();
      ctx.moveTo(-e.w / 2 + 4, 2);
      ctx.lineTo(-e.w / 2 - 8, e.h / 2 + 4);
      ctx.moveTo(e.w / 2 - 4, 2);
      ctx.lineTo(e.w / 2 + 8, e.h / 2 + 4);
      ctx.stroke();
    }

    ctx.restore();
  };

  const drawBullet = (b) => {
    ctx.fillStyle = b.isEnemy ? "#ff6b6b" : "#67e8f9";
    ctx.shadowColor = b.isEnemy ? "#ff6b6b" : "#67e8f9";
    ctx.shadowBlur = 8;
    ctx.fillRect(b.x, b.y, b.w, b.h);
    ctx.shadowBlur = 0;
  };

  const updatePlayer = () => {
    if (!player) return;
    if (invulnerable > 0) invulnerable--;
    if ((keys['ArrowLeft'] || keys['KeyA']) && player.x > 0) player.x -= player.speed;
    if ((keys['ArrowRight'] || keys['KeyD']) && player.x + player.w < canvas.width) player.x += player.speed;
    if ((keys['ArrowUp'] || keys['KeyW']) && player.y > canvas.height * 0.7) player.y -= player.speed;
    if ((keys['ArrowDown'] || keys['KeyS']) && player.y + player.h < canvas.height - 10) player.y += player.speed;

    // Auto-shoot
    shootTimer++;
    if (shootTimer > 18) {
      bullets.push({
        x: player.x + player.w / 2 - BULLET_W / 2,
        y: player.y - BULLET_H,
        w: BULLET_W,
        h: BULLET_H,
        isEnemy: false
      });
      shootTimer = 0;
    }
  };

  const updateBullets = () => {
    bullets = bullets.filter(b => {
      b.y -= 6;
      return b.y + b.h > 0;
    });

    enemyBullets = enemyBullets.filter(b => {
      b.y += 2;
      return b.y < canvas.height;
    });

    // Bullet-enemy collision
    bullets.forEach(b => {
      enemies.forEach(e => {
        if (!e.alive) return;
        if (b.x < e.x + e.w && b.x + b.w > e.x &&
            b.y < e.y + e.h && b.y + b.h > e.y) {
          e.alive = false;
          b.y = -100;
          score += e.type === 'b' ? 30 : 10;
        }
      });
    });

    // Enemy bullet-player collision
    if (invulnerable <= 0) {
      enemyBullets.forEach(b => {
        if (!player) return;
        if (b.x < player.x + player.w && b.x + b.w > player.x &&
            b.y < player.y + player.h && b.y + b.h > player.y) {
          lives--;
          b.y = canvas.height + 100;
          if (lives <= 0) {
            gameOver = true;
            gameRunning = false;
          } else {
            player = createPlayer();
            invulnerable = 90;
          }
        }
      });
    }
  };

  const updateEnemies = () => {
    const alive = enemies.filter(e => e.alive);
    if (alive.length === 0) {
      if (level >= MAX_LEVEL) {
        gameWon = true;
        gameRunning = false;
        return;
      }
      level++;
      enemySpeed += 0.15;
      enemies = createEnemies();
      return;
    }

    let edgeHit = false;
    alive.forEach(e => {
      e.x += enemySpeed * enemyDir;
      e.animFrame++;
      if (e.x <= 5 || e.x + e.w >= canvas.width - 5) edgeHit = true;
    });

    if (edgeHit) {
      enemyDir *= -1;
      alive.forEach(e => e.y += isMobile ? 6 : 12);
      moveDownCounter++;
      if (moveDownCounter > 3) {
        enemySpeed += 0.1;
        moveDownCounter = 0;
      }
    }

    // Enemies shoot - sÃ³lo 1 enemigo dispara a la vez
    enemyShootTimer++;
    if (enemyShootTimer > 80 - level * 5) {
      enemyShootTimer = 0;
      if (alive.length > 0) {
        const shooter = alive[Math.floor(Math.random() * alive.length)];
        enemyBullets.push({
          x: shooter.x + shooter.w / 2 - BULLET_W / 2,
          y: shooter.y + shooter.h,
          w: BULLET_W,
          h: BULLET_H,
          isEnemy: true
        });
      }
    }

    // Check if enemies reached player
    alive.forEach(e => {
      if (e.y + e.h > player.y) {
        gameOver = true;
        gameRunning = false;
      }
    });
  };

  const drawHUD = () => {
    ctx.fillStyle = "#67e8f9";
    ctx.font = "14px monospace";
    ctx.fillText(`PUNTOS: ${score}`, 10, 25);
    ctx.fillText(`VIDAS: ${lives}`, canvas.width - 80, 25);
    ctx.fillText(`NIVEL: ${level}`, canvas.width / 2 - 30, 25);
  };

  const drawWinScreen = () => {
    ctx.fillStyle = "rgba(6, 19, 22, 0.8)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#22c55e";
    ctx.font = "bold 28px monospace";
    ctx.textAlign = "center";
    ctx.fillText("¡GANASTE!", canvas.width / 2, canvas.height / 2 - 30);

    ctx.fillStyle = "#67e8f9";
    ctx.font = "16px monospace";
    ctx.fillText(`Puntaje final: ${score}`, canvas.width / 2, canvas.height / 2 + 10);

    ctx.fillStyle = "#f59e0b";
    ctx.font = "13px monospace";
    ctx.fillText("Tocá la pantalla o presioná ESPACIO para jugar de nuevo", canvas.width / 2, canvas.height / 2 + 55);
    ctx.textAlign = "left";
  };

  const drawGameOver = () => {
    ctx.fillStyle = "rgba(6, 19, 22, 0.8)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#ef4444";
    ctx.font = "bold 36px monospace";
    ctx.textAlign = "center";
    ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2 - 20);

    ctx.fillStyle = "#67e8f9";
    ctx.font = "18px monospace";
    ctx.fillText(`Puntaje final: ${score}`, canvas.width / 2, canvas.height / 2 + 30);

    ctx.fillStyle = "#22c55e";
    ctx.font = "14px monospace";
    ctx.fillText("Tocá la pantalla o presioná ESPACIO para reiniciar", canvas.width / 2, canvas.height / 2 + 80);
    ctx.textAlign = "left";
  };

  const drawStars = () => {
    stars.forEach(s => {
      s.y += s.speed;
      if (s.y > canvas.height) {
        s.y = 0;
        s.x = Math.random() * canvas.width;
      }
      ctx.fillStyle = `rgba(103, 232, 249, ${0.3 + Math.random() * 0.5})`;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
      ctx.fill();
    });
  };

  const gameLoop = () => {
    try {
      if (gameWon) {
        drawWinScreen();
        animId = requestAnimationFrame(gameLoop);
        return;
      }
      if (!gameRunning && !gameOver) return;

      ctx.fillStyle = "#061316";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      drawStars();

      if (gameOver) {
        drawGameOver();
      } else {
        updatePlayer();
        updateBullets();
        updateEnemies();

        drawPlayer();
        enemies.forEach(drawEnemy);
        bullets.forEach(drawBullet);
        enemyBullets.forEach(drawBullet);
        drawHUD();
      }

      animId = requestAnimationFrame(gameLoop);
    } catch(e) {
      console.error("Galaga error:", e);
      animId = requestAnimationFrame(gameLoop);
    }
  };

  const handleKeyDown = (e) => {
    keys[e.code] = true;
    if (e.code === 'Space' && (gameOver || gameWon)) {
      e.preventDefault();
      resetGame();
    }
  };

  const handleKeyUp = (e) => {
    keys[e.code] = false;
  };

  const handleTouchStart = (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    if (gameOver || gameWon) {
      resetGame();
      return;
    }
    if (!player) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    player.x = (touch.clientX - rect.left) * scaleX - player.w / 2;
  };

  const handleTouchMove = (e) => {
    e.preventDefault();
    if (!player || gameOver) return;
    const touch = e.touches[0];
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const newX = (touch.clientX - rect.left) * scaleX - player.w / 2;
    player.x = Math.max(0, Math.min(canvas.width - player.w, newX));
    // Also control Y
    const scaleY = canvas.height / rect.height;
    const newY = (touch.clientY - rect.top) * scaleY - player.h / 2;
    player.y = Math.max(canvas.height * 0.7, Math.min(canvas.height - 10, newY));
  };

  const handleTouchEnd = (e) => {
    e.preventDefault();
  };

  const start = (container) => {
    if (!container) return;

    // Create canvas inside container
    canvas = document.createElement('canvas');
    canvas.className = 'galaga-canvas';
    canvas.width = container.clientWidth || 480;
    canvas.height = container.clientHeight || 320;
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.display = 'block';
    canvas.style.background = '#061316';
    canvas.style.borderRadius = '4px';
    canvas.style.cursor = 'none';
    container.appendChild(canvas);
    ctx = canvas.getContext('2d');

    // Keyboard events
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    // Touch events
    canvas.addEventListener('touchstart', handleTouchStart, { passive: false });
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
    canvas.addEventListener('touchend', handleTouchEnd, { passive: false });

    // Cargar imagen de enemigo temporal
    enemyImg = new Image();
    enemyImg.src = "assets/img/game/Fermin.jpeg";

    resetGame();
  };

  const stop = () => {
    if (animId) cancelAnimationFrame(animId);
    animId = null;
    gameRunning = false;
    gameOver = false;
    gameWon = false;
    document.removeEventListener('keydown', handleKeyDown);
    document.removeEventListener('keyup', handleKeyUp);
    keys = {};
    if (canvas) {
      canvas.removeEventListener('touchstart', handleTouchStart);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('touchend', handleTouchEnd);
    }
  };

  return { start, stop };
})();
