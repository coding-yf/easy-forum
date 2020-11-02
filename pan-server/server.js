const express = require("express");
const app = express();
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const fs = require("fs");
const path = require("path");

const identityKey = "skey";
let users = require("./users").items;

//通过name和password验证当前用户是否为合法用户
let findUser = function(username, password){
  return users.find(function(item){
    return item.username === username && item.password === password;
  })
}
//逐层遍历./files中的文件，返回的文件格式：{ type:"dir", fpath: "pan-yf/src", name: "src"}
let getFilesIndir = function(dir){
  let result = [];
  let type, fpath, name;
  let uid = 0;
  let files = fs.readdirSync(dir, "utf8");
  files.forEach(function(file){
    name = file;
    file = path.resolve(dir, file);
    let stats = fs.statSync(file);
    if(stats.isFile()){
      type = "file";
    }else if(stats.isDirectory()){
      type = "dir";
    }
    fpath = file.replace(/\\/g,"/");
    result.push({type, fpath, name, uid: uid++})
  })
  return result;
}

//设置静态资源目录
app.use(express.static(__dirname + "/build"))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({
  name: identityKey,
  secret: "yf123",            //对session id相关的cookie进行签名
  store: new FileStore(),     //本地存储session(文本文件，也可以选择其他store，比如redis的)
  saveUninitialized: false,   //是否自动保存未初始化的会话？建议为false
  resave: false,              //是否每次都重新保存会话？建议为false
  cookie: {
    maxAge: 86400 * 1000      //cookie有效期，单位是ms。此处为1天
  }
}))

app.post("/login", function(req, res, next){
  let user = findUser(req.body.username, req.body.password);
  if(user){
    req.session.regenerate(function(err){
      if(err){
        return res.json(500, {msg: "用户合法，但是登录过程中出现错误"})
      }
      req.session.loginUser = user.username;
      res.json(200, {username: user.username, msg: "登录成功"})
    })
  }else{
    res.json(403, {msg: "此用户无权限"});
  }
})

app.get("/autologin", function(req, res, next){
  //校验cookie
  let sess = req.session;
  let loginUser = sess.loginUser;
  let isLogined = !!loginUser;

  if(isLogined){
    res.json(200, {msg: "自动登录成功"})
  }else{
    res.json(401, {msg: "自动登录失败，请用户重新登录"})
  }
})

app.get("/logout", function(req, res, next){
  res.clearCookie(identityKey);
  res.json(200, {msg: "退出登录成功"})
})

app.get("/getFiles", function(req, res, next){
  console.log("前台访问了/getFiles接口")
  let files = getFilesIndir("./files");
  res.json(200, {msg: "获取文件列表成功", files: files});
})

const PORT = 7000;
app.listen(PORT, function(){
  console.log("server is start at：", PORT);
});

