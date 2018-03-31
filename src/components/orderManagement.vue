<template>
    <div class="order-management">
        <div class="header">
            订单管理
        </div>
        <ul class="tabs">
            <li v-for="(item, index) in tabs" v-bind:key="index" class="tab-item" v-bind:class="{ active: item.isActive}" @click="tabSwitch(item)">{{item.name}}</li>
        </ul>
        <foot-guide></foot-guide>
    </div>
</template>

<script>
// import {getComanyList} from './../service/getData'
import footGuide from './footGuide'
export default {
    name: 'orderManagement',
    data () {
        return {
            activeName: 'all',
            tabs: [
                {
                    name: '全部',
                    isActive: true
                },
                {
                    name: '处理中',
                    isActive: false
                },
                {
                    name: '已完成',
                    isActive: false
                }
            ]
        }
    },
    components: {
        footGuide
    },
    mounted () {
        this.active = this.tabs[0]
    },
    methods: {
        tabSwitch (tab) {
            this.active.isActive = false
            tab.isActive = true
            this.active = tab
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import 'src/style/config';
.order-management {
    .header {
        @include font(16px, 49px);
        text-align: center;
        color: $fc;
        border-bottom: 1px solid $borcd;
        background-color: $white;
    }
    .tabs {
        display: flex;
        border-bottom: 1px solid #aaaaaa;
        height: 35px;
        font-size: 14px;
        .tab-item {
            width: 33.33%;
            height: 100%;
            line-height: 35px;
            text-align: center;
        }
        .active {
            color: #5eacf0;
            border-bottom: 2px solid #5eacf0;
        }
    }
}
</style>
