# Emotion Check-in System

Hệ thống check-in cảm xúc bằng QR, không yêu cầu đăng nhập, gồm backend NestJS + frontend Angular + MySQL.

## Stack
- Backend: NestJS + TypeORM
- Frontend: Angular standalone
- Database: MySQL 8
- Deploy: Docker Compose

## Cấu trúc chính
- `src/`: NestJS backend
- `gui/`: Angular frontend
- `public/gui`: static GUI sau khi build
- `infra/docker`: Docker assets
- `docs/`: tài liệu kiến trúc, API, DB, UX/UI, deploy

## Chạy local không Docker
```bash
npm install
npm --prefix gui install

npm --prefix gui run build
npm run build
npm run start:dev
```

## Chạy bằng Docker
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

## Ghi chú MVP
- Rule 1 check-in/ngày được enforce theo `checkin_point + client_hash + created_date`.
- Admin endpoints chưa bật auth để đúng phạm vi brief v1.
