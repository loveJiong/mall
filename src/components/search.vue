<template>
    <div class="search">
        <div class="header" @click.stop="''">
            <router-link :to="{name: 'groupDetail' , params: { refresh: true, secondary: this.secondary }}" class="el-icon-arrow-left"></router-link>
            <input class="input-search" type="text" placeholder="输入品名或货号" v-model="searchText">
            <a class="el-icon-search" @click="search"></a>
        </div>
        <div class="loading" v-loading="loading">
            <ul class="container">
                <li v-for="(good, index) in goods" v-bind:key="index">
                    <div class="good-num" v-if="good.num > 0">{{good.num}}</div>
                    <div class="good-no">REF:{{good.no}}</div>
                    <div class="good-img">
                        <img class="good-img-icon" v-bind:src="good.url" alt="图片">
                    </div>
                    <span>{{good.name}}</span>
                    <div>
                        <div class="good-detail">
                            <span class="good-count">库存：{{good.count}}</span>
                            <span class="good-pck">包装数：{{good.boxCount}}/{{good.bagCount}}</span>
                        </div>
                        <span v-if="good.zk == '0'" class="price">{{good.price}}€</span>
                        <div v-if="good.zk != '0'" class="have-zk">
                            <span class="zk-price">{{zkPrice(good.price, good.zk)}}€</span>
                            <span class="origin-price">{{good.price}}</span>
                            <span class="zk">(-{{good.zk}}%)</span>
                        </div>
                        <div class="add-remove">
                            <i class="el-icon-remove" @click="removeToCart(good)" v-if="good.num > 0"></i>
                            <i class="el-icon-circle-plus" @click="addToCart(good)"></i>
                        </div>
                    </div>
                </li>
                <div class="no-goods" v-if="goods.length === 0">
                    <i class="el-icon-warning"></i>
                    <span class="title">{{noGoods.title}}</span>
                </div>
            </ul>
        </div>
    </div>

</template>

