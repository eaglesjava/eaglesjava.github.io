
1. 在Terminal中运行ls出现以下错误:
```
ls -bash: ls: command not found
```

2. 原因:在设置环境变量时，编辑profile文件没有写正确，导致在命令行下 ls等命令不能够识别

3. 解决方法:
```
export PATH=/usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin:/root/bin
```

