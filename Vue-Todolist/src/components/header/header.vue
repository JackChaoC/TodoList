<template>
    <div class="header">
        <el-button type="primary" @click="logout">退出登录</el-button>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import http from '../../http/http.js';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
const router = useRouter()
const logout = async () => {
    try {
        const result = await http.get('/authorization/logout')
        if (result.data) {
            ElMessage.success('登出成功')
            router.push({
                name: 'login'
            })
        } else {
            console.log('退出失败');
        }
    } catch (error) {
        console.log(error);
    }
}

</script>

<style scoped>
/* Add your styles here */
.header {
    display: flex;
    justify-content: flex-end;
    .el-button{
        margin: 10px;
    }
}
</style>