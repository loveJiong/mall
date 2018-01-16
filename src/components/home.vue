<template>
  <div class="home">
    <div class="home-title">
      我的商家
      <button type="button">添加商家</button>
    </div>
    <div class="companyList">
      <ul>
        <li class="company" v-for="(company, index) in companyList" :key="index">
          <div class="information">
            <div class="icon">
              <img v-bind:src="company.icon" alt="icon">
            </div>
            <div class="detail">
              <span class="name" v-bind:title="company.name">{{company.name}}</span>
              <span class="mobile">电话：{{company.mobile}}</span>
            </div>
          </div>
          <div class="description">

          </div>
        </li>
      </ul>
    </div>
    <foot-guide></foot-guide>
  </div>
</template>

<script>
import footGuide from './footGuide'
import {getComanyList} from './../service/getData'
export default {
  name: 'home',
  data () {
    return {
      companyList: []
    }
  },
  components: {
    footGuide
  },
  created () {
    this.initData()
  },
  methods: {
    async initData () {
      let comanyListRes = await getComanyList()
      if (comanyListRes.success) {
        this.companyList = comanyListRes.data
        console.log(this.companyList)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import 'src/style/config';
$imgWith: 50px;
$imgMargin: 20px;
.home {
  .home-title {
    position: relative;
    text-align: center;
    border-bottom: 1px solid $borcd;
    color: $fc;
    background-color: $white;
    @include font(16px, 50px);
    button {
      position: absolute;
      right: 20px;
      top: 12px;
      padding: 5px;
      @include sc(12px, $white);
      border-radius: 5px;
      background-color: $blue;
    }
  }

  .company {
    background-color: $white;
    margin: 10px;
    padding: 10px 5px 10px 5px;
    .information {
      display: flex;
      border-bottom: 1px solid #efeff4;
      .icon {
        img {
          @include wh($imgWith,50px);
        }
        margin-right: $imgMargin;
      }
      .detail {
        display: flex;
        flex-direction: column;
        width: 100%;
        .name {
          @include sc(16px, #000000);
          margin-top: 3px;
          margin-bottom: 5px;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: auto;
          width: calc(100% - 70px);
        }
        .mobile {
          @include sc(12px, #aaaaaa);
        }
      }
    }
  }
}
</style>
