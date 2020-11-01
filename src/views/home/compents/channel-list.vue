<template>
<div class="channle-list">

    <van-cell-group>
        <van-cell>
            <div class="title-text" slot="title"> 我的频道</div> <!-- 取反实现控制关闭按钮显示和隐藏-->
            <van-button type="default" plain round size="mini" @click="isshowiconclear= !isshowiconclear">{{isshowiconclear ?'完成': '编辑'}}</van-button>
        </van-cell>
        <van-grid :gutter="10">
            <van-grid-item v-for="(channle,index) in mychannle" :key="index" class="grid-item" @click="onmyChannleclick(channle,index)">
                <!-- 实现控制固定的频道不能被关闭-->
                <van-icon slot="icon" name="clear" v-show="isshowiconclear &&!flexchannles.includes(channle.id)"></van-icon>
                <span slot="text" :class="{ active: index===active}">{{channle.name}}</span>

            </van-grid-item>
        </van-grid>

    </van-cell-group>
    <div>
        <van-cell>
            <div class="title-text" slot="title"> 频道推荐</div>

        </van-cell>
        <van-grid :gutter="10">
            <van-grid-item v-for="(channle,index) in recommandchannle" :key="index" :text="channle.name" icon="plus" class="grid-item recommend-grid" @click="changechannle(channle)" />
        </van-grid>
    </div>
</div>
</template>

<script>
import {
    getAllchannles,
    addchannles,
    deletechannles
} from '@/api/channle'

import {
    mapState
} from 'vuex'

import {
    setitem
} from '@/utils/strong'
export default {
    data() {
        return {
            channels: [],
            isshowiconclear: false,
            flexchannles: [0]
        }
    },
    methods: {
        async getAllchannle() {
            try {
                const {
                    data: res
                } = await getAllchannles()
                // console.log(res);
                this.channels = res.data.channels
            } catch (err) {
                console.log(err);
            }
        },
        async changechannle(channle) {
            this.mychannle.push(channle)

            if (this.user) {
                // 已登录状态
                try {
                    const {
                        data: res
                    } = await addchannles([{
                        id: channle.id,
                        seq: this.mychannle.length
                    }])
                } catch (err) {
                    console.log(err);
                    this.$toast('请求失败')
                }

            } else {
                // 未登录状态
                setitem('TOUTIAO_CHANNLE', this.mychannle)
            }

        },
        async onmyChannleclick(channle, index) {
            // console.log(channle, index);
            if (this.isshowiconclear) {
                if (this.flexchannles.includes(channle.id)) {
                    return
                }
                if (index <= this.active) {
                    this.$emit('updata-Active', this.active - 1)
                }
                //    删除频道

                if (this.user) {
                    // 已登录状态
                    try {
                        const {
                            data: res
                        } = await deletechannles(channle.id)
                    } catch (err) {
                        console.log(err);
                        this.$toast('请求失败')
                    }

                } else {
                    // 未登录状态
                    setitem('TOUTIAO_CHANNLE', this.mychannle)
                }

                this.mychannle.splice(index, 1)
            } else {
                //    编辑切换频道

                this.$emit('updata-Active', index, false)
                // console.log(this.$emit);
            }
        }
    },
    created() {
        this.getAllchannle()
    },
    props: {
        mychannle: {
            type: Array,
            required: true
        },
        active: {
            type: Number,
            required: true
        }
    },
    computed: {
        // 计算推荐频道   就是所有频道减去我的频道
        recommandchannle() {
            // 计算属性要返回 filter返回的是一个数组    find是根据查找这个条件满足的值
            return this.channels.filter(channel => {
                return !this.mychannle.find(mychannle => {
                    return mychannle.id === channel.id
                })
            })
        },
        ...mapState(['user'])
    }
}
</script>

<style lang="less" scoped>
.channle-list {
    margin-top: 85px;

    /deep/ .van-button {
        border: 1px solid #f85a5a;

        .van-button__content {
            width: 103px;
            height: 48px;
            font-size: 30px;
            color: #fb9d9d;
        }
    }

    /deep/ .grid-item {
        font-size: 27px;

        .van-grid-item__content {
            white-space: nowrap;
            flex-direction: row;
            background-color: #f4f5f6;

            .van-icon-plus {
                font-size: 24px;
                color: #222222;
                margin-right: 6px;
            }

            .van-grid-item__text {
                margin-top: 0;
                color: #575757;
            }

            .van-icon-clear {
                font-size: 15px;
                color: #ccc;
                position: absolute;
                top: -10px;
                right: -10px;
            }
        }

        .active {
            color: red;
        }

        .van-grid-item__icon-wrapper {
            position: unset;
        }

    }

}
</style>
