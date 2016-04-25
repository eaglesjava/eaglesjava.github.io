
使用HomeBrew安装

[参考官方文档](https://docs.mongodb.org/manual/tutorial/install-mongodb-on-os-x/)

更新Homebrew的package数据库，在Mac的终端中输入：

```javascript
    $ brew update
```
然后耐心等待，这个没有任何显示，估计要几分钟，取决于网络的速度。然后就列出了一大堆东西，就可以进行后续步骤了。

开始安装MongoDb

```javascript
    $ brew install mongodb
```
然后继续等待MongoDb下载完成。这个比较贴心了，有下载进度百分比。

```javascript
    scottdeAir:~ scott$ brew install mongodb
    ==> Installing dependencies for mongodb: openssl
    ==> Installing mongodb dependency: openssl
    ==> Downloading https://homebrew.bintray.com/bottles/openssl-1.0.2g.el_capitan.b
    ######################################################################## 100.0%
    ==> Pouring openssl-1.0.2g.el_capitan.bottle.tar.gz
    ==> Caveats
    A CA file has been bootstrapped using certificates from the system
    keychain. To add additional certificates, place .pem files in
      /usr/local/etc/openssl/certs

    and run
      /usr/local/opt/openssl/bin/c_rehash

    This formula is keg-only, which means it was not symlinked into /usr/local.

    Apple has deprecated use of OpenSSL in favor of its own TLS and crypto libraries

    Generally there are no consequences of this for you. If you build your
    own software and it requires this formula, you'll need to add to your
    build variables:

        LDFLAGS:  -L/usr/local/opt/openssl/lib
        CPPFLAGS: -I/usr/local/opt/openssl/include

    ==> Summary
      /usr/local/Cellar/openssl/1.0.2g: 1,678 files, 12.0M
    ==> Installing mongodb
    ==> Downloading https://homebrew.bintray.com/bottles/mongodb-3.2.5.el_capitan.bo
    ######################################################################## 100.0%
    ==> Pouring mongodb-3.2.5.el_capitan.bottle.tar.gz
    ==> Caveats
    To have launchd start mongodb now and restart at login:
      brew services start mongodb
    Or, if you don't want/need a background service you can just run:
      mongod --config /usr/local/etc/mongod.conf
    ==> Summary
      /usr/local/Cellar/mongodb/3.2.5: 17 files, 263.7M
```
启动MongoDb

上面最后提示的直接启动MongoDb的方法:
```javascript
    mongod —config /usr/local/etc/mongod.conf
```
连接到MongoDb,可以用命令行工具mongo连接：
```javascript
    先执行: scottdeAir:~ scott$ mongod --config /usr/local/etc/mongod.conf
```
```javascript
    再执行:
    scottdeMacBook-Air:~ scott$ mongo
    MongoDB shell version: 3.2.5
    connecting to: test
    Welcome to the MongoDB shell.
    For interactive help, type "help".
    For more comprehensive documentation, see
    	http://docs.mongodb.org/
    Questions? Try the support group
    	http://groups.google.com/group/mongodb-user
    Server has startup warnings:
    2016-04-26T00:17:20.183+0800 I CONTROL  [initandlisten]
    2016-04-26T00:17:20.183+0800 I CONTROL  [initandlisten] ** WARNING: Access control is not enabled for the database.
    2016-04-26T00:17:20.183+0800 I CONTROL  [initandlisten] **          Read and write access to data and configuration is unrestricted.
    2016-04-26T00:17:20.183+0800 I CONTROL  [initandlisten]
    2016-04-26T00:17:20.183+0800 I CONTROL  [initandlisten]
    2016-04-26T00:17:20.183+0800 I CONTROL  [initandlisten] ** WARNING: soft rlimits too low. Number of files is 256, should be at least 1000
    >
```
还可以找个可视化的工具。

[MongoDb的可视化管理工具有很多](https://docs.mongodb.org/ecosystem/tools/administration-interfaces/)

个人觉得[Robomongo](http://www.robomongo.org/download)很不错，是跨平台的，Windows，Mac, Linux下都可以使用。

![mahua](http://eaglesjava.github.io/blog-img/1.png)

其实，MongoDb的用法大多数还都是编程使用，比如和nodeJs结合使用。



