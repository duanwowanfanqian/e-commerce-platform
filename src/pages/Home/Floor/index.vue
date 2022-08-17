<template>
  <!--楼层-->
  <div class="floor">
    <div class="py-container">
      <div class="title clearfix">
        <h3 class="fl">{{list.name}}</h3>
        <div class="fr">
          <ul class="nav-tabs clearfix">
            <li :class="index==0 ?'active': '' " v-for="(nav,index) in list.navList" :key="index">
              <a :href="nav.url" data-toggle="tab">{{nav.text}}</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="tab-content">
        <div class="tab-pane">
          <div class="floor-1">
            <div class="blockgary">
              <ul class="jd-list">
                <li v-for="(keyword,index) in list.keywords" :key="index">{{keyword}}</li>
              </ul>
              <img :src="list.imgUrl" />
            </div>
            <!-- 轮播图 -->
            <div class="floorBanner">
              <Carousel :list="list.carouselList" />
            </div>
            <div class="split">
              <span class="floor-x-line"></span>
              <div class="floor-conver-pit">
                <img :src="list.recommendList[0]" />
              </div>
              <div class="floor-conver-pit">
                <img :src="list.recommendList[1]" />
              </div>
            </div>
            <div class="split center">
              <img :src="list.bigImg" />
            </div>
            <div class="split">
              <span class="floor-x-line"></span>
              <div class="floor-conver-pit">
                <img :src="list.recommendList[2]" />
              </div>
              <div class="floor-conver-pit">
                <img :src="list.recommendList[3]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import Swiper from 'swiper'

export default {
  name: 'Floor',
  props: ['list'],
  mounted () {
    /* // 因为要将轮播图封装为一个组件，所以我们将Floor组件和ListContainer组件进行部分更改，将他们整合为一样的，所以不使用下面的写法
    // 在ListContainer组件中，直接在mounted当中书写new Swiper是不可以的，但是为什么现在在这里就可以了？
    // 因为请求是父组件中的mounted发的，而mounted 不会保证所有的子组件也都被挂载完成，但子组件会等父组件将props数据传递过来后渲染，而且页面挂载完毕才执行mounted
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
    }) */
  },
  watch: {
     list: {
       // immediate: true 初始化时让handler调用一下，此时父组件挂载完毕已经拿得到数据
       // 因为数据是父组件传过来的，在子组件中list一直没有变化，handler方法也不会被调用，所以要在初始化调用一下
       immediate: true,
       handler () {
         this.$nextTick(() => {
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
     }
  }

}
</script>

<style lang="less" scoped>
.floor {
  margin-top: 15px;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .title {
      .fl {
        float: left;
        color: #c81623;
        font-size: 20px;
        line-height: 30px;
        margin: 9px 0;
        font-weight: 700;
      }

      .fr {
        float: right;

        .nav-tabs {
          margin: 10px 0 0;
          display: inline-block;

          li {
            float: left;
            line-height: 18px;

            a {
              padding-top: 1px;
              font-weight: 400;
              background-color: #fff;

              &::after {
                content: "|";
                padding: 0 10px;
              }
            }

            &:nth-child(7) {
              a {
                &::after {
                  content: "";
                }
              }
            }

            &.active {
              a {
                color: #e1251b;
              }
            }
          }
        }
      }
    }

    .tab-content {
      border-top: 2px solid #c81623;
      border-bottom: 1px solid #e4e4e4;

      .tab-pane {
        .floor-1 {
          height: 360px;
          display: flex;

          .blockgary {
            width: 210px;
            height: 100%;
            background: #f7f7f7;

            .jd-list {
              padding: 15px 0;
              overflow: hidden;

              li {
                list-style-type: none;
                float: left;
                width: 40%;
                margin: 0 10px;
                border-bottom: 1px solid #e4e4e4;
                text-align: center;
                line-height: 26px;
              }
            }

            img {
              width: 100%;
            }
          }

          .floorBanner {
            width: 330px;
            height: 100%;
          }

          .split {
            width: 220px;
            height: 100%;
            position: relative;

            .floor-x-line {
              position: absolute;
              background: #e4e4e4;
              width: 220px;
              height: 1px;
              top: 180px;
            }

            .floor-conver-pit {
              width: 100%;
              height: 50%;

              img {
                width: 100%;
                height: 100%;
                transition: all 400ms;

                &:hover {
                  opacity: 0.8;
                }
              }
            }
          }

          .center {
            border: 1px solid #e4e4e4;
          }
        }
      }
    }
  }
}
</style>