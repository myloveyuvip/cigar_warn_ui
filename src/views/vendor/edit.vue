<template>
  <vendor-detail :is-edit='true'></vendor-detail>
</template>

<script>
import VendorDetail from './components/VendorDetail'

export default {
  name: 'editForm',
  components: { VendorDetail }
}
</script>

