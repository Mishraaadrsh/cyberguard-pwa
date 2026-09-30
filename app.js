// 1. Tab / Page Navigation
function switchPage(pageId) {
  document.querySelectorAll('.page').forEach((page) => {
    page.classList.remove('active');
  });
  document.querySelectorAll('nav button').forEach((btn) => {
    btn.classList.remove('active');
  });

  document.getElementById(pageId).classList.add('active');
  if (pageId === 'page1') {
    document.getElementById('nav-page1').classList.add('active');
  } else {
    document.getElementById('nav-page2').classList.add('active');
  }
}

// 2. Real-Time Password Strength Evaluator
const pwdInput = document.getElementById('pwd-input');
const meterFill = document.getElementById('meter-fill');
const pwdFeedback = document.getElementById('pwd-feedback');

if (pwdInput) {
  pwdInput.addEventListener('input', () => {
    const val = pwdInput.value;
    let score = 0;

    if (!val) {
      meterFill.style.width = '0%';
      pwdFeedback.textContent = 'Enter a password to evaluate score.';
      pwdFeedback.style.color = '#94a3b8';
      return;
    }

    if (val.length >= 8) score += 1;
    if (val.length >= 14) score += 1;
    if (/[A-Z]/.test(val)) score += 1;
    if (/[0-9]/.test(val)) score += 1;
    if (/[^A-Za-z0-9]/.test(val)) score += 1;

    switch (score) {
      case 1:
      case 2:
        meterFill.style.width = '30%';
        meterFill.style.background = 'var(--danger)';
        pwdFeedback.textContent = 'Weak: Vulnerable to quick automated brute-force attacks.';
        pwdFeedback.style.color = 'var(--danger)';
        break;
      case 3:
      case 4:
        meterFill.style.width = '65%';
        meterFill.style.background = 'var(--warning)';
        pwdFeedback.textContent = 'Moderate: Reasonable, but add length or unique special symbols.';
        pwdFeedback.style.color = 'var(--warning)';
        break;
      case 5:
        meterFill.style.width = '100%';
        meterFill.style.background = 'var(--success)';
        pwdFeedback.textContent = 'Strong: Excellent length and entropy for personal defense.';
        pwdFeedback.style.color = 'var(--success)';
        break;
    }
  });
}

// 3. Register Service Worker for PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('./sw.js')
      .then((reg) => console.log('ServiceWorker registered with scope:', reg.scope))
      .catch((err) => console.error('ServiceWorker registration failed:', err));
  });
}