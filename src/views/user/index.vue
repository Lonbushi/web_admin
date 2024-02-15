<template>
  <el-table :data="userTableData" style="width: 100%" stripe :border="true">
    <el-table-column prop="id" label="id" width="180">
    </el-table-column>
    <el-table-column prop="username" label="用户名" width="180">
    </el-table-column>
    <el-table-column prop="email" label="邮箱">
    </el-table-column>
    <el-table-column prop="phone_num" label="手机号">
    </el-table-column>
  </el-table>
</template>
<script>

export default {
  data(){
    return {
      userTableData:[]
    }
  },
  methods: {
    async fetchUserTableData() {
      const response = await this.$store.dispatch('user/getUserAll')
      this.userTableData = response
      console.log("全部用户数据", response);
    }
  },
  mounted(){
    this.fetchUserTableData()
  }
}
</script>