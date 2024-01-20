FROM python:slim-bullseye

RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    curl \
    wget \
    gnupg \
    software-properties-common \
    dirmngr \
    openjdk-11-jre-headless && \
    rm -rf /var/lib/apt/lists/*

RUN echo "deb http://deb.debian.org/debian bullseye-backports main" >> /etc/apt/sources.list.d/libreoffice.list

RUN apt-get update && \
    apt-get install -y --no-install-recommends -t bullseye-backports libreoffice && \
    rm -rf /var/lib/apt/lists/*

ENV NODE_VERSION=18.12.0
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
ENV NVM_DIR=/root/.nvm
RUN . "$NVM_DIR/nvm.sh" && nvm install ${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm use v${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm alias default v${NODE_VERSION}
ENV PATH="/root/.nvm/versions/node/v${NODE_VERSION}/bin/:${PATH}"
RUN npm install -g yarn

WORKDIR /app

COPY . .

RUN yarn install

ENTRYPOINT ["tail", "-f", "/dev/null"]
