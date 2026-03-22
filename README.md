# Emotion Check-in System

Há»‡ thá»‘ng check-in cáº£m xÃºc báº±ng QR, khÃ´ng yÃªu cáº§u Ä‘Äƒng nháº­p, gá»“m backend NestJS + frontend Angular + MySQL.

## Stack
- Backend: NestJS + TypeORM
- Frontend: Angular standalone
- Database: MySQL 8
- Deploy: Docker Compose

## Cáº¥u trÃºc chÃ­nh
- `src/`: NestJS backend
- `gui/`: Angular frontend
- `public/gui`: static GUI sau khi build
- `infra/docker`: Docker assets
- `docs/`: tÃ i liá»‡u kiáº¿n trÃºc, API, DB, UX/UI, deploy

## Cháº¡y local khÃ´ng Docker
```bash
npm install
npm --prefix gui install

npm --prefix gui run build
npm run build
npm run start:dev
```

## Cháº¡y báº±ng Docker
```bash
cp .env.example .env
docker compose up --build -d
```

## URL
- GUI: `http://localhost:3009`
- API Docs: `http://localhost:3009/api/docs`
- Health: `http://localhost:3009/api/health/live`

## Seed emotion zones
```bash
npm run seed
```

## Ghi chÃº MVP
- Rule 1 check-in/ngÃ y Ä‘Æ°á»£c enforce theo `checkin_point + client_hash + created_date`.
- Admin endpoints chÆ°a báº­t auth Ä‘á»ƒ Ä‘Ãºng pháº¡m vi brief v1.

