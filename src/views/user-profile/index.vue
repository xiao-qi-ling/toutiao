<template>
<div class="userprofile">
    <van-nav-bar title="个人信息" left-arrow class="page-nav-bar" @click-left="$router.back()" />
    <van-cell-group>
        <input type="file" ref="file" class="file" @change="onchange">
        <van-cell title="头像" is-link>

            <van-image width="30" height="30" fit="cover" round :src="userprofile.photo" @click="$refs.file.click()" />
        </van-cell>
        <van-cell title="昵称" :value="userprofile.name" is-link @click="isprofileshow =true" />
        <van-cell title="性别" :value="userprofile.gender>0? '男' :'女'" is-link @click="isgendershow =true" />

        <van-cell title="生日" :value="userprofile.birthday" is-link @click="isbirthdayshow=true" />
        <!--处理弹出修改昵称 -->
        <van-popup v-model="isprofileshow" position="bottom" class="profileshow">
            <nikename v-model="userprofile.name" @close="isprofileshow=false" v-if="isprofileshow"></nikename>
        </van-popup>
        <!--处理弹出修改性别-->
        <van-popup v-model="isgendershow" position="bottom">

            <gender v-model="userprofile.gender" @close="isgendershow=false" v-if="isgendershow"></gender>
        </van-popup>
        <!--处理弹出修改生日-->
        <van-popup v-model="isbirthdayshow" position="bottom">

            <bridthday v-model="userprofile.birthday" @close="isbirthdayshow=false" v-if="isbirthdayshow"></bridthday>
        </van-popup>
        <!--处理弹出修改头像-->
        <van-popup v-model="isphotoshow" position="bottom" style="height:100%">

            <updatephoto :img="img" @close="isphotoshow=false" v-if="isphotoshow" @updataphoto="userprofile.photo=$event"></updatephoto>
        </van-popup>
    </van-cell-group>

</div>
</template>

<script>
import {
  getuserprofile
} from '@/api/user'
import nikename from './components/nikename'
import gender from './components/gender'
import bridthday from './components/bridthday'
import updatephoto from './components/update-photo'

export default {
  name: 'profile',
  data () {
    return {
      userprofile: {},
      isprofileshow: false,
      // 控制性别弹出层
      isgendershow: false,
      // 控制生日弹出层
      isbirthdayshow: false,
      // 控制修改头像
      isphotoshow: false,
      // 选中图片的地址
      img: null
    }
  },
  methods: {
    async getuserprofiles () {
      try {
        // 请求个人资料
        const {
          data
        } = await getuserprofile()
        // console.log(data);
        this.userprofile = data.data
      } catch (err) {
        this.$toast('请求失败')
      }
    },
    onchange () {
      // 首先要拿到图片的地址
      const file = this.$refs.file.files[0]
      // 把自己选中的图片传给子组件
      this.img = window.URL.createObjectURL(file)
      this.isphotoshow = true

      // 同事点击两个相同文件名change事件并不会触发   解决办法就是使用完毕把他的value值重置Wie空
      this.$refs.file.value = ''
    }
  },
  props: {

  },

  created () {
    this.getuserprofiles()
  },
  components: {
    nikename,
    gender,
    bridthday,
    updatephoto
  }
}
</script>

<style lang="less" scoped>
.userprofile {
    /deep/ .van-nav-bar .van-icon {
        color: #fff;
    }

    .profileshow {
        height: 100%;
        background-color: #F6F7FA;
    }

    .file {
        display: none;
    }
}
</style>
