<template>
<div class="article-comments">
    <!-- 评论列表 -->
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :error.sync="error" error-text="请求失败，点击重新加载">
        <commentItem v-for="(item,index) in list" :key="index" :commentitem="item"></commentItem>
    </van-list>
    <!-- 评论列表 -->

</div>
</template>

<script>
import {
  getcomment
} from '@/api/comment'

// import commentItem from './comment-item'
export default {
  name: 'ArticleComment',
  props: {

    source: {
      type: [Number, String, Object],
      required: true
    },
    list: {
      type: Array,
      default: () => []
    }

  },
  data () {
    return {
      // list: [], // 评论列表
      loading: false, // 上拉加载更多的 loading
      finished: false, // 是否加载结束
      offset: null,
      error: false,
      limit: 10
    }
  },
  created () {
    this.onLoad()
  },

  methods: {
    async onLoad () {
      // console.log(this.articleId);
      this.loading = true
      // 异步更新数据
      try {
        const {
          data: res
        } = await getcomment({

          type: 'a', // 评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
          source: this.source.toString(), // 源id，文章id或评论id
          offset: this.offset, // 获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
          limit: this.limit // 获取的评论数据个数，不传表示采用后端服务设定的默认每页数据量
        })
        console.log(res)
        const {
          results
        } = res.data
        this.list.push(...results)
        // 关不laoding状态
        this.loading = false
        this.$emit('comments', res.data)
        // 关闭请求状态
        if (results.length) {
          this.offset = res.data.last_id
        } else {
          // 数据请求完成
          this.finished = true
        }
      } catch (err) {
        // console.log(err);
        this.error = true
        this.$toast('服务器请求错误')
      }
    }

  }

}
</script>

<style lang="less" scoped>
.publish-wrap {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
}

.van-list {
    margin-bottom: 45px;

    .van-button--normal {
        border: 0;
    }

    .like {
        color: orange;
    }
}
</style>
