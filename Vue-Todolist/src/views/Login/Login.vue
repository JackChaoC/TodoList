<template>
    <div class="login">
        <div class="main">
            <p>Todolist</p>
            <el-input class="account" v-model="data.user.username" style="width: 240px" type="account"
                placeholder="Please input account" />
            <el-input v-model="data.user.password" style="width: 240px" type="password"
                placeholder="Please input password" show-password />
            <div>
                <el-button type="primary" @click="postLogin">登录</el-button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import http from '../../http/http.js';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
// import { card, button, input } from 'element-plus';
const router = useRouter();
const message = ref('Hello, Vue 3!');
const data = reactive({
    user: {
        username: '',
        password: ''
    }
})
const postLogin = async () => {
    console.log(123);

    try {
        const res = await http.post('/authorization/login', {
            username: data.user.username,
            password: data.user.password
        });
        console.log(res);
        if (res.data) {
            router.push({
                name: 'home'
            }); // 替换 '/目标路径' 为实际的路径
            ElMessage.success('登陆成功')
        } else {
            ElMessage.warning('用户名或密码不正确')
        }
    } catch (err) {
        console.log(err);
    }

}
onMounted(() => {

    console.log(document.cookie);
})

// Add your component logic here
</script>

<style>
/* Add your styles here */
.login {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .main {
        width: 400px;
        height: auto;
        padding: 10px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        box-shadow: 0 0 10px 5px #f1f1f1;
        border-radius: 10px;

        p {
            align-self: start;
            margin: 10px;
        }

        .account {
            margin-bottom: 10px;
        }
        
        .el-button {
            
            margin: 10px;
        }
    }

}
</style>