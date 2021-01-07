功能

- [x] windows打包
  * [x] X64
  * [x] 绿色版
- [x] Debug 模式
- [x] 自动更新 @wq
- [x] http
- [ ] print.html版本 and 通信
- [x] 打印 @wq

todo
- [ ] 解析串口用 serialport parsers
  * [x] 无限量
  * [ ] 制衡。不用管

# 开发

`ELECTRON_MIRROR="https://npm.taobao.org/mirrors/electron/" yarn`

- serialport v9.0.4 rebuild ia32 的时候会报找不到资源，

```
http 404 https://github.com/serialport/node-serialport/releases/download/@serialport/bindings@9.0.4/bindings-v9.0.1-electron-v82-win32-ia32.tar.gz
```

原因是 9.0.4 不再支持 arch ia32，因为 9.0.0 以上版本的 serialport 安装的时候 @serialport/bindings 仍然会安装最新的 v9 版本，所以必须把 serialport 降级到 v9 以下才能编译 ia32，但是 serialport 8.0.8 版本支持的 chromium 版本为 v75，所以还需要把 electron 版本降低到 v75 内核的版本，这里可以查看 [node-serialport Release 版本](https://github.com/serialport/node-serialport/releases)，相关 [issues](https://github.com/serialport/node-serialport/issues?q=is:issue+is:closed+ia32)。