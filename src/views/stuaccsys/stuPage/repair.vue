<template>
    <div :class="{ 'common-layout': true, 'page1': currentStep === 1 }">
        <!-- navigate -->
        <el-container>
            <el-header class="head">
                <el-menu :default-active="activeIndex2" class="el-menu-demo" mode="horizontal"
                    background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" @select="handleSelect">
                    <el-menu-item index="1">
                        <router-link to="/accHome">Home</router-link>
                    </el-menu-item>
                    <el-menu-item index="2">
                        <router-link to="/complaint" @click="refresh">Complaint</router-link>
                    </el-menu-item>
                    <el-menu-item index="3">
                        <router-link to="/events">Events</router-link>
                    </el-menu-item>
                    <el-menu-item index="4">
                        <router-link to="/repair">Repair</router-link>
                    </el-menu-item>
                    <el-menu-item index="5">
                        <router-link to="/order">Order info</router-link>
                    </el-menu-item>
                    <el-menu-item index="6">
                        <router-link to="/stuabout">About</router-link>
                    </el-menu-item>
                    <el-sub-menu index="7">
                        <template #title>Help & Advice</template>
                        <el-menu-item index="7-1">How to book</el-menu-item>
                        <el-menu-item index="7-2">FAQs</el-menu-item>
                        <el-menu-item index="7-3">Contact</el-menu-item>
                    </el-sub-menu>
                    <!--  -->
                    <div class="avatar">
                        <el-avatar :src="avatarForm.avatar" />
                    </div>
                    <el-dropdown trigger="click" style="color: azure; margin-left: 10px; margin-top: 23px;">
                        <span class="el-dropdown-link">
                            {{ userName }}
                        </span>
                        <!-- drop down box -->
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item class="clearfix">
                                    Revise
                                    <el-badge class="mark" :value="12" />
                                </el-dropdown-item>
                                <el-dropdown-item class="clearfix">
                                    Repair
                                    <el-badge class="mark" :value="3" />
                                </el-dropdown-item>
                                <el-dropdown-item class="clearfix">
                                    Complaint
                                    <el-badge class="mark" :value="3" />
                                </el-dropdown-item>
                                <el-dropdown-item class="clearfix">
                                    Sign out
                                    <el-badge class="mark" />
                                </el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </el-menu>

            </el-header>

            <!-- main -->
            <!-- // FLOOR, ROOMNUM, INCIDENTDATE, INCIDENTTIME, DESCRIPTION, EVIDENCE, STATUS -->
            <el-main>
                <div v-if="currentStep == 0">
                    <el-button type="primary" style="margin-right: -95%;" @click="back1">Back</el-button>
                    <el-table :data="repairTableData.repairList" style="width: 100%">
                        <el-table-column prop="Floor" label="Floor" width="150px" />
                        <el-table-column prop="RoomNum" label="RoomNum" width="150px" />
                        <el-table-column prop="RoomType" label="RoomType" width="200px" />
                        <el-table-column prop="Area" label="Area" width="200px" />
                        <el-table-column prop="Description" label="Description" width="600px" />
                        <!-- <el-table-column prop="Evidence" label="Evidence" /> -->
                        <el-table-column prop="Status" label="Status" width="150px">

                            <template v-slot:default="scope">
                                <!-- 这里假设status为1表示已完成，为0表示未完成 -->
                                <div>{{ scope.row.Status === 1 ? 'Finished' : 'Not Finished' }}</div>
                            </template>
                        </el-table-column>
                        <el-table-column label="Operation">

                            <template #default="scope">
                                <el-button link type="primary" size="small"
                                    @click="handleClick(scope.row)">Detail</el-button>
                                <el-button link type="primary" size="small"
                                    @click="delRepair(scope.row); open1()">Delete</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <!-- dialog -->
                    <el-dialog v-model="complaintDialog" title="Detail" width="700" :before-close="handleClose">
                        <el-image style="width: 600px; height: 1000px" :src='imgUrl' lazy />
                        <template #footer>
                            <div class="dialog-footer">
                                <el-button @click="complaintDialog = false">Cancel</el-button>
                                <el-button type="primary" @click="complaintDialog = false">
                                    Confirm
                                </el-button>
                            </div>
                        </template>
                    </el-dialog>
                </div>
                <el-watermark :font="font" class="watermark-fullscreen" content="Let's solve that!"
                    v-if="currentStep != 0">
                    <div v-if="currentStep == 1" class="page1">
                        <h2 style="color: black;">Any help? Tell us!</h2>
                        <div class="app-container" style="margin-left: 35%; margin-bottom: 15%; margin-top: 10%;">
                            <el-row :gutter="20">
                                <el-col :span="4" style="margin-right: 7%;">
                                    <el-card class="guide-link-card" :body-style="{ padding: '32px' }"
                                        style="background-color: #79bbff; width: 195px; height: 195px; color: #F2F6FC;"
                                        @click="goMyComplaint(); getRepairTableData();">
                                        <div class="card-content">
                                            <i class="yourFirstIconClass"></i>
                                            <div class="card-title">Request submitted</div>
                                        </div>
                                    </el-card>
                                </el-col>
                                <el-col :span="4">
                                    <el-card class="guide-link-card" :body-style="{ padding: '32px' }"
                                        style="background-color: #79bbff; width: 195px; height: 195px; color: #F2F6FC;"
                                        @click="handleNewComplaint">
                                        <!-- 应用 loading 指令到整个卡片 -->
                                        <div v-loading.fullscreen.lock="loading" class="card-content">
                                            <i class="yourSecondIconClass"></i>
                                            <div class="card-title">A new Repair request</div>
                                        </div>
                                    </el-card>
                                </el-col>
                            </el-row>
                        </div>
                    </div>

                    <div v-if="currentStep == 2">
                        <div style="display: flex; align-items: center; justify-content: flex-start;">
                            <h2 style="margin-right: 136px;margin-left: 45%; font-size: 30px;">Repair</h2>
                            <el-button color="#626aef" :dark="isDark" plain @click="refresh">Back</el-button>
                        </div>
                        <el-form :model="form" label-width="100px">
                            <el-form-item label="Name" style="margin-left: 27%;">
                                <el-input style="width:50%;" v-model="updateForm.Name" disabled :value="form.Name" />
                            </el-form-item>
                            <div style="display: flex; justify-content: space-around;">
                                <el-form-item label="Floor" style="margin-left: 27%; flex-grow: 1;">
                                    <el-select v-model="updateForm.Floor" placeholder="please select the floor">
                                        <el-option label="Floor 0" value="0" />
                                        <el-option label="Floor 1" value="1" />
                                        <el-option label="Floor 2" value="2" />
                                        <el-option label="Floor 3" value="3" />
                                        <el-option label="Floor 4" value="4" />
                                        <el-option label="Floor 5" value="5" />
                                        <el-option label="Floor 6" value="6" />
                                        <el-option label="Floor 7" value="7" />
                                        <el-option label="Floor 8" value="8" />
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="Room num" style="flex-grow: 1; margin-left: -33.5%;">
                                    <el-select v-model="updateForm.RoomNum" placeholder="please select the room">
                                        <el-option label="01" value="01" />
                                        <el-option label="02" value="02" />
                                        <el-option label="03" value="03" />
                                        <el-option label="04" value="04" />
                                        <el-option label="05" value="05" />
                                        <el-option label="06" value="06" />
                                        <el-option label="07" value="07" />
                                        <el-option label="08" value="08" />
                                        <el-option label="09" value="09" />
                                    </el-select>
                                </el-form-item>
                            </div>
                            <div style="display: flex; flex-direction: row; justify-content: space-between;">
                                <!-- <el-form :model="selectForm"
                                    style="display: flex; flex-direction: row; justify-content: space-between;"> -->
                                    <el-form-item label="Room Type" style="flex: 1; margin-left: 27%;">
                                        <el-radio-group v-model="selectForm.radio1" size="large">
                                            <el-radio-button label="Ensuite" value="Ensuite" />
                                            <el-radio-button label="Studio" value="Studio" />
                                        </el-radio-group>
                                    </el-form-item>
                                    <el-form-item label="Area" style="flex: 1; margin-left: -33.6%;">
                                        <el-select v-model="selectForm.area" placeholder="please select the area">
                                            <el-option v-for="option in getAreaOptions" :label="option.label"
                                                :value="option.value" :key="option.value" />
                                        </el-select>
                                    </el-form-item>
                                <!-- </el-form> -->
                            </div>
                            <el-form-item label="Describe the situation" style="margin-left: 27%; width:39.5% ">
                                <el-input v-model="updateForm.Description" type="textarea" :rows="3" />
                            </el-form-item>
                            <el-form-item label="Evidence" style="margin-left: 27%; width:39.5% ">
                                <el-upload action="http://localhost:8080/upload" :on-success="handleUploadSuccessRepair"
                                    :on-error="handleUploadError" :before-upload="beforeUpload"
                                    :file-list="editFileList" :limit="1" list-type="picture-card">
                                    <el-button type="primary">upload</el-button>
                                </el-upload>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" style="margin-left: 41.3%;" :loading="loading"
                                    @click="insertRepair">Create</el-button>
                                <el-button @click="dealFile">reset </el-button>
                            </el-form-item>
                        </el-form>
                    </div>

                    <div v-if="currentStep == 3">
                        <el-col :sm="12" :lg="6" style="margin-left: 37.5%; margin-top: 10px;">
                            <el-result icon="success" title="Upload successful"
                                sub-title="You can return to the homepage">

                                <template #extra>
                                    <el-button type="primary" @click="back1">Back</el-button>
                                </template>
                            </el-result>
                        </el-col>
                    </div>

                </el-watermark>

                <!-- progress -->
                <el-steps :active="currentStep" align-center v-if="currentStep != 0">
                    <el-step title="Step 1" />
                    <el-step title="Step 2" />
                    <el-step title="Step 3" />
                </el-steps>
            </el-main>


            <!-- footer -->
            <el-footer style="margin-top: -1.5%;" v-if="currentStep == 2">
                <h3 style=" font-weight: lighter; font-size: 14px;">Reports are anonymous. Submitting your
                    name
                    is just to ensure that there are no unwarranted reports.</h3>
            </el-footer>

        </el-container>
    </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { h } from 'vue'
