---
slug: Docker-ML-ENV-SETUP
title: "Docker機器學習環境搭建"
authors: [w0x7ce]
tags: [misc,Linux,"Linux","Docker","軟件","機器學習"]
---

## Way 1 simple use ufoym/deepo

 [https://github.com/ufoym/deepo](https://github.com/ufoym/deepo)
 [https://hub.docker.com/r/ufoym/deepo](https://hub.docker.com/r/ufoym/deepo)

### Configure Docker

#### Step 1 Uninstall old version

```bash
 sudo apt-get remove docker docker-engine docker.io containerd runc
```

#### Step 2 Install latest docker

```bash
 sudo apt-get update
 sudo apt-get install \
    ca-certificates \
    curl \
    gnupg \
    lsb-release
```

```bash
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
```

```bash
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

```bash
 sudo apt-get update
 sudo apt-get install docker-ce docker-ce-cli containerd.io
```

#### Step 3 Install nvidia-docker

1. Setting up NVIDIA Container Toolkit

    ```bash
    distribution=$(. /etc/os-release;echo $ID$VERSION_ID) \
    && curl -s -L https://nvidia.github.io/nvidia-docker/gpgkey | sudo apt-key add - \
    && curl -s -L https://nvidia.github.io/nvidia-docker/$distribution/nvidia-docker.list | sudo tee /etc/apt/sources.list.d/nvidia-docker.list
    ```

2. To get access to experimental features such as CUDA on WSL or the new MIG capability on A100

    ```bash
    curl -s -L https://nvidia.github.io/nvidia-container-runtime/experimental/$distribution/nvidia-container-runtime.list | sudo tee /etc/apt/sources.list.d/nvidia-container-runtime.list
    ```

3. Install the nvidia-docker2

    ```bash
    sudo apt update
    sudo apt-get install -y nvidia-docker2
    ```

4. Final restart

    ```bash
    sudo systemctl restart docker
    ```

#### Step 4 Select the verion depends on ur ENV

```bash
    nvidia-smi #view the cuda version if it's cuda10.2
    docker pull ufoym/deepo:pytorch-cu102
    nvidia-docker  run --name w0x7ce -p 7789:22 -p 7791:7790 -it -v /storage:/data ufoym/deepo:pytorch-cu102
```

NOW it will work well !

#### USE note

```bash
docker start [tag]
docker attach [tag]
ctrl +p + q ## exit without stop the container
docker ps -a
```

### Misc

中国内地使用可以配置镜像，以便加速下载

- 请首先查看是否在 docker.service 文件中配置过镜像地址。

    ```bash
    $ systemctl cat docker | grep '\-\-registry\-mirror'
    ```

- 如果该命令有输出，那么请执行 $ systemctl cat docker 查看 ExecStart= 出现的位置，修改对应的文件内容去掉 --registry-mirror 参数及其值，并按接下来的步骤进行配置。

- 如果以上命令没有任何输出，那么就可以在 /etc/docker/daemon.json 中写入如下内容（如果文件不存在请新建该文件）

```bash
{
  "registry-mirrors": [
    "https://hub-mirror.c.163.com",
    "https://mirror.baidubce.com"
  ]
}
```

[ci可用测试](https://github.com/docker-practice/docker-registry-cn-mirror-test/actions)