/**
 * Created by sunzhimin on 01/07/16.
 */

import Storage from 'react-native-storage';
console.log(Storage);
var dragDate = {
  ele: {
    url: require( './img/elema490.png' ),
    href: 'https://m.ele.me/home'
  },
  meituan: {
    url: require( './img/meituan490.png' ),
    href: 'http://i.meituan.com/'
  },
  nuomi: {
    url: require( './img/baidunuomi490.png' ),
    href: 'http://m.nuomi.com/'
  },
  dameile: {
    url: require( './img/dameile490.png' ),
    href: 'http://www.dominos.com.cn/'
  },
  kfc: {
    url: require( './img/kendeji490.png' ),
    href: 'http://m.kfc.com.cn/'
  },
  mcdonalds: {
    url: require( './img/maidanglao490.png' ),
    href: 'http://www.mcdonalds.com.cn/'
  },
  jiyejia: {
    url: require( './img/jiyejia490.png' ),
    href: 'http://ne.4008-197-197.com/mobile/theme/dbjyj/home/index.html?sysSelect=1'
  },
  bishengke: {
    url: require( './img/bishengke490.png' ),
    href: 'http://m.4008123123.com/PHHSMWOS/index.htm?utm_source=orderingsite'
  }

  ,ele1: {
    url: require( './img/elema490.png' ),
    href: 'https://m.ele.me/home'
  },
  meituan1: {
    url: require( './img/meituan490.png' ),
    href: 'http://i.meituan.com/'
  },
  nuomi1: {
    url: require( './img/baidunuomi490.png' ),
    href: 'http://m.nuomi.com/'
  },
  dameile1: {
    url: require( './img/dameile490.png' ),
    href: 'http://www.dominos.com.cn/'
  },
  kfc1: {
    url: require( './img/kendeji490.png' ),
    href: 'http://m.kfc.com.cn/'
  },
  mcdonalds1: {
    url: require( './img/maidanglao490.png' ),
    href: 'http://www.mcdonalds.com.cn/'
  },
  jiyejia1: {
    url: require( './img/jiyejia490.png' ),
    href: 'http://ne.4008-197-197.com/mobile/theme/dbjyj/home/index.html?sysSelect=1'
  },
  bishengke1: {
    url: require( './img/bishengke490.png' ),
    href: 'http://m.4008123123.com/PHHSMWOS/index.htm?utm_source=orderingsite'
  }
}; // 全部数据

// 存储数据!
export default storage = new Storage({
  // 最大容量，默认值1000条数据循环存储
  size: 1000,

  // 数据过期时间，默认一整天（1000 * 3600 * 24 毫秒），设为null则永不过期
  defaultExpires: 1000 * 3600 * 24,

  // 读写时在内存中缓存数据。默认启用。
  enableCache: true,

  // 如果storage中没有相应数据，或数据已过期，
  // 则会调用相应的sync同步方法，无缝返回最新数据。
  // 以后再调用storage.load时，如果本地并没有存储相应的user，那么会自动触发storage.sync.user去远程取回数据并无缝返回。
  sync : {
    //user(params){
    //  let { id, resolve, reject } = params;
    //  fetch('user/', {
    //    method: 'GET',
    //    body: 'id=' + id
    //  }).then(response => {
    //    return response.json();
    //  }).then(json => {
    //    //console.log(json);
    //    if(json && json.user){
    //      storage.save({
    //        key: 'user',
    //        id,
    //        rawData: json.user
    //      });
    //      // 成功则调用resolve
    //      resolve && resolve(json.user);
    //    }
    //    else{
    //      // 失败则调用reject
    //      reject && reject(new Error('data parse error'));
    //    }
    //  }).catch(err => {
    //    console.warn(err);
    //    reject && reject(err);
    //  });
    //}
  }
});

// 保存数据
storage.save({
  key: 'dragDate',  //注意:请不要在key中使用_下划线符号!
  id: 1,
  rawData: dragDate,

  // 如果不指定过期时间，则会使用defaultExpires参数
  // 如果设为null，则永不过期
  expires: 1000 * 3600
});

storage.save({
  key: 'dragDate',  //注意:请不要在key中使用_下划线符号!
  id: 2,
  rawData: dragDate,

  // 如果不指定过期时间，则会使用defaultExpires参数
  // 如果设为null，则永不过期
  expires: 1000 * 3600
});

// 读取数据
storage.load({
  key: 'dragDate',
  id: 1,
  // autoSync(默认为true)意味着在没有找到数据或数据过期时自动调用相应的同步方法
  autoSync: true,

  // syncInBackground(默认为true)意味着如果数据过期，
  // 在调用同步方法的同时先返回已经过期的数据。
  // 设置为false的话，则始终强制返回同步方法提供的最新数据(当然会需要更多等待时间)。
  syncInBackground: true
}).then(ret => {
  //如果找到数据，则在then方法中返回
  //console.log(ret, ret.userid, 'ret, ret.userid');
}).catch(err => {
  //如果没有找到数据且没有同步方法，
  //或者有其他异常，则在catch中返回
  console.warn(err);
});


// 获取某个key下的所有id  比如 1,2
storage.getIdsForKey('dragDate').then(ids => {
  console.log(ids);
});

// 获取某个key下的所有数据,包括不同id下的
//storage.getAllDataForKey('dragDate').then(users => {
//  console.log(users);
//});


// 使用和load方法一样的参数读取批量数据，但是参数是以数组的方式提供。
// 会在需要时分别调用相应的同步方法，最后统一返回一个有序数组。
// 以下这两个方法除了参数形式不同，还有个值得注意的差异。getBatchData会在数据缺失时挨个调用不同的sync方法(因为key不同)。但是getBatchDataWithIds却会把缺失的数据统计起来，将它们的id收集到一个数组中，然后一次传递给对应的sync方法(避免挨个查询导致同时发起大量请求)，所以你需要在服务端实现通过数组来查询返回，还要注意对应的sync方法的参数处理（因为id参数可能是一个字符串，也可能是一个数组的字符串）。
storage.getBatchData([
    { key: 'loginState' },
    { key: 'checkPoint', syncInBackground: false },
    { key: 'balance' },
    { key: 'user', id: '1009' }
  ])
  .then(results => {
    results.forEach( result => {
      console.log(result);
    })
  })

//根据key和一个id数组来读取批量数据,
storage.getBatchDataWithIds({
    key: 'user',
    ids: ['1001', '1002', '1003']
  })
  .then(results => {
    results.forEach( result => {
      console.log(result);
    })
  });



// !! 清除某个key下的所有数据 这个key下的所以有没有id,都被删除
//storage.clearMapForKey('dragDate');


storage.remove({
  key: 'dragDate',
  id: 1
});

// 删除单个数据  恩,目前无效   --
storage.remove({
  key: 'dragDate'
});

storage.getAllDataForKey('dragDate').then(users => {
  console.log(users);
});


// 全局中使用!!! 类似localstorage, 注意引用顺序
global.storage = storage;

