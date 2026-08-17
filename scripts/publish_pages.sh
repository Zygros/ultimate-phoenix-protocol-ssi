#!/usr/bin/env bash
# Publish the static Phoenix Portal artifact to the repository's gh-pages branch.
# This script intentionally excludes source code, credentials, the local relay, and CLI files.

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PAGES_BRANCH="${PAGES_BRANCH:-gh-pages}"
EXPECTED_BRANCH="${EXPECTED_BRANCH:-main}"
PROJECT_PATH="${PROJECT_PATH:-/ultimate-phoenix-protocol-ssi/}"

if [[ -n "$(git -C "$ROOT_DIR" status --porcelain)" ]]; then
  echo "Refusing to publish from a dirty source checkout. Commit, stash, or discard changes first." >&2
  exit 1
fi

CURRENT_BRANCH="$(git -C "$ROOT_DIR" branch --show-current)"
if [[ "$CURRENT_BRANCH" != "$EXPECTED_BRANCH" ]]; then
  echo "Refusing to publish from '$CURRENT_BRANCH'. Expected '$EXPECTED_BRANCH'." >&2
  exit 1
fi

REMOTE_URL="$(git -C "$ROOT_DIR" remote get-url origin)"
TEMP_DIR="$(mktemp -d)"
trap 'rm -rf "$TEMP_DIR"' EXIT

printf '%s\n' 'Building the static portal with the GitHub Pages project path…'
(
  cd "$ROOT_DIR/web"
  npm ci
  GITHUB_PAGES=true npm run build
)

if ! grep -q "${PROJECT_PATH}assets/" "$ROOT_DIR/web/dist/index.html"; then
  echo "The build output does not contain the expected GitHub Pages asset path: ${PROJECT_PATH}" >&2
  exit 1
fi

printf '%s\n' 'Preparing a static-only gh-pages artifact…'
cp -R "$ROOT_DIR/web/dist/." "$TEMP_DIR/"
touch "$TEMP_DIR/.nojekyll"

(
  cd "$TEMP_DIR"
  git init -q
  git checkout -q -b "$PAGES_BRANCH"
  git config user.name "Phoenix Portal Publisher"
  git config user.email "noreply@users.noreply.github.com"
  git add --all
  git commit -q -m "Deploy Phoenix Portal from $(git -C "$ROOT_DIR" rev-parse --short HEAD)"
  git remote add origin "$REMOTE_URL"
  git push --force origin "$PAGES_BRANCH"
)

printf '%s\n' "Published static artifact branch '$PAGES_BRANCH'."
printf '%s\n' "Expected Pages URL: https://zygros.github.io${PROJECT_PATH}"
