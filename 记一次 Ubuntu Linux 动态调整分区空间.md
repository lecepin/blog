## 1. 背景
用了一段时间后，发现 Ubuntu 空间太小了不够用了。于是扩容了硬盘大小，同时需要对分区进行调整来进行扩容。

系统采用的 LVM(Logical Volume Manager)的方式进行管理的。

## 2. 处理

这里分两种情况进行处理：

 1. LV(Logical Volume) 没有用尽 VG(Volume Group)。
 2. VG(Volume Group) 没有用尽 PV(Physical Volume)，或者 PV(Physical Volume) 没有关联物理分区。

### 2.1 LV 使用全部 VG
可以看到 `/` 由 `/dev/mapper/ubuntu--vg-ubuntu--lv` 挂载：

```bash
$ df -hl
Filesystem                         Size  Used Avail Use% Mounted on
tmpfs                              196M  1.4M  195M   1% /run
/dev/mapper/ubuntu--vg-ubuntu--lv  9.8G  7.5G  1.8G  81% /
tmpfs                              980M   16K  980M   1% /dev/shm
tmpfs                              5.0M     0  5.0M   0% /run/lock
/dev/sda2                          1.8G  127M  1.5G   8% /boot
tmpfs                              196M  4.0K  196M   1% /run/user/1000
```
`ubuntu--vg-ubuntu--lv` 使用的是 `sda3` 分区，而 `sda3` 总共 18.2G，`ubuntu--vg-ubuntu--lv` 只用了 10G:


```bash
$ sudo lsblk
NAME                      MAJ:MIN RM  SIZE RO TYPE MOUNTPOINTS
fd0                         2:0    1    4K  0 disk 
loop0                       7:0    0 79.9M  1 loop /snap/lxd/22923
loop1                       7:1    0   62M  1 loop /snap/core20/1587
loop2                       7:2    0   47M  1 loop /snap/snapd/16292
sda                         8:0    0   50G  0 disk 
├─sda1                      8:1    0    1M  0 part 
├─sda2                      8:2    0  1.8G  0 part /boot
└─sda3                      8:3    0 18.2G  0 part 
  └─ubuntu--vg-ubuntu--lv 253:0    0   10G  0 lvm  /
```

```bash
# VG ubuntu-vg 剩余 8.22G
$ sudo vgdisplay -A
--- Volume group ---
VG Name               ubuntu-vg
System ID             
Format                lvm2
Metadata Areas        1
Metadata Sequence No  2
VG Access             read/write
VG Status             resizable
MAX LV                0
Cur LV                1
Open LV               1
Max PV                0
Cur PV                1
Act PV                1
VG Size               18.22 GiB
PE Size               4.00 MiB
Total PE              4665
Alloc PE / Size       2560 / 10.00 GiB
Free  PE / Size       2105 / 8.22 GiB
VG UUID               gHs11o-PLvl-3cw4-SIax-mcw6-7RCx-D4BEpo
```

两条命令调整 LV 占用 VG 的全部空间：

```bash
$ sudo lvextend -l +100%FREE /dev/ubuntu-vg/ubuntu-lv
$ sudo resize2fs /dev/ubuntu-vg/ubuntu-lv
```

结果，扩容成功：

```bash
$ sudo lsblk
NAME                      MAJ:MIN RM  SIZE RO TYPE MOUNTPOINTS
fd0                         2:0    1    4K  0 disk 
loop0                       7:0    0 79.9M  1 loop /snap/lxd/22923
loop1                       7:1    0   62M  1 loop /snap/core20/1587
loop2                       7:2    0   47M  1 loop /snap/snapd/16292
sda                         8:0    0   50G  0 disk 
├─sda1                      8:1    0    1M  0 part 
├─sda2                      8:2    0  1.8G  0 part /boot
└─sda3                      8:3    0 18.2G  0 part 
  └─ubuntu--vg-ubuntu--lv 253:0    0 18.2G  0 lvm  /
```

### 2.2 VG 关联物理分区进行扩容
这里以不损坏数据为前提，所以就不对原分区 `/dev/sda3`进行调整了。而是采用将磁盘可用空间创建一个新的 `/dev/sda4` 分区，然后去关联 VG，毕竟 LVM 非常灵活。

下面对新增加的 30GB 进行处理。

创建分区 sda4，将设置为 lvm 类型：

```bash
$ sudo fdisk /dev/sda
==> Command (m for help): p

Disk /dev/sda: 50 GiB, 53687091200 bytes, 104857600 sectors
Disk model: VMware Virtual S
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disklabel type: gpt
Disk identifier: 3A0A0460-1FC2-46FF-A278-3299E8F2B745

Device       Start      End  Sectors  Size Type
/dev/sda1     2048     4095     2048    1M BIOS boot
/dev/sda2     4096  3719167  3715072  1.8G Linux filesystem
/dev/sda3  3719168 41940991 38221824 18.2G Linux filesystem

===> Command (m for help): n
Partition number (4-128, default 4): 
First sector (41940992-104857566, default 41940992): 
Last sector, +/-sectors or +/-size{K,M,G,T,P} (41940992-104857566, default 104857566): 

Created a new partition 4 of type 'Linux filesystem' and of size 30 GiB.

===> Command (m for help): p
Disk /dev/sda: 50 GiB, 53687091200 bytes, 104857600 sectors
Disk model: VMware Virtual S
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disklabel type: gpt
Disk identifier: 3A0A0460-1FC2-46FF-A278-3299E8F2B745

Device        Start       End  Sectors  Size Type
/dev/sda1      2048      4095     2048    1M BIOS boot
/dev/sda2      4096   3719167  3715072  1.8G Linux filesystem
/dev/sda3   3719168  41940991 38221824 18.2G Linux filesystem
/dev/sda4  41940992 104857566 62916575   30G Linux filesystem

===> Command (m for help): t
===> Partition number (1-4, default 4): 
===> Partition type or alias (type L to list all): lvm

Changed type of partition 'Linux filesystem' to 'Linux LVM'.

===> Command (m for help): p
Disk /dev/sda: 50 GiB, 53687091200 bytes, 104857600 sectors
Disk model: VMware Virtual S
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disklabel type: gpt
Disk identifier: 3A0A0460-1FC2-46FF-A278-3299E8F2B745

Device        Start       End  Sectors  Size Type
/dev/sda1      2048      4095     2048    1M BIOS boot
/dev/sda2      4096   3719167  3715072  1.8G Linux filesystem
/dev/sda3   3719168  41940991 38221824 18.2G Linux filesystem
/dev/sda4  41940992 104857566 62916575   30G Linux LVM

===> Command (m for help): w
The partition table has been altered.
Syncing disks.
```

