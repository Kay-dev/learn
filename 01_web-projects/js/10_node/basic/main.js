var greet = require("./hello");

var fs = require("fs");
// 当正常读取时，err参数为null，data为读取到的string。
// 当发生过错误时，err代表一个错误对象，data为undefined
fs.readFile("sample.txt", "utf-8", function (err, data) {
  if (err) {
    console.log(err);
  } else {
    console.log(data);
  }
});

// 读取二进制文件，如图片时，则不需要传文件编码，回调函数的data将返回一个Buffer对象，
// 在Node.js中，Buffer对象就是一个包含任意个字节的数组，但和Array不同，Buffer可以和String相互转换
fs.readFile("sample.jfif", function (err, data) {
  if (err) {
    console.log(err);
  } else {
    console.log(data);
    console.log(data.length + "bytes");
  }
});

// 写文件
var data = "Hello,Node.js";
fs.writeFile("output.txt", data, function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log("ok");
  }
});

// 获取文件信息
fs.stat("sample.txt", function (err, stat) {
  if (err) {
    console.log(err);
  } else {
    console.log("isFile:" + stat.isFile());
    console.log("isDictionary:" + stat.isDirectory());
    if (stat.isFile()) {
      console.log("size:" + stat.size);
      console.log("birth time:" + stat.birthtime);
      console.log("modified time:" + stat.mtime);
    }
  }
});
