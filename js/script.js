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
