FROM node:latest
RUN cd /home && mkdir app
COPY . /home/app
WORKDIR /home/app

RUN cd /home/app
RUN cp .env-sample-docker .env
RUN npm i
EXPOSE 3000
CMD ["npm", "start"]
