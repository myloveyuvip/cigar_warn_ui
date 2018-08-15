<template>
  <div class="app-container">

    <el-table :data="list" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="序号" width="80">
        <template slot-scope="scope">
          <span>{{scope.row.id}}</span>
        </template>
      </el-table-column>

      <el-table-column  align="center" label="专管所">
        <template slot-scope="scope">
          <span>{{scope.row.managerOffice}}</span>
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
          <span>{{scope.row.distribution}}</span>
        </template>
      </el-table-column>
      <el-table-column  align="center" label="业态">
        <template slot-scope="scope">
          <span>{{scope.row.industryType}}</span>
        </template>
      </el-table-column>
      <el-table-column  align="center" label="是否有工商执照">
        <template slot-scope="scope">
          <span>{{scope.row.hasLicense}}</span>
        </template>
      </el-table-column>
      <el-table-column  align="center" label="违规次数">
        <template slot-scope="scope">
          <span>{{scope.row.illegalTimes}}</span>
        </template>
      </el-table-column>
      <el-table-column  align="center" label="是否为特营场所">
        <template slot-scope="scope">
          <span>{{scope.row.isSpecialPlace}}</span>
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
          <span>{{scope.row.monthlySales}}</span>
        </template>
      </el-table-column>
      <el-table-column  align="center" label="未办证原因">
        <template slot-scope="scope">
          <span>{{scope.row.noCertReason}}</span>
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

      <el-table-column align="center" label="Actions" width="120">
        <template slot-scope="scope">
          <router-link :to="'/example/edit/'+scope.row.id">
            <el-button type="primary" size="small" icon="el-icon-edit">Edit</el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page"
        :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

  </div>
</template>

<script>
import { vendorList } from '@/api/vendor'
import { getDict } from '@/api/dict'

export default {
  name: 'articleList',
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10
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
    this.getList()
    getDict(1).then(response => {
      if (response.data.status !== 200) return
      this.manageOfficeOptions = response.data.result.items
    })
    getDict(2).then(response => {
      if (response.data.status !== 200) return
      this.distributionsOptions = response.data.result.items
    })
    getDict(3).then(response => {
      if (response.data.status !== 200) return
      this.industryOptions = response.data.result.items
    })
    getDict(4).then(response => {
      if (response.data.status !== 200) return
      this.noCertReasonOptions = response.data.result.items
    })
    getDict(5).then(response => {
      if (response.data.status !== 200) return
      this.monthlySalesOptions = response.data.result.items
    })
  },
  methods: {
    getList() {
      this.listLoading = true
      vendorList(this.listQuery).then(response => {
        console.log(response)
        this.list = response.data.data
        console.log(this.list)
        this.total = response.data.data.length
        this.listLoading = false
      })
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
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
