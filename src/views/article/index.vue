<template>
<div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" left-arrow title="黑马头条" @click="this.$router.back()"></van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
        <!-- 加载中  加载一个状态为 loadingstatus  -->
        <div class="loading-wrap" v-if="loadingstatus">
            <van-loading color="#3296fa" vertical>加载中</van-loading>
        </div>
        <!-- /加载中 -->

        <!-- 加载完成-文章详情  当请求完成时articledetails.title为true-->
        <div class="article-detail" v-else-if="articledetails.title">
            <!-- 文章标题 -->
            <h1 class="article-title">{{articledetails.title}}</h1>
            <!-- /文章标题 -->

            <!-- 用户信息 -->
            <van-cell class="user-info" center :border="false">
                <van-image class="avatar" slot="icon" round fit="cover" :src="articledetails.aut_photo" />
                <div slot="title" class="user-name">{{articledetails.aut_name}}</div>
                <div slot="label" class="publish-date">{{articledetails.pubdate | Timeprocessing}}</div>
                <!-- 如果你向子组件传值而且你后面还要修改它   最好是用 v-model 如果有多个数据实现类似 v-model的效果 一个组件只能用一次v-model实现  非要用可以用.sync-->
                <followuser v-model="articledetails.is_followed" :userId="articledetails.aut_id" class="follow-btn"> </followuser>

            </van-cell>
            <!-- /用户信息 -->

            <!-- 文章内容   调用markdown这个组件处理正文的css   直接加上markdown-body 这个类 也可以去定制 -->
            <div class="article-content markdown-body " v-html="articledetails.content" ref="article_content"></div>

            <!-- 底部区域 -->
            <div class="article-bottom">
                <van-button class="comment-btn" type="default" round size="small" @click="oncomment">写评论</van-button>
                <van-icon name="comment-o" :info="commentcount.total_count" color="#777" />

                <!-- 收藏按钮 用组件化安装 -->
                <collectArticle color="#777" v-model="articledetails.is_collected" :articleId="articledetails.art_id"></collectArticle>
                <!-- 点赞按钮 用组件化安装 -->
                <likeArticle v-model="articledetails.attitude" :articleId="articledetails.art_id"></likeArticle>
                <van-icon name="share" color="#777777"></van-icon>
            </div>
            <!-- /底部区域 -->
            <van-divider>正文结束</van-divider>
            <!-- 评论区域-->
            <commentList :source="articledetails.art_id" @comments=" commentcount=$event" :list="commentlist"></commentList>
            <!-- 点击发表评论组件 -->
            <van-popup v-model="iscommentshow" position="bottom">
                <commentpost :articleId="articledetails.art_id" @post-success="onpostsuccess"></commentpost>
            </van-popup>
        </div>
        <!-- /加载完成-文章详情 -->

        <!-- 加载失败：404  当加载失败并errorstatus状态为404是时调用这里-->
        <div class="error-wrap" v-else-if="errorstatus ===404">
            <van-icon name="failure" />
            <p class="text">该资源不存在或已删除！</p>
        </div>
        <!-- /加载失败：404 -->

        <!-- 加载失败：其它未知错误（例如网络原因或服务端异常）  -->
        <div class="error-wrap" v-else>
            <van-icon name="failure" />
            <p class="text">内容加载失败！</p>

            <!-- 加载失败：其它未知错误点击按钮开始重新加载就是调用loadingarticledetails -->
            <van-button class="retry-btn" @click="loadingarticledetails">点击重试</van-button>
        </div>
        <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>

</div>
</template>

<script>
import {
  getarticleDetails
} from '@/api/article'
import {
  ImagePreview
} from 'vant'

import followuser from '@/components/followed'
import collectArticle from '@/components/collect'
import likeArticle from '@/components/like-Ariticle'
// import commentArticle from '@/components/comment'
import commentpost from '@/components/commentPost'
import commentList from './components/commentlist'

