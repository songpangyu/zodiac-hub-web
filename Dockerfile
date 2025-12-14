# 1. 基础镜像
FROM node:18-alpine AS base

# 2. 安装依赖
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# 3. 构建代码
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# ⚠️ 这里非常关键：把构建时的环境变量传进去
# 因为 Next.js 在 build 期间就需要把 NEXT_PUBLIC_ 变量打包进 JS 里
ARG NEXT_PUBLIC_FIREBASE_API_KEY
ENV NEXT_PUBLIC_FIREBASE_API_KEY=$NEXT_PUBLIC_FIREBASE_API_KEY
# ... (其他的变量也要这样写) ...

RUN npm run build

# 4. 生产环境运行
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production

# 创建用户为了安全
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# 自动利用 Next.js 的 Standalone 模式（减小体积）
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]