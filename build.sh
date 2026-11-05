#!/bin/bash
set -e

APP_NAME="chrisbalola-website"
APP_DIR="/var/www/$APP_NAME"
BUILD_DIR="$(pwd)"
PM2_NAME="chrisbalola-website"

echo "Starting build + deploy..."

echo "Installing dependencies..."
pnpm install --frozen-lockfile

echo "Building Next.js app..."
pnpm build
sudo ls -la

echo "Ensuring target directory exists at $APP_DIR..."
sudo mkdir -p $APP_DIR

echo "Cleaning old build..."
sudo rm -rf $APP_DIR/*
sudo rm -rf $APP_DIR/.[!.]*

echo "Copying new build to $APP_DIR..."
sudo cp -R $BUILD_DIR/. $APP_DIR/

echo "Verifying deployment..."
sudo ls -la $APP_DIR | grep -E "\.env|\.next" || echo "WARNING: .env or .next not found!"

echo "Stopping old PM2 process (if exists)..."
pm2 delete $PM2_NAME || true

echo "Starting PM2 fresh..."
cd $APP_DIR
pm2 start pnpm --name $PM2_NAME -- start

echo "Saving PM2..."
pm2 save

echo "Deployment complete!"
