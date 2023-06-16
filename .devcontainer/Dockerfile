FROM ubuntu:20.04 AS base

ENV GOLANG_VERSION 1.20.3
ENV GOLANG_SHA256 979694c2c25c735755bf26f4f45e19e64e4811d661dd07b8c010f7a8e18adfca

RUN apt-get update -y && \
  DEBIAN_FRONTEND=noninteractive apt-get install -y \
  apt-transport-https \
  build-essential \
  ca-certificates \
  curl \
  git \
  gnupg \
  software-properties-common \
  wget \
  unzip && \
  # Get all of the signatures we need all at once.
  curl -fsSL https://deb.nodesource.com/gpgkey/nodesource.gpg.key  | apt-key add - && \
  curl -fsSL https://dl.yarnpkg.com/debian/pubkey.gpg              | apt-key add - && \
  # curl -fsSL https://download.docker.com/linux/debian/gpg          | apt-key add - && \
  # curl -fsSL https://packages.cloud.google.com/apt/doc/apt-key.gpg | apt-key add - && \
  curl -fsSL https://packages.microsoft.com/keys/microsoft.asc     | apt-key add - && \
  # AWS v2 cli
  curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip" && \
  unzip awscliv2.zip && \
  ./aws/install && \
  rm -rf aws && \
  rm awscliv2.zip && \
  # Add additional apt repos all at once
  echo "deb https://deb.nodesource.com/node_16.x $(lsb_release -cs) main"                         | tee /etc/apt/sources.list.d/node.list             && \
  echo "deb https://dl.yarnpkg.com/debian/ stable main"                                           | tee /etc/apt/sources.list.d/yarn.list             && \
#   echo "deb [arch=amd64] https://download.docker.com/linux/debian $(lsb_release -cs) stable"      | tee /etc/apt/sources.list.d/docker.list           && \
#   echo "deb http://packages.cloud.google.com/apt cloud-sdk-$(lsb_release -cs) main"               | tee /etc/apt/sources.list.d/google-cloud-sdk.list && \
#   echo "deb http://apt.kubernetes.io/ kubernetes-xenial main"                                     | tee /etc/apt/sources.list.d/kubernetes.list       && \
  # echo "deb [arch=amd64] https://packages.microsoft.com/repos/azure-cli/ $(lsb_release -cs) main" | tee /etc/apt/sources.list.d/azure.list            && \
  # apt-key --keyring /etc/apt/trusted.gpg.d/Microsoft.gpg adv --keyserver packages.microsoft.com --recv-keys BC528686B50D79E339D3721CEB3E94ADBE1229CF && \
#   Install second wave of dependencies
  apt-get update -y && \
  apt-get install -y \
  # Pin azure-cli to 2.33.1 as workaround for https://github.com/pulumi/pulumi-docker-containers/issues/106
  # azure-cli \
#   docker-ce \
#   google-cloud-sdk \
#   google-cloud-sdk-gke-gcloud-auth-plugin \
  nodejs \
  yarn && \
  curl -sL https://aka.ms/InstallAzureCLIDeb | bash && \
  # Clean up the lists work
  rm -rf /var/lib/apt/lists/*

  # Install Go
RUN curl -fsSLo /tmp/go.tgz https://golang.org/dl/go${GOLANG_VERSION}.linux-amd64.tar.gz && \
  echo "${GOLANG_SHA256} /tmp/go.tgz" | sha256sum -c - && \
  tar -C /usr/local -xzf /tmp/go.tgz && \
  rm /tmp/go.tgz && \
  export PATH="/usr/local/go/bin:$PATH" && \
  go version
ENV GOPATH /go
ENV PATH $GOPATH/bin:/usr/local/go/bin:$PATH

# Passing --build-arg PULUMI_VERSION=vX.Y.Z will use that version
# of the SDK. Otherwise, we use whatever get.pulumi.com thinks is
# the latest
ARG PULUMI_VERSION

# Install the Pulumi SDK, including the CLI and language runtimes.
# RUN curl -fsSL https://get.pulumi.com/ | bash -s -- --version $PULUMI_VERSION && \
#   mv ~/.pulumi/bin/* /usr/bin

RUN curl -fsSL https://get.pulumi.com/ | bash -s -- && \
  mv ~/.pulumi/bin/* /usr/bin

# Install pulumictl
RUN version=0.0.25 \
    && curl -fsSLO https://github.com/pulumi/pulumictl/releases/download/v$version/pulumictl-v$version-linux-amd64.tar.gz \
    && tar -xzf pulumictl-v$version-linux-amd64.tar.gz --directory /usr/local/bin --no-same-owner pulumictl \
    && rm -f pulumictl-v$version-linux-amd64.tar.gz \
    && pulumictl version

# Add non-root user
ARG USER_NAME=user
ARG USER_UID=1000
ARG USER_GID=$USER_UID

RUN groupadd --gid $USER_GID $USER_NAME \
    && useradd --uid $USER_UID --gid $USER_GID --shell /bin/bash -m $USER_NAME \
    && mkdir -p /etc/sudoers.d \
    && echo "$USER_NAME ALL=(ALL:ALL) NOPASSWD: ALL" > /etc/sudoers.d/$USER_NAME \
    && chmod 0440 /etc/sudoers.d/$USER_NAME

RUN mkdir -p /go/bin \
    && chown -R $USER_NAME: /go \
    && mkdir -p $HOME/.pulumi/bin \
    && chown -R $USER_NAME: $HOME/.pulumi

USER $USER_NAME

ENV XDG_CONFIG_HOME=/home/$USER_NAME/.config
ENV XDG_CACHE_HOME=/home/$USER_NAME/.cache

RUN echo "export PATH=$HOME/.pulumi:$HOME/.pulumi/bin:$GOPATH/bin:/usr/local/go/bin:$PATH" >> ~/.bashrc \
    && echo "alias l='ls -aF'" >> ~/.bash_aliases \
    && echo "alias ll='ls -ahlF'" >> ~/.bash_aliases \
    && echo "alias ls='ls --color=auto --group-directories-first'" >> ~/.bash_aliases