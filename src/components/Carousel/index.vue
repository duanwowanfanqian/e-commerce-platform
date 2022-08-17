<template>
  <!--banner轮播-->
  <div class="swiper-container" id="mySwiper" ref="cur">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="carousel in list" :key="carousel.id">
        <img :src="carousel.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
export default {
  name: 'Carousel',
  props: ['list'],
  watch: {
    list: {
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
