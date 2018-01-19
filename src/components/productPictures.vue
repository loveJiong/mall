<template>
  <div class="product-pictures">
    <div class="header">
      <div class="search">
        <img src="/static/img/company1.png" alt="icon">
        <el-input v-model="searchText" prefix-icon="el-icon-search"  size="small" placeholder="产品的名称/编号/条形码"></el-input>
          <i class="el-icon-share"></i>
        </div>
        <ul class="button-list">
            <li v-for="button in buttonList" :key="button.title" >
                <img v-bind:src="button.imgSrc" alt="button">
                <span>{{button.title}}</span>
            </li>
        </ul>
    </div>
    <div class="container">

    </div>
    <foot-guide></foot-guide>
  </div>
</template>

<script>
import footGuide from './footGuide'
// import {getComanyList} from './../service/getData'
export default {
  name: 'productPictures',
  data () {
    return {
      searchText: '',
      buttonList: [
          {
              imgSrc: '/static/img/new-product.jpg',
              title: '新到产品'
          },
          {
              imgSrc: '/static/img/recommended-product.jpg',
              title: '推荐产品'
          },
          {
              imgSrc: '/static/img/sales-product.jpg',
              title: '促销产品'
          },
          {
              imgSrc: '/static/img/order-history.jpg',
              title: '历史订购'
          }
      ],
    }
  },
  components: {
    footGuide
  },
  created () {
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import 'src/style/config';
.product-pictures {
  .header {
    .search {
      display: flex;
      padding: 0 15px;
      align-items: center;
      height: $headH;
      background-color: $white;
      border-bottom: 1px solid $borcd;
      img {
        @include wh(40px, 40px);
      }
      .el-input {
        margin: 0 14px;
        .el-input_inner {  
          background-color: #f0f0f0;
        }
      }
    }
    .button-list {
        display: flex;
        height: 90px;
        align-items: center;
        justify-content: space-around;
        background-color: $white;
        border-bottom: 1px solid #e3e0df;
        @include sc(12px, #555555);
        li {
            display: flex;
            flex-direction: column;
            img {
                @include wh(50px, 50px);
            }
            span {
                text-align: center;
                margin-top: 5px;
            }
        }
    }
  }
}
</style>
