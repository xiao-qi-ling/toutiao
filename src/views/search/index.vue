<template>
<div class="search-container">
    <form class="search-from" action="/">
        <van-search v-model="searchText" show-action placeholder="请输入搜索关键词" @search="onSearch" @cancel="onCancel" @focus="isresultshow=false" />
    </form>
    <!-- 搜索结果-->
    <searchresult v-if="isresultshow" :searchText="searchText"></searchresult>
    <!-- 搜索建议-->
    <searchsuggestion v-else-if="searchText" :searchText="searchText" @search="onSearch"></searchsuggestion>
    <!-- 搜索历史-->
    <searchhistory v-else :searchhistorylist="searchhistorylist" @search="onSearch" @deleteall="searchhistorylist=[]"></searchhistory>

</div>
</template>

<script>
import searchhistory from './compents/search-history'
import searchresult from './compents/search-result'
import searchsuggestion from './compents/search-suggestion'
import {
  setitem,
  getitem
} from '@/utils/strong'
export default {
  data () {
    return {
      searchText: '',
      isresultshow: false,
      searchhistorylist: getitem('TOUTIAO_SEARCH_HISTORY') || []
    }
  },
  created () {

  },
  methods: {
    onSearch (val) {
      // console.log(val);
      this.searchText = val
      // 追加历史记录 z最新的排在前面  不要有重复值
      const index = this.searchhistorylist.indexOf(val)
      if (index !== -1) {
        this.searchhistorylist.splice(index, 1)
      }
      this.searchhistorylist.unshift(val)

      this.isresultshow = true
    },
    onCancel () {
      this.$router.back()
    }
  },
  components: {
    searchhistory,
    searchresult,
    searchsuggestion
  },
  watch: {
    searchhistorylist (value) {
      setitem('TOUTIAO_SEARCH_HISTORY', value)
    }
  }
}
</script>

<style lang="less" scoped>
.search-container {
    padding-top: 100px;

    .search-from {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 1;

    }

    .van-search {
        background-color: #3889d9 !important;
    }

    .van-search__action {
        color: #fff;
    }
}
</style>
