<template>
  <div>
    <div>
      <el-select v-model="selectUser" placeholder="请选择" @change="userChange">
        <el-option
          v-for="item in databaseUser"
          :key="item.userId"
          :label="item.username"
          :value="item.username">
        </el-option>
      </el-select>
      <el-select v-model="selectTable" multiple placeholder="请选择" @change="tableChange">
        <el-option
          v-for="item in tableList"
          :key="item.PAGEHELPER_ROW_ID"
          :label="item.tableName"
          :value="item.tableName">
        </el-option>
      </el-select>
      <el-button @click="search">查询</el-button>
    </div>
    <div>
      <el-input v-model="entityName" placeholder="请输入内容" style="width: 200px"></el-input>
      <el-button @click="generate">生成实体</el-button>
    </div>
    <el-table :data="columnList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" label="用户编号" prop="id" align="center"></el-table-column>
      <el-table-column label="所属用户" prop="owner" align="center"></el-table-column>
      <el-table-column label="表名" prop="tableName" align="center"></el-table-column>
      <el-table-column label="字段" prop="columnName" align="center"></el-table-column>
      <el-table-column label="字段描述" prop="comments" align="center"></el-table-column>
      <el-table-column label="数据类型" prop="dataType" align="center"></el-table-column>
    </el-table>

    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <span>{{entityStr}}</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "GenerateEntity",
    data() {
      return {
        databaseUser: [],
        tableList: [],
        columnList: [],
        selectUser: '',
        selectTable: [],
        selectColumn: [],
        entityName: '',
        dialogVisible: false,
        entityStr: ''
      }
    },
    methods: {
      userChange: function () {
        this.$axios.post('http://127.0.0.1:8080/database/getTableList', {
          owner: this.selectUser,
          pageNumber: 0,
          pageSize: 999
        }).then(res => {
            this.tableList = res.data
          }).then(err => {
          console.log(err)
        })
      },
      tableChange: function() {
        // console.log(this.selectTable)
      },
      handleSelectionChange: function (val) {
        this.selectColumn = val
      },
      search: function () {
        this.$axios.post('http://127.0.0.1:8080/database/getTableColumnList', {
          owner: this.selectUser,
          tableName: this.selectTable,
          pageNumber: 0,
          pageSize: 999
        }).then(res => {
          this.columnList = res.data
        }).then(err => {
          console.log(err)
        })
      },
      generate: function () {
        let strFormat = function (val) {
          let re = /_(\w)/g
          let result = val.toLowerCase().replace(re, function ($0, $1) {
            return $1.toUpperCase()
          })
          return result
        }
        let p = ''
        this.selectColumn.forEach(function (value, index, array) {
          p += '/**' + ' \n ' + ' * ' + value.comments + ' \n ' + '**/'
          p += 'private '
          if (value.dataType == 'CHAR' || value.dataType == 'VARCHAR2' || value.dataType == 'NVARCHAR2') {
            p += 'String ' + strFormat(value.columnName) + ';\n'
          }
        })
        let str = `public class ${this.entityName} {
          ${p}
        }
        `
        console.log(str)
        this.entityStr = str
        this.dialogVisible = true
      },
      handleClose: function (done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {})
      }
    },
    created() {
      this.$axios.get('http://127.0.0.1:8080/database/getDatabaseUser')
        .then(res => {
          this.databaseUser = res.data
        }).then(err => {
          console.log(err)
      })
    }
  }
</script>

<style scoped>

</style>
