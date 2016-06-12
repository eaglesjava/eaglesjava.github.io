

1. 运行显示以下信息:

```
Error running childhp: Cannot run program "/Users/scott/local/tomcat/apache-tomcat-8.0.26/bin/catalina.sh"
(in directory "/Users/scott/local/tomcat/apache-tomcat-8.0.26/bin"): error=13, Permission denied
```

2. 提示的主要问题是权限不足


3. 解决办法


打开终端，进入tomcat\bin目录，然后执行

```
chmod 777 *.sh
```

问题解决了。

