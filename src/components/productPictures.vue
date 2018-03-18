<template>
  <div class="product-pictures">
    <div class="company-switch">
      <div class="company-menu">
        <div class="company-active" v-on:click.stop="menuToggle">
          <img class="company-img" v-bind:src="active.icon" alt="icon">
          <span>{{active.name}}</span>
          <i v-show="menuShow" class="el-icon-caret-top"></i>
          <i v-show="!menuShow" class="el-icon-caret-bottom"></i>
        </div>
        <ul v-show="menuShow" class="companyList">
          <li v-for="(company, index) in companyList" v-bind:key="index" v-bind:class="{ active: company.isActive}" v-on:click.stop="companyChoose(company)">
            <img class="company-img" v-bind:src="company.icon" alt="icon">
            <span class="company-name">{{company.name}}</span>
          </li>
        </ul>
      </div>
    </div>
    <ul class="container">
      <li v-for="bigGroup in bigGroupList" :key="bigGroup.title" v-on:click="gotoDeatile()">
        <img v-bind:src="bigGroup.imgSrc" alt="img">
        <span>{{bigGroup.title}}</span>
        <i class="el-icon-arrow-right"></i>
      </li>
    </ul>
    <foot-guide></foot-guide>
    <div class="box" v-show="menuShow" v-on:touchmove="preventTouchmove"></div>
  </div>
</template>

<script>
import footGuide from './footGuide'
// import {getComanyList} from './../service/getData'
export default {
  name: 'productPictures',
  data () {
    return {
      companyList: [
        {
          name: '国贸城集团',
          isActive: true,
          icon: require('../../static/img/company1.png')

        },
        {
          name: '中汇文具',
          isActive: false,
          icon: require('../../static/img/company1.png')
        }
      ],
      companyImg: require('../../static/img/company1.png'),
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
      ],
      menuShow: false,
      active: {}
    }
  },
  components: {
    footGuide
  },
  mounted () {
    this.active = this.companyList[0]
    document.addEventListener('click', this.menuHide)
  },
  beforeDestroy () {
    document.removeEventListener('click', this.menuHide)
  },
  methods: {
    gotoDeatile () {
      this.$router.push('/productPictures/groupDetail')
    },
    menuToggle () {
    this.menuShow = !this.menuShow
    if (this.menuShow) {
      document.querySelector('body').setAttribute('style', 'overflow:hidden')
    } else {
      document.querySelector('body').setAttribute('style', 'overflow:auto')
    }
    },
    menuHide () {
      if (this.menuShow) {
      this.menuShow = false
      document.querySelector('body').setAttribute('style', 'overflow:auto')
      }
    },
    companyChoose (company) {
      this.active.isActive = false
      company.isActive = true
      this.active = company
      this.menuShow = false
    },
    preventTouchmove (event) {
      if (this.menuShow) {
        event.preventDefault()
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import 'src/style/config';
.product-pictures {
  .company-switch {
    position: relative;
    display: flex;
    align-items: center;
    height: $headH;
    background-color: $white;
    border-bottom: 1px solid $borcd;
    z-index: 1;
    .company-menu {
      width: 100%;
      .company-active {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        text-align: center;
        background-color: $white;
        @include sc(14px, #e45c28);
      }
      .companyList {
        position: absolute;
        top: $headH;
        width: 100%;
        background-color: $white;
        padding-bottom: 10px;
        li {
          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid #dbdbdb;
          font-size: 14px;
          padding: 10px 20px;
          background-color: #f5f5f5;
          .company-name {
            color: #333333;
          }
        }
        .active {
          background-color: $white;
          .company-name {
            color: #e45c28;
          }
        }
      }
    }
  }
  .company-img {
    @include wh(25px, 25px);
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
