<template>
    <el-table :data="data">
      <el-table-column label="用户编号" prop="id" align="center"></el-table-column>
      <el-table-column label="用户姓名" prop="name" align="center"></el-table-column>
      <el-table-column label="用户年龄" prop="age" align="center"></el-table-column>
      <el-table-column label="用户地址" prop="address" align="center"></el-table-column>
    </el-table>
</template>

<script>
export default {
  name: 'UserList',
  data () {
    return {
      data: [
        {
          id: 1,
          name: 'fjkla',
          age: 23,
          address: '地址'
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>