<script>
import {search} from './../service/getData'
export default {
    name: 'search',
    data () {
        return {
            tabPosition: 'left',
            searchText: '',
            goods: [],
            noGoods: {
                title: '输入品名或货号进行搜索'
            },
            loading: false,
            secondary: ''
        }
    },
    computed: {
        activeCompany () {
            return this.$store.state.activeCompany
        },
        cart () {
            return this.$store.state.activeOrder || this.$store.state.cart
        }
    },
    mounted () {
        document.querySelector('body').setAttribute('style', 'background:#ffffff')
    },
    beforeDestroy () {
        document.querySelector('body').setAttribute('style', '')
    },
    methods: {
        async search () {
            if (this.searchText) {
                this.loading = true
                let scroll = document.getElementsByClassName('container')[0]
                let searchRes = await search(this.activeCompany.companyId, this.searchText)
                if (searchRes.success && searchRes.data.length > 0) {
                    this.setGood(searchRes.data)
                    this.setActiveCategory(searchRes.data[0].parentGuid)
                    this.goods = searchRes.data
                    console.log(this.goods[0])
                } else if (searchRes.success) {
                    this.noGoods.title = '没有搜索到对应的商品，请重新搜索'
                    this.goods = []
                }
                scroll.scrollTop = 0
                this.loading = false
            }
        },
        setGood (goods) {
            let companyId = this.activeCompany.companyId
            goods.forEach(good => {
                if (this.cart[companyId] && this.cart[companyId][good.id]) good.num = this.cart[companyId][good.id].num
                else if (this.cart[good.id]) good.num = this.cart[good.id].num
                else good.num = 0
            })
        },
        setActiveCategory (parentGuid) {
            this.secondary = ''
            let result = true
            this.$store.state.categoryList.every(category => {
                if (category.guid === parentGuid) {
                    this.$store.commit('setActiveCategory', category)
                    result = false
                } else {
                    category.secondaryList.every(secondary => {
                        if (secondary.guid === parentGuid) {
                            this.$store.commit('setActiveCategory', category)
                            this.secondary = secondary
                            result = false
                            return false
                        }
                        return true
                    })
                }
                return result
            })
        },
        addToCart (good) {
            good.num += good.bagCount
            if (this.$store.state.activeOrder) {
                this.$store.commit('addToOrder', {
                    company: this.activeCompany,
                    good,
                    unOrder: this.$store.state.activeOrder
                })
            } else {
                this.$store.commit('addToCart', {company: this.activeCompany, good})
            }
        },
        removeToCart (good) {
            if (good.num - good.bagCount === 0) {
                this.$confirm('确认删除当前商品？', '删除确认', {
                    confirmButtonText: '确认删除',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    good.num -= good.bagCount
                    if (this.$store.state.activeOrder) {
                        this.$store.commit('deleteGoodToOrder', {
                            company: this.activeCompany,
                            good,
                            unOrder: this.$store.state.activeOrder
                        })
                    } else {
                        this.$store.commit('deleteGood', {company: this.activeCompany, good})
                    }
                    this.$message.success('删除商品成功！')
                }, () => {
                    console.log('cancel')
                })
            } else {
                good.num -= good.bagCount
                if (this.$store.state.activeOrder) {
                    this.$store.commit('removeToOrder', {
                        company: this.activeCompany,
                        good,
                        unOrder: this.$store.state.activeOrder
                    })
                } else {
                    this.$store.commit('removeToCart', {company: this.activeCompany, good})
                }
            }
        },
        zkPrice (price, zk) {
            let num = price * (100 - zk) / 100
            num = num.toFixed(2)
            return num
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import 'src/style/config';
.search {
    padding-top: $headH;
    height: 100%;
    .header {
        display: flex;
        align-items: center;
        @include wh(100%, $headH);
        background-color: $white;
        border-bottom: 1px solid $borcd;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 100;
    }
    .el-icon-arrow-left {
        margin-left: 40px;
    }
    .container {
        max-height: 100%;
        overflow: auto;
        display: flex;
        flex-wrap: wrap;
        padding: 0 2% 0 2%;
        li {
            position: relative;
            display: flex;
            flex-direction: column;
            width: 49%;
            border: 1px solid #aaaaaa;
            border-radius: 5px;
            margin-top: 7px;
            padding: 15px 0 10px 0;
            span {
                @include sc(12px, #555555);
                padding: 0 5px;
            }
            .good-num {
                position: absolute;
                right: 5px;
                top: 2px;
                font-size: 12px;
                background: red;
                border-radius: 100px;
                color: white;
                z-index: 1;
                padding: 0 5px;
                height: 20px;
                line-height: 20px;
                text-align: center;
            }
            .good-no {
                position: absolute;
                left: 5px;
                top: 0px;
                font-size: 12px;
            }
            div {
                position: relative;
                .price {
                    @include sc(14px, #5eacf0);
                }
                .have-zk {
                    display: inline-block;
                    padding: 0 5px;
                    span {
                        padding: 0;
                    }
                    .zk-price {
                         @include sc(12px, #5eacf0);
                    }
                    .origin-price {
                        font-size: 12px;
                        text-decoration: line-through;
                    }
                    .zk {
                        color: #f56c6c;
                    }
                }
                .add-remove {
                    float: right;
                    top: 3px;
                    right: 5px;
                }
                .el-icon-remove {
                    @include sc(22px, #f56c6c);
                }
                .el-icon-circle-plus {
                    top: 3px;
                    @include sc(22px, #5eacf0);
                }
            }
        }
        li:nth-child(odd) {
            margin-right: 1%;
        }
        li:nth-child(even) {
            margin-left: 1%;
        }
    }
    .good-img::before {
        content: "";
        display: inline-block;
        padding-bottom: 68%;
    }
    .good-img-icon {
		@include wh(100%, 100%);
    }
    .good-detail {
        display: flex;
        justify-content: space-between;
    }
}
.input-search {
    border: 1px solid #409EFF;
    border-radius: 10px;
    margin-right: 10px;
    height: 25px;
    padding: 0 5px;
    margin-left: 20px;
    margin-right: 20px;
    width: calc(100% - 152px);
}

.no-goods {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 20px;
    padding-top: 40%;
    width: 100%;
    i {
        color: #888888;
        font-size: 60px;
    }
    span {
        text-align: center;
    }
    .title {
        margin-top: 10px;
        @include sc(16px, #000000);
    }
}

.loading {
    height: 100%;
}
</style>
