// Small helper scripts
document.getElementById('year').textContent = new Date().getFullYear();

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const href = a.getAttribute('href');
    if(href === '#') return;
    const el = document.querySelector(href);
    if(el){
      e.preventDefault();
      el.scrollIntoView({behavior:'smooth', block:'start'});
      history.replaceState(null,'',href);
    }
  });
});

// Dynamically fetch GitHub repos for user and render into #projects-list
async function loadRepos(username = 'BZifcak', max = 12) {
  const container = document.getElementById('projects-list');
  if(!container) return;
  container.innerHTML = '<li>Loading projects…</li>';

  try {
    const res = await fetch(`https://api.github.com/users/${username}/repos?per_page=${max}&sort=pushed`);
    if(!res.ok) {
      container.innerHTML = `<li>Could not load projects (HTTP ${res.status}).</li>`;
      return;
    }
    const repos = await res.json();
    if(!Array.isArray(repos) || repos.length === 0) {
      container.innerHTML = '<li>No public repositories found.</li>';
      return;
    }

    container.innerHTML = '';
    repos.forEach(repo => {
      const li = document.createElement('li');
      const article = document.createElement('article');
      const h4 = document.createElement('h4');
      const a = document.createElement('a');
      a.href = repo.html_url;
      a.target = '_blank';
      a.rel = 'noopener';
      a.textContent = repo.name;
      h4.appendChild(a);

      const p = document.createElement('p');
      p.textContent = repo.description || '';

      article.appendChild(h4);
      article.appendChild(p);

      // optional metadata
      const meta = document.createElement('div');
      meta.style.marginTop = '6px';
      meta.style.fontSize = '13px';
      meta.style.color = 'rgba(59,47,37,0.6)';
      const lang = repo.language ? `Language: ${repo.language}` : '';
      const updated = repo.pushed_at ? `Updated: ${new Date(repo.pushed_at).toLocaleDateString()}` : '';
      meta.textContent = [lang, updated].filter(Boolean).join(' • ');
      if(meta.textContent) article.appendChild(meta);

      li.appendChild(article);
      container.appendChild(li);
    });

  } catch (err) {
    console.error('Failed to load repos', err);
    container.innerHTML = '<li>Failed to load projects (network error).</li>';
  }
}

// load on DOM ready
if(document.readyState === 'loading'){
  document.addEventListener('DOMContentLoaded', () => loadRepos());
} else {
  loadRepos();
}

// Photo rotation effects: set a small random base rotation and increase on hover
function initPhotoRotations() {
  const imgs = document.querySelectorAll('.photos-grid img');
  imgs.forEach(img => {
    // random base rotation between -6 and +6 degrees
    const base = (Math.random() * 12) - 6;
    img.style.transform = `rotate(${base}deg)`;
    img.dataset.baseRotate = String(base);

    img.addEventListener('mouseenter', () => {
      const baseAngle = parseFloat(img.dataset.baseRotate) || 0;
      img.style.transform = `rotate(${baseAngle + 6}deg) scale(1.02)`;
      img.style.boxShadow = '0 12px 30px rgba(59,47,37,0.12)';
    });
    img.addEventListener('mouseleave', () => {
      const baseAngle = parseFloat(img.dataset.baseRotate) || 0;
      img.style.transform = `rotate(${baseAngle}deg)`;
      img.style.boxShadow = '';
    });
  });
}

if(document.readyState === 'loading'){
  document.addEventListener('DOMContentLoaded', initPhotoRotations);
} else {
  initPhotoRotations();
}

// Static modal: click photo to open modal with non-editable description pulled from the <figcaption>
function initStaticPhotoModal(){
  const modal = document.getElementById('photo-modal');
  if(!modal) return;
  const modalDesc = document.getElementById('modal-desc');

  function open(desc){
    modalDesc.textContent = desc || '';
    modal.setAttribute('aria-hidden','false');
  }
  function close(){
    modal.setAttribute('aria-hidden','true');
  }

  // attach click listeners
  document.querySelectorAll('.photo-item').forEach(item => {
    const img = item.querySelector('img');
    const caption = item.querySelector('figcaption');
    if(!img) return;
    img.addEventListener('click', () => open(caption ? caption.textContent : ''));
  });

  // close controls
  modal.querySelectorAll('[data-close]').forEach(btn => btn.addEventListener('click', close));
  document.addEventListener('keydown', (e) => { if(e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') close(); });
}

if(document.readyState === 'loading'){
  document.addEventListener('DOMContentLoaded', initStaticPhotoModal);
} else {
  initStaticPhotoModal();
}
