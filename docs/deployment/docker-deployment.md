# Deploy bÃ¡ÂºÂ±ng Docker

## Services
- `app`: NestJS API + static Angular GUI
- `mysql`: dÃ¡Â»Â¯ liÃ¡Â»â€¡u hÃ¡Â»â€¡ thÃ¡Â»â€˜ng

## Run
```bash
docker compose up --build -d
```

## Stop
```bash
docker compose down
```

## Seed dÃ¡Â»Â¯ liÃ¡Â»â€¡u cÃ¡ÂºÂ£m xÃƒÂºc mÃ¡ÂºÂ·c Ã„â€˜Ã¡Â»â€¹nh
```bash
docker compose exec app npm run seed:prod
```

## Health check
- API: `GET http://localhost:3009/api/health/live`
- GUI: `http://localhost:3009`