import { ElNotification } from 'element-plus'


export default {
    name: 'App',

    setup() {
        //updateForm
        function delRepair(rowData){
            axios.post('http://localhost:8080/delRepair',{
                id : rowData.id
            }).then((result) => {
                console.log(result);
                getRepairTableData();
            }).catch((err) => {
                console.log(err)
            });
        }

        const getRepairTableData = () => {
            axios.post('http://localhost:8080/repairTableData', {
                userId: userId.value
            }).then((result) => {
                repairTableData.repairList = result.data
            }).catch((err) => {
                console.log(err)
            });
        }

        let repairTableData = reactive({
            // id,FLOOR, ROOMNUM, RoomType, Area, DESCRIPTION, EVIDENCE, STATUS
            repairList: [],
        })

        const updateForm = reactive({
            Name : '',
            Floor : '',
            RoomNum : '',
            RoomType : '',
            Area : '',
            Description : '',
            Evidence : '',
            UserID : null,
        });

        const insertRepair = () =>{
            updateForm.Name = sessionStorage.getItem('userName');
            updateForm.UserID = parseInt(sessionStorage.getItem('userId'), 10);
            updateForm.RoomType = selectForm.value.radio1;
            updateForm.Area = selectForm.value.area;
            console.log(updateForm.Description)
            axios.post('http://localhost:8080/insertRepair',updateForm).then((result) => {
                console.log(result)
                updateForm.Name = '';
                updateForm.Floor = '';
                updateForm.RoomNum = '';
                updateForm.RoomType = '';
                updateForm.Area = '';
                updateForm.Description = '';
                updateForm.Evidence = '';
                updateForm.UserID = null;
                nextStep();
            }).catch((err) => {
                console.log(err)
            });
        }

        const handleUploadSuccessRepair = (response) =>{
            updateForm.Evidence = response.data
        }

        //select radio
        const radio1 = ref('1')

        const selectForm = ref({
            radio1: '',
            area: ''
        });

        const getAreaOptions = computed(() => {
            if (selectForm.value.radio1 === 'Ensuite') {
                return [
                    { label: 'kitchenware', value: 'Kitchenware' },
                    { label: 'public furniture', value: 'publicFurniture' },
                    { label: 'public window', value: 'publicWindow' },
                    { label: 'private shower supplies', value: 'privateShowerSupplies' },
                    { label: 'private furniture', value: 'privateFurniture' },
                    { label: 'private bathroom', value: 'privateBathroom' },
                    { label: 'private window', value: 'privateWindow' },
                    { label: 'other', value: 'other' }
                ];
            } else if (selectForm.value.radio1 === 'Studio') {
                return [
                    { label: 'kitchenware', value: 'StudioKitchen' },
                    { label: 'bathroom', value: 'bathroom' },
                    { label: 'shower supplies', value: 'showerSupplies' },
                    { label: 'furniture', value: 'furniture' },
                    { label: 'window', value: 'window' },
                    { label: 'other', value: 'other' }
                ];
            } else {
                return [];
            }
        });

        //avatar
        const avatarForm = reactive({
            avatar: '',
            userId: null // 添加 UserID 属性
        })

        function fetchUrl() {
            axios.post('http://localhost:8080/findUrl', {
                userId: userId.value
            }).then((result) => {
                avatarForm.avatar = result.data.data
            }).catch((err) => {
                console.log(err)
            });
        }

        //table data control
        const open1 = () => {
            ElNotification({
                title: 'Operation',
                message: h('i', { style: 'color: teal' }, 'Delete successfully!'),
            })
        }

        let complaintDialog = ref(false);
        let imgUrl = ref('');

        const handleClick = (rowData) => {
            imgUrl.value = rowData.Evidence;
            complaintDialog.value = true;
        }

        function delComplaint(rowData) {
            console.log(rowData.complaintID)
            axios.post('http://localhost:8080/delComplaint', {
                complaintID: rowData.complaintID
            }).then((result) => {
                console.log(result)
                getTableData();
            }).catch((err) => {
                console.log(err)
            });
        }

        //table when step == 0
        let tableData = reactive({
            // id,FLOOR, ROOMNUM, INCIDENTDATE, INCIDENTTIME, DESCRIPTION, EVIDENCE, STATUS
            complaintList: [],
        })

        const getTableData = () => {
            axios.post('http://localhost:8080/complaintTable', {
                userId: userId.value
            }).then((result) => {
                tableData.complaintList = result.data

            }).catch((err) => {
                console.log(err)
            });
        }

        //upload loading
        const uploadedFiles = ref([])

        const handleBeforeUpload = (file) => {
            dealFile(file) // 直接调用 dealFile 函数进行上传
            return false // 阻止自动上传
        }

        const handleUploadSuccess = (response, file) => {
            console.log('File uploaded successfully:', file)
            uploadedFiles.value.push({
                name: file.name, // 文件名
                size: file.size, // 文件大小
            })
        }

        function dealFile(file) {
            console.log(file)
            let formData = new FormData()
            formData.append('file', file)

            axios
                .post('http://localhost:8080/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                })
                .then((response) => {
                    // 将上传成功的文件信息存储到 form.Evidence 中
                    form.Evidence.push(response.data.fileUrl)
                    handleUploadSuccess(response, file)
                })
                .catch((error) => {
                    console.error('Error uploading file:', error)
                })
        }

        //watermark
        const font = reactive({
            color: 'rgba(0, 0, 0, .15)',
        })

        //insert complaint
        // 使用 JavaScript 原生方法格式化日期
        function handleUploadSuccessEdit(response) {
            form.Evidence = response.data
        }

        function formatDate(date) {
            const year = date.getFullYear();
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const day = date.getDate().toString().padStart(2, '0');
            return `${year}-${month}-${day}`;
        }

        // 使用 JavaScript 原生方法格式化时间
        function formatTime(time) {
            const hours = time.getHours().toString().padStart(2, '0');
            const minutes = time.getMinutes().toString().padStart(2, '0');
            const seconds = time.getSeconds().toString().padStart(2, '0');
            return `${hours}:${minutes}:${seconds}`;
        }

        function insertComplaint() {
            form.UserID = userId.value;
            form.IncidentDate = formatDate(form.IncidentDate);
            form.IncidentTime = formatTime(form.IncidentTime);
            console.log(form)
            axios.post('http://localhost:8080/insertComplaint', form)
                .then((result) => {
                    // 处理成功响应
                    console.log('Complaint inserted successfully:', result.data);
                    form.Name = '';
                    form.Floor = '';
                    form.RoomNum = '';
                    form.IncidentDate = '';
                    form.IncidentTime = '';
                    form.Description = '';
                    form.Evidence = '';
                    form.UserID = null;
                })
                .catch((err) => {
                    // 处理错误
                    console.error('Error inserting complaint:', err);
                    console.log(form)
                });
        }

        //data loading
        const router = useRouter();
        const authority = ref('');
        const userId = ref(0);
        const userName = ref('');
        onMounted(() => {
            authority.value = sessionStorage.getItem('authority');
            userId.value = parseInt(sessionStorage.getItem('userId'), 10);
            userName.value = sessionStorage.getItem('userName');
        });

        const findUserNameAgain = () => {
            axios.post('http://localhost:8080/findUserName', {
                userId: userId.value
            })
                .then(response => {
                    form.Name = response.data.name;
                })
                .catch(error => {
                    console.error('There was an error!', error);
                });
        }

        onMounted(() => {
            fetchUrl();
            axios.post('http://localhost:8080/findUserName', {
                userId: userId.value
            })
                .then(response => {
                    form.Name = response.data.name;
                    getRepairTableData();
                    getTableData();
                })
                .catch(error => {
                    console.error('There was an error!', error);
                });
        });

        //progress step
        const loading = ref(false);
        const currentStep = ref(1);

        const goMyComplaint = () => {
            currentStep.value = 0;
        }

        const back1 = () => {
            currentStep.value = 1;
        }

        const refresh = () => {
            currentStep.value = 1;
        }

        const handleNewComplaint = () => {
            loading.value = true; // 显示加载动画
            findUserNameAgain();
            setTimeout(() => {
                loading.value = false; // 停止加载动画
                currentStep.value = 2; // 切换到步骤2
            }, 1000); // 等待1秒钟
        };

        const handleCreate = () => {
            loading.value = true; // 启动加载动画
            // 模拟异步操作，比如向后端提交表单
            setTimeout(() => {
                onSubmit(); // 你现有的提交逻辑
                insertComplaint();
                nextStep(); // 切换到下一个步骤
                loading.value = false; // 异步操作完成，停止加载动画
            }, 3000); // 假设异步操作需要1秒钟时间
        };

        const nextStep = () => {
            if (currentStep.value < 3) {
                currentStep.value++;
            }
        };

        const reset = () => {

        }

        //form
        const form = reactive({
            Name: '', // 修改属性名为与后端一致的名称
            Floor: '',
            RoomNum: '',
            IncidentDate: '',
            IncidentTime: '',
            Description: '',
            Evidence: '',
            UserID: null // 添加 UserID 属性
        })

        const onSubmit = () => {
            console.log('submit!')
        }



        // router
        const activeIndex = ref('1')
        const activeIndex2 = ref('1')
        const handleSelect = (key, keyPath) => {
            console.log(key, keyPath)
        }

        function navigateTo(route) {
            // Use your router to navigate
            console.log('Navigating to', route);
            // this.$router.push(route); // Uncomment this line and use it with your router instance
        }

        const currentDate = ref(new Date());

        // page end
        return {
            //repair data and function
            getRepairTableData,
            delRepair,
            repairTableData,
            updateForm,
            insertRepair,
            handleUploadSuccessRepair,
            //radio
            radio1,
            selectForm,
            getAreaOptions,
            //
            fetchUrl,
            avatarForm,
            //
            userName,
            imgUrl,
            complaintDialog,
            handleClick,
            open1,
            delComplaint,
            //router
            authority,
            router,
            //table when step == 0
            tableData,
            getTableData,
            //upload
            handleUploadSuccessEdit,
            dealFile,
            uploadedFiles,
            font,
            //insertComplaint
            findUserNameAgain,
            formatDate,
            formatTime,
            handleUploadSuccess,
            insertComplaint,
            handleBeforeUpload,
            //axios
            userId,
            //progress step
            goMyComplaint,
            back1,
            nextStep,
            currentStep,
            refresh,
            reset,
            loading,
            handleNewComplaint,
            handleCreate,
            //form
            form,
            onSubmit,
            //router
            activeIndex,
            activeIndex2,
            handleSelect,
            //cards
            currentDate,
            navigateTo,
            //icon

        }
    }
}
</script>


<style>
/* navigate */
.head {
    background-color: rgb(84, 92, 100);
}

.demonstration {
    color: var(--el-text-color-secondary);
}

.el-carousel__item h3 {
    color: #475669;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
    text-align: center;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
}

.app-container {
    padding: 20px;
}

.guide-link-card {
    cursor: pointer;
    transition: transform 0.3s ease;
}

.guide-link-card:hover {
    transform: translateY(-5px);
}

.card-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.card-title {
    margin-top: 15px;
    font-weight: bold;
    text-align: center;
}

.el-icon {
    font-size: 40px;
}

.watermark-fullscreen {
    min-height: 80vh;
    /* Ensure it covers the full height of the viewport */
    display: block;
    /* Ensure it takes up the full container space */
}

.el-upload--picture-card {
    --el-upload-picture-card-size: 200px;
    background-color: var(--el-fill-color-lighter);
    border: 1px dashed var(--el-border-color-darker);
    border-radius: 6px;
    box-sizing: revert;
    width: 530px;
    height: 200px;
    cursor: pointer;
    vertical-align: top;
    display: inline-flex;
    justify-content: center;
    align-items: center;
}

.avatar {
    margin-top: 10px;
    margin-left: 50%;
}

.el-icon svg {
    height: 0.5em;
    width: 0.5em;
}
</style>