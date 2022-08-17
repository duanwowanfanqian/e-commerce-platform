<template>
  <div>
    <!-- 三级联动全局组件：三级联动已注册为全局组件，因此不需要再引入 -->
    <TypeNav></TypeNav>
    <ListContainer />
    <TodayRecommend />
    <Rank />
    <Like />
    <Floor v-for="floor in floorList" :key="floor.id" :list="floor" />
    <Brand />

  </div>
</template>

<script>
import ListContainer from './ListContainer'
import TodayRecommend from './TodayRecommend'
import Rank from './Rank'
import Like from './Like'
import Floor from './Floor'
import Brand from './Brand'
import { mapState } from 'vuex'

export default {
  name: 'Home',
  mounted () {
    // 获取floor组件的数据
    this.$store.dispatch('getFloorList');
  },
  computed: {
    ...mapState({
      floorList: state => state.home.floorList
    })
  },
  components: {
    ListContainer,
    TodayRecommend,
    Rank,
    Like,
    Floor,
    Brand
  }
}

</script>

<style lang="less" scoped>
</style>