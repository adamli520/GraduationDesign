<template>

    <el-result icon="warning" title="404" sub-title="走丢了！没有找到该页面！">
        <template #extra>
            <el-button type="primary" @click="$router.replace('/home')">返回主页</el-button>
        </template>
    </el-result>
    <el-empty description="没有找到该页面" />


</template>
<script setup lang="ts">

</script>

<style scoped></style>