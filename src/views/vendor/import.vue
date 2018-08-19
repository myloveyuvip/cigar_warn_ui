<template>
  <div class="app-container">
    <upload-excel-component :on-success='handleSuccess' :before-upload="beforeUpload"></upload-excel-component>
    <el-table :data="tableData" border highlight-current-row style="width: 100%;margin-top:20px;">
      <el-table-column v-for='item of tableHeader' :prop="item" :label="item" :key='item'>
      </el-table-column>
    </el-table>
    <el-row>
      <el-col :span="8" :offset="11">
          <el-button type="primary" @click="uploadVendor('numberValidateForm')">提交</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import UploadExcelComponent from '@/components/UploadExcel/index.vue'

export default {
  name: 'uploadExcel',
  components: { UploadExcelComponent },
  data() {
    return {
      tableData: [],
      tableHeader: [],
      dictMap: { '专管所': 'managerOffice' }
    }
  },
  methods: {
    beforeUpload(file) {
      console.log(this.tableHeader)
      const isLt1M = file.size / 1024 / 1024 < 1

      if (isLt1M) {
        return true
      }

      this.$message({
        message: 'Please do not upload files larger than 1m in size.',
        type: 'warning'
      })
      return false
    },
    handleSuccess({ results, header }) {
      this.tableData = results
      this.tableHeader = header
    },
    uploadVendor() {
      const vendors = []
      this.tableData.forEach(data => {
        const vendor = {}
        for (var key in data) {
          vendor[this.dictMap[key]] = data[key]
        }
        vendors.push(vendor)
      })
      console.log(vendors)
    }
  }
}
</script>
