# API Overview

## Public
- `GET /api/public/checkins/points/:pointCode`
- `POST /api/public/checkins/submit`
- `GET /api/public/emotion-zones`

## Admin
- `POST /api/admin/checkins/points`
- `GET /api/admin/checkins/points`
- `PATCH /api/admin/checkins/points/:id/toggle`
- `GET /api/admin/dashboard/summary?from&to&pointCode`
- `GET /api/admin/checkins/export?from&to&pointCode`
- `GET /api/admin/qr/:pointCode`

## System
- `GET /api/health/live`
- `GET /api/system/info`
- `GET /api/docs`
