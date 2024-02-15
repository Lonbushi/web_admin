<template>
  <el-form>
    <el-form-item label="名字">
      <el-input v-model.trim="user.nick_name" />
    </el-form-item>
    <el-form-item label="邮箱">
      <el-input v-model.trim="user.email" />
    </el-form-item>
    <el-form-item label="手机号">
      <el-input v-model.trim="user.phone_num" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="handleSubmit">Update</el-button>
    </el-form-item>
  </el-form>
</template>
  
<script>
import { updateInfo } from '@/api/user'
export default {
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          nick_name: "",
          email: "",
          avatar: "",
          id: 0,
          token: "",
          phone_num:""
        };
      },
    },
  },
  methods: {
    async handleSubmit() {
      const update = {
        nick_name: this.user.nick_name,
        email: this.user.email,
        phone_num: this.user.phone_num
      }
      const id = this.user.id
      const token = this.user.token
      const response = await updateInfo(token, id, update)
      console.log(response);

    }
  }
};
</script>