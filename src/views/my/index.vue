<template>
<div>
    <div v-if="user" class="  user-info">
        <div class="hd-states">
            <div class="left">
                <van-image :src="userinfo.photo" round fit="cover" />
                <span>{{userinfo.name}}</span>

            </div>
            <div class="right">

                <van-button size="mini" round to="/user/profile">编辑资料</van-button>
            </div>

        </div>
        <div class="data-states">

            <div class="data-item">
                <span class="count">{{userinfo.art_count}}</span>
                <span class="text">头条</span>

            </div>
            <div class="data-item">
                <span class="count">{{userinfo.follow_count}}</span>
                <span class="text">关注</span>

            </div>
            <div class="data-item">
                <span class="count">{{userinfo.fans_count}}</span>
                <span class="text">粉丝</span>

            </div>
            <div class="data-item">
                <span class="count">{{userinfo.like_count}}</span>
                <span class="text">获赞</span>

            </div>
        </div>

    </div>
    <div v-else class="header">
        <!--  点击跳转到登录页面-->

        <div class="loginout" @click="$router.push('/login')">
            <img src="~@/assets/mobile.png" alt="">
            <span>登录 / 注册</span>

        </div>

    </div>
    <!--  已登录页面头部-->

    <!-- 宫格导航-->

    <van-grid :column-num="2" clickable class="grid">
        <van-grid-item class="grid-item">
            <i slot="icon" class="toutiao toutiao-shoucang"></i>
            <span class="text" slot="text">收藏</span>

        </van-grid-item>
        <van-grid-item class="grid-item">
            <i slot="icon" class="toutiao toutiao-lishi"></i>
            <span class="text" slot="text">历史</span>

        </van-grid-item>

    </van-grid>
    <!-- cell单元格-->
    <van-cell title="消息通知" is-link />
    <van-cell title="小智同学" is-link />
    <van-cell center class="loginout" v-if="user" @click="onloginout" clickable>
        <span slot="title">退出登录</span>

    </van-cell>

</div>
</template>

<script>
import {
  mapState
} from 'vuex'
import {
  getuserinfo
} from '@/api/user'
export default {
  name: 'myIndex',
  data () {
    return {
      // 请求返回的用户信息
      userinfo: {}
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    onloginout () {
      this.$dialog.confirm({
        title: '是否确认退出',
        message: '弹窗内容'
      })
        .then(() => {
          // 确认走这里
          this.$store.commit('setuserkey', null)
        })
        .catch(() => {
          // 取消走这里
          this.$toast.fail('取消退出')
        })
    }
  },
  async created () {
    // 发起请求用户信息的请求
    const {
      data: res
    } = await getuserinfo()
    this.userinfo = res.data
    // console.log(this.userinfo);
  }

}
</script>

<style lang="less" scoped>
.header {
    height: 361px;
    background: url('~@/assets/banner.png');
    background-size: cover;
    // background-color: pink;
    display: flex;
    justify-content: center;
    align-content: center;

    .loginout {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-content: center;

        img {
            height: 137px;
            width: 135px;
        }

        span {
            color: #fff;
            font-size: 26px;
        }
    }

}

.user-info {
    height: 361px;
    background: url('~@/assets/banner.png');
    background-size: cover;

    .hd-states {
        display: flex;
        padding: 77px 32px 26px;
        box-sizing: border-box;
        justify-content: space-between;
        align-items: center;
        height: 231px;

        .left {

            display: flex;

            align-items: center;

            .van-image {
                width: 136px;
                height: 136px;
                margin-right: 15px;
                border: 3px solid #fff;

            }

            span {
                // transform: translateY(50%);
                font-size: 30px;
                color: #fff;
            }
        }
    }

    .data-states {
        height: 130px;
        display: flex;

        .data-item {
            flex: 1;

            color: #fff;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            .count {
                font-size: 0.55rem;
            }

            .text {
                font-size: 0.3rem;
            }

        }
    }
}

.grid {
    .grid-item {
        i.toutiao {
            font-size: 48px;
            color: #ee6e6f;
        }

        span.text {
            font-size: 20px;
        }

        i.toutiao-lishi {
            color: #ffa836;
        }
    }
}

.loginout {
    text-align: center;
    color: #d86262;
    font-size: 32px;
}
</style>
