// Typewriter for terminal block
(function(){
  const pre = document.querySelector('.type');
  if(!pre) return;
  const lines = JSON.parse(pre.getAttribute('data-lines') || '[]');
  let i = 0;
  function next(){
    if(i >= lines.length) return;
    typeLine(lines[i], () => { i++; setTimeout(next, 500); });
  }
  function typeLine(str, done){
    let idx = 0;
    const iv = setInterval(() => {
      pre.textContent = (pre.textContent || '') + (idx < str.length ? str[idx++] : '');
      if(idx >= str.length){ clearInterval(iv); pre.textContent += '\n'; done(); }
    }, 20);
  }
  next();
})();