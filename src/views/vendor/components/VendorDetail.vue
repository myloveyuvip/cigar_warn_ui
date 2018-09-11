<template>
  <div class="createPost-container">
    <el-form class="form-container" :model="vendorForm" :rules="rules" ref="vendorForm">

      <div class="createPost-main-container">
        <el-row>

          <el-col :span="24">
            <div class="postInfo-container">
              <el-row>
                <el-col :span="8">
                  <el-form-item label-width="80px" label="专管所" class="postInfo-container-item" prop="managerOffice">
                    <el-select v-model="vendorForm.managerOffice" placeholder="请选择">
                      <el-option
                        v-for="(key,value) in dictMap.managerOffice" :key="Number(value)" :label="key"
                        :value="Number(value)">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item label-width="100px" label="零售户名称" class="postInfo-container-item" prop="vendorName">
                    <el-input v-model="vendorForm.vendorName" placeholder="零售户名称"></el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item label-width="120px" label="是否中小学周边" class="postInfo-container-item" prop="isNearSchool">
                    <el-radio-group v-model="vendorForm.isNearSchool" size="small">
                      <el-radio :label='1' border>是</el-radio>
                      <el-radio :label='0' border>否</el-radio>
                    </el-radio-group>
                  </el-form-item>

                </el-col>
              </el-row>

              <el-row>
                <el-col :span="8">
                  <el-form-item label-width="80px" label="经营地址" class="postInfo-container-item" prop="address">
                    <el-input v-model="vendorForm.address" placeholder="经营地址"></el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item label-width="100px" label="经度" class="postInfo-container-item">
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
                  <el-form-item label-width="80px" label="籍贯" class="postInfo-container-item">
                    <el-input v-model="vendorForm.nativePlace" placeholder="籍贯"></el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item label-width="100px" label="经营者姓名" class="postInfo-container-item" prop="operatorName">
                    <el-input v-model="vendorForm.operatorName" placeholder="经营者姓名"></el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item label-width="120px" label="联系电话" class="postInfo-container-item" prop="phone">
                    <el-input v-model="vendorForm.phone" placeholder="联系电话"></el-input>
                  </el-form-item>
                </el-col>


              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label-width="80px" label="位置分布" class="postInfo-container-item">
                    <el-select v-model="vendorForm.distribution" placeholder="请选择">
                      <el-option
                        v-for="(key,value) in dictMap.distribution" :key="Number(value)" :label="key"
                        :value="Number(value)">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item label-width="100px" label="业态" class="postInfo-container-item">
                    <el-select v-model="vendorForm.industryType" placeholder="请选择">
                      <el-option
                        v-for="(key,value) in dictMap.industryType" :key="Number(value)" :label="key"
                        :value="Number(value)">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item label-width="120px" label="是否有工商执照" class="postInfo-container-item" prop="hasLicense">
                    <el-radio-group v-model="vendorForm.hasLicense" size="small">
                      <el-radio :label='1' border>是</el-radio>
                      <el-radio :label='0' border>否</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>

              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label-width="80px" label="违规次数" class="postInfo-container-item">
                    <el-input v-model="vendorForm.illegalTimes" placeholder="请输入数字"></el-input>
                  </el-form-item>
                </el-col>


                <el-col :span="8">
                  <el-form-item label-width="100px" label="卷烟喷码" class="postInfo-container-item" prop="cigarCode">
                    <el-input v-model="vendorForm.cigarCode" placeholder="卷烟喷码"></el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item label-width="120px" label="是否为特营场所" class="postInfo-container-item">
                    <el-radio-group v-model="vendorForm.isSpecialPlace" size="small">
                      <el-radio :label='1' border>是</el-radio>
                      <el-radio :label='0' border>否</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label-width="80px" label="主销品种" class="postInfo-container-item" prop="saleKind">
                    <el-input v-model="vendorForm.saleKind" placeholder="主销品种"></el-input>
                  </el-form-item>
                </el-col>


                <el-col :span="8">
                  <el-form-item label-width="100px" label="未办证原因" class="postInfo-container-item" prop="noCertReason">
                    <el-select v-model="vendorForm.noCertReason" placeholder="请选择">
                      <el-option
                        v-for="(key,value) in dictMap.noCertReason" :key="Number(value)" :label="key"
                        :value="Number(value)">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item label-width="120px" label="估计月销量(条)" class="postInfo-container-item"
                                prop="monthlySales">
                    <el-select v-model="vendorForm.monthlySales" placeholder="请选择">
                      <el-option
                        v-for="(key,value) in dictMap.monthlySales" :key="Number(value)" :label="key"
                        :value="Number(value)">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="8">
                  <el-form-item label-width="80px" label="从事经营时间" class="postInfo-container-item">
                    <el-date-picker v-model="vendorForm.operateTime" type="date" format="yyyy-MM-dd"
                                    placeholder="选择日期时间">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label-width="100px" label="登记时间" class="postInfo-container-item">
                    <el-date-picker v-model="vendorForm.registerTime" type="date" format="yyyy-MM-dd"
                                    placeholder="登记时间">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label-width="120px" label="备注" class="postInfo-container-item">
                    <el-input v-model="vendorForm.remark" placeholder="备注"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="24">
                  <el-form-item label-width="80px" label="店铺照片" class="postInfo-container-item" style="width: 400px;"
                                prop="shopPic">
                    <Upload v-model="vendorForm.shopPic"/>
                  </el-form-item>

                </el-col>
              </el-row>

              <el-row>
                <el-col :span="8" :offset="10">
                  <el-form-item>
                    <el-button type="primary" @click="submitForm('numberValidateForm')">提交</el-button>
                    <el-button @click="resetForm('numberValidateForm')">重置</el-button>
                  </el-form-item>
                </el-col>
              </el-row>

            </div>
          </el-col>
        </el-row>

      </div>
    </el-form>

  </div>
