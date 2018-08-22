<template>
  <div class="app-container">
    <upload-excel-component :on-success='handleSuccess' :before-upload="beforeUpload"></upload-excel-component>
    <el-table :data="tableData" border highlight-current-row style="width: 100%;margin-top:20px;">
      <el-table-column v-for='item of tableHeader' :prop="item" :label="item" :key='item'>
      </el-table-column>
    </el-table>
    <el-row >
      <el-col :span="8" :offset="11">
          <el-button type="primary" @click="uploadVendor('numberValidateForm')">提交</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import UploadExcelComponent from '@/components/UploadExcel/index.vue'
import { addVendors } from '../../api/vendor'

export default {
  name: 'uploadExcel',
  components: { UploadExcelComponent },
  data() {
    return {
      tableData: [],
      tableHeader: [],
      valueDictMap: null,
      columnMap:
        {
          '专管所': 'managerOffice',
          '零售户名称': 'vendorName',
          '经营地址': 'address',
          '经度': 'longitude',
          '纬度': 'latitude',
          '经营者姓名': 'operatorName',
          '联系电话': 'phone',
          '籍贯': 'nativePlace',
          '位置分布': 'distribution',
          '业态': 'industryType',
          '是否有工商执照': 'hasLicense',
          '违规次数': 'illegalTimes',
          '是否为特营场所': 'isSpecialPlace',
          '卷烟喷码': 'cigarCode',
          '主销品种': 'saleKind',
          '估计月销量（条）': 'monthlySales',
          '未办证原因': 'noCertReason',
          '从事卷烟经营时间': 'operateTime',
          '登记时间': 'registerTime',
          '备注': 'remark'
        }
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
          if (this.valueDictMap.hasOwnProperty(this.columnMap[key])) {
            vendor[this.columnMap[key]] = this.valueDictMap[this.columnMap[key]][data[key]]
          } else if (data[key] === '是' || data[key] === '否') {
            vendor[this.columnMap[key]] = this.valueDictMap['whether'][data[key]]
          } else if (this.columnMap[key] === 'operateTime' || this.columnMap[key] === 'operatorName') {
            if (data[key]) {
              vendor[this.columnMap[key]] = new Date(data[key])
            }
          } else {
            vendor[this.columnMap[key]] = data[key]
          }
        }
        vendors.push(vendor)
      })
      console.log(vendors)
      addVendors(vendors).then((res) => {
        if (res.status === 200) {
          this.$notify({
            title: '成功',
            message: '导入无证户成功！',
            type: 'success',
            duration: 2000
          })
          this.$router.push({ path: '/vendor' })
        }
      })
    }
  },
  created() {
    // 数据字典，name-value映射，如：{distribution:{'厂区':'1'}}
    const valueDictMap = {}
    const dictMap = this.$store.state.app.dictMap
    for (var dictName in dictMap) {
      const valueDict = {}
      for (var key in dictMap[dictName]) {
        valueDict[dictMap[dictName][key]] = key
      }
      valueDictMap[dictName] = valueDict
    }
    this.valueDictMap = valueDictMap
  }
}
</script>
