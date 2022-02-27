# 1. 前言

最近整理房间的时候，发现在一块大约在 2014 年购买的树莓派，看了下电路板，型号是 b+，看了下官网的参数：

- CPU: ARM1176JZF-S 核心 700MHz 单核
- RAM: 512MB

![](https://img-blog.csdnimg.cn/72b6e39a22e14eeca7a89036ea4274a7.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA546L5LmQ5bmz,size_20,color_FFFFFF,t_70,g_se,x_16)


确实有点太弱了。

最近刚好想做一个家用的文件 Server。看了下树莓派官网的系统，发现还是支持 b+ 的，刚好使用。

# 2. 前置准备
有了 b+ 板子了，还需要：

- microSD 卡：翻出了多年前的 8GB 的，刚好使用
- 电源：5V 2A+（重要）
- 电源线：一定能跑 2A+ 电流的优质线（重要） 

> 电源和电源线都要保证 2A+，缺一不可，电源线的质量会限制电源的电流大小，直接导致板子供电不足。
> 对于 USB 外设，可以采用带有供电功能的 USB Hub。

# 3. 系统准备
首先开始安装系统。

### 3.1. 烧录软件 Win32 Disk Imager
![在这里插入图片描述](https://img-blog.csdnimg.cn/809d7863563f4baeaac733c474dd187d.png)

Windows 平台用于将系统镜像烧录到 SD 卡中的工具。
下载地址：[https://sourceforge.net/projects/win32diskimager/](https://sourceforge.net/projects/win32diskimager/)

### 3.2. 系统镜像下载
官方地址：[https://www.raspberrypi.com/software/operating-systems/](https://www.raspberrypi.com/software/operating-systems/)

根据适合自己硬件配置的操作系统去下载就可以。左侧会显示可安装的硬件版本：
![在这里插入图片描述](https://img-blog.csdnimg.cn/2d27550cdcc54b46ae7d53c1d909bb07.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA546L5LmQ5bmz,size_20,color_FFFFFF,t_70,g_se,x_16)
针对 Raspberry Pi OS 有三个版本：
- Raspberry Pi OS with desktop （推荐）
- Raspberry Pi OS with desktop and recommended software
- Raspberry Pi OS Lite

推荐 `Raspberry Pi OS with desktop` 版本（硬件支持，推荐使用 64 位的）。由于我这台机子过于老旧，虽然也可以安装这个桌面版，但毕竟硬件资源紧张，所以选择了 `Lite` 版。

如果从官网下载太慢，可以使用清华大学的镜像站 TUNA，国内速度很快：[https://mirrors.tuna.tsinghua.edu.cn/raspberry-pi-os-images/](https://mirrors.tuna.tsinghua.edu.cn/raspberry-pi-os-images/)。

下载目录如下：
- `raspios_arm64/`：64 位桌面版
- `raspios_armhf/`：32 位桌面版
- `raspios_full_arm64/`：64 位完整桌面版
- `raspios_full_armhf/`：32 位完整桌面版
- `raspios_lite_arm64/`：64 位 Lite 版
- `raspios_lite_armhf/`：32 位 Lite 版

如，我使用的是 32 位 Lite 版，所以完成在 TUNA 的下载地址就是：[https://mirrors.tuna.tsinghua.edu.cn/raspberry-pi-os-images/raspios_lite_armhf/images/raspios_lite_armhf-2022-01-28/2022-01-28-raspios-bullseye-armhf-lite.zip](https://mirrors.tuna.tsinghua.edu.cn/raspberry-pi-os-images/raspios_lite_armhf/images/raspios_lite_armhf-2022-01-28/2022-01-28-raspios-bullseye-armhf-lite.zip)


### 3.3. 烧录镜像
将刚下载的系统镜像解压。
![在这里插入图片描述](https://img-blog.csdnimg.cn/962e17399b53494aac7444dc3a8103ac.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA546L5LmQ5bmz,size_19,color_FFFFFF,t_70,g_se,x_16#pic_center)

打开 Win32 Disk Imager，选择 镜像 和 SD 卡后，进行写入即可。



烧录完成后，把 SD 卡插入 树莓派 中即可。

# 4. 环境配置

给 树莓派 插上电源线、网线，接上显示器，就可以开始了。

- 默认用用户名：pi
- 密码：raspberry

![在这里插入图片描述](https://img-blog.csdnimg.cn/c3a3fa0b9e1240e59cdd28e1f71fdc26.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA546L5LmQ5bmz,size_20,color_FFFFFF,t_70,g_se,x_16)


### 4.1. 开启 ssh
登录系统后，执行：`sudo raspi-config` 进行配置，如下配置：

 1. Interface Options
 2. SSH
 
 ![在这里插入图片描述](https://img-blog.csdnimg.cn/30826a979eb54ea697943a15f6eceb1e.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA546L5LmQ5bmz,size_20,color_FFFFFF,t_70,g_se,x_16)

 
 进行开启。

然后就可以通过 `ssh pi@ip` 进行登录了。

### 4.2. 配置 apt 国内源
修改 `/etc/apt/sources.list`，配置为清华大学的源：

```
deb http://mirrors.tuna.tsinghua.edu.cn/raspbian/raspbian/ bullseye main non-free contrib rpi
```

保留这一条就可以。

执行 `sudo apt-get update` 更新软解列表。

### 4.3. 安装 php
因为要做一个 php 的 server，所以这里直接使用了 php。

执行：

```bash
sudo apt install php
```

安装完成后，在浏览器打开 `http://ip` 就可以看到 apache 的 server 可用了。

![在这里插入图片描述](https://img-blog.csdnimg.cn/26aa04f9a8a44bc0b8be4f7bbf33b93a.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA546L5LmQ5bmz,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)


### 4.4. 安装 node（可选）
这个步骤可选，如果你需要 node 就安装，不需要可以略过。

执行：

```bash
sudo apt install npm
```

安装 http-server：

```bash
 sudo npm --registry=https://registry.npmmirror.com -g i http-server
```

# 5. 安装 dashboard

下面都是基于 PHP 的。

### 5.1. 探针
可以使用 x-prober 的探针。

在 `/var/www/html` 目录下进行下载：

```bash
sudo wget https://api.inn-studio.com/download?id=xprober -O x.php
```

访问 `http://ip/x.php` 即可：


![在这里插入图片描述](https://img-blog.csdnimg.cn/dcb5833354f14c98bf58e394370e7e20.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA546L5LmQ5bmz,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)


### 5.2. 文件管理

这里使用的是 tinyfilemanager，在 `/var/www/html` 目录下进行下载：

```bash
sudo wget https://github.com/prasathmani/tinyfilemanager/archive/refs/tags/2.4.3.zip -O tf.zip

# OR 下载慢，可以使用 
sudo wget https://github.91chi.fun//https://github.com//prasathmani/tinyfilemanager/archive/refs/tags/2.4.3.zip -O tf.zip

sudo unzip tf.zip
sudo mv tinyfilemanager-2.4.3 tf
```

浏览器访问：`http://ip/tf/tinyfilemanager.php`，默认用户/密码： admin/admin@123 ：

![在这里插入图片描述](https://img-blog.csdnimg.cn/855a841cab964808af0dd572bddb8327.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA546L5LmQ5bmz,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)


这里要给目录加下权限，否则无法修改，这里直接简单粗暴设置一下：

```bash
sudo chmod a+rw -R /var/www/html
```

### 5.3 大文件分片上传
可以参考这个仓库：[https://github.com/lecepin/multi-file-upload](https://github.com/lecepin/multi-file-upload)



# 6. 挂载移动硬盘

将移动硬盘插入 树莓派上，执行命令看下能否识别出来：

```bash
$ sudo fdisk -l | grep sda
Disk /dev/sda: 465.76 GiB, 500107862016 bytes, 976773168 sectors
/dev/sda1        2048 976769023 976766976 465.8G  7 HPFS/NTFS/exFAT
```

将硬盘挂载到 `/mnt` 中：

```bash
sudo mount /dev/sda1 /mnt
```

可以看到，已经挂载成功了：

```bash
$ sudo df -h
Filesystem      Size  Used Avail Use% Mounted on
/dev/root       7.1G  1.8G  5.0G  26% /
devtmpfs         87M     0   87M   0% /dev
tmpfs           215M     0  215M   0% /dev/shm
tmpfs            86M  648K   86M   1% /run
tmpfs           5.0M  4.0K  5.0M   1% /run/lock
/dev/mmcblk0p1  253M   49M  204M  20% /boot
tmpfs            43M     0   43M   0% /run/user/1000
/dev/sda1       466G   75G  392G  17% /mnt
```

在 apache server 下建立一个软连接：

```bash
$ sudo ln -s /mnt /var/www/html/mnt
```

然后就可以直接访问了。
