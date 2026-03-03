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