</template>

<script>
  import Tinymce from '@/components/Tinymce'
  import Upload from '@/components/Upload/singleImage2'
  import MDinput from '@/components/MDinput'
  import Multiselect from 'vue-multiselect'// 使用的一个多选框组件，element-ui的select不能满足所有需求
  import 'vue-multiselect/dist/vue-multiselect.min.css'// 多选框组件css
  import Sticky from '@/components/Sticky' // 粘性header组件
  import { addVendor, getVendorById } from '@/api/vendor'

  const defaultForm = {
    managerOffice: '',
    vendorName: '',
    address: '',
    isNearSchool: '',
    longitude: '',
    latitude: '',
    operatorName: '',
    phone: '',
    nativePlace: '',
    distribution: '',
    industryType: '',
    hasLicense: '',
    illegalTimes: '',
    isSpecialPlace: '',
    cigarCode: '',
    saleKind: '',
    monthlySales: '',
    noCertReason: '',
    operateTime: '',
    registerTime: '',
    shopPic: '',
    remark: ''
  }

  export default {
    name: 'vendorDetail',
    components: { Tinymce, MDinput, Upload, Multiselect, Sticky },
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      /* const validateRequire = (rule, value, callback) => {
        if (value === '') {
          this.$message({
            message: rule.field + '为必传项',
            type: 'error'
          })
          callback(null)
        } else {
          callback()
        }
      }*/
      return {
        vendorForm: Object.assign({}, defaultForm),
        loading: false,
        test: 0,
        manageOfficeOptions: [],
        distributionsOptions: [],
        industryOptions: [],
        noCertReasonOptions: [],
        monthlySalesOptions: [],
        dictMap: {},
        rules: {
          managerOffice:
            [{
              required: true, message: '专管所不能为空', trigger: 'change'
            }],
          vendorName:
            [{
              required: true, message: '零售户名称不能为空', trigger: 'blur'
            }],
          address:
            [{
              required: true, message: '地址不能为空', trigger: 'blur'
            }],
          isNearSchool:
            [{
              required: true, message: '是否中小学周边不能为空', trigger: 'change'
            }],
          operatorName:
            [{
              required: true, message: '经营者姓名不能为空', trigger: 'blur'
            }],
          phone:
            [
              {
                required: true, message: '联系电话不能为空', trigger: 'blur'
              },
              {
                pattern: /^1(3|4|5|7|8)\d{9}$/, message: '请输入正确的电话号码'
              }
            ],
          hasLicense:
            [{
              required: true, message: '是否有工商执照不能为空', trigger: 'change'
            }],
          cigarCode:
            [{
              required: true, message: '卷烟喷码不能为空', trigger: 'blur'
            }],
          saleKind:
            [{
              required: true, message: '主销品种不能为空', trigger: 'blur'
            }],
          monthlySales:
            [{
              required: true, message: '月销量不能为空', trigger: 'change'
            }],
          noCertReason:
            [{
              required: true, message: '未办证原因不能为空', trigger: 'change'
            }],
          shopPic: [{ required: true, message: '店铺照片不能为空', trigger: 'change' }]
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
    mounted() {
      // 获取数据字典
      this.dictMap = this.$store.state.app.dictMap
    },
    methods: {
      fetchData(id) {
        getVendorById(id).then((res) => {
          console.log('res', res)
          this.vendorForm = res.data.result
        })
      },
      submitForm() {
        const action = this.isEdit ? '修改' : '创建'
        this.$refs.vendorForm.validate(valid => {
          if (valid) {
            this.loading = true
            addVendor(this.vendorForm).then((res) => {
              if (res.status === 200) {
                this.$notify({
                  title: '成功',
                  message: action + '无证户成功！',
                  type: 'success',
                  duration: 2000
                })
                this.$router.push({ path: '/vendor' })
              }
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
