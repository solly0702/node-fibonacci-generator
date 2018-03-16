# docker build -t node_fib_gen-api:1.0.0-alpine .
FROM alpine:3.7
LABEL Sol Lee

RUN apk add --update nodejs

WORKDIR /app

COPY package*.json ./
RUN npm install --no-optional

COPY . .

ENV PORT 5005
EXPOSE 5005

CMD ["npm", "start"]