const nav=document.getElementById('nav');
const hamburger=document.querySelector('.nav-hamburger');
const navLinks=document.querySelector('.nav-links');
window.addEventListener('scroll',()=>{nav.classList.toggle('scrolled',window.scrollY>80);});
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',e=>{
    e.preventDefault();
    const t=document.querySelector(a.getAttribute('href'));
    if(t)t.scrollIntoView({behavior:'smooth',block:'start'});
    if(navLinks)navLinks.classList.remove('open');
    if(hamburger)hamburger.setAttribute('aria-expanded','false');
  });
});
if(hamburger){
  hamburger.addEventListener('click',()=>{
    const open=navLinks.classList.toggle('open');
    hamburger.setAttribute('aria-expanded',open);
  });
}
const obs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible');});
},{threshold:0.15});
document.querySelectorAll('.concert-card').forEach(c=>obs.observe(c));

/* ═══ Leer más / Ver menos (mobile only) ═══ */
(function(){
  const mq=window.matchMedia('(max-width:600px)');
  function initToggles(){
    document.querySelectorAll('.concert-desc').forEach(desc=>{
      if(desc.textContent.length<200)return;
      if(desc.nextElementSibling&&desc.nextElementSibling.classList.contains('desc-toggle'))return;
      const btn=document.createElement('button');
      btn.className='desc-toggle';
      btn.setAttribute('aria-expanded','false');
      btn.textContent='Leer más';
      desc.after(btn);
      if(mq.matches){desc.classList.add('collapsed');}
      btn.addEventListener('click',()=>{
        const isCollapsed=desc.classList.contains('collapsed');
        desc.classList.toggle('collapsed',!isCollapsed);
        desc.classList.toggle('expanded',isCollapsed);
        btn.textContent=isCollapsed?'Ver menos':'Leer más';
        btn.setAttribute('aria-expanded',isCollapsed);
      });
    });
  }
  function onBreakpoint(e){
    document.querySelectorAll('.concert-desc').forEach(desc=>{
      const btn=desc.nextElementSibling;
      if(!btn||!btn.classList.contains('desc-toggle'))return;
      if(e.matches){
        desc.classList.add('collapsed');
        desc.classList.remove('expanded');
        btn.textContent='Leer más';
        btn.setAttribute('aria-expanded','false');
      }else{
        desc.classList.remove('collapsed','expanded');
        btn.textContent='Leer más';
        btn.setAttribute('aria-expanded','false');
      }
    });
  }
  initToggles();
  mq.addEventListener('change',onBreakpoint);
})();