const KoaRouter = require("koa-router");

const reigsterRouter = new KoaRouter();
const registerService = require("../service/register.service");
const data = [
  {
    id: 1,
    name: "111",
    parent: null,
    icon: "555,,",
  },
  {
    id: 2,
    name: "极地测试菜单2",
    parent: 1,
    icon: "/img/002.png",
  },
  {
    id: 4,
    name: "555",
    parent: 2,
    icon: "88",
  },
  {
    id: 5,
    name: "ddd",
    parent: 2,
    icon: "555.png",
  },
  {
    id: 6,
    name: "666",
    parent: 4,
    icon: null,
  },
  {
    id: 7,
    name: "777",
    parent: 5,
    icon: null,
  },
  {
    id: 9,
    name: "8888",
    parent: 1,
    icon: null,
  },
  {
    id: 10,
    name: "9999",
    parent: 9,
    icon: null,
  },
  {
    id: 11,
    name: "10000",
    parent: 1,
    icon: null,
  },
];
//查找子节点
function findItemChild(item) {
  var arryList = [];
  for (var i in data) {
    if (data[i].parent === item.id) {
      arryList.push(data[i]);
    }
  }
  return arryList;
}
//ch
function getAllChild(arry) {
  var childList = findItemChild(arry[0]);
  console.log(childList);
  if (childList.length > 0) {
    for (var j in childList) {
      childList[j].children = [];
      childList[j].children = getAllChild([childList[j]]);
    }
    arry[0].children = childList;
  } else {
    return [];
  }
  return childList;
}

reigsterRouter.post("/register", (ctx) => {
  const { name, password } = ctx.request.body;
  registerService.query(ctx.request.body);
  console.log(ctx.request.body);
  ctx.body = "注册成功";
});

reigsterRouter.get("/menu", (ctx) => {
  console.log(ctx.header.hhh);
  var temp_parent = { id: null, children: [] };
  var result = [];
  result.push(temp_parent);
  //   console.log(result);
  var output = getAllChild(result);
  //   console.log(output);
  ctx.body = output;
});

module.exports = reigsterRouter;
