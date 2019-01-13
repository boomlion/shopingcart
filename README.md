# 阅读详情

> 关于此次购物车的GET

## css渲染
```
在渲染的时候，只要留一些必要的渲染 模板格式
其他的可以尽量简洁，

padding

vue中rem布局需要引入一个flexible进行辅助开发

npm i flexible

在index中进行引入
import 'lib-flexible/flexible.js'

由于rem在vue中的解析问题

需要引入px2rem的时候
需要进行配置
npm i px2rem-loading

在build中的utils中进行添加配置项

const px2remLoader = {
  loader: 'px2rem-loader',
  options: {
    emUnit: 75 // 设计稿的1/10
  }
}

和

function generateLoaders (loader, loaderOptions) {
const loaders = options.usePostCSS ? [cssLoader, postcssLoader, px2remLoader] : [cssLoader]

if (loader) {
  loaders.push({
    loader: loader + '-loader',
    options: Object.assign({}, loaderOptions, {
      sourceMap: options.sourceMap
    })
  })
}
在整体的布局直接进行数据的渲染
##数据的获取

```
安装axios
npm i axios 

引入然后进行配置
Vue.prototype.axios = axis

由于在这次的项目中使用了jsonp的方式所以 要进行jsonp的配置

axios.jsonp = (url, params) => {
  // 1 根据 url 和params 拼接请求地址
  url += '?'
  for (let k in params) {
    url += k + '=' + params[k] + '&'
  }
  // 2 拼接 callback
  const callbackName = 'itcast_' + (new Date() - 0)
  url += 'callback=' + callbackName
  // 3 动态创建script标签
  const script = document.createElement('script')
 // 创建标签
  script.src = url
  //添加到页面的head上 
  document.head.appendChild(script)
  //回调函数返回的是promise的对象
  return new Promise((resolve, reject) => {
    // 给window添加一个函数，就相当于全局函数
    //发送过的函数调用名是callback，所以在全局进行注册的也要是这个名字，一定要是全局的
    window[callbackName] = function (data) {
      // data 就是 JSONP接口返回的数据
      // 调用resolve获取数据
      resolve(data)
      // 删除掉添加给window的属性
      delete window[callbackName]
      // 移除 script 标签
      document.head.removeChild(script)
    }
  })
}

配置反向代理[就是利用服务器没哟偶跨域问题的原理进行的数据请求]

在config中的index.js中proxyTable属性中进行配置
名字可以 随便取，但是要记得
'/api': {
        // 代理的目标服务器地址
        target: 'http://m.beequick.cn/data/',
        // https请求需要该设置
        secure: false,
        // 必须设置该项
        changeOrigin: true,

        // 远程服务器的接口地址：http://m.beequick.cn/data/home
        // 本地访问的地址：/api/home
        // '/api/home' 路径重写为：'/home'
        pathRewrite: { '^/api': '' }       
      }

你可以 知道的三种跨域 ，已经使用了两个了还剩一个cors


##数据的显示

整体的思路就是在得到的数据中进行手动添加一个数据（我是这么做的）count默认为0，
数据的修改只会在点击按钮的时候进行，所以其他的时候你可以尽情的写页面

按钮的思路
```
一开始的思路----（直接上代码）
 <div class="numcart">
  <span :class="{min:!isselect}" @click="min">-</span>
  <span
 :class="{active:!isselect,none:true}">{{value}}</span>
  <span @click="plus">+</span>
</div>
因为我当时指向通过三个按钮进行操作页面上的数据
也就是当你绑定的item.count当时没有想着绑定count而是想着第三方的变量进行调配，但是这哦多数据哪有一个固定的第三方，
当你加入count的时候 你只要进行盯着count就行了加减进行绑定事件
然后进行数据的监听
props: ['value'],
  data () {
    return {
      count: this.value
    }
  },
  watch: {
  //当数据进行改变的时候进触发得事件
    count (curCount) {
      this.$emit('input', curCount)
      this.$emit('selectGoods')
    }
  },
  computed: {
    isselect () {
      return this.count > 0
    }
  },

本地数据可以改变，也就是局部的，要想刷新还有，就需要进行本地存储
就是当你点击的时候，获取id以及改变后的count传给vuex,就要 调用他的方法，
然后判断是否存在，在进行添加改变数值，对存储的数组的长度进行计算总和
我是利用computed计算属性得到

父子组件的双向绑定
v-model的实现方式
:value="" @input="" 就是利用父子组件的通信，只要在子组件props获取value就可以默认的偶（为了适应input）
在数据改变的时候调用input方法进行回调进行改变
watch:{
  this.$emit('input', curCount)
}
这样父组件的数据就改变了
value  和input
```


##购物车逻辑
本地存储的数据，添加一个属性就是是否被选中，selected：true
依旧是父子组件通信，只是添加了选中状态和计算属性（总的价格）


##难点

###父子组件通信（刚开始没接触）
###各种数组的操作 判断以及增删改查还要注意 === 
