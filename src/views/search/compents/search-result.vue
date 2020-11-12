<template>
<div class="search-result">
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :error.sync="error" error-text="请求失败，点击重新加载">
        <van-cell v-for="(res,index) in list" :key="index" :title="res.title" />
    </van-list>
</div>
</template>

<script>
import {
  getsearchresult
} from '@/api/search'
export default {
  data () {
    return {
      list: [],
      loading: false,
      finished: false, // 加载完毕显示提示控制
      page: 1, // 传递要加在的页码
      error: false // 控制加载错误时错误的显示
    }
  },
  created () {

  },
  methods: {
    async onLoad () {
      try { // 异步更新数据
        const {
          data: res
        } = await getsearchresult({
          page: this.page, // 字符的页码
          per_page: 20, // m每页的数量
          q: this.searchText // 关键词
        })
        // console.log(res);
        const {
          results
        } = res.data
        this.list.push(...results)
        this.loading = false // 结束loading加载状态
        // 判断数据是否完全加载完毕
        if (results.length) {
          // 还有数据没有加载完毕
          this.page++
        } else {
          this.finished = true
        }
      } catch (err) {
        // 加载失败  控制错误提示
        this.error = true
        // 错误的时候关闭loading
        this.loading = false
      }
    }

  },
  props: {
    searchText: {
      type: String,
      required: true
    }
  }
}
</script>

<style>

</style>
