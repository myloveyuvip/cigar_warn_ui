<template>
  <vendor-detail :is-edit='false'></vendor-detail>
</template>

<script>
import VendorDetail from './components/VendorDetail'

export default {
  name: 'createForm',
  components: { VendorDetail }
}
</script>

