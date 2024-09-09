<template>
    <!-- {{ $store.state.user }} -->
      <div>{{ store.state.user.username }}</div>
</template>

<script setup>
import store from '@/store'


console.log("767",store.state.user.username);


</script>


<style lang="scss" scoped>

</style>