<template>
    <div>
        <h1>Maintenance Staff Account Manage</h1>
        <el-table :data="filterTableData.stuList" style="width: 100%">
            <el-table-column label="userName" prop="userName" />
            <el-table-column label="password" prop="password" />
            <el-table-column label="phone" prop="phone" />
            <el-table-column label="birth" prop="birth" :formatter="dateFormat" />
            <el-table-column align="right">
                <template #header>
                    <el-input v-model="search" size="small" placeholder="Type to search someone" @keyup.enter="searchStu()"/>
                </template>
                <template #default="scope">
                    <el-button size="small" @click="handleEdit(scope.row)">Edit</el-button>
                    <el-button size="small" type="danger" @click="handleDelete(scope.row)">Delete</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>

    <el-dialog v-model="dialogFormVisible" title="Update form" width="500">
        <h3>input information you want update, if it is null, then it is</h3>
        <el-form :model="form">
            <el-form-item label="userName" :label-width="formLabelWidth" style="margin-left: -10%;">
                <el-input v-model="form.userName" autocomplete="off" />
            </el-form-item>
            <el-form-item label="password" :label-width="formLabelWidth" style="margin-left: -10%;">
                <el-input v-model="form.password" autocomplete="off" />
            </el-form-item>
            <el-form-item label="phone" :label-width="formLabelWidth" style="margin-left: -10%;">
                <el-input v-model="form.phone" autocomplete="off" />
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogFormVisible = false">Cancel</el-button>
                <el-button type="primary" @click="updateInfo()">
                    Update
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script>
import { onMounted, reactive, ref } from 'vue'
import axios from 'axios'
import { ElNotification } from 'element-plus'
export default {
    name: 'App',
    setup() {
        let dialogFormVisible = ref(false);

        let search = ref('');

        const formLabelWidth = '140px'

        function searchStu(){
            axios.post('http://localhost:8080/findMan',{
                userName : search.value
            }).then((result) => {
                filterTableData.stuList = result.data;
            }).catch((err) => {
                console.log(err);
            });
        }

        const open1 = () => {
            ElNotification({
                title: 'Success',
                message: 'delete successful',
                type: 'success',
            })
        }


        const form = reactive({
            userId: null,
            userName: '',
            password: '',
            phone: '',
        })

        let filterTableData = reactive({
            stuList: []
        })

        function fetchData() {
            axios.post('http://localhost:8080/getAllManAccount').then((result) => {
                filterTableData.stuList = result.data
            }).catch((err) => {
                console.log(err)
            });
        }

        function handleDelete(row) {
            axios.post('http://localhost:8080/delManAccount', {
                userId: row.userId
            }).then((result) => {
                console.log(result);
                fetchData();
                open1()
            }).catch((err) => {
                console.log(err);
            });
        }

        function updateInfo() {
            axios.post('http://localhost:8080/updateMan', form).then((result) => {
                console.log(result);
                fetchData();
                dialogFormVisible.value = false;
            }).catch((err) => {
                console.log(err);
            });
        }

        function dateFormat(row, column, cellValue) {
            if (cellValue) {
                const date = new Date(cellValue);
                return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
            }
            return cellValue;
        }

        function handleEdit(row) {
            dialogFormVisible.value = true;
            form.userId = row.userId;
        }

        onMounted(() => {
            fetchData();
        });

        return {
            //stu table
            formLabelWidth,
            form,
            dialogFormVisible,
            filterTableData,
            fetchData,
            dateFormat,
            handleEdit,
            updateInfo,
            handleDelete,
            open1,
            searchStu,
            search,
        }
    }

}
</script>

<style></style>
