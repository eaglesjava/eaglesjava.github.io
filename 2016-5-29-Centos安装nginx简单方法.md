
本文介绍了centos系统中安装nginx服务器软件的方法，有需要的朋友参考下。

为大家介绍在[centos](http://www.jbxue.com/os/centos/)中安装[nginx](http://www.jbxue.com/nginx/)的步骤：

(1)、安装依赖

依赖库直接使用[yum](http://www.jbxue.com/zt/yum/)安装

```
a)安装基本依赖工具
[root@localhost ~]# yum -y install gcc gcc-c++ automake autoconf libtool make
b)  安装prec
[root@localhost ~]# yum install pcre.x86_64 pcre-devel.x86_64
c)安装zlib
[root@localhost ~]# yum install zlib.x86_64 zlib-devel.x86_64
d)  安装openssl
[root@localhost ~]# yum install openssl.x86_64 openssl-devel.x86_64
```

(2)[编译安装](http://www.jbxue.com/zt/bianyianzhuang/)nginx
```
a)下载安装包
[root@localhost ~]# wget http://nginx.org/download/nginx-1.4.7.tar.gz
b)  解压
[root@localhost ~]# tar -xvf nginx-1.4.7.tar.gz
[root@localhost ~]# cd nginx-1.4.7
c)安装 i.  指定安装目录
[root@localhost ~]# ./configure --prefix=/usr/local/nginx/cache/
ii.     make & make install
[root@localhost ~]# make
[root@localhost ~]# make install
```
(3)配置和启动
```
a)配置文件 使用默认的配置文件在安装目录下：conf/nginx.conf，默认使用80端口，需要先使用netstat开一下80端口是否已经被占用
[root@localhost ~]# netstat –nltp | grep 80
b)  root启动nginx，
[root@localhost ~]# /usr/local/nginx/cache/sbin/nginx -c /usr/local/nginx/cache/conf/nginx.conf
```
(4)修改[防火墙](http://www.jbxue.com/zt/fanghuoqiang/)规则

Centos的防火墙默认是打开的，需要添加相应的规则打开80端口。

a)在另外一台机器上测试端口，发现80端口不通
```
[root@localhost ~]# telnet 10.237.92.30 80
Trying 10.237.92.30...
telnet: Unable to connect to remote host: No route to host
  b)  Centos的防火墙默认是打开的，查看本机防火墙配置
[root@localhost ~]# service iptables status
Table: filter
Chain INPUT (policy ACCEPT)
num  target     prot opt sourcedestination
1    ACCEPT     all  --  0.0.0.0/0   0.0.0.0/0  state RELATED,ESTABLISHED
2    ACCEPT     icmp --  0.0.0.0/0   0.0.0.0/0
3    ACCEPT     all  --  0.0.0.0/0   0.0.0.0/0
4    ACCEPT     tcp  --  0.0.0.0/0   0.0.0.0/0  state NEW tcp dpt:22
5    REJECT     all  --  0.0.0.0/0   0.0.0.0/0  reject-with icmp-host-prohibited

Chain FORWARD (policy ACCEPT)
num  target     prot opt sourcedestination
1    REJECT     all  --  0.0.0.0/0   0.0.0.0/0  reject-with icmp-host-prohibited

Chain OUTPUT (policy ACCEPT)

num  target     prot opt sourcedestination
```
c)打开80端口
```
[root@localhost ~]# iptables -I INPUT -p tcp --dport 80 -j ACCEPT
查看端口会发现端口通了
guojun1@guojun1-OptiPlex-9020:~$ telnet 10.237.92.30 80 Trying 10.237.92.30...
Connected to 10.237.92.30.
Escape character is '^]'.
^]
```
d)  修改iptables配置文件

使用iptables命令增加的规则在重启之后就失效了，要想规则在重启之后任然有效，需要修改iptables配置文件/etc/sysconfig/iptables，增加下面的行，
```
-A INPUT -m state --state NEW -m tcp -p tcp --dport 80 -j ACCEPT
```




















