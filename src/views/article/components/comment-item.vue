<template>
<van-cell :title="commentitem.aut_name">
    <van-image slot="icon" round width="30" height="30" style="margin-right: 10px;" :src="commentitem.aut_photo" />
    <span style="color: #466b9d;" slot="title">hello</span>
    <div slot="label">
        <p style="color: #363636;">{{commentitem.content}}</p>
        <p>
            <span style="margin-right: 10px;">{{commentitem.pubdate}}</span>
            <van-button size="mini" type="default">回复{{commentitem.reply_count}}</van-button>
        </p>
    </div>
    <van-button slot="right-icon" :icon="commentitem.is_liking ? 'like' : 'like-o' " :class=" {
              like: commentitem.is_liking  }" @click="islike(item)">{{commentitem.like_count || '赞'}}</van-button>
</van-cell>
</template>

<script>
import {
  deletelikecomment,
  addlikecomment
} from '@/api/article'
// import {
//     observable
// } from 'vue/types/umd'
export default {
  name: 'commentitems',
  data () {
    return {

    }
  },
  methods: {
    async islike (item) {
      this.loading = true

      try {
        if (item.is_liking) {
          // 已经点赞的用户取消点赞
          await deletelikecomment(item.com_id)
        } else {
          // 点赞评论
          await addlikecomment(item.com_id)
        }
        this.loading = !this.loading
        // 更改视图状态   子组件传参!this.value
        this.$emit('islike', item.is_liking)
        // this.$toast(status === 1 ? '点赞文章' : '取消点赞')
      } catch (err) {
        console.log(err)
        let message = '请求错误请稍后重试'
        if (err.response && err.response.status === 400) {
          message = '你不能点赞你自己'
        }
        this.$toast(message)
      }
    }
  },
  props: {
    commentitem: {
      type: Object,
      required: true
    }
  }
}
</script>

<style>

</style>
