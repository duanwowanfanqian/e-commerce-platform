<template>
  <!--列表-->
  <div class="list-container">
    <div class="sortList clearfix">
      <div class="center">
        <!--banner轮播-->
        <Carousel :list="bannerList" />
      </div>
      <div class="right">
        <div class="news">
          <h4>
            <em class="fl">AlloyImage快报</em>
            <span class="fr tip">更多 ></span>
          </h4>
          <div class="clearix"></div>
          <ul class="news-list unstyled">
            <li>
              <span class="bold">[特惠]</span>备战开学季 全民半价购数码
            </li>
            <li>
              <span class="bold">[公告]</span>备战开学季 全民半价购数码
            </li>
            <li>
              <span class="bold">[特惠]</span>备战开学季 全民半价购数码
            </li>
            <li>
              <span class="bold">[公告]</span>备战开学季 全民半价购数码
            </li>
            <li>
              <span class="bold">[特惠]</span>备战开学季 全民半价购数码
            </li>
          </ul>
        </div>
        <ul class="lifeservices">
          <li class=" life-item ">
            <i class="list-item"></i>
            <span class="service-intro">话费</span>
          </li>
          <li class=" life-item ">
            <i class="list-item"></i>
            <span class="service-intro">机票</span>
          </li>
          <li class=" life-item ">
            <i class="list-item"></i>
            <span class="service-intro">电影票</span>
          </li>
          <li class=" life-item ">
            <i class="list-item"></i>
            <span class="service-intro">游戏</span>
          </li>
          <li class=" life-item">
            <i class="list-item"></i>
            <span class="service-intro">彩票</span>
          </li>
          <li class=" life-item">
            <i class="list-item"></i>
            <span class="service-intro">加油站</span>
          </li>
          <li class=" life-item">
            <i class="list-item"></i>
            <span class="service-intro">酒店</span>
          </li>
          <li class=" life-item">
            <i class="list-item"></i>
            <span class="service-intro">火车票</span>
          </li>
          <li class=" life-item ">
            <i class="list-item"></i>
            <span class="service-intro">众筹</span>
          </li>
          <li class=" life-item">
            <i class="list-item"></i>
            <span class="service-intro">理财</span>
          </li>
          <li class=" life-item">
            <i class="list-item"></i>
            <span class="service-intro">礼品卡</span>
          </li>
          <li class=" life-item">
            <i class="list-item"></i>
            <span class="service-intro">白条</span>
          </li>
        </ul>
        <div class="ads">
          <img src="./images/ad1.png" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
// import Swiper from 'swiper'

export default {
  name: 'ListContainer',
  mounted () {
    this.$store.dispatch('getBannerList');
    /* // 在mounted生命周期函数中直接new swiper轮播图没有JS功能

    // 原因：ListContainer组件渲染之后会发送请求获取轮播图所需数据，然后将数据存放在仓库(store)中的state下bannerList里，然后进行数据更新,最后将新数据渲染到页面上    
    // 但在数据存放前(也就是仓库配置项mutations中函数执行前)mounted函数就已经执行完毕了，这导致new swiper时组件还没有数据，
    // 轮播图里只有一个空架子，使用v-for渲染的结构还没有，轮播图也就没有任何功能(js操作) 
    
    // 那为什么不在updated里new swiper，这种方法虽然可以解决上面的问题，但存在缺陷。
    // 例如：组件还有其他响应式数据时，数据发生变化，就会执行updated，重复调用没必要。所以不使用这种解决方法   
    */

    // 解决方法一：使用定时器让其等数据更新渲染完毕之后，再new swiper
    /* setTimeout(() => {
      new Swiper('.swiper-container', {
        // 循环模式选项,当loop属性为true时，轮播图才能一直循环切换
        loop: true,

        // 如果需要分页器
        pagination: {
          el: '.swiper-pagination',
          // 此参数设置为true时，点击分页器的指示点分页器会控制Swiper切换。
          clickable: true,
        },

        // 如果需要前进后退按钮
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      })
    }, 2000); */
  },

  watch: {
    /* // 方法一存在部分缺陷，如要一秒后才有分页器以及切换功能等，如果一旦数据请求时间超过两秒又会出现上面的问题。 
    // 方法二：通过watch+nextTick解决

    // 监听bannerList数据的变化，因为这条数据发生过变化----由空数组变为有四个元素的数组
    bannerList: {
      immediate: true, // 这里只是为了封装组件而加的

      handler () {
        // 现在我们通过watch监听bannerList属性的属性值的变化,当handler方法被调用，就代表组件实例身上这个属性已经有了数据，
        // 但handler方法被调用,只能保证bannerList有数据了,而不能保证vue已经将新数据生成DOM并渲染到页面上了(即不能保证v-for执行完毕)
        // nextTick方法: 在修改数据之后立即使用这个方法，获取更新后的 DOM。在 DOM 更新循环结束之后才执行延迟回调(这个回调要等DOM更新循环结束才执行,所以叫延时回调)。
        this.$nextTick(() => {
          // new Swiper第一个参数即可以是元素节点(this.$refs.ref属性值就是获取元素节点,也可以通过document.querySelect('#id')获取)，也可以是Swiper容器的css选择器(例如："#id")
          new Swiper(this.$refs.cur, {
            // 循环模式选项,当loop属性为true时，轮播图才能一直循环切换
            loop: true,

            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
              // 此参数设置为true时，点击分页器的指示点分页器会控制Swiper切换。
              clickable: true,
            },

            // 如果需要前进后退按钮
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },
          })
        })
      }
    } */
  },

  computed: {
    ...mapState({
      bannerList: state => state.home.bannerList
    })
  }
}
</script>

