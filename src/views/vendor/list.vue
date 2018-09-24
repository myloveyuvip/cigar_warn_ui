<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select clearable style="width: 90px" class="filter-item" v-model="listQuery.managerOffice" placeholder="专管所">
        <el-option v-for="(name,value) in dictMap['managerOffice']" :key="value" :label="name" :value="value">
        </el-option>
      </el-select>

      <el-input @keyup.enter.native="handleFilter" style="width: 150px;" class="filter-item" placeholder="零售户名称" v-model="listQuery.vendorName">
      </el-input>
      <el-input @keyup.enter.native="handleFilter" style="width: 120px;" class="filter-item" placeholder="经营者姓名" v-model="listQuery.operatorName">
      </el-input>
      <el-input @keyup.enter.native="handleFilter" style="width: 150px;" class="filter-item" placeholder="地址" v-model="listQuery.address">
      </el-input>
      <el-input @keyup.enter.native="handleFilter" style="width: 120px;" class="filter-item" placeholder="电话" v-model="listQuery.phone">
      </el-input>
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">{{$t('table.search')}}</el-button>
      <!--<el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="el-icon-edit">{{$t('table.add')}}</el-button>-->
      <el-button class="filter-item" type="primary" :loading="downloadLoading" v-waves icon="el-icon-download" @click="handleDownload">{{$t('table.export')}}</el-button>
      <el-checkbox class="filter-item" style='margin-left:15px;' @change='handleFilter()' v-model="listQuery.isNeedWarn">预警</el-checkbox>
    </div>

    <el-table :data="list" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="序号" width="40">
        <template slot-scope="scope">
          <span>{{scope.row.id}}</span>
        </template>
      </el-table-column>

      <el-table-column  align="center" label="专管所">
        <template slot-scope="scope">
          <span>{{scope.row.managerOffice | dictFilter('managerOffice')}}</span>
        </template>
      </el-table-column>

      <el-table-column  align="center" label="零售户名称">
        <template slot-scope="scope">
          <span>{{scope.row.vendorName}}</span>
        </template>
      </el-table-column>
      <el-table-column  align="center" label="经营地址">
        <template slot-scope="scope">
          <span>{{scope.row.address}}</span>
        </template>
      </el-table-column>
      <el-table-column  align="center" label="经度">
        <template slot-scope="scope">
          <span>{{scope.row.longitude}}</span>
        </template>
      </el-table-column>
      <el-table-column  align="center" label="纬度">
        <template slot-scope="scope">
          <span>{{scope.row.latitude}}</span>
        </template>
      </el-table-column>
      <el-table-column  align="center" label="经营者姓名">
        <template slot-scope="scope">
          <span>{{scope.row.operatorName}}</span>
        </template>
      </el-table-column>
      <el-table-column  align="center" label="联系电话">
        <template slot-scope="scope">
          <span>{{scope.row.phone}}</span>
        </template>
      </el-table-column>
      <el-table-column  align="center" label="籍贯">
        <template slot-scope="scope">
          <span>{{scope.row.nativePlace}}</span>
        </template>
      </el-table-column>
      <el-table-column  align="center" label="位置分布">
        <template slot-scope="scope">
          <span>{{scope.row.distribution | dictFilter('distribution')}}</span>
        </template>
      </el-table-column>
      <el-table-column  align="center" label="业态">
        <template slot-scope="scope">
          <span>{{scope.row.industryType| dictFilter('industryType')}}</span>
        </template>
      </el-table-column>
      <el-table-column  align="center" label="是否有工商执照">
        <template slot-scope="scope">
          <span>{{scope.row.hasLicense | dictFilter('whether')}}</span>
        </template>
      </el-table-column>
      <el-table-column  align="center" label="违规次数">
        <template slot-scope="scope">
          <span>{{scope.row.illegalTimes}}</span>
        </template>
      </el-table-column>
      <el-table-column  align="center" label="是否为特营场所">
        <template slot-scope="scope">
          <span>{{scope.row.isSpecialPlace | dictFilter('whether')}}</span>
        </template>
      </el-table-column>
      <el-table-column  align="center" label="卷烟喷码">
        <template slot-scope="scope">
          <span>{{scope.row.cigarCode}}</span>
        </template>
      </el-table-column>
      <el-table-column  align="center" label="主销品种">
        <template slot-scope="scope">
          <span>{{scope.row.saleKind}}</span>
        </template>
      </el-table-column>
      <el-table-column  align="center" label="估计月销量（条）">
        <template slot-scope="scope">
          <span>{{scope.row.monthlySales| dictFilter('monthlySales')}}</span>
        </template>
      </el-table-column>
      <el-table-column  align="center" label="未办证原因">
        <template slot-scope="scope">
          <span>{{scope.row.noCertReason | dictFilter('noCertReason')}}</span>
        </template>
      </el-table-column>
      <el-table-column  align="center" label="从事经营时间">
        <template slot-scope="scope">
          <span>{{scope.row.operateTime| parseTime('{y}-{m}-{d}')}}</span>
        </template>
      </el-table-column>
      <el-table-column  align="center" label="登记时间">
        <template slot-scope="scope">
          <span>{{scope.row.registerTime| parseTime('{y}-{m}-{d}')}}</span>
        </template>
      </el-table-column>
      <el-table-column  align="center" label="备注">
        <template slot-scope="scope">
          <span>{{scope.row.remark}}</span>
        </template>
      </el-table-column>
      <el-table-column  align="center" label="店铺照片">
        <template slot-scope="scope">
          <viewer>
            <img :src="scope.row.shopPic" :key="scope.row.shopPic" width="100%">
          </viewer>
        </template>
      </el-table-column>
      <el-table-column  align="center" label="预警原因" v-if="listQuery.isNeedWarn">
        <template slot-scope="scope">
          <span>{{scope.row.warnReason}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="120">
        <template slot-scope="scope">
          <router-link :to="'/vendor/edit/'+scope.row.id">
            <el-button type="primary" size="small" icon="el-icon-edit">修改</el-button>
          </router-link>
          <el-button type="danger" size="small" icon="el-icon-delete" @click="deleteVendor(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.currentPage"
        :page-sizes="[10,20,30, 50,1000]" :page-size="listQuery.size" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

  </div>
</template>

<script>
import { vendorPage, deleteVendor } from '@/api/vendor'
import 'viewerjs/dist/viewer.css'
import { parseTime } from '@/utils'
export default {
  name: 'articleList',
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      downloadLoading: false,
      dictMap: [],
      listQuery: {
        currentPage: 1,
        page: 0,
        size: 10,
        managerOffice: null,
        vendorName: null,
        operatorName: null,
        address: null,
        phone: null,
        isNeedWarn: null
      }
    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  created() {
    this.dictMap = this.$store.state.app.dictMap
    this.getList()
  },
  methods: {
    handleFilter() {
      this.listQuery.currentPage = 1
      this.getList()
    },
    getList() {
      this.listLoading = true
      this.listQuery.page = this.listQuery.currentPage > 0 ? this.listQuery.currentPage - 1 : 0
      this.listQuery.isNeedWarn = this.listQuery.isNeedWarn || null
      vendorPage(this.listQuery).then(response => {
        console.log(response)
        this.list = response.data.result.content
        console.log(this.list)
        this.total = response.data.result.totalElements
        this.listLoading = false
      })
    },
    handleSizeChange(val) {
      this.listQuery.size = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.currentPage = val
      this.getList()
    },
    deleteVendor(val) {
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteVendor(val).then((res) => {
          if (res.data.code === 0) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.getList()
          } else {
            this.$message({
              type: 'error',
              message: '删除失败!' + res.data.msg
            })
          }
        })
      })
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['序号', '专管所', '零售户名称', '经营地址', '经度', '纬度', '经营者姓名', '联系电话', '籍贯', '位置分布', '业态', '是否有工商执照', '违规次数', '是否为特营场所', '卷烟喷码', '主销品种', '估计月销量（条）', '未办证原因', '从事经营时间', '登记时间', '备注']
        const filterVal = ['id', 'managerOffice', 'vendorName', 'address', 'longitude', 'latitude', 'operatorName', 'phone', 'nativePlace', 'distribution', 'industryType', 'hasLicense', 'illegalTimes', 'isSpecialPlace', 'cigarCode', 'saleKind', 'monthlySales', 'noCertReason', 'operateTime', 'registerTime', 'remark']
        if (this.listQuery.isNeedWarn) {
          tHeader.push('预警原因')
          filterVal.push('warnReason')
        }
        const data = this.formatJson(filterVal, this.list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: '无证户列表导出'
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'registerTime' || j === 'operateTime') {
          return parseTime(v[j], ('{y}-{m}-{d}'))
        } else if (this.dictMap.hasOwnProperty(j)) {
          return this.dictMap[j][v[j]]
        } else if (j.startsWith('is') || j.startsWith('has')) {
          return this.dictMap['whether'][v[j]]
        } else {
          return v[j]
        }
      }))
    }
  }
}
</script>

<style scoped>
.edit-input {
  padding-right: 100px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
</style>
