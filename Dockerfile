# multi-stage build which resolves node dependencies
# and builds the production files
#
# to build the image: docker build -t contiamo/ui-components .
# to run the container in serving mode: docker run -p 8080:8080 -d contiamo/ui-compents

FROM contiamo/alpine-node:8
WORKDIR /app

COPY package.json yarn.lock /app/
RUN yarn install

FROM contiamo/alpine-node:8
WORKDIR /app
COPY --from=0 /app .
COPY . .

ENV NODE_ENV production
RUN yarn run build

CMD ["yarn", "start"]