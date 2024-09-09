<template>
    <div class="home">
        <div class="main">
            <div class="input">

                <el-input v-model="searchContent" style="max-width: 600px" placeholder="Please input"
                    class="input-with-select">
                    <template #append>
                        <el-button @click="handleSearch" :icon="Search" />
                    </template>
                </el-input class="button2">
                <el-button type="primary" @click="dialogVisible = true">添加</el-button>
            </div>
            <div>
                <el-table :data="filterData.issue_lists" style="width: 100%" @sortChange="sortChange" height="85vh"
                    :default-sort="{ prop: 'order_date', order: 'descending' }">
                    <el-table-column type="index" width="50" />
                    <el-table-column label="Issue" prop="content" />
                    <el-table-column label="Date" :formatter="formatDate" prop="order_date" sortable="custom" />
                    <el-table-column align="right" label="Done or not">
                        <template #default="scope">
                            <el-checkbox v-model="scope.row.state" size="large"
                                @change="handleUpdate(scope.row.id, scope.row.state)" />
                        </template>

                    </el-table-column>

                    <el-table-column align="center" width="100">

                        <template #default="scope">
                            <el-button size="default" type="danger" @click="deleteListHandler(scope.$index, scope.row)">
                                Delete
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <el-dialog v-model="dialogVisible" title="Add List">
                <div class="dialog-content">
                    <el-input v-model="content" style="width: 100%;" type="textarea" placeholder="Please input"
                        :autosize="{ minRows: 4, maxRows: 6 }" />
                    <el-button type="primary" style="width:100px" @click="addListHandler">submit</el-button>
                </div>
            </el-dialog>
            <div>
                <input type="file" name="file" @change="handleFileChange">
                <button @click="uploadFile">上传文件</button>
                <button @click="download(downloadpath, originalname)">下载'{{ originalname }}'</button>
                <a href="http://localhost:3000/uploads/1725675834532-收购系统疑问.txt" download="收购系统疑问.txt"
                    target="_blank">下载文件</a>
            </div>

        </div>
    </div>
</template>

<script setup>
import { onBeforeMount, onMounted, onBeforeUnmount, reactive, ref, watch, computed } from 'vue';
import { Search } from '@element-plus/icons-vue'
import http from '@/http/http.js'
import utils from '@/components/utils'
import { formatter, ElMessage } from 'element-plus';
import axios from 'axios'

const message = ref('Hello, Vue 3!');
const searchContent = ref('');

watch(searchContent, (newValue, oldValue) => {
    console.log(`count changed from ${oldValue} to ${newValue}`);
})


//日期格式化
const formatDate = (row, column, cellValue, index) => {
    return utils.formatDate(cellValue);
}
//初始化取数据
let initData = {
    issue_lists: []
}
let filterData = reactive({
    issue_lists: []
})

//更新列表
const updateList = (falg = 0, searchContent = '') => {
    http.get(`/list/selectList/${falg}/${searchContent}`).then(res => {
        initData.issue_lists = res.data;
        filterData.issue_lists = utils.transformToFrontIssueLists(res.data);
        console.log('成功获取issue_lists:', res.data);
    }).catch(err => {
        console.log('获取issue_lists失败！' + err);
    })

}

//添加模块
const dialogVisible = ref(false);
let content = ref('');
const addListHandler = () => {
    if (content.value) {
        http.post('/list/addList', {
            content: content.value
        }).then(res => {
            ElMessage.success('添加成功')
            dialogVisible.value = false;
            content.value = '';
            updateList()
        }).catch(err => {
            ElMessage.warning('添加失败！' + err)
        })
    } else {
        ElMessage.warning('内容不能为空！')
    }
}

