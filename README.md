Benjamin Zifcak — simple portfolio webpage

Files added/updated:
- `index.html` — main page (now includes GitHub avatar and project links)
- `css/styles.css` — styles (updated to a honey/tan palette)
- `js/script.js` — small helper scripts

Projects in the `Projects` section are pulled from your GitHub account (user `BZifcak`) and link to the repositories directly.

Open `index.html` in a browser to view the page. On Windows you can double-click the file or run:

```powershell
# from workspace root
start .\index.html
```

Replace the avatar with a local file:
1. Add an image to `css/` or `images/` (e.g. `images/avatar.jpg`).
2. Update the `<img class="avatar" src="...">` in `index.html` to point to the local path (for example `images/avatar.jpg`).

Tell me any text updates (bio, contact email, project order) and I will update the page.

Deployment to GitHub Pages
1. Push this repository to GitHub and ensure the default branch is `main`.
2. The repository contains a GitHub Actions workflow (`.github/workflows/deploy.yml`) which will publish the repository root to the `gh-pages` branch when you push to `main`.
3. Once the workflow runs, enable GitHub Pages in repository settings and set the source to the `gh-pages` branch. Your site will be available at `https://<your-username>.github.io/<repo-name>/`.

Notes on dynamic fetching
- The page fetches public repositories from the GitHub API client-side. This keeps the Projects section up-to-date.
- Unauthenticated API requests are rate-limited (60 requests per hour per IP). If you expect heavy traffic or want to avoid rate limits, we can add a static build step or a server-side proxy with authentication.

Quick publish helpers
- See `PUBLISH_TO_GITHUB.md` for step-by-step commands.
- Optionally run `publish.ps1` in PowerShell from the project root to initialize and push (edit the remote URL in the script if needed).