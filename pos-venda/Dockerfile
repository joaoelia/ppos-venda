# Dockerfile para frontend Next.js
FROM node:20-alpine
WORKDIR /app
COPY pos-venda/. .
RUN npm install -g pnpm && pnpm install && pnpm build
EXPOSE 3000
CMD ["pnpm", "start"]
