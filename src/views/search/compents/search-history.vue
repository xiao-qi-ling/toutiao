<template>
<div class="search-history">
    <van-cell title="搜索历史">
        <div v-if="isdeleteshow">
            <span @click="$emit('deleteall')">全部删除</span>&nbsp;&nbsp;
            <span @click="isdeleteshow=false">完成</span>
        </div>
        <van-icon name="delete" v-else @click="isdeleteshow=true" />
    </van-cell>
    <van-cell :title="item" @click="$emit('search',item)" v-for="(item,index)  in searchhistorylist" :key="index">
        <van-icon name="close" v-show="isdeleteshow" @click.stop="searchhistorylist.splice(index,1)" />
    </van-cell>

</div>
</template>

<script>
// import {
//     getsearchhistory
// } from '@/api/search'
export default {
  data () {
    return {
      isdeleteshow: false
    }
  },
  created () {
    // this.loadgetsearchhistory()
  },
  methods: {
    // 请求接口的做法
    // async loadgetsearchhistory() {
    //     const {
    //         data: res
    //     } = await getsearchhistory()

    //     console.log(res);

    // }

  },
  props: {
    searchhistorylist: {
      type: Array,
      required: true
    }
  }

}
</script>

<style lang="less" scoped>
.search-history {
    .van-icon-close {
        width: 20px;
        height: 30px;
        font-size: 40px;
        margin-right: 20px;
    }
}
</style>
