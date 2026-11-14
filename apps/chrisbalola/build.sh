#!/bin/bash
set -e

APP_NAME="chrisbalola-website"
APP_DIR="/var/www/$APP_NAME"
PM2_NAME="chrisbalola-website"
PACKAGE="@websites/chrisbalola"

# The app is a workspace package, so install and build from the repo root and
# ship the whole workspace: node_modules lives at the top.
REPO_ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
cd "$REPO_ROOT"

echo "Starting build + deploy..."

echo "Installing dependencies..."
pnpm install --frozen-lockfile --filter "$PACKAGE..."

echo "Building Next.js app..."
pnpm --filter "$PACKAGE" build

echo "Ensuring target directory exists at $APP_DIR..."
sudo mkdir -p $APP_DIR

echo "Cleaning old build..."
sudo rm -rf $APP_DIR/*
sudo rm -rf $APP_DIR/.[!.]*

echo "Copying new build to $APP_DIR..."
sudo cp -R $REPO_ROOT/. $APP_DIR/

echo "Verifying deployment..."
sudo test -d "$APP_DIR/apps/chrisbalola/.next" || echo "WARNING: .next not found!"

echo "Stopping old PM2 process (if exists)..."
pm2 delete $PM2_NAME || true

echo "Starting PM2 fresh..."
cd $APP_DIR
pm2 start pnpm --name $PM2_NAME -- --filter "$PACKAGE" start

echo "Saving PM2..."
pm2 save

echo "Deployment complete!"
