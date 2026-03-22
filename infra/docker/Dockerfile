FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY gui/package*.json ./gui/
RUN npm --prefix gui ci

COPY . .
RUN npm --prefix gui run build
RUN mkdir -p public/gui && (cp -R gui/dist/gui/browser/* public/gui/ 2>/dev/null || cp -R gui/dist/gui/* public/gui/)
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY package*.json ./
RUN npm ci --omit=dev

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/public ./public
COPY infra/docker/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 3000
CMD ["/entrypoint.sh"]
