<template>
  <div class="div" v-if="list?true:false">

    <swipe class="my-swipe">
      <swipe-item v-for="data in datalist.product_images
" :key="data.id">
        <img :src="data.img_url"/>
      </swipe-item>
    </swipe>

    <ul class="box">
      <p>{{datalist.name}}<i class="iconfont icon-favorites" activeClass="active"></i></p>
      <p>-{{datalist.spec}}</p>
      <p>{{datalist.description}}</p>
      <li>
				<span>{{datalist.price/100}}元/{{datalist.show_entity_name
}}</span>
        <span>￥{{datalist.origin_price/100}}</span>|
        <span>随时退</span>
      </li>
    </ul>


    <div class="gap"></div>
    <div class="mation" v-if="titlelist?true:false">
      <h3>商户信息</h3>
      <h2>{{titlelist[0].restaurant_name}}</h2>
      <p><i class="iconfont icon-map"></i><span>{{titlelist[0].restaurant_address
}}</span><i class="iconfont icon-skip"></i></p>
      <p><i class="iconfont icon-phone"></i><span>{{number}}</span><i class="iconfont icon-skip"></i></p>
    </div>
    <div class="gap"></div>

    <div class="comment" v-if="commontlist.avatar?true:false">
      <h3>用户评论</h3>
      <div class="head">
        <img :src="commontlist.avatar" alt=""/>
        <span>{{commontlist.nick_name}}</span>
      </div>
      <p><span v-for="data in commontlist.scores">{{data.name}}{{data.score}}.0</span></p>
      <b v-for="data in commontlist.tags">{{data.name}}</b>
      <div class="text">
        <p>{{commontlist.text}}</p>
        <a v-for="data in commontlist.images">
          <img :src="data" alt=""/>
        </a>
      </div>
      <a href="" class="more">
        <span>查看全部评论</span>
        <i class="iconfont icon-skip"></i>
      </a>
    </div>

    <div class="gap"></div>

    <div class="meun" v-if="meunlist.contents?true:false">
      <h3>MENU</h3>
      <div class="sub">
        <div v-for="data in meunlist.contents">
          <h3>-{{data.sub_title}}-</h3>
          <p v-for='data in data.text'>{{data}}</p>
        </div>

      </div>
    </div>

    <div class="gap"></div>

    <div class="liangdian" v-if="modules?true:false">
      <h3 class="h3" v-if="modules?true:false">亮点</h3>
      <div v-for="data in modules">
        <img :src="data.img_url"/>
        <h3>{{data.title}}</h3>
        <p>{{data.content}}</p>
      </div>
    </div>
    <div class="gap"></div>

    <div class="prompt" v-if="list.modules[4].data.contents?true:false">
      <h3>使用提示</h3>
      <ul>
        <li v-for="data in list.modules[4].data.contents">
          {{data.text}}
        </li>

      </ul>
      <p>
        <button @click="isShow = !isShow">
          <i class="iconfont icon-service"></i>联系客服
        </button>
      </p>
      <div class="modal-mask modal-transition" style="" v-show="isShow">
        <div class="modal-wrapper">
          <div class="modal-container">
            <div class="modal-body">
              <div slot="body" class="modal">
                <div class="qr-wrapper">
									<span class="lt">
									
								</span> <span class="rt">
									
								</span> <span class="lb">
									
								</span> <span class="rb">
									
								</span> <img src="../assets/ewm.png">
                </div>
                <p class="sub-title">保存二维码图片，微信识别联系客服。</p>
              </div>
            </div>
            <a class="modal-close iconfont icon-close" @click="isShow = !isShow"></a>
          </div>
        </div>
      </div>
    </div>
    <div class="gap"></div>

    <div class="like">
      <h3 class="card-title">猜你喜欢</h3>
      <div>
        <ul class="like-list">
          <li class="clearfix" v-for="data in list.modules[5].data.recommend" :key="data.product_id"
              @click="handleClick(data.product_id)">
            <img :src="data.product_image_url"/>
            <div class="desc">
              <p class="sub-title">{{data.product_name }}
              </p>
              <p class="price">
                <span>{{data.price/100}}元/{{data.show_entity_name}}</span>
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div class="gap"></div>
    <div class="shop">
      <div class="shop1">
        <i class="iconfont icon-cart" @click="btn()"></i>
        <a @click="handClick()">加入购物车</a>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
  import 'vue-swipe/dist/vue-swipe.css';
  import {Swipe, SwipeItem} from 'vue-swipe';
  import router from "../router";
  import axios from "axios";
  import {Indicator} from 'mint-ui';

  export default {

    data() {
      return {
        datalist: [],
        list: null,
        titlelist: [],
        commontlist: [],
        meunlist: [],
        modules: [],
        number: '',
        isShow: false,
        num: 1
      }
    },
    mounted() {
      Indicator.open('加载中...');
      var idd = this.$route.params.id;
      axios.get(`/product/info/product_detail.json?product_id=${idd}`).then(res => {
        this.list = res.data
        this.datalist = res.data.basic;
        this.titlelist = res.data.modules[0].data.restaurants;
        this.number = this.titlelist[0].restaurant_phone_numbers[0];
        this.commontlist = res.data.modules[1].data;
        this.meunlist = res.data.modules[2].data || res.data.modules[1].data ;
        this.modules = res.data.modules[3].data.lights;
        Indicator.close();
      }).catch(err => {
        console.log(err);

      })


    },
    components: {
      'swipe': Swipe,
      'swipe-item': SwipeItem
    },
    methods: {
      handClick() {
        var obj = {
          id: this.$route.params.id,
          name: this.datalist.name,
          spec: this.datalist.spec_name,
          img: this.datalist.product_images[0].img_url,
          num: this.num,
          monery: this.datalist.price / 100

        }
        if (localStorage.car) {
          var count = 0;//新商品进来count为0
          var arr = JSON.parse(localStorage.car);
          for (var i = 0; i < arr.length; i++) {
            if (arr[i].id == obj.id) {
              count++;//判断是否是同一件商品，count不为0代表点击的是同一件商品，就只改变arr里面的num
              arr[i].num += obj.num
            }
          }
          console.log(arr)
          if (count == 0) {//判断点击的不是同一件商品，再添加进arr中
            arr.push(obj)
          }
        } else {
          var arr = [];
          arr.push(obj)
        }

        var objs = JSON.stringify(arr);
        localStorage.setItem("car", objs)

      },
      btn() {
        var id = this.$route.params.id;
        router.push(`/shopping/${id}`)
      },
      handleClick(id) {
        console.log(id)
        axios.get(`/product/info/product_detail.json?product_id=${id}`).then(res => {

          this.list = res.data
          this.datalist = res.data.basic;
          this.titlelist = res.data.modules[0].data.restaurants;
          this.number = this.titlelist[0].restaurant_phone_numbers[0];
          this.commontlist = res.data.modules[1].data;
          this.meunlist = res.data.modules[2].data;
          this.modules = res.data.modules[3].data.lights;

          console.log(this.list)
          Indicator.close();
        }).catch(err => {
          console.log(err);

        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .active {
    background-colr: red;
  }

  .shop {
    position: fixed;
    bottom: 0.4rem;
    background: #fff;
    width: 100%;

    .shop1 {
      a {
        width: 3rem;
        height: 0.6rem;
        float: right;
        background-color: #ffb22a;
        line-height: 0.6rem;
        font-size: 0.18rem;
        text-align: center;
        color: #fff;
      }

      i {
        width: 0.75rem;
        height: 0.6rem;
        line-height: 0.6rem;
        text-align: center;
        font-size: 0.3rem;
        margin-left: 0.2rem;
      }
    }
  }

  .like {
    background-color: #fff;
    padding: 0.27rem 0.2rem;

    .card-title {
      position: relative;
      font-size: 0.2rem;
      font-weight: bolder;
      line-height: 1;
      text-align: center;
      color: #2c3038;
      display: block;
      margin-bottom: 0.12rem;
    }

    .like-list {
      margin-top: 0.25rem;
      display: inline-block;

      .clearfix {
        margin-bottom: 0.21rem;
        position: relative;
        list-style: none;
        float: left;

        img {
          float: left;
          width: 1.2rem;
          height: 0.9rem;
          vertical-align: top;
          margin-right: 0.1rem;
        }

        .desc {
          position: relative;
          float: left;
          width: 2.05rem;
          height: 0.9rem;
          overflow: hidden;

          .sub-title {
            height: 0.36rem;
            font-size: 0.14rem;
            line-height: 1.3;
            margin-top: 0.05rem;
            color: #2c3038;
            margin-bottom: 0.03rem;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
          }

          .price {
            font-size: 0.12rem;
            color: #ff3939;
          }
        }
      }
    }
  }

  .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    display: table;
    transition: opacity .3s ease;

    .modal {
      padding: 0.2rem 0.2rem 0.24rem;
    }

    .modal-wrapper {
      display: table-cell;
      vertical-align: middle;

      .modal-container {
        position: relative;
        width: 2.6rem;
        margin: 0 auto;
        padding: 0.15rem;
        background-color: #fff;
        border-radius: 0.04rem;

        .qr-wrapper {
          position: relative;
          text-align: center;
          padding: 0.01rem;

          span {
            position: absolute;
            width: 0.15rem;
            height: 0.15rem;
          }

          .lt {
            left: 0;
            top: 0;
            border-left: 0.01rem solid #ff3939;
            border-top: 0.01rem solid #ff3939;
          }

          .rt {
            right: 0;
            top: 0;
            border-right: 0.01rem solid #ff3939;
            border-top: 0.01rem solid #ff3939;
          }

          .lb {
            left: 0;
            bottom: 0;
            border-left: 0.01rem solid #ff3939;
            border-bottom: 0.01rem solid #ff3939;
          }

          .rb {
            right: 0;
            bottom: 0;
            border-right: 0.01rem solid #ff3939;
            border-bottom: 0.01rem solid #ff3939;
          }

          img {
            width: 100%;
            height: 100%;
            vertical-align: top;
          }
        }

        .sub-title {
          margin-top: 0.35rem;
          padding: 0 0.05rem;
          font-size: 0.12rem;
          letter-spacing: -.0rem;
          text-align: center;
          color: #92969c;
        }
      }
    }

    .modal-close {
      position: absolute;
      top: 0;
      right: 0;
      font-size: 0.2rem;
      padding: 0.08rem;
      color: #bdc0c5;
      font-weight: 800;
    }
  }

  .prompt {
    h3 {
      text-align: center;
      font-size: 0.19rem;
      margin-top: 0.2rem;
      color: #2c3038;
    }

    ul {
      padding: 0 0.2rem 0.15rem;
      list-style: disc inside none;
      color: #63666b;

      li {
        word-break: break-all;
      }
    }

    p {
      text-align: center;
      margin-top: 0.1rem;
      margin-bottom: 0.15rem;

      button {
        width: 1.3rem;
        height: 0.38rem;
        font-size: 0.13rem;

        i {
          margin-right: 0.06rem;
        }
      }
    }
  }

  .liangdian {
    padding: 0.25rem 0.2rem;

    .h3 {
      text-align: center;
      font-size: 0.2rem;
    }

    img {
      width: 3.35rem;
      height: 2.23rem;
      margin-top: 0.3rem;
    }

    h3 {
      font-size: 0.21rem;
      margin: 0.2rem 0 0.15rem 0;
    }

    p {
      font-size: 0.19rem;
      color: #63666b;
    }
  }

  .gap {
    width: 100%;
    height: 0.08rem;
    background-color: #fafafa;
    border-top: 1px solid #e6e6e6;
    border-bottom: 1px solid #e6e6e6;
  }

  .div {
    margin-top: 0.48rem;
    margin-bottom: 0.6rem;
  }

  .my-swipe {
    height: 2.5rem;
    color: #fff;
    font-size: 0.15rem;
    text-align: center;

    img {
      width: 100%;
      height: 2.5rem
    }
  }

  .box {
    padding: 0 0.2rem 0.15rem;

    p:nth-of-type(1) {
      font-size: 0.21rem;
      margin-top: 0.1rem;

      i {
        font-weight: 800;
        margin-left: 0.2rem;
      }
    }

    p:nth-of-type(2) {
      font-size: 0.21rem;
    }

    p:nth-of-type(3) {
      font-size: 0.15rem;
      margin: 0.1rem 0 0.1rem 0;
      color: #92969C;
    }

    li {
      list-style: none;
    }

    li span:nth-of-type(1) {
      color: red;
      font-size: 0.2rem;
      margin-right: 0.1rem;
    }

    li span:nth-of-type(2) {
      font-size: 0.15rem;
      color: #92969C;
      font-size: 0.2rem;
      margin-right: 0.1rem;
      text-decoration: line-through;
    }

    li span:nth-of-type(3) {
      font-size: 0.15rem;
      color: #92969C;
      font-size: 0.2rem;
      margin-left: 0.1rem;
    }
  }

  .mation {
    padding: 0 0.2rem 0.15rem;

    h3 {
      font-size: 0.215rem;
      text-align: center;
      margin-bottom: 0.1rem;
      margin-top: 0.2rem;
    }

    h2 {
      font-size: 0.18rem;
      border-bottom: 1px solid #e6e6e6;
      padding: 0.175rem 0 0.15rem 0;
      color: #2c3038;
    }

    p {
      padding: 0.15rem 0;
      font-size: 0.15rem;
      border-bottom: 0.1px solid #e6e6e6;

      i:nth-of-type(1) {
        font-weight: 800;
        width: 0.05rem;
        height: 0.05rem;
        float: left;
      }

      i:nth-of-type(2) {
        font-weight: 800;
        width: 0.05rem;
        height: 0.05rem;
        float: right;
      }

      span {
        margin-left: 0.2rem;
      }
    }
  }

  .comment {
    padding: 0 0.2rem 0.15rem;
    margin-top: 0.2rem;

    h3 {
      font-size: 0.215rem;
      text-align: center;
      margin-bottom: 0.1rem;
    }

    p {
      font-size: 0.13rem;
      color: #92969c;
      margin-bottom: 0.12rem;

      span {
        margin-right: 0.2rem;
      }
    }

    b {
      height: 0.2rem;
      margin-right: 0.1rem;
      line-height: 0.2rem;
      font-weight: 300;
      text-align: center;
      color: #92969c;
      border-radius: 0.02rem;
      background-color: #f2f3f5;
    }
  }

  .head {
    overflow: hidden;
    margin-bottom: 0.12rem;

    img {
      width: 0.3rem;
      height: 0.3rem;
      border-radius: 50%;
      float: left;
    }

    span {
      line-height: 0.3rem;
      margin-left: 0.1rem;
      font-size: 0.14rem;
      color: #1a1a1a;
    }
  }

  .text {
    margin-top: 0.12rem;
    margin-bottom: 0.1rem;
    border-bottom: 1px solid #e6e6e6;

    p {
      font-size: 0.14rem;
      color: #63666b;
      margin-bottom: 0.12rem;
    }

    a {
      img {
        width: 1.05rem;
        height: 1.05rem;
        margin-right: 0.05rem;
      }
    }
  }

  .more {
    display: block;
    border-bottom: 1px solid #e6e6e6;
    padding: 0.13rem 0 0.2rem;
    line-height: 0.14rem;
    font-size: 0.14rem;
    color: #63666b;

    span {
      font-size: 0.14rem;
      line-height: 0.14rem;
      width: 3.2rem;
    }

    i {
      float: right;
      color: black;
    }
  }

  .meun {
    text-align: center;
    padding: 0 0.2rem 0.15rem;

    h3 {
      margin-top: 0.2rem;
    }
  }

  .sub {
    margin-bottom: 0.3rem;

    h3 {
      margin-top: 0.25rem;
      color: #21242a;
      font-weight: 100;
      margin-bottom: 0.1rem;
    }

    p {
      color: #76797e;
    }
  }
</style>
