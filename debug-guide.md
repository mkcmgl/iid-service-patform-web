在 `node_modules/@vitejs/plugin-vue/dist/index.cjs` 中找到 transformMain 函数。这个函数负责处理 .vue 文件。

在 `createDescriptor` 调用之前添加一个日志语句来打印正在处理的文件路径。

```js
console.log('processing file: ', filename);
```
