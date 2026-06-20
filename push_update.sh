#!/usr/bin/env bash
set -e

MSG="${1:-chore: update site content}"

echo "==> Formatting with prettier..."
npx prettier . --write

echo "==> Staging all changes..."
git add -A

if git diff --cached --quiet; then
  echo "Nothing to commit."
  exit 0
fi

echo "==> Committing: $MSG"
git commit -m "$MSG"

echo "==> Pushing..."
if ! git push origin master; then
  echo "Push rejected, pulling and retrying..."
  git pull --rebase origin master
  git push origin master
fi

echo "==> Done! Site will be live at https://nnelshas.github.io/portfolio in ~2-3 min."
