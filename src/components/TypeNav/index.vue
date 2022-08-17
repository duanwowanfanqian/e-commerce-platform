<template>
 <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <!-- 创建一个父容器，将全部商品分类导航和商品分类放入父容器，并将鼠标移出事件添加在父容器上 -->
      <!-- 这样可以实现，鼠标在商品分类详细信息或商品分类导航中，选中样式不会消失 -->
      <div @mouseleave="leaveIndex" @mouseenter="enterShow" class="gap">
        <h2 class="all">全部商品分类</h2>

        <!-- 过渡动画 -->
        <transition name="sort">
          <div class="sort" v-show="show">
            <div class="all-sort-list2" @click="goSearch">
              <!-- :class="{cur:index==currentIndex}"表示当index等于currentIndex时，才会cur这个类名 -->
              <div class="item" v-for="(c1 , index) in categoryList" :key="c1.categoryId" :class="{cur:index==currentIndex}">
                <h3 @mouseenter="changeIndex(index)">
                  <a :data-categoryName="c1.categoryName" :data-category1id="c1.categoryId">{{c1.categoryName}}</a>
                </h3>
                <!-- 商品分类详细信息,:style="{...}" 表示选中的商品分类详细信息显示，未选中的隐藏-->
                <div class="item-list clearfix" :style="{display: index==currentIndex?'block':'none'}">
                  <div class="subitem" v-for="c2 in c1.categoryChild" :key="c2.categoryId">
                    <dl class="fore">
                      <dt>
                        <a :data-categoryName="c2.categoryName" :data-category2id="c2.categoryId">{{c2.categoryName}}</a>
                      </dt>
                      <dd>
                        <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                          <a :data-categoryName="c3.categoryName" :data-category3id="c3.categoryId">{{c3.categoryName}}</a>
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">海菲超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
// lodash函数库中封装了很多函数(如节流，防抖，去重等)，lodash函数库对外暴露的是_函数，和jQuery类似。
// import _ from "lodash"; 
// 上面的导入是吧lodash全部功能函数引入，最好的引入方式是下面的按需引入
import throttle from "lodash/throttle";

export default {
  name: 'TypeNav',
  data () {
    return {
      currentIndex: -1,
      show: true
    }
  },
  methods: {

    // 鼠标进入修改响应式数据currentIndex属性,这个是没有节流的写法
    /* changeIndex (index) {
      // index：鼠标移上某个一级分类元素的索引值
      // 正常情况(用户慢慢的操作)：鼠标进入，每一个一级分类h3，都会触发鼠标的进入事件。
      // 菲正常情况(用户操作很快)：本身全部的一级分类都应该触发鼠标进入事件，但事实上却没有，只有部分h3触发
      // 就是由于用于操作过快，导致浏览器反应不过来，如果当前回调中有大量业务，有可能出现卡顿情况
      this.currentIndex = index;
    }, */

    // 全部功能函数引入实现节流写法, _.throttle的返回值就是一个函数，所以直接键值对赋值就可以，函数的参数在function中传入即可。
    // changeIndex: _.throttle(function (index) {
    //   this.currentIndex = index;
    // }, 50),
    // 按需引入实现节流写法
    changeIndex: throttle(function (index) {
      this.currentIndex = index;
    }, 50),

    // 一级分类鼠标移出的事件回调
    leaveIndex () {
      // 鼠标移出currentIndex变-1
      this.currentIndex = -1;
      // 判断是不是在search组件中，在search组件中鼠标移开商品分类导航才将商品分类列表隐藏
      if (this.$route.name == 'search') {
        this.show = false;
      }
      if (this.$route.name == 'detail') {
        this.show = false;
      }
    },
    // 当鼠标移入的时候，让商品分类列表进行显示
    enterShow () {
      this.show = true;
    },

    // 进行路由跳转的方法
    goSearch (e) {
      // 最好的解决方法:编程式导航+事件委派。 不好的解决办法:1、将a标签替换为router-link标签。 2、给每一个a标签添加事件。 
      // 好的解决方法存在的一些问题：事件委派，是把全部的子节点（h3,dt,dl,em）的事件委派给了父节点。(即所有子节点都能触发该事件)
      // 问题一：点击a标签的时候，才会进行路由跳转(怎么确定点击的一定是a标签呢)
      // 问题二：存在另一个问题：即使你能确定是a标签，如何区分是一级、二级、三级分类标签

      // 获取触发事件的元素节点
      let element = e.target;
      // 节点上有一个dataset属性,可以获取节点的自定义属性和属性值,返回的是一个对象,我们可以通过es6中的对象解构,拿到里面想要的属性
      // 注意dataset方法会将我们的大写转换为小写，使用对象解构拿数据时要注意。
      let { categoryname, category1id, category2id, category3id } = element.dataset;
      // 问题一解决：如果标签身上拥有categoryname一定是a标签
      if (categoryname) {
        // 整理路由跳转参数
        let location = { name: 'search' }
        let query = { categoryName: categoryname }
        // 问题二解决：一级分类,二级分类,三级分类的a标签
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else {
          query.category3Id = category3id;
        }
        // 整理完参数
        location.query = query;
        if (this.$route.params) {
          location.params = this.$route.params;
        }
        // 路由跳转
        this.$router.push(location);
      }
    }
  },
  mounted () {
    // 注意：如果在跳转时通过指定name跳转的那$route，name为我们指定的值，path为'/'。如果是通过path指定的则name为undefined，path为你指定的值
    if (this.$route.name == 'search') {
      this.show = false;
    }
    if (this.$route.name == 'detail') {
      this.show = false;
    }
  },
  computed: {
    // ...mapState()方法可以更方便的拿到$store.state中的数据，
    // 这里的计算属性是categoryList值是$store.state.home.categoryList
    ...mapState({
      categoryList: state => state.home.categoryList
    })
  },
}
</script>

<style scoped lang="less">
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 28px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }
        }

        .cur {
          background: pink;
        }
      }
    }

    // 过渡动画的样式
    /* .hello-enter 开始状态(进入) */
    .sort-enter {
      height: 0;
      opacity: 0;
    }
    /* .hello-enter 结束状态(进入) */
    .sort-enter-to {
      height: 461px;
      opacity: 1;
    }
    /* 定义动画的时间，速率 */
    .sort-enter-active {
      transition: all 0.5s linear;
    }
  }
}
</style>