<template>
  <div class="createPost-container">
    <el-form class="form-container" :model="vendorForm" :rules="rules" ref="vendorForm">

      <div class="createPost-main-container">
        <el-row>

          <el-col :span="24">
            <div class="postInfo-container">
              <el-row>
                <el-col :span="8">
                  <el-form-item label-width="80px" label="专管所" class="postInfo-container-item">
                    <el-select v-model="vendorForm.managerOffice" placeholder="请选择">
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item label-width="90px" label="零售户名称" class="postInfo-container-item">
                    <el-input v-model="vendorForm.vendorName" placeholder="零售户名称"></el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item label-width="120px" label="是否中小学周边" class="postInfo-container-item">
                    <el-switch
                      v-model="vendorForm.isNearSchool"
                      active-text="是"
                      inactive-text="否">
                    </el-switch>
                  </el-form-item>

                </el-col>
              </el-row>

              <el-row>
                <el-col :span="8">
                  <el-form-item label-width="80px" label="经营地址" class="postInfo-container-item">
                    <el-input v-model="vendorForm.address" placeholder="经营地址"></el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item label-width="90px" label="经度" class="postInfo-container-item">
                    <el-input v-model="vendorForm.longitude" placeholder="经度"></el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item label-width="120px" label="纬度" class="postInfo-container-item">
                    <el-input v-model="vendorForm.latitude" placeholder="纬度"></el-input>
                  </el-form-item>
                </el-col>

              </el-row>


              <el-row>
                <el-col :span="8">
                  <el-form-item label-width="90px" label="经营者姓名" class="postInfo-container-item">
                    <el-input v-model="vendorForm.operatorName" placeholder="经营者姓名"></el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item label-width="90px" label="联系电话" class="postInfo-container-item">
                    <el-input v-model="vendorForm.phone" placeholder="联系电话"></el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item label-width="120px" label="籍贯" class="postInfo-container-item">
                    <el-input v-model="vendorForm.nativePlace" placeholder="籍贯"></el-input>
                  </el-form-item>
                </el-col>

              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label-width="80px" label="位置分布" class="postInfo-container-item">
                    <el-select v-model="vendorForm.distribution" placeholder="请选择">
                      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item label-width="90px" label="业态" class="postInfo-container-item">
                    <el-select v-model="vendorForm.industryType" placeholder="请选择">
                      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item label-width="120px" label="是否有工商执照" class="postInfo-container-item">
                    <el-switch
                      v-model="vendorForm.hasLicense"
                      active-text="是"
                      inactive-text="否">
                    </el-switch>
                  </el-form-item>
                </el-col>

              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label-width="80px" label="违规查处" class="postInfo-container-item">
                    <el-input v-model="vendorForm.illegalInfo" placeholder="违规查处"></el-input>
                  </el-form-item>
                </el-col>


                <el-col :span="8">
                  <el-form-item label-width="90px" label="卷烟喷码" class="postInfo-container-item">
                    <el-input v-model="vendorForm.cigarCode" placeholder="卷烟喷码"></el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item label-width="120px" label="是否为特营场所" class="postInfo-container-item">
                    <el-switch v-model="vendorForm.isSpecialPlace"
                               active-text="是"
                               inactive-text="否">
                    </el-switch>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label-width="80px" label="主销品种" class="postInfo-container-item">
                    <el-input v-model="vendorForm.saleKind" placeholder="主销品种"></el-input>
                  </el-form-item>
                </el-col>


                <el-col :span="8">
                  <el-form-item label-width="90px" label="未办证原因" class="postInfo-container-item">
                    <el-select v-model="vendorForm.noCertReason" placeholder="请选择">
                      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item label-width="120px" label="估计月销量(条)" class="postInfo-container-item">
                    <el-input v-model="vendorForm.monthlySales" placeholder="请输入数字"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-form-item label-width="80px" label="从事卷烟经营时间" class="postInfo-container-item">
                  <el-date-picker v-model="vendorForm.operateTime" type="date" format="yyyy-MM-dd"
                                  placeholder="选择日期时间">
                  </el-date-picker>
                </el-form-item>
                <el-form-item label-width="90px" label="登记时间" class="postInfo-container-item">
                  <el-date-picker v-model="vendorForm.registerTime" type="date" format="yyyy-MM-dd"
                                  placeholder="登记时间">
                  </el-date-picker>
                </el-form-item>
                <el-col :span="8">
                  <el-form-item label-width="120px" label="备注" class="postInfo-container-item">
                    <el-input v-model="vendorForm.remark" placeholder="备注"></el-input>
                  </el-form-item>
                </el-col>

              </el-row>
            </div>
          </el-col>
        </el-row>


        <div style="margin-bottom: 20px;">
          <Upload v-model="vendorForm.image_uri"/>
        </div>
      </div>
    </el-form>

  </div>
