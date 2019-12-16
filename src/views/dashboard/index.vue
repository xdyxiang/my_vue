<template>
  <div class="dashboard-container">
     <el-row >
    <div class="dashboard-text">name:{{ dashboardname }}</div>
</el-row>
      <el-row >
    <el-col style="margin-top: 20px" :span="8" v-for="(md, index) in dashboarddata" :key="md.id" :offset="index > 0 ? 2 : 2">
    <el-card :body-style="{ padding: '20px' }">
      <img :src="md.psrc" class="image">
      <div style="padding: 14px;">
        <span>{{md.desc}}</span>
        <div class="bottom clearfix">
          <time class="time">{{ dashboardtime }}</time>
          <el-button type="text" class="button" @click="deletep(md.id)">干掉</el-button>
        </div>
      </div>
    </el-card>
  </el-col>

</el-row>

  </div>
</template>

<script>
import index from 'element-ui/packages/loading'
import { mapGetters } from 'vuex'
import store from '../../store'
export default {
    created () {
        this.initp()
    },
    computed: {
        ...mapGetters([
            'dashboardname',
            'dashboardtime',
            'dashboarddata'
        ])},
    methods: {
        deletep (id) {
            console.log(id)
            this.$store.dispatch('MydataAction_delete', id)
            console.log(this.$store.getters.dashboarddata)
        },
        initp(){
            this.$store.dispatch('MydataAction_init')
        }
    }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}

    .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }

  .clearfix:after {
      clear: both
  }
</style>