<style scoped lang="less">
.list-container {
  width: 1200px;
  margin: 0 auto;

  .sortList {
    height: 464px;
    padding-left: 210px;

    .center {
      box-sizing: border-box;
      width: 740px;
      height: 100%;
      padding: 5px;
      float: left;
    }

    .right {
      float: left;
      width: 250px;

      .news {
        border: 1px solid #e4e4e4;
        margin-top: 5px;

        h4 {
          border-bottom: 1px solid #e4e4e4;
          padding: 5px 10px;
          margin: 5px 5px 0;
          line-height: 22px;
          overflow: hidden;
          font-size: 14px;

          .fl {
            float: left;
          }

          .fr {
            float: right;
            font-size: 12px;
            font-weight: 400;
          }
        }

        .news-list {
          padding: 5px 15px;
          line-height: 26px;

          .bold {
            font-weight: 700;
          }
        }
      }

      .lifeservices {
        border-right: 1px solid #e4e4e4;
        overflow: hidden;
        display: flex;
        flex-wrap: wrap;

        .life-item {
          border-left: 1px solid #e4e4e4;
          border-bottom: 1px solid #e4e4e4;
          margin-right: -1px;
          height: 64px;
          text-align: center;
          position: relative;
          cursor: pointer;
          width: 25%;

          .list-item {
            background-image: url(~@/assets/images/icons.png);
            width: 61px;
            height: 40px;
            display: block;
          }

          .service-intro {
            line-height: 22px;
            width: 60px;
            display: block;
          }

          &:nth-child(1) {
            .list-item {
              background-position: 0px -5px;
            }
          }

          &:nth-child(2) {
            .list-item {
              background-position: -62px -5px;
            }
          }

          &:nth-child(3) {
            .list-item {
              background-position: -126px -5px;
            }
          }

          &:nth-child(4) {
            .list-item {
              background-position: -190px -5px;
            }
          }

          &:nth-child(5) {
            .list-item {
              background-position: 0px -76px;
            }
          }

          &:nth-child(6) {
            .list-item {
              background-position: -62px -76px;
            }
          }

          &:nth-child(7) {
            .list-item {
              background-position: -126px -76px;
            }
          }

          &:nth-child(8) {
            .list-item {
              background-position: -190px -76px;
            }
          }

          &:nth-child(9) {
            .list-item {
              background-position: 0px -146px;
            }
          }

          &:nth-child(10) {
            .list-item {
              background-position: -62px -146px;
            }
          }

          &:nth-child(11) {
            .list-item {
              background-position: -126px -146px;
            }
          }

          &:nth-child(12) {
            .list-item {
              background-position: -190px -146px;
            }
          }
        }
      }

      .ads {
        margin-top: 5px;

        img {
          opacity: 0.8;
          transition: all 400ms;

          &:hover {
            opacity: 1;
          }
        }
      }
    }
  }
}
</style>