可以看到 sda4 创建成功，并使用所有可用空间：

```bash
$ sudo lsblk
NAME                      MAJ:MIN RM  SIZE RO TYPE MOUNTPOINTS
fd0                         2:0    1    4K  0 disk 
loop0                       7:0    0 79.9M  1 loop /snap/lxd/22923
loop1                       7:1    0   62M  1 loop /snap/core20/1587
loop2                       7:2    0   47M  1 loop /snap/snapd/16292
sda                         8:0    0   50G  0 disk 
├─sda1                      8:1    0    1M  0 part 
├─sda2                      8:2    0  1.8G  0 part /boot
├─sda3                      8:3    0 18.2G  0 part 
│ └─ubuntu--vg-ubuntu--lv 253:0    0 18.2G  0 lvm  /
└─sda4                      8:4    0   30G  0 part 
```

将 `sda4`创建成 PV(Physical Volume)：

```bash
$ sudo pvcreate /dev/sda4
  Physical volume "/dev/sda4" successfully created.

$ sudo pvdisplay
  --- Physical volume ---
  PV Name               /dev/sda3
  VG Name               ubuntu-vg
  PV Size               <18.23 GiB / not usable 3.00 MiB
  Allocatable           yes (but full)
  PE Size               4.00 MiB
  Total PE              4665
  Free PE               0
  Allocated PE          4665
  PV UUID               vO0lgC-X0bG-nUat-kevg-FONv-OpNh-qwY5zF
   
  "/dev/sda4" is a new physical volume of "30.00 GiB"
  --- NEW Physical volume ---
  PV Name               /dev/sda4
  VG Name               
  PV Size               30.00 GiB
  Allocatable           NO
  PE Size               0   
  Total PE              0
  Free PE               0
  Allocated PE          0
  PV UUID               A87gcC-J2mc-3jPD-4emh-8Ute-VQ52-Ceg7zu
```

将 `sda4`扩容到当前的 VG：

```bash
# 查看当前 VG
$ sudo vgdisplay
  --- Volume group ---
  VG Name               ubuntu-vg
  System ID             
  Format                lvm2
  Metadata Areas        1
  Metadata Sequence No  3
  VG Access             read/write
  VG Status             resizable
  MAX LV                0
  Cur LV                1
  Open LV               1
  Max PV                0
  Cur PV                1
  Act PV                1
  VG Size               18.22 GiB
  PE Size               4.00 MiB
  Total PE              4665
  Alloc PE / Size       4665 / 18.22 GiB
  Free  PE / Size       0 / 0   
  VG UUID               gHs11o-PLvl-3cw4-SIax-mcw6-7RCx-D4BEpo

# 将 PV 添加到 VG
$ sudo vgextend ubuntu-vg /dev/sda4

# 扩展成功
$ sudo vgdisplay
  --- Volume group ---
  VG Name               ubuntu-vg
  System ID             
  Format                lvm2
  Metadata Areas        2
  Metadata Sequence No  4
  VG Access             read/write
  VG Status             resizable
  MAX LV                0
  Cur LV                1
  Open LV               1
  Max PV                0
  Cur PV                2
  Act PV                2
  VG Size               <48.22 GiB
  PE Size               4.00 MiB
  Total PE              12344
  Alloc PE / Size       4665 / 18.22 GiB
  Free  PE / Size       7679 / <30.00 GiB
  VG UUID               gHs11o-PLvl-3cw4-SIax-mcw6-7RCx-D4BEpo
```

接下来就同 2.1 的操作了：

```bash
$ sudo lvextend -l +100%FREE /dev/ubuntu-vg/ubuntu-lv
$ sudo resize2fs /dev/ubuntu-vg/ubuntu-lv

$ sudo lsblk
NAME                      MAJ:MIN RM  SIZE RO TYPE MOUNTPOINTS
fd0                         2:0    1    4K  0 disk 
loop0                       7:0    0 79.9M  1 loop /snap/lxd/22923
loop1                       7:1    0   62M  1 loop /snap/core20/1587
loop2                       7:2    0   47M  1 loop /snap/snapd/16292
sda                         8:0    0   50G  0 disk 
├─sda1                      8:1    0    1M  0 part 
├─sda2                      8:2    0  1.8G  0 part /boot
├─sda3                      8:3    0 18.2G  0 part 
│ └─ubuntu--vg-ubuntu--lv 253:0    0 48.2G  0 lvm  /
└─sda4                      8:4    0   30G  0 part 
  └─ubuntu--vg-ubuntu--lv 253:0    0 48.2G  0 lvm  /
```
