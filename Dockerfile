FROM node:17.8
WORKDIR /

COPY . .

RUN ["npm","install","--legacy-peer-deps"]

RUN ["npm","run","build"]

ENV PORT 3000

EXPOSE $PORT

CMD ["npx","next","start","-p", "$PORT"]