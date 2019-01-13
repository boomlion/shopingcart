<template>
  <div id="more">
    <div class="left">
      <ul>
        <li
         v-for="item in findList"
         :key="item.id"
         :class="{hot:item.icon===''?true:false,
         active:item.id==listId
         }"
         @click="listId = item.id">{{item.name}}</li>
      </ul>
    </div>
    <div class="right-meself">
      <ul class="me-ul">
        <li>全部分类</li>
        <li>综合排序</li>
      </ul>
      <ul id="ul">
        <li v-for="item in allproducts[listId]" :key="item.id">
          <div class="ul-left fl"><img :src="item.img"></div>
          <div class="ul-right">
            <p class="goodsname">{{item.name}}</p>
            <p class="goodsweight">{{item.specifics}}</p>
            <p class="goodspice">￥{{item.partner_price}}<span>{{item.price}}</span></p>
            <ProductOperate v-model="item.count" @selectGoods="selectGoods(item.id)"></ProductOperate>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import ProductOperate from '../page/page'
export default {
  components: {
    ProductOperate
  },
  data () {
    return {
      findList: [],
      listId: 0,
      allproducts: {},
      num: 0,
      checkedGoods: []
    }
  },
  created () {
    this.getListInfo()
  },
  methods: {
    selectGoods (id) {
      let countid = 0
      for (var key in this.allproducts) {
        if (this.allproducts[key].some(item => item.id === id)) {
          countid = this.allproducts[key].filter(item => item.id === id)
        }
      }
      this.$store.commit('addValue', {id, count: countid[0].count})
    },
    async getListInfo () {
      const res = await this.axios.jsonp('http://localhost:3008/list')
      const {categories, products} = res.data
      this.findList = categories
      this.listId = Number(categories[0].id)
      for (var key in products) {
        products[key].forEach(val => {
          if (this.$store.state.allnum.some(res => res.id === val.id)) {
            val.count = this.$store.state.allnum.filter(res => res.id === val.id)[0].count
          } else {
            val.count = 0
          }
        })
      }
      this.allproducts = products
    }
  },
  computed: {
    getNum () {
      const giveCount = this.$store.getters.giveCount
      for (var key in this.allproducts) {
        this.allproducts[key].forEach(good => {
          giveCount.forEach(give => {
            if (give.id === good.id) {
              good.count = give.count
            }
          })
        })
      }
      return this.allproducts
    }
  }
}
</script>

<style>
#more {
  height: 100%;
}
#ul{
  height: 100%;
  overflow-y: scroll;
}
/* #ul::-webkit-scrollbar{
  display: none
} */
#ul li{
  border-bottom: 1px solid #ccc;
  overflow: hidden;
  padding: 20px 10px;
  height: 100px;
}
#ul li .ul-left{
  width: 100px;
  height: 100%;
  margin-right: 30px;
}
.ul-right{
  position: relative;
  overflow: hidden;
}
p.goodsname{
  font-size: .33rem
}
p.goodsweight{
  margin-top: 20px;
  color: #ccc;
  font-size: .30rem
}
p.goodspice{
  margin-top: 5px;
  font-size: .33rem;
  color: red;
}
p.goodspice span{
  text-decoration: line-through;
  color: #ccc;
  font-size: 0.28rem
}
img{
  display: block;
  height: 100%;
  width: 100%;
}
.right-meself{
  overflow: hidden;
  padding-top: .67rem;
  height: 100%;
  position: relative;
  box-sizing: border-box;
}
.right-meself .me-ul{
  position: absolute;
  top: 0;
  width: 100%;
  overflow: hidden;
  border-bottom: 1px solid #ccc;
}
.right-meself .me-ul li{
  width: 50%;
  text-align: center;
  float: left;
height: .67rem;
line-height: .67rem;
}
.left {
  width: 80px;
  height: 100%;
  float: left;
}
.left li {
  height: 50px;
  text-align: center;
  line-height: 50px;
  background-color: #ccc;
  border-bottom: 1px solid black;
  font-size: 0.3rem;
  position: relative;
  overflow: hidden;
  border-left: 5px solid #ccc;
  cursor: pointer;
}
.left li.active{
  border-left: 5px solid yellow;
}
.left ul {
  height: 100%;
  overflow-y: scroll;
}
.left ul::-webkit-scrollbar {
        display: none;
    }
.left li.hot::before {
  content: 'new';
  width: 50px;
  height: 15px;
  line-height: 15px;
  position: absolute;
  background-color: yellow;
  right: -14px;
  top: 0;
  font-size: 0.24rem;
  transform: rotate(45deg);
}
</style>
