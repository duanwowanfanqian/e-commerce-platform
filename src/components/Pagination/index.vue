<template>
  <!-- 分页器 -->
  <div class="pagination">
    <!-- 上 , disabled让按钮失效-->
    <button :disabled="pageNo==1" @click="$emit('getPageNo',pageNo-1)">上一页</button>
    <button v-if="startNumAndEndNum[0]>1" @click="$emit('getPageNo',1)" :class="{'active':pageNo==1}">1</button>
    <button v-if="startNumAndEndNum[0]>2">···</button>

    <!-- 中间部分 -->
    <button v-for="(i,index) in startNumAndEndNum" :key="index" @click="$emit('getPageNo',i)" :class="{'active':pageNo==i}">{{i}}</button>

    <!-- 下 -->
    <button v-if="startNumAndEndNum[continues-1]<totalPage-1">···</button>
    <button v-if="startNumAndEndNum[continues-1]<totalPage" @click="$emit('getPageNo',totalPage)" :class="{'active':pageNo==totalPage}">{{totalPage}}</button>
    <button :disabled="pageNo==totalPage" @click="$emit('getPageNo',pageNo+1)">下一页</button>

    <button style="margin-left: 30px">共{{totalPage}}条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  // 分别表示：当前第几页，一页多少条数据，总共有多少数据，连续页码数
  props: ['pageNo', 'pageSize', 'total', 'continues', 'getPageNo'],
  computed: {
    // 总共多少页
    totalPage () {
      // Math.ceil向上取整
      return Math.ceil(this.total / this.pageSize)
    },
    // 计算出连续的页码的起始数字与结束数字
    startNumAndEndNum () {
      // 通过解构拿到vc上的连续页码数，第几页及总共多少页，这样我们就可以不用this了
      const { continues, pageNo, totalPage } = this;
      // 先定义两个变量存储起始数字与结束数字
      let start = 0, end = 0;
      // 连续页码数5(就是最少5页)
      // 不正常现象：当总页数小于连续页码数时，我们将起始数设为一，结束数设为总页数
      if (totalPage < continues) {
        start = 1;
        end = totalPage;
      } else {
        // 正常现象，总页数大于连续页码数
        start = pageNo - parseInt(continues / 2);
        end = pageNo + parseInt(continues / 2);
        // 不正常现象：起始页出现小于一的数，将其纠正
        if (start < 1) {
          start = 1;
          end = continues;
        }
        // 不正常现象：结束页出现大于总页数的数，将其纠正
        if (end > totalPage) {
          end = totalPage;
          start = totalPage - continues + 1;
        }
      }
      // 将连续页码变为一个数组方便生成DOM
      let arr = [];
      for (let i = start; i <= end; i++) {
        arr.push(i);
      }
      return arr;
    }
  }

};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
.active {
  background: skyblue;
}
</style>