//删除模块
const deleteListHandler = (index, row) => {
    console.log('index', index);
    http.post('/list/deleteList', {
        id: row.id
    }).then(res => {
        ElMessage.success('删除成功')
        updateList()
    }).catch(err => {
        ElMessage.warning('删除失败！' + err)
    })
}
//修改state模块
const handleUpdate = (id, state) => {
    http.post('/list/updateList', {
        id: id,
        state: state ? 1 : 0
    }).then(res => {
        ElMessage.success('更新成功')
        updateList()
    }).catch(err => {
        ElMessage.warning('更新失败！' + err)

    })
}
//查找模块
const handleSearch = () => {
    if (searchContent.value) {
        updateList(0, searchContent.value)
        ElMessage.success('handleSearch' + searchContent.value);
    } else {
        updateList()
    }
}
var flag = 0 //默认升序
const sortChange = ({ order }) => { // order = "ascending" | "descending" | null
    flag = (order === 'ascending') ? 1 : 0
    console.log(flag, order);
    updateList(flag, searchContent.value)
}
//监控屏幕变化
let width = ref()
let height = ref()
let screenRatio = computed(() => {
    const a = width.value / height.value
    return a
})

//文件上传test
let file = null
const handleFileChange = (e) => {
    file = e.target.files[0];
}
let downloadpath = ref('')
let originalname = ref('')
const uploadFile = () => {
    let fd = new FormData()
    fd.append('file', file)
    fd.append('account', 'jackchao')
    // 使用 FormData.entries() 来查看其内容

    http.post('/upload', fd).then(res => {
        originalname.value = res.data.originalname
        downloadpath.value = res.data.path
    }).catch(err => {
        console.log(err);

    });
}
// 下载文件
const downloadFile = (url, filename) => {
    const a = document.createElement('a')
    a.href = 'http://localhost:3000' + url;
    a.download = filename;
    a.click();
}
// const download = (url, filename) => {
//     console.log('http://localhost:3000' + url);

//     axios({
//         method: 'GET',
//         url: 'http://localhost:3000' + url,
//         responseType: 'blob',
//     }).then(res => {
//         // 创建一个 URL 对象，指向返回的 Blob
//         const blob = new Blob([res.data]);
//         const downloadUrl = window.URL.createObjectURL(blob);
//         const a = document.createElement('a');
//         a.href = downloadUrl;
//         a.download = filename;  // 设置下载的文件名
//         document.body.appendChild(a);
//         a.click();  // 触发点击，开始下载
//         document.body.removeChild(a); // 下载完移除元素
//         window.URL.revokeObjectURL(downloadUrl);  // 释放创建的 URL 对象
//     }).catch(err => {

//     })
// }
const download = (url, filename) => {
    console.log('http://localhost:3000' + url);

    http.get({
        url: 'http://localhost:3000' + url,
        responseType: 'blob',
    }).then(res => {
        // 创建一个 URL 对象，指向返回的 Blob
        const blob = new Blob([res]);
        const downloadUrl = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = downloadUrl;
        a.download = filename;  // 设置下载的文件名
        document.body.appendChild(a);
        a.click();  // 触发点击，开始下载
        document.body.removeChild(a); // 下载完移除元素
        window.URL.revokeObjectURL(downloadUrl);  // 释放创建的 URL 对象
    }).catch(err => {

    })
}

//----------------------------------------------------------------

onBeforeMount(() => {
    updateList()
})
onMounted(() => {
    console.log(message.value);
    const resizeListener = window.addEventListener("resize", () => {
        // 获取当前窗口的宽度和高度
        width.value = window.innerWidth;
        height.value = window.innerHeight;

        // 输出当前窗口的宽度和高度
        console.log(`宽度: ${width.value}px, 高度: ${height.value}px`);
        console.log('screenRatio:', screenRatio.value);

        if (screenRatio.value < 2 / 3) {
            console.log('屏幕比例小于2/3');
        }
    });
    onBeforeUnmount(() => {
        window.removeEventListener('resize', resizeListener)
    })


})
</script>

<style>
/* Add your styles here */
@import url('@/assets/home.css');
</style>