export default {
  name: 'ArticleIndex',
  components: {
    followuser,
    collectArticle,
    likeArticle,
    commentList,
    commentpost
  },

  props: {
    //   路由传参 传过来的参数
    articleId: {
      type: [Number, String, Object],
      required: true

    }
  },
  data () {
    return {
      // 获取文章详情的对象
      articledetails: {},
      // 控制loading加载状态
      loadingstatus: true,
      // 判断错误状态是否为404
      errorstatus: 0,
      // 控制显示loading
      followloading: false,
      // 评论子组件传过来的
      commentcount: 0,
      // 控制评论弹出层
      iscommentshow: false,
      // 评论列表
      commentlist: []

    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadingarticledetails()
  },
  mounted () {},
  methods: {
    async loadingarticledetails () {
      try {
        // 发送请求获取数据
        const {
          data: res
        } = await getarticleDetails(this.articleId)
        // console.log(res);
        this.articledetails = res.data

        // 因为vue中代码加载不是实时的   因为加了判断所以得加个定时器
        setTimeout(() => {
          // 调用下面的articleImgpeviews  实现图片预览功能
          this.articleImgpeviews()
        }, 0)
      } catch (err) {
        // 当发生错误并错误为404 时
        if (err.response && err.response.status === 404) {
          this.errorstatus = 404
        }
      }
      this.loadingstatus = false
    },
    articleImgpeviews () {
      // 通过refs拿到指定的ref  $refs是一个数组

      const contentdiv = this.$refs.article_content
      // 获取div中的img
      const imgs = contentdiv.querySelectorAll('img')
      // 调用ImagePreview 是  要传入地址数组  这就是获取所以图片的数组
      const images = []
      // console.log(imgs);
      imgs.forEach((img, index) => {
        images.push(img.src)
        // 图片点击时预览
        img.onclick = () => {
          ImagePreview({
            // es6的写法  传入上面写的数组
            images,
            // 起始位置，从0开始
            startPosition: index
          })
        }
      })
      // console.log(images);
    },
    oncomment () {
      this.iscommentshow = true
    },
    onpostsuccess (data) {
      // 关闭评论弹出层
      this.iscommentshow = false
      this.commentlist.unshift(data.new_obj)
    }

  }
}
</script>

<style lang="less" scoped>
@import './github-markdown.css';

.article-container {
    .main-wrap {
        position: fixed;
        left: 0;
        right: 0;
        top: 92px;
        bottom: 88px;
        overflow-y: scroll;
        background-color: #fff;
    }

    .article-detail {
        .article-title {
            font-size: 40px;
            padding: 50px 32px;
            margin: 0;
            color: #3a3a3a;
        }

        .user-info {
            padding: 0 32px;

            .avatar {
                width: 70px;
                height: 70px;
                margin-right: 17px;
            }

            .van-cell__label {
                margin-top: 0;
            }

            .user-name {
                font-size: 24px;
                color: #3a3a3a;
            }

            .publish-date {
                font-size: 23px;
                color: #b7b7b7;
            }

            .follow-btn {
                width: 170px;
                height: 58px;
            }
        }

        .article-content {
            padding: 55px 32px;

            /deep/ p {
                text-align: justify;
            }
        }
    }

    .loading-wrap {
        padding: 200px 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #fff;
    }

    .error-wrap {
        padding: 200px 32px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: #fff;

        .van-icon {
            font-size: 122px;
            color: #b4b4b4;
        }

        .text {
            font-size: 30px;
            color: #666666;
            margin: 33px 0 46px;
        }

        .retry-btn {
            width: 280px;
            height: 70px;
            line-height: 70px;
            border: 1px solid #c3c3c3;
            font-size: 30px;
            color: #666666;
        }
    }

    .article-bottom {
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        justify-content: space-around;
        align-items: center;
        box-sizing: border-box;
        height: 88px;
        border-top: 1px solid #d8d8d8;
        background-color: #fff;

        .comment-btn {
            width: 282px;
            height: 46px;
            border: 2px solid #eeeeee;
            font-size: 30px;
            line-height: 46px;
            color: #a7a7a7;
        }

        /deep/ .van-icon {
            font-size: 40px;

            .van-info {
                font-size: 16px;
                background-color: #e22829;
            }
        }
    }
}
</style>
