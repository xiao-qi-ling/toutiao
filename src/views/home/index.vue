<template>
<div class="home-contair">
    <van-nav-bar class="page-nav-bar" fixed>
        <van-button class="search-btn" slot="title" type="info" round size="small" icon="search" to="/search">搜索 </van-button>
    </van-nav-bar>
    <van-tabs v-model="active" animated swipeable class="chanle-tabs">
        <van-tab :title="channel.name" v-for="channel in channels" :key="channel.id">
            <!--向 子组件传值 -->
            <articlelist :channel="channel"></articlelist>
        </van-tab>

        <div slot="nav-right" class="placeheadle"></div>
        <div slot="nav-right" class="gengduo-btn" @click="ischanneleditshow=true">
            <i class="toutiao toutiao-gengduo"></i>
        </div>
    </van-tabs>
    <van-popup v-model="ischanneleditshow" position="bottom" closeable close-icon="close" close-icon-position="top-left" :style="{ height: '100%' }">

        <channlelist :mychannle="channels" :active="active" @updata-Active="onupdataActive" />

    </van-popup>
</div>
</template>

<script>
import {
  getchannels
} from '@/api/user'
import articlelist from './compents/Aricter-list'
import channlelist from './compents/channel-list'
import {
  mapState
} from 'vuex'
import {
  getitem
} from '@/utils/strong'
export default {
  name: 'homeIndex',
  data () {
    return {
      active: 0,
      channels: [],
      ischanneleditshow: false
    }
  },
  created () {
    this.gethomechannels()
  },

  methods: {
    async gethomechannels () {
      try {
        let channles = []
        if (this.user) {
          // 已登录

          const {
            data: res
          } = await getchannels()
          channles = res.data.channels
        } else {
          // 未登录 获取本地存储的列表
          const localchannle = getitem('TOUTIAO_CHANNLE')
          if (localchannle) {
            // 如果本地有就获取本地的   如果本地没有发送请求获取默认列表
            channles = localchannle
          } else {
            const {
              data: res
            } = await getchannels()
            channles = res.data.channels
          }
        }

        // console.log(res);
        this.channels = channles
      } catch (err) {
        console.log(err)
        this.$toast('获取文章列表数据失败')
      }
    },
    onupdataActive (index, ischanneleditshow = true) {
      // console.log(index);
      this.active = index
      this.ischanneleditshow = ischanneleditshow
    }

  },
  components: {
    articlelist,
    channlelist,
    ...mapState(['user'])
  }
}
</script>

<style lang="less" scoped>
.home-contair {
    margin-bottom: 100px;

    .page-nav-bar {
        /deep/ .van-nav-bar__title {
            max-width: unset;
        }

        .search-btn {
            width: 550px;
            height: 63px;
            font-size: 30px;
            background-color: #5babfb;
            border: 0s;
        }

        .van-icon {
            color: #fff;
            font-size: 35px;
        }
    }

    /deep/ .chanle-tabs {
        .van-tabs__content--animated {
            margin-top: 176px;
        }

        .van-tabs__wrap {
            height: 82px;
            position: fixed;
            top: 92px;
            z-index: 1;
            left: 0;
            right: 0;

        }

        .van-tab {
            width: 200px;

            border-right: 1px solid #ccc;
        }

        .van-tabs__line {
            width: 33px;
            height: 6px;
            background-color: #3296fa;
            bottom: 8px;

        }

        .van-tabs__nav {
            padding-bottom: 0;

        }

        .placeheadle {
            flex-shrink: 0;
            width: 66px;
            height: 82px;
        }

        .gengduo-btn {
            position: fixed;
            right: 0;
            display: flex;
            justify-content: center;

            align-items: center;
            width: 66px;
            height: 82px;
            background-color: #fff;
            opacity: 0.9;

            i.toutiao-gengduo {
                font-size: 35px;
            }

            &::before {
                content: '';
                position: absolute;
                left: 0;
                background-image: url('../../assets/gradient-gray-line.png');
                background-size: contain;
                width: 1px;

                height: 100%;
            }
        }
    }

}
</style>
