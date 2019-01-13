<template>
  <div id="list">
    <div class="container">
      <header>
        <h3>黑马程序员-上海校区（前端学院）</h3>
      </header>
      <main>
        <router-view></router-view>
      </main>
      <footer>
        <ul>
          <li>
            <router-link to="/home">
            <span><i class="fa fa-home"></i></span>
            <p>首页</p>
            </router-link>
          </li>
          <li @click="id=1">
            <router-link to="/more" :class="{add:id===1}">
            <span><i class="fa fa-plane"></i></span>
            <p>闪送超市</p>
            </router-link>
          </li>
          <li  @click="id=2">
            <router-link to="cart"  :class="{add:id===2}">
            <span><i class="fa fa-shopping-cart">
              <div class="right">{{getAllNum}}</div>
              </i></span>
            <p>购物车</p>
            </router-link>
          </li>
          <li>
            <router-link to="/home">
            <span><i class="fa fa-meh-o">
              </i></span>
            <p>我的</p>
            </router-link>
          </li>
        </ul>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      id: 1
    }
  },
  computed: {
    getAllNum () {
      let num = 0
      for (var i = 0; i < this.$store.state.allnum.length; i++) {
        num += this.$store.state.allnum[i].count
      }
      return num
    }
  }
}
</script>

<style>
#list{
  height: 100%;
}
.container{
position: relative;
padding: 1.33rem 0;
height: 100%;
box-sizing: border-box;
}
main{
  height: 100%;
}
header{
  height: 1.33rem;
  line-height: 1.33rem;
  position: absolute;
  top: 0;
  font: 0;
  width: 100%;
  text-align: center;
  background-color: #ffd600;
}
footer{
  position: fixed;
  height: 1.33rem;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: rgba(246,246,246,0.95);
}
footer li{
  width: 25%;
  font-size: .4rem;
  text-align: center;
  height: 100%;
  float: left;
}
footer ul{
  height: 100%;
  overflow: hidden;
}
footer li a{
  display: block;
  height: 100%;
}
footer li a i{
  font-size: .5rem;
  margin-top: .27rem;
position: relative;
}
footer li a p{
font-size: .27rem;
}
footer li a.add i{
  color: #ffd600
}
.right{
  position: absolute;
  width: 20px;
  height: 20px;
  background-color: red;
  border-radius: 50%;
  left: 25px;
  top: -4px;
  color: white;
  font-size: .27rem;
  line-height: 20px;
  text-align: center;
}
</style>
