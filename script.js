// Configuration - replace with your form link
const FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSclBB9lQd0p2qutlMdV2UkejSghYI6qVaIr-No6f5w0V1Mftg/viewform?usp=sharing&ouid=';

// Open form button
document.addEventListener('DOMContentLoaded', () => {
  const openBtn = document.getElementById('openForm');
  const copyBtn = document.getElementById('copyBtn');
  const formLinkInput = document.getElementById('formLink');
  const qr = document.getElementById('qr');

  // Set visible input value
  formLinkInput.value = FORM_URL;

  openBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.open(FORM_URL, '_blank');
  });

  copyBtn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(FORM_URL);
      const original = copyBtn.innerText;
      copyBtn.innerText = 'Copied!';
      setTimeout(()=> copyBtn.innerText = original, 1400);
    } catch (err) {
      alert('Copy failed. Please copy manually: ' + FORM_URL);
    }
  });

  // Generate a simple QR using canvas (no external libs)
  function makeQR(text, size=120) {
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    // background
    ctx.fillStyle = '#071612';
    ctx.fillRect(0,0,size,size);
    // fake matrix pattern to hint at QR (not real scannable generation)
    ctx.fillStyle = '#0fffb0';
    for (let i=6;i<size;i+=12){
      for (let j=6;j<size;j+=12){
        if (Math.random() > 0.6) ctx.fillRect(i,j,6,6);
      }
    }
    return canvas;
  }
  qr.appendChild(makeQR(FORM_URL));

  // subtle animated canvas background (matrix rain)
  const bg = document.getElementById('bgCanvas');
  const ctx = bg.getContext('2d');
  let w = bg.width = window.innerWidth;
  let h = bg.height = window.innerHeight;
  const cols = Math.floor(w / 14);
  const ypos = Array(cols).fill(0);

  function matrixStep() {
    ctx.fillStyle = 'rgba(0,0,0,0.05)';
    ctx.fillRect(0,0,w,h);
    ctx.fillStyle = 'rgba(16,255,122,0.6)'
    ctx.font = '12px monospace';
    for (let i=0;i<ypos.length;i++) {
      const text = String.fromCharCode(33 + Math.random()*94);
      ctx.fillText(text, i*14, ypos[i]*14);
      if (ypos[i]*14 > h && Math.random() > 0.975) ypos[i] = 0;
      ypos[i]++;
    }
    requestAnimationFrame(matrixStep);
  }
  matrixStep();

  window.addEventListener('resize', () => {
    w = bg.width = window.innerWidth;
    h = bg.height = window.innerHeight;
  });
});