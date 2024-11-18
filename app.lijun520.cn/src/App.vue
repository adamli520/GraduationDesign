<template>
    <con_header></con_header>
    
    <!-- <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
            <component :is="Component" />
        </transition>
    </router-view> -->

    <router-view></router-view>

    <con_footer></con_footer>

</template>
<script lang="ts" setup>
import con_header from './components/con_header.vue';
import con_footer from './components/con_footer.vue';  
</script>
<style scoped></style>