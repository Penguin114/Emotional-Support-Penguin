(() => {
  'use strict';
  const habitat = document.querySelector('#habitat');
  const igloo = document.querySelector('#igloo');
  const penguin = document.querySelector('#penguin');
  const dialogue = document.querySelector('#affirmation');
  const text = document.querySelector('#affirmation-text');
  const close = document.querySelector('#close-dialogue');
  const status = document.querySelector('#status');
  const invitation = document.querySelector('#invitation-text');
  const hint = document.querySelector('#hint-text');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const affirmations = [
    'You don’t have to have it all figured out to be doing beautifully.',
    'Small steps still take you somewhere. You’re allowed to go gently.',
    'You are worthy of kindness, especially the kindness you give yourself.',
    'There is no perfect pace. There is only your pace, and that is enough.',
    'Rest is part of the journey. You don’t have to earn a quiet moment.',
    'Your presence makes this world a little warmer.',
    'You can begin again, as many times as you need.',
    'Some days, showing up is the brave thing. You did that.',
    'You are more than what you get done today.',
    'Even here, even now, there is room for something good.'
  ];
  let current = 0;
  let state = 'home';
  let wantsVisit = false;
  let motionTimer;

  function setState(next) {
    state = next;
    habitat.dataset.state = next;
  }

  function updateControls() {
    igloo.setAttribute('aria-expanded', String(wantsVisit));
    igloo.setAttribute('aria-label', wantsVisit ? 'Send the penguin home' : 'Say hello to the penguin');
  }

  function completeMotion() {
    clearTimeout(motionTimer);
    if (state === 'leaving') {
      setState('visiting');
      if (!wantsVisit) { goHome(); return; }
      text.textContent = affirmations[current];
      current = (current + 1) % affirmations.length;
      dialogue.hidden = false;
      status.textContent = 'Your penguin says: ' + text.textContent;
      invitation.textContent = 'A kind thought to take with you.';
      hint.textContent = 'Click the igloo to wave goodbye';
    } else if (state === 'returning') {
      setState('home');
      invitation.textContent = 'A little kindness is waiting inside.';
      hint.textContent = 'Click the igloo to say hello';
      status.textContent = 'Your little friend is home. Come back whenever you need a kind reminder.';
      if (wantsVisit) comeOut();
    }
  }

  function scheduleCompletion() {
    clearTimeout(motionTimer);
    motionTimer = setTimeout(completeMotion, reducedMotion.matches ? 20 : 2200);
  }

  function comeOut() {
    setState('leaving');
    status.textContent = 'Your little friend is on the way.';
    invitation.textContent = 'Someone is happy you’re here.';
    hint.textContent = 'Here comes a little warmth';
    scheduleCompletion();
  }

  function goHome() {
    dialogue.hidden = true;
    setState('returning');
    status.textContent = 'Your little friend is waddling home.';
    invitation.textContent = 'Keep a little warmth with you.';
    hint.textContent = 'See you again, little friend';
    scheduleCompletion();
  }

  function toggleVisit() {
    wantsVisit = !wantsVisit;
    updateControls();
    if (state === 'home' && wantsVisit) comeOut();
    else if (state === 'visiting' && !wantsVisit) goHome();
    else if (state === 'leaving' && !wantsVisit) {
      dialogue.hidden = true;
      hint.textContent = 'Your little friend will head right back';
    }
  }

  igloo.addEventListener('click', toggleVisit);
  close.addEventListener('click', () => {
    wantsVisit = false;
    updateControls();
    if (state === 'visiting') goHome();
    igloo.focus({ preventScroll: true });
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && wantsVisit) {
      wantsVisit = false;
      updateControls();
      if (state === 'visiting') goHome();
      if (dialogue.contains(document.activeElement)) igloo.focus({ preventScroll: true });
    }
  });
  penguin.addEventListener('animationend', event => {
    if (event.target === penguin && (event.animationName === 'walk-out' || event.animationName === 'walk-home')) completeMotion();
  });
  reducedMotion.addEventListener('change', () => {
    if (state === 'leaving' || state === 'returning') scheduleCompletion();
  });

  const snowfall = document.querySelector('#snowfall');
  for (let i = 0; i < 23; i++) {
    const flake = document.createElement('span');
    flake.className = 'snowflake';
    flake.style.left = `${(i * 43.7) % 100}%`;
    flake.style.animationDuration = `${15 + (i * 7) % 17}s`;
    flake.style.animationDelay = `${-((i * 13) % 32)}s`;
    if (i % 4 === 0) flake.style.width = flake.style.height = '4px';
    snowfall.append(flake);
  }
})();
