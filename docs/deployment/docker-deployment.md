# Deploy bằng Docker

## Services
- `app`: NestJS API + static Angular GUI
- `mysql`: dữ liệu hệ thống

## Run
```bash
docker compose up --build -d
```

## Stop
```bash
docker compose down
```

## Seed dữ liệu cảm xúc mặc định
```bash
docker compose exec app npm run seed:prod
```

## Health check
- API: `GET http://localhost:3009/api/health/live`
- GUI: `http://localhost:3009`
