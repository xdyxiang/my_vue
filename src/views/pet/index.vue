<template>
  <div class="dashboard-container">
   <el-row >
    <el-col style="margin-top: 20px" :span="6" v-for="pd in petdata" :key="pd.id" :offset="1">
    <el-card :body-style="{ padding: '10px' }">
        <img :src="pd.photoUrls" class="image">
        <div class="bottom clearfix">
              <div class="text item"><el-tag>宠物名：</el-tag>{{ pd.name}}</div>
            <div class="text item"><el-tag>宠物状态：</el-tag>{{pd.status}}</div>
            <div class="text item"><el-tag>宠物特长：</el-tag>{{ pd.task}}</div>

            <div style="margin-top: 10px">
                <el-collapse>
                      <el-collapse-item :title="categ.sx_name" v-for="(categ,index) in pd.category" :key="index" :name="index">
                        <div>{{categ.sx_value}}</div>
                      </el-collapse-item>
                </el-collapse>
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
export default {
    created () {
        this.pet_init()
        // console.log(this.petdata)
    },
    computed: {
        ...mapGetters([
            'petdata',
        ])},
    methods: {
        pet_init(){
            this.$store.dispatch('SET_PETDATA_init')
        }
    }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }
  .bottom {
    margin-top: 13px;
    line-height: 12px;
      padding: 14px;
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
