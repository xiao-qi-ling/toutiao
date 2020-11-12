<template>
<div class="comment-post">
    <van-field class="post-field" v-model.trim="message" rows="2" autosize type="textarea" maxlength="50" placeholder="请输入留言" show-word-limit />
    <van-button class="post-btn" @click="addcomments" :disabled="!message.length">发布</van-button>
</div>
</template>

<script>
import {
  addcomment
} from '@/api/article'
export default {
  name: 'CommentPost',
  components: {},
  props: {

    articleId: {
      type: [Number, String, Object],
      required: true
    }

  },
  data () {
    return {
      message: ''
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    // 注册发布点击事件
    async addcomments () {
      if (!this.message) {
        return
      }
      // console.log('11');
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        message: '发布中...',
        forbidClick: true // 是否禁止背景点击
      })
      try {
        const {
          data: res
        } = await addcomment({
          target: this.articleId.toString(), // 评论的目标id（评论文章即为文章id，对评论进行回复则为评论id）
          content: this.message, // 评论内容
          art_id: null // 文章id，对评论内容发表回复时，需要传递此参数，表明所属文章id。对文章进行评论，不要传此参数。

        })
        // console.log(res);
        // 关闭弹层

        // 讲发布内容发布到最顶层

        // 将输入框的内容清空
        this.message = ''
        // 将返回的数据传到父组件
        // console.log(res.data);
        this.$emit('post-success', res.data)
        this.$toast.success('发布成功')
      } catch (err) {
        this.$toast.success('发布失败')
      }
    }
    // 请求提交表单
    // 根据响应结果进行后续处理
  }
}
</script>

<style lang="less" scoped>
.comment-post {
    display: flex;
    align-items: center;
    padding: 32px 0 32px 32px;

    .post-field {
        background-color: #f5f7f9;
    }

    .post-btn {
        width: 150px;
        border: none;
        padding: 0;
        color: #6ba3d8;

        &::before {
            display: none;
        }
    }
}
</style>
