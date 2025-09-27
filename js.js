// MATRIX BACKGROUND
const bg = document.getElementById('bgCanvas');
const ctx = bg.getContext('2d');

// set canvas size to window
function resizeCanvas() {
  bg.width = window.innerWidth;
  bg.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const fontSize = 14;
let columns = Math.floor(bg.width / fontSize);
let drops = Array(columns).fill(0);

function drawMatrix() {
  // fade background
  ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
  ctx.fillRect(0, 0, bg.width, bg.height);

  ctx.fillStyle = '#10ff7a'; // neon green
  ctx.font = fontSize + 'px monospace';

  for (let i = 0; i < drops.length; i++) {
    const text = String.fromCharCode(33 + Math.random() * 94);
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    if (drops[i] * fontSize > bg.height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i]++;
  }

  requestAnimationFrame(drawMatrix);
}
drawMatrix();
