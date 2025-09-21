# Helper to initialize repo and push to GitHub (PowerShell)
# Use only if you're ready to push to https://github.com/BZifcak/BenjaminZifcak-Website.git

$remote = 'https://github.com/BZifcak/BenjaminZifcak-Website.git'

if (-not (Test-Path -Path .git)) {
  git init
  git add --all
  git commit -m "Initial site commit"
  git branch -M main
  git remote add origin $remote
  git push -u origin main
} else {
  Write-Host "Repository already initialized. Use 'git add/commit/push' as needed."
}
