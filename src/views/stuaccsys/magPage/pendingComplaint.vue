<template>
    <div>
        <h1>Pending Complaints</h1>
        <el-table :data="filterTableData.complaintList" style="width: 100%">
            <el-table-column label="Name" prop="Name" width="150px"/>
            <el-table-column label="Floor" prop="Floor" width="100px"/>
            <el-table-column label="RoomNum" prop="RoomNum" width="100px"/>
            <el-table-column label="IncidentDate" prop="IncidentDate" :formatter="dateFormat" />
            <el-table-column label="IncidentTime" prop="IncidentTime" />
            <el-table-column label="Description" prop="Description" width="350px"/>
            <el-table-column label="Evidence" width="100px">
                <template #default="scope">
                    <el-button size="small" type="primary" @click="showEvidence(scope.row)">show</el-button>
                </template>
            </el-table-column>
            <el-table-column align="right">
                <!-- <template #header>
                    <el-input v-model="search" size="small" placeholder="Type to search someone"
                        @keyup.enter="searchStu()" />
                </template> -->
                <template #default="scope">
                    <el-button size="small" type="success" @click="finishComplaint(scope.row)">Finish</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>

    <el-dialog v-model="imgDialogVisible">
        <img :src="currentEvidenceUrl" alt="Evidence Image" style="width: 100%" />
    </el-dialog>
</template>

<script>
import { onMounted, reactive, ref } from 'vue'
import axios from 'axios'
export default {
    name: 'App',
    setup() {
        //complaints define
        let imgDialogVisible = ref(false);

        let filterTableData = reactive({
            complaintList: []
        })

        function finishComplaint(row){
            axios.post('http://localhost:8080/finishComplaint',{
                complaintID : row.complaintID
            }).then((result) => {
                getAllPendingComplaints();
                console.log(result);
            }).catch((err) => {
                console.log(err);
            });
        }

        function showEvidence(row) {
            this.currentEvidenceUrl = row.Evidence; // 假设这是包含图片URL的属性
            this.imgDialogVisible = true;
        }

        function getAllPendingComplaints() {
            axios.post('http://localhost:8080/getAllPendingComplaints').then((result) => {
                filterTableData.complaintList = result.data;
                console.log(filterTableData.complaintList)
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

        onMounted(() => {
            getAllPendingComplaints();
        });

        return {
            filterTableData,
            getAllPendingComplaints,
            dateFormat,
            imgDialogVisible,
            showEvidence,
            finishComplaint,
        }
    }
}
</script>

<style></style>