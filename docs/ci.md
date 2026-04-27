# CI Pipeline

![Build and Link Check](https://github.com/noustelos/odontos_landing/actions/workflows/ci.yml/badge.svg)

## Overview

The project uses a GitHub Actions workflow to validate the production artifact on every push and pull request.

Pipeline steps:

1. Install dependencies with `npm ci`
2. Build minified output with `npm run build`
3. Run `npm run link-check:dist` in default mode
4. Run strict external link validation only on the `production` branch

## Strict Mode Policy

The strict check is controlled via `LINK_CHECK_STRICT_EXTERNAL=1` and only executes for direct branch runs on `production`.
This prevents false-positive deployment blocking on feature branches while keeping production quality gates strict.

## Note

If your repository owner/name differs, update the badge URL accordingly.