</template>

<script>
  import Tinymce from '@/components/Tinymce'
  import Upload from '@/components/Upload/singleImage3'
  import MDinput from '@/components/MDinput'
  import Multiselect from 'vue-multiselect'// 使用的一个多选框组件，element-ui的select不能满足所有需求
  import 'vue-multiselect/dist/vue-multiselect.min.css'// 多选框组件css
  import Sticky from '@/components/Sticky' // 粘性header组件
  import { validateURL } from '@/utils/validate'
  import { fetchArticle } from '@/api/article'
  import { userSearch } from '@/api/remoteSearch'
  import { CommentDropdown, PlatformDropdown, SourceUrlDropdown } from './Dropdown'

  const defaultForm = {
    status: 'draft',
    title: '', // 文章题目
    content: '', // 文章内容
    content_short: '', // 文章摘要
    source_uri: '', // 文章外链
    image_uri: '', // 文章图片
    display_time: undefined, // 前台展示时间
    id: undefined,
    platforms: ['a-platform'],
    comment_disabled: false,
    importance: 0
  }

  export default {
    name: 'vendorDetail',
    components: { Tinymce, MDinput, Upload, Multiselect, Sticky, CommentDropdown, PlatformDropdown, SourceUrlDropdown },
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      const validateRequire = (rule, value, callback) => {
        if (value === '') {
          this.$message({
            message: rule.field + '为必传项',
            type: 'error'
          })
          callback(null)
        } else {
          callback()
        }
      }
      const validateSourceUri = (rule, value, callback) => {
        if (value) {
          if (validateURL(value)) {
            callback()
          } else {
            this.$message({
              message: '外链url填写不正确',
              type: 'error'
            })
            callback(null)
          }
        } else {
          callback()
        }
      }
      return {
        vendorForm: Object.assign({}, defaultForm),
        loading: false,
        userListOptions: [],
        rules: {
          image_uri: [{ validator: validateRequire }],
          title: [{ validator: validateRequire }],
          content: [{ validator: validateRequire }],
          source_uri: [{ validator: validateSourceUri, trigger: 'blur' }]
        }
      }
    },
    computed: {
      contentShortLength() {
        return this.vendorForm.content_short.length
      }
    },
    created() {
      if (this.isEdit) {
        const id = this.$route.params && this.$route.params.id
        this.fetchData(id)
      } else {
        this.vendorForm = Object.assign({}, defaultForm)
      }
    },
    methods: {
      fetchData(id) {
        fetchArticle(id).then(response => {
          this.vendorForm = response.data
          // Just for test
          this.vendorForm.title += `   Article Id:${this.vendorForm.id}`
          this.vendorForm.content_short += `   Article Id:${this.vendorForm.id}`
        }).catch(err => {
          console.log(err)
        })
      },
      submitForm() {
        this.vendorForm.display_time = parseInt(this.display_time / 1000)
        console.log(this.vendorForm)
        this.$refs.vendorForm.validate(valid => {
          if (valid) {
            this.loading = true
            this.$notify({
              title: '成功',
              message: '发布文章成功',
              type: 'success',
              duration: 2000
            })
            this.vendorForm.status = 'published'
            this.loading = false
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      draftForm() {
        if (this.vendorForm.content.length === 0 || this.vendorForm.title.length === 0) {
          this.$message({
            message: '请填写必要的标题和内容',
            type: 'warning'
          })
          return
        }
        this.$message({
          message: '保存成功',
          type: 'success',
          showClose: true,
          duration: 1000
        })
        this.vendorForm.status = 'draft'
      },
      getRemoteUserList(query) {
        userSearch(query).then(response => {
          if (!response.data.items) return
          this.userListOptions = response.data.items.map(v => v.name)
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/mixin.scss";

  .createPost-container {
    position: relative;
    .createPost-main-container {
      padding: 40px 45px 20px 50px;
      .postInfo-container {
        position: relative;
        @include clearfix;
        margin-bottom: 10px;
        .postInfo-container-item {
          float: left;
        }
      }
      .editor-container {
        min-height: 500px;
        margin: 0 0 30px;
        .editor-upload-btn-container {
          text-align: right;
          margin-right: 10px;
          .editor-upload-btn {
            display: inline-block;
          }
        }
      }
    }
    .word-counter {
      width: 40px;
      position: absolute;
      right: -10px;
      top: 0px;
    }
  }
</style>
