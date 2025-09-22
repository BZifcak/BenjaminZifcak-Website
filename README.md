Benjamin Zifcak — simple portfolio webpage

```powershell
# from workspace root
start .\index.html
```

Projects in the `Projects` section are pulled from my GitHub account (user `BZifcak`) and link to the repositories directly.

Notes on dynamic fetching
- The page fetches public repositories from the GitHub API client-side. This keeps the Projects section up-to-date.
- Unauthenticated API requests are rate-limited (60 requests per hour per IP). If expecting heavy traffic or want to avoid rate limits, add a static build step or a server-side proxy with authentication.
