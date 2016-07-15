
nginx是目前linux系统中一个非常不错的web环境了在负载方面远超过了apache哦，下面我们来介绍一下在centos中安装Nginx环境的方法。

一、安装前准备

1、获取系统信息

```
cat /etc/redhat-release
```
输出结果:

```
[root@10-19-136-201 /]# cat /etc/redhat-release
CentOS release 6.5 (Final)
```

查看当前系统是多少位:

```
uname -p
```

输出结果:

```
[root@10-19-136-201 /]# uname -p
x86_64
```

2、安装基础包
```
    yum install gcc
    yum install wget
```

二、安装Nginx模块基础库

1、安装HTTP rewrite[（伪静态）](http://www.111cn.net/tags.php/%CE%B1%BE%B2%CC%AC/)模块需要的PCRE库。

```
    yum install pcre-devel
```

2、安装HTTP gzip （压缩）模块需要的zlib库。

```
 yum install zlib-devel
```

三、下载源码包

从Nginx官网下载源码包。

```
# cd /usr/local/src
# wget http://nginx.org/download/nginx-1.4.7.tar.gz
# tar zxvf nginx-1.4.7.tar.gz
```

四、编译安装Nginx

```
# cd nginx-1.4.7
# ./configure --prefix=/usr/local/nginx
# make
# make install
```

五、启动Nginx
```
# /usr/local/nginx/sbin/nginx
```

停止Nginx命令：

```
# /usr/local/nginx/sbin/nginx -s quit
```

重启Nginx命令:

```
# /usr/local/nginx/sbin/nginx -s reload
```

六、进入源目录，进行配置：
 代码如下	复制代码
 ```
./configure 
--prefix=/opt/nginx 
--sbin-path=/opt/nginx/sbin/nginx 
--conf-path=/opt/nginx/conf/nginx.conf  
--error-log-path=/opt/nginx/logs/error.log 
--http-log-path=/opt/nginx/logs/access.log 
--http-client-body-temp-path=/opt/nginx/body 
--http-proxy-temp-path=/opt/nginx/proxy  
--http-fastcgi-temp-path=/opt/nginx/fastcig   
--http-uwsgi-temp-path=/opt/nginx/uwsgi   
--http-scgi-temp-path=/opt/nginx/scgi   
--pid-path=/opt/nginx/logs/nginx.pid   
--lock-path=/opt/nginx/lock/nginx.lock   
--user=nobody  
--group=nobody  
--with-http_ssl_module  
--with-http_realip_module  
--with-http_flv_module  
--with-http_mp4_module   
--with-rtsig_module   
--with-file-aio   
--with-ipv6   
--with-http_addition_module   
--with-http_xslt_module    
--with-http_image_filter_module  
--with-http_geoip_module  
--with-http_sub_module  
--with-http_dav_module  
--with-http_gunzip_module  
--with-http_gzip_static_module  
--with-http_random_index_module  
--with-http_secure_link_module  
--with-http_degradation_module  
--with-http_stub_status_module  
--with-debug
```

七、可参考：Nginx编译参数解析

```
–prefix #nginx安装目录，默认在/usr/local/nginx
–pid-path #pid问件位置，默认在logs目录
–lock-path #lock问件位置，www.111cn.net默认在logs目录
–with-http_ssl_module #开启HTTP SSL模块，以支持HTTPS请求。
–with-http_dav_module #开启WebDAV扩展动作模块，可为文件和目录指定权限
–with-http_flv_module #支持对FLV文件的拖动播放
–with-http_realip_module #支持显示真实来源IP地址
–with-http_gzip_static_module #预压缩文件传前检查，防止文件被重复压缩
–with-http_stub_status_module #取得一些nginx的运行状态
–with-mail #允许POP3/IMAP4/SMTP代理模块
–with-mail_ssl_module #允许POP3／IMAP／SMTP可以使用SSL／TLS
–with-pcre=../pcre-8.11 #注意是未安装的pcre路径
–with-zlib=../zlib-1.2.5 #注意是未安装的zlib路径
–with-debug #允许调试日志
–http-client-body-temp-path #客户端请求临时文件路径
–http-proxy-temp-path #设置http proxy临时文件路径
–http-fastcgi-temp-path #设置http fastcgi临时文件路径
–http-uwsgi-temp-path=/var/tmp/nginx/uwsgi #设置uwsgi 临时文件路径
–http-scgi-temp-path=/var/tmp/nginx/scgi #设置scgi 临时文件路径
```

