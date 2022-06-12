const obj = {
  name: "zs",
  age: 29,
  friends: {
    frident_name: "ls",
    friend_age: 23,
    friend_fri: {
      h_name: "w5",
      h_age: 22,
      h_f: {},
      h_foo() {
        console.log(123);
      }
    }
  }
};

// 状态转移方程：newObj =（newObj[基本类型key] = oldObj[基本类型key]) + (newObj[引用类型key] = oldObj[引用类型key])
const deepCy = (obj) => {
  let o = {};
  Object.keys(obj).forEach((item) => {
    // 判断 value 是不是引用类型
    if (obj[item] instanceof Object) {
      o[item] = deepCy(obj[item]);
    } else {
      o[item] = obj[item];
    }
  });
  return o;
};

const hh = deepCy(obj);

console.log(hh);
// hh.friends.friend_fri.h_foo();
console.log(hh.friends.friend_fri.h_foo);
console.log(hh.friends.friend_fri.h_foo === obj.friends.friend_fri.h_foo);

function foo() {
  console.log(123);
}

console.log(typeof []);
