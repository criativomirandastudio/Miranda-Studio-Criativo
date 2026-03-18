/* ── Header sticky ── */
const hdr = document.getElementById('hdr');
if (hdr) {
  window.addEventListener('scroll', () => {
    hdr.classList.toggle('fixa', window.scrollY > 60);
  }, { passive: true });
}

/* ── Menu mobile ── */
const burger   = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');

if (burger && navLinks) {
  burger.addEventListener('click', () => {
    const open = burger.classList.toggle('open');
    navLinks.classList.toggle('open');
    burger.setAttribute('aria-expanded', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });
  navLinks.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => {
      burger.classList.remove('open');
      navLinks.classList.remove('open');
      burger.setAttribute('aria-expanded', false);
      document.body.style.overflow = '';
    })
  );
}

/* ── Ticker loop ── */
(function(){
  const t = document.getElementById('ticker');
  if (t) t.innerHTML += t.innerHTML;
})();

/* ── Scroll reveal ── */
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('vis');
    obs.unobserve(e.target);
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('[data-sr],[data-stag]').forEach(el => obs.observe(el));

/* ── Form → WhatsApp ── */
const btnSubmit = document.getElementById('formSubmit');
if (btnSubmit) {
  btnSubmit.addEventListener('click', () => {
    const cats     = [...document.querySelectorAll('.cat-chk:checked')].map(c => c.value);
    const email    = document.getElementById('fEmail').value.trim();
    const detalhes = document.getElementById('fDetalhes').value.trim();
    if (!cats.length) { alert('Por favor, selecione pelo menos um serviço.'); return; }
    if (!email)       { alert('Por favor, informe seu e-mail.');              return; }
    if (!document.getElementById('fEmail').checkValidity()) { alert('Por favor, informe um e-mail válido.'); return; }
    if (!detalhes)    { alert('Por favor, descreva um pouco o seu projeto.'); return; }
    const msg =
      `Olá! Vim pelo site do Miranda Studio Criativo 🌸\n\n` +
      `*Serviço(s):* ${cats.join(', ')}\n` +
      `*E-mail:* ${email}\n\n` +
      `*Projeto:*\n${detalhes}`;
    window.open(`https://wa.me/558499477550?text=${encodeURIComponent(msg)}`, '_blank');
  });
}