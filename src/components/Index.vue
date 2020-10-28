<template>
  <el-container>
    <el-header height="60px" class="index-header">Header</el-header>
    <el-container>
      <el-aside width="200px" class="index-aside">
        <el-menu router>
          <el-submenu index="g">
            <template slot="title">
              <span>菜单一</span>
            </template>
            <el-menu-item index="a" route="user-list">用户列表</el-menu-item>
            <el-menu-item index="b" route="user-add">用户新增</el-menu-item>
            <el-menu-item index="c" route="generate-entity">生成实体</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'Index'
}
</script>

<style scoped>
  .index-header {
    background-color: beige;
  }
  .index-aside {
    background-color: aquamarine;
    height: 100%;
  }
</style>
