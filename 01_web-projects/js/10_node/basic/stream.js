var fs = require("fs");

// 打开一个文件读取流
var rs = fs.createReadStream("sample.txt", "utf-8");

// data事件可能会有多次，每次传递的chunk都是流的一部分数据
rs.on("data", function (chunk) {
    console.log("DATA");
    console.log(chunk);
});

rs.on("end", function () {
    console.log("END");
});

rs.on("error", function (err) {
    console.log("ERROR" + err);
});

// 文件写入流
var ws1 = fs.createWriteStream("output.txt", "utf-8");
ws1.write("使用Stream写入文本数据");
ws1.write("END");
ws1.end();
// 二进制文件写入流
var ws2 = fs.createWriteStream("output.txt");
ws2.write(Buffer.from("使用Stream写入二进制数据", "utf-8"));
ws2.write(Buffer.from("END", "utf-8"));
ws2.end();

// 管道,将两个流串起来，实际上就实现了一个复制文件的操作
var rs = fs.createReadStream("sample.txt");
var ws = fs.createWriteStream("copy.txt");
rs.pipe(ws);
