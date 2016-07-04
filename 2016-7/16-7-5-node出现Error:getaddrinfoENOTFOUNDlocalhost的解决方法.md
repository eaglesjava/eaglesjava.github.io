1. 运行npm start出现以下错误
```
events.js:154
      throw er; // Unhandled 'error' event
      ^

Error: getaddrinfo ENOTFOUND localhost
    at errnoException (dns.js:26:10)
    at GetAddrInfoReqWrap.onlookup [as oncomplete] (dns.js:77:26)
```

2. 原因:hosts中缺少localhost,添加以下信息
```
127.0.0.1  localhost
```
