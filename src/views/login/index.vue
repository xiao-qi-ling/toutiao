<template>
<div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" title="登录">
        <template #left>

            <van-icon name="cross" size="18" @click="$router.back()" />
        </template>

    </van-nav-bar>
    <!-- /导航栏 -->

    <!-- 登录表单 -->
    <van-form @submit="onSubmit" ref="loginref">
        <van-field v-model="user.mobile" name="moblie" placeholder="请输入手机号" :rules="loginfromrules.mobile" type="number" maxlength="11">
            <i slot="left-icon" class="toutiao toutiao-shouji"></i>
        </van-field>
        <van-field v-model="user.code" name="code" placeholder="请输入验证码" :rules="loginfromrules.code" type="number" maxlength="6">
            <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
            <template #button>
                <!-- 倒计时时间-->
                <van-count-down :time="1000 *10" format="ss s" v-if="iscountdown" @finish="iscountdown=false" />
                <van-button class="send-sms-btn" round size="small" type="default" @click="sendsms" native-type="button" v-else>发送验证码</van-button>
            </template>
        </van-field>
        <div class="login-btn-wrap">
            <van-button class="login-btn" block type="info" native-type="submit">
                登录
            </van-button>
        </div>
    </van-form>
    <!-- /登录表单 -->
</div>
</template>

<script>
import {
    login,
    sendsms
} from '@/api/user'

export default {
    name: 'LoginIndex',
    components: {},
    props: {},
    data() {
        return {
            user: {
                mobile: '13911111111', // 手机号
                code: '246810' // 验证码
            },
            // 验证规则
            loginfromrules: {
                mobile: [{
                    required: true,
                    message: '请填写手机号码'
                }, {
                    pattern: /^1[3|5|8]\d{9}/,
                    message: '手机号码格式错误'
                }],
                code: [{
                    required: true,
                    message: '请填写验证码'
                }, {
                    pattern: /\d{6}/,
                    message: '验证码格式错误'
                }]

            },
            // 控制倒计时显示和隐藏
            iscountdown: false
        }
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {},
    methods: {
        async onSubmit() {
            // 1. 获取表单数据
            const user = this.user

            // TODO: 2. 表单验证
            this.$toast.loading({
                message: '加载中...',
                forbidClick: true,
            });
            // 3. 提交表单请求登录
            try {
                const {
                    data: res
                } = await login(user)
                // console.log('登录成功', res.data)
                // console.log(this.$store);
                this.$store.commit('setuserkey', res.data)
                this.$toast.success('登录成功')
                // // 登录成功跳转回原来页面。这种方式有缺陷
                this.$router.back()
            } catch (err) {
                // console.log(err);
                if (err.response.status === 400) {
                    // console.log('手机号或验证码错误')
                    this.$toast.fail('手机号或验证码错误')

                } else {
                    // console.log('登录失败，请稍后重试', err)
                    this.$toast.fail('登录失败，请稍后重试')

                }
            }

            // 4. 根据请求响应结果处理后续操作
        },
        async sendsms() {
            // console.log('ss');
            // 校验手机号码
            try {
                await this.$refs.loginref.validate('moblie')
                this.$toast.success('验证成功')
                // console.log('验证成功');

            } catch (err) {
                return this.$toast.fail('验证失败')
            }
            // 倒计时显示和隐藏
            this.iscountdown = true
            // 发送验证码

            try {
                const res = await sendsms(this.user.mobile)
                // console.log(res);
                this.$toast.success('验证成功')
            } catch (err) {
                if (err.response.status === 429) {
                    this.$toast.fail('发送太频繁')
                }
                this.$toast.fail('验证失败,请稍后重试')
            }

        }
    }
}
</script>

<style lang="less" scoped>
.login-container {
    .van-nav-bar {
        .van-icon {
            color: #fff;
        }
    }

    .toutiao {
        font-size: 37px;
    }

    .send-sms-btn {
        width: 180px;
        height: 46px;
        line-height: 46px;
        background-color: #ededed;
        font-size: 22px;
        color: #666;
    }

    .login-btn-wrap {
        padding: 53px 33px;

        .login-btn {
            background-color: #6db4fb;
            border: none;
        }
    }
}
</style>
