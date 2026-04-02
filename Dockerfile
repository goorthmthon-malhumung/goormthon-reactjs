FROM node:18

WORKDIR /app

COPY front/package*.json ./
RUN npm install

COPY front/ ./
RUN npm run build

RUN npm install -g serve

EXPOSE 3000

CMD ["serve", "-s", "dist", "-l", "3000"]
