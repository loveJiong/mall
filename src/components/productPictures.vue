<template>
  <div class="product-pictures">
    <div class="header">
      <div class="search">
        <img v-bind:src="companyImg" alt="icon">
        <el-input v-model="searchText" prefix-icon="el-icon-search"  size="small" placeholder="产品的名称/编号/条形码"></el-input>
          <i class="el-icon-share"></i>
        </div>
        <ul class="button-list">
            <li v-for="button in buttonList" :key="button.title">
                <img v-bind:src="button.imgSrc" alt="button">
                <span>{{button.title}}</span>
            </li>
        </ul>
    </div>
    <ul class="container">
      <li v-for="bigGroup in bigGroupList" :key="bigGroup.title" v-on:click="gotoDeatile()">
        <img v-bind:src="bigGroup.imgSrc" alt="img">
        <span>{{bigGroup.title}}</span>
        <i class="el-icon-arrow-right"></i>
      </li>
    </ul>
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
      companyImg: require('../../static/img/company1.png'),
      buttonList: [
          {
              imgSrc: require('../../static/img/new-product.jpg'),
              title: '新到产品'
          },
          {
              imgSrc: require('../../static/img/recommended-product.jpg'),
              title: '推荐产品'
          },
          {
              imgSrc: require('../../static/img/sales-product.jpg'),
              title: '促销产品'
          },
          {
              imgSrc: require('../../static/img/order-history.jpg'),
              title: '历史订购'
          }
      ],
      bigGroupList: [
        {
          imgSrc: require('../../static/img/bigGroup1.jpg'),
          title: 'A-季节系列'
        },
        {
          imgSrc: require('../../static/img/bigGroup2.jpg'),
          title: 'AAA-圣诞系列'
        },
        {
          imgSrc: require('../../static/img/bigGroup3.jpg'),
          title: 'B1-五金系列'
        },
        {
          imgSrc: require('../../static/img/bigGroup4.jpg'),
          title: 'B2-园林工具系列'
        }
      ]
    }
  },
  components: {
    footGuide
  },
  methods: {
    gotoDeatile () {
      this.$router.push('/productPictures/groupDetail')
    }
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
  .container {
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    li {
      display: flex;
      align-items: center;
      padding: 5px;
      background-color: $white;
      border-bottom: 1px solid #c8c7cc;
      img {
        @include wh(90px, 60px);
      }
      i {
        position: absolute;
        right: 20px;
        color: #c7c7cc;
      }
      span {
        margin-left: 10px;
        @include sc(16px, #000000);
      }
    }
  }
}
</style>
