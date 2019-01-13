<template>
<div id="cart">
  <div id="info">
    <table style="width:100%">
      <tbody>
        <tr style="height:30px">
          <th style="width:30%">收货人</th>
          <td style="width:55%">李佳乐 &nbsp; 先生</td>
          <td rowspan="3">修改<i class="fa fa-angle-right"></i></td>
        </tr>
        <tr style="height:30px">
          <th>电话</th>
          <td>136********</td>
        </tr>
        <tr style="height:30px">
          <th>收货地址</th>
          <td>安徽省阜阳市阜南县打我呀</td>
        </tr>
      </tbody>
    </table>
  </div>
   <div class="info-main">
      <div class="main-cart">
        <p class="fils">闪送超市</p>
        <p>￥0起送，22点后满￥69运费5元起，不满￥69运10元起</p>
      </div>
      <div class="main-time">
        <p>收货时间 &nbsp;&nbsp;&nbsp;&nbsp; <span class="red">9:00-10:00</span> <span class="fr mr20">可预订&gt;</span></p>
      </div>
      <div class="main-info">
        收货地址 &nbsp;&nbsp;&nbsp;&nbsp; <input type="text" placeholder="请输入100字以内的特殊需求">
      </div>
      <ul id="goods">
          <li v-for="item in cartList" :key="item.id" v-if="item.count>0" >
            <div id="ljl" :class="{active:item.seleted}" @click="item.seleted=!item.seleted"><i class="fa fa-check" aria-hidden="true"></i></div>
          <div class="ul-left fl"><img :src="item.img"></div>
          <div class="ul-right">
            <p class="goodsname">{{item.name}}</p>
            <p class="goodspice">￥{{item.price}}</p>
           <cartnum v-model="item.count" @selectGoods="selectGoods(item.id)"></cartnum>
          </div>
        </li>
      </ul>
      <div class="main-pay">
        <p class="fl active"><span :class="{allchecked:selectall}" id="all" @click="checkall">全选</span> &nbsp;&nbsp;&nbsp;&nbsp;共: <span class="red">${{allpaice}}</span></p>
        <p class="fr checkedok">选好了</p>
      </div>
    </div>
</div>
</template>
<script>
import cartnum from '../page/page'
export default {
  computed: {
    selectall () {
      return this.cartList.every(item => item.seleted === true)
    },
    allpaice () {
      let num = 0
      this.cartList.filter(item => item.seleted === true).forEach(ele => { num += ele.price * ele.count })
      return num
    }
  },
  components: {
    cartnum
  },
  created () {
    this.getGoods()
  },
  data () {
    return {
      cartList: []
    }
  },
  methods: {
    checkall () {
      this.cartList.forEach(element => { element.seleted = true })
    },
    checked (id) {
      this.cartList.filter(res => res.id === id)[0].seleted = false
    },
    selectGoods (id) {
      let count = this.cartList.filter(res => res.id === id)[0].count
      this.$store.commit('addValue', {id, count})
    },
    async getGoods () {
      const ids = this.$store.getters.ids
      const res = await this.axios.get(`/api/home?_r=${Math.random()}&cart_pids=${encodeURIComponent(
        ids
      )}&location=121.5721941391567%2C31.21168025925351`)
      console.log(res)
      const {data} = res.data
      let allnum = this.$store.state.allnum
      data.cart_ids.forEach(element => {
        element.seleted = true
        allnum.forEach(item => {
          if (item.id === element.id) {
            element.count = item.count
          }
        })
      })
      this.cartList = data.cart_ids
      console.log(this.cartList)
    }
  }
}
</script>
<style>
#cart{
  height: 100%;
  overflow-y: scroll;
}
#cart::-webkit-scrollbar{
  display: none;
}
#info{
background-color: #ccc;
padding: 15px 0;
}
table{
  background-color: #fff;
}
.fa-angle-right{
  text-indent: 30px;
}
.info-main .main-cart{
  padding: 10px 10px;
  font-size: .27rem;
  color: #999;
  border-bottom:1px solid #ccc;
  }
  .info-main .main-cart p{
    line-height: .37rem;
  }
  .info-main .main-cart p.fils{
    margin-bottom: 15px;
    text-indent: 5px;
    position: relative;
  }
    .info-main .main-cart p.fils::before{
      content: '';
      position: absolute;
      left: -2px;
      top: 2px;
      width: 3px;
      height: 15px;
      background-color: yellow;
    }

.info-main .main-time {
height: 50px;
line-height: 50px;
text-indent: 20px;
border-bottom: 1px solid #ccc;
font-size: .24rem;
}
.info-main .main-time span.red{
  color: red;
  font-size: .27rem;
}
.info-main .main-info{
  height: 50px;
line-height: 50px;
text-indent: 20px;
border-bottom: 1px solid #ccc;
font-size: .24rem;
  }
  .info-main .main-info input{
    height: 30px;
text-indent: 10px;
width: 80%;
border-radius: 5px;
  }
  #goods li{
  border-bottom: 1px solid #ccc;
  overflow: hidden;
  padding: 20px 10px;
  height: 100px;
  padding-left: 60px;
  position: relative;
}
#ljl{
   position: absolute;
   content: '';
   width: 20px;
   height: 20px;
   top: 50%;
   left: 20px;
   border: 1px solid #ccc;
   border-radius: 50%;
   cursor: pointer;
   font-size: 0;
}
 #ljl.active{
  position: absolute;
  text-align: center;
  line-height: 20px;
  font-size: 14px;
   width: 20px;
   height: 20px;
   top: 50%;
   left: 20px;
   border: 1px solid #ccc;
   border-radius: 50%;
   cursor: pointer;
   background-color: #ffd600;
   color: white;
  }
#goods li .ul-left{
  width: 100px;
  height: 100%;
  margin-right: 30px;
}
.ul-right{
  position: relative;
  overflow: hidden;
}
.ul-right .numcart{
  position: absolute;
  right: 20px;
  bottom: 0;
}
.ul-right .numcart span{
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 1px solid red;
  border-radius: 50%;
  text-align: center;
  line-height: 20px;
  margin: 0 5px;
  cursor: pointer;
  font-weight: bold;
}
.ul-right .numcart span.none{
  border: 0;
}
img{
  display: block;
  height: 100%;
  width: 100%;
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
.info-main .main-pay{
  height: 40px;
  line-height: 40px;
  padding-left: 20px;
  border-bottom: 1px solid #ccc;
}
.info-main .main-pay p{
  text-indent: 25px;
  position: relative;
  font-size: .27rem;
}
.info-main .main-pay #all{
  cursor: pointer;
}
.info-main .main-pay .allchecked::before{
 position: absolute;
 cursor: pointer;
   content: '';
   width: 20px;
   height: 20px;
   top: 50%;
   left: 0;
   transform: translateY(-50%);
   border: 1px solid #ccc;
   border-radius: 50%;
   cursor: pointer;
}
.info-main .main-pay p.active .allchecked::before{
    position: absolute;
  text-align: center;
  line-height: 20px;
   content: '√';
   width: 20px;
   height: 20px;
   transform: translateY(-50%);
   top: 50%;
   left: 0;
   border: 1px solid #ccc;
   border-radius: 50%;
   cursor: pointer;
   background-color: #ffd600;
   color: white;
   text-indent: 0;
}
.info-main .main-pay p.checkedok{
  background-color: #ffd600;
  text-align: center;
  text-indent: 0;
  padding: 0 15px;
}
</style>
