<template>
    <div class="common-layout">
        <!-- navigate -->
        <el-container>
            <el-header class="head">
                <el-menu :default-active="activeIndex2" class="el-menu-demo" mode="horizontal"
                    background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" @select="handleSelect">
                    <el-menu-item index="1">
                        <router-link to="/accHome">Home</router-link>
                    </el-menu-item>
                    <el-menu-item index="2">
                        <router-link to="/complaint">Complaint</router-link>
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
                    <div class="avatar">
                        <el-avatar :src="form.Evidence" />
                    </div>
                    <el-dropdown trigger="click" style="color: azure; margin-left: 10px; margin-top: 23px;">
                        <span class="el-dropdown-link">
                            {{ orderForm.orderUserName }}
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
            <el-main>
                <div class="app-container" style="margin-left: 0%; margin-top: 5%;" v-if="step == 1">
                    <el-row :gutter="400">
                        <!-- 第一个卡片 -->
                        <el-col :span="3" style="margin-right: 7%;">
                            <el-card class="guide-link-card" :body-style="{ padding: '32px' }"
                                :style="{ 'background-image': 'url(' + url1 + ')', width: '500px', height: '500px', color: 'azure', 'background-size': 'cover', 'background-position': 'center' }"
                                @click="stepAddGym();">
                                <div class="card-content">
                                    <i class="yourFirstIconClass"></i>
                                    <div class="card-title">Gym reservation</div>
                                </div>
                            </el-card>
                        </el-col>
                        <!-- 第二个卡片 -->
                        <el-col :span="3" style="margin-right: 7%;">
                            <el-card class="guide-link-card" :body-style="{ padding: '32px' }"
                                :style="{ 'background-image': 'url(' + url2 + ')', width: '500px', height: '500px', color: 'azure', 'background-size': 'cover', 'background-position': 'center' }"
                                @click="handleNewComplaint">
                                <div v-loading.fullscreen.lock="loading" class="card-content">
                                    <i class="yourSecondIconClass"></i>
                                    <div class="card-title">GameRoom reservation</div>
                                </div>
                            </el-card>
                        </el-col>
                        <!-- 第三个卡片 -->
                        <el-col :span="3">
                            <el-card class="guide-link-card" :body-style="{ padding: '32px' }"
                                :style="{ 'background-image': 'url(' + url3 + ')', width: '500px', height: '500px', color: 'azure', 'background-size': 'cover', 'background-position': 'center' }"
                                @click="handleViewHistory">
                                <div class="card-content">
                                    <i class="yourThirdIconClass"></i>
                                    <div class="card-title">Kitchen reservation</div>
                                </div>
                            </el-card>
                        </el-col>
                    </el-row>
                </div>
                <div v-if="step == 2">
                    <el-button color="#626aef" :dark="isDark" plain style="margin-left: 49.5%;" @click="stepMinGym()">Back</el-button>

                    <div style="display: flex;">
                        <h2 style="margin-right: 27.5%; margin-left: 36%; margin-top: 10%">{{ currentMonthDay }}</h2>
                        <h2 style="margin-top: 10%;">{{ tomorrowMonthDay }}</h2>
                    </div>

                    <div style="margin-bottom: 1%; margin-left: 4%;">
                        <el-button :disabled="buttonStates['9:00-10:00N']" color="#E0788A" style="width: 100px;"
                            @click="showConfirmDialog('9:00-10:00N')">9:00-10:00</el-button>
                        <el-button :disabled="buttonStates['14:00-15:00N']" color="#A5C5D8" style="width: 100px;"
                            @click="showConfirmDialog('14:00-15:00N')">14:00-15:00</el-button>
                        <el-button :disabled="buttonStates['19:00-20:00N']" color="#D9E2EC" style="width: 100px;"
                            @click="showConfirmDialog('19:00-20:00N')">19:00-20:00</el-button>

                        <!-- to -->
                        <el-button :disabled="buttonStates['9:00-10:00T']" color="#E0788A"
                            style="width: 100px; margin-left: 10%;"
                            @click="showConfirmDialog('9:00-10:00T')">9:00-10:00</el-button>
                        <el-button :disabled="buttonStates['14:00-15:00T']" color="#A5C5D8" style="width: 100px; "
                            @click="showConfirmDialog('14:00-15:00T')">14:00-15:00</el-button>
                        <el-button :disabled="buttonStates['19:00-20:00T']" color="#D9E2EC" style="width: 100px; "
                            @click="showConfirmDialog('19:00-20:00T')">19:00-20:00</el-button>
                    </div>

                    <div style="margin-bottom: 1%; margin-left: 4%;">
                        <el-button :disabled="buttonStates['10:00-11:00N']" color="#E0788A" style="width: 100px;"
                            @click="showConfirmDialog('10:00-11:00N')">10:00-11:00</el-button>
                        <el-button :disabled="buttonStates['15:00-16:00N']" color="#A5C5D8" style="width: 100px;"
                            @click="showConfirmDialog('15:00-16:00N')">15:00-16:00</el-button>
                        <el-button :disabled="buttonStates['20:00-21:00N']" color="#D9E2EC" style="width: 100px;"
                            @click="showConfirmDialog('20:00-21:00N')">20:00-21:00</el-button>

                        <!-- to -->

                        <el-button :disabled="buttonStates['10:00-11:00T']" color="#E0788A"
                            style="width: 100px; margin-left: 10%;"
                            @click="showConfirmDialog('10:00-11:00T')">10:00-11:00</el-button>
                        <el-button :disabled="buttonStates['15:00-16:00T']" color="#A5C5D8" style="width: 100px; "
                            @click="showConfirmDialog('15:00-16:00T')">15:00-16:00</el-button>
                        <el-button :disabled="buttonStates['20:00-21:00T']" color="#D9E2EC" style="width: 100px; "
                            @click="showConfirmDialog('20:00-21:00T')">20:00-21:00</el-button>
                    </div>

                    <div style="margin-bottom: 1%; margin-left: 4%;">
                        <el-button :disabled="buttonStates['11:00-12:00N']" color="#E0788A" style="width: 100px;"
                            @click="showConfirmDialog('11:00-12:00N')">11:00-12:00</el-button>
                        <el-button :disabled="buttonStates['16:00-17:00N']" color="#A5C5D8" style="width: 100px;"
                            @click="showConfirmDialog('16:00-17:00N')">16:00-17:00</el-button>
                        <el-button :disabled="buttonStates['21:00-22:00N']" color="#D9E2EC" style="width: 100px;"
                            @click="showConfirmDialog('21:00-22:00N')">21:00-22:00</el-button>

                        <!-- to -->

                        <el-button :disabled="buttonStates['11:00-12:00T']" color="#E0788A"
                            style="width: 100px; margin-left: 10%;"
                            @click="showConfirmDialog('11:00-12:00T')">11:00-12:00</el-button>
                        <el-button :disabled="buttonStates['16:00-17:00T']" color="#A5C5D8" style="width: 100px;"
                            @click="showConfirmDialog('16:00-17:00T')">16:00-17:00</el-button>
                        <el-button :disabled="buttonStates['21:00-22:00T']" color="#D9E2EC" style="width: 100px;"
                            @click="showConfirmDialog('21:00-22:00T')">21:00-22:00</el-button>
                    </div>

                    <!-- button -->

                    <!-- dialog -->

                    <el-dialog v-model="dialogVisible1" title="Reservation confirm" width="500"
                        :before-close="handleClose">
                        <p>whether reserve this time:{{ currentSelectedTime }}?</p>
                        <template #footer>
                            <div class="dialog-footer">
                                <el-button @click="dialogVisible1 = false">Cancel</el-button>
                                <el-button type="primary" @click="confirmReservation(currentSelectedTime)">
                                    Confirm
                                </el-button>
                            </div>
                        </template>
                    </el-dialog>

                    <el-button plain @click="dialogTableVisible = true" style="margin-top:5%; margin-left: 3.5%;">
                        check my reservation
                    </el-button>

                    <el-dialog v-model="dialogTableVisible" title="my reservation" width="800">
                        <el-table :data="gridData">
                            <el-table-column property="date" label="Date" width="150" />
                            <el-table-column property="name" label="Name" width="200" />
                            <el-table-column property="address" label="Address" />
                        </el-table>
                    </el-dialog>

                </div>


            </el-main>


        </el-container>
    </div>
</template>

<script>
import { onMounted, reactive, ref, } from 'vue'
import axios from 'axios'
import { Edit } from '@element-plus/icons-vue';

export default {

    name: 'App',

    setup() {
        //common reservation
        const dialogVisible1 = ref(false);
        const currentSelectedTime = ref('');
        const dialogTableVisible = ref(false)

        const gymForm = reactive({
            name: '',
            region: '',
            date1: '',
            date2: '',
            delivery: false,
            type: [],
            resource: '',
            desc: '',
        })

        // 显示对话框
        function showConfirmDialog(timeSlot) {
            currentSelectedTime.value = timeSlot; // 存储当前选中的时间段
            dialogVisible1.value = true; // 显示对话框
        }

        // 确认预定
        function confirmReservation(timeSlot) {

            if (buttonStates.value[timeSlot] !== undefined) {
                // dialogVisible1.value = false;
                buttonStates.value[timeSlot] = true; // 禁用按钮
                dialogVisible1.value = false; // 隐藏对话框
            }
        }


        const now = new Date();
        const currentMonthDay = `${now.getMonth() + 1}-${now.getDate()}`;

        // tomorrow date
        const tomorrow = new Date(now);
        tomorrow.setDate(tomorrow.getDate() + 1);
        const tomorrowMonthDay = `${tomorrow.getMonth() + 1}-${tomorrow.getDate()}`;

        //step progress
        let step = ref(1);

        function stepAddGym() {
            step.value = step.value + 1;
        }

        function stepMinGym() {
            step.value = step.value - 1;
        }

        function stepAddGame() {
            step.value = step.value + 2;
        }

        function stepMinGame() {
            step.value = step.value - 2;
        }

        function stepAddKit() {
            step.value = step.value + 3;
        }

        function stepMinKit() {
            step.value = step.value - 3;
        }

        //gym reservation
        const buttonStates = ref({
            '9:00-10:00N': false,
            '10:00-11:00N': false,
            '11:00-12:00N': false,

            '14:00-15:00N': false,
            '15:00-16:00N': false,
            '16:00-17:00N': false,

            '19:00-20:00N': false,
            '20:00-21:00N': false,
            '21:00-22:00N': false,
            // tomorrow
            '9:00-10:00T': false,
            '10:00-11:00T': false,
            '11:00-12:00T': false,

            '14:00-15:00T': false,
            '15:00-16:00T': false,
            '16:00-17:00T': false,

            '19:00-20:00T': false,
            '20:00-21:00T': false,
            '21:00-22:00T': false,

            // ... and so on for each time slot
        });

        function disableButton(timeSlot) {
            if (buttonStates.value[timeSlot] !== undefined) {
                buttonStates.value[timeSlot] = true;
            }
            // Other code to handle the button click
        }

        //reservation function


        //reservation info
        const url1 = 'https://ayakakamisato.oss-eu-west-1.aliyuncs.com/gym.webp';
        const url2 = 'https://ayakakamisato.oss-eu-west-1.aliyuncs.com/gameRoom.webp';
        const url3 = 'https://ayakakamisato.oss-eu-west-1.aliyuncs.com/publicKitchen.webp';

        //update form
        let dialogVisible = ref(false);

        function handleUploadSuccessEdit(response) {
            form.Evidence = response.data
            axios.post("http://localhost:8080/insertOrderImg", {
                UserID: userId.value,
                Evidence: form.Evidence
            }).then((result) => {
                console.log(result)
                getOrderInfo();
                fetchUrl();
            }).catch((err) => {
                console.log(err)
            });
        }

        const form = reactive({
            Evidence: '',
            userId: null // 添加 UserID 属性
        })

        function fetchUrl() {
            axios.post('http://localhost:8080/findUrl', {
                userId: userId.value
            }).then((result) => {
                form.Evidence = result.data.data
                circleUrl = result.data
            }).catch((err) => {
                console.log(err)
            });
        }

        //Personal data acquisition
        const userId = ref(0);

        onMounted(() => {
            getOrderInfo();
            fetchUrl();
        });

        const getOrderInfo = () => {
            userId.value = sessionStorage.getItem("userId")
            axios.post('http://localhost:8080/getOrderInfo', {
                userId: userId.value
            }).then((result) => {
                orderForm.orderUserName = result.data.userName;
                orderForm.orderUserPhone = result.data.phone;
                orderForm.orderUserBirth = result.data.birth;
                orderForm.orderUserStatus = result.data.status;
            }).catch((err) => {
                console.log(err)
            });
        }

        let orderForm = reactive({
            orderUserName: '',
            orderUserPhone: '',
            orderUserBirth: '',
            orderUserStatus: '',
        })

        //
        let circleUrl = ref('https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png')

        // Router-related
        const activeIndex = ref('1')
        const activeIndex2 = ref('1')
        const handleSelect = (key, keyPath) => {
            console.log(key, keyPath)
        }

        // Cards
        const guideLinks = reactive([
            { title: 'Function1', icon: 'el-icon-info', route: '/student-guide' },
            { title: 'Function2', icon: 'el-icon-notebook-2', route: '/courses' },
            { title: 'Function3', icon: 'el-icon-edit-outline', route: '/exams' },
            { title: 'Function4', icon: 'el-icon-edit-outline', route: '/exams' },
            { title: 'Function5', icon: 'el-icon-edit-outline', route: '/exams' },
            { title: 'Function6', icon: 'el-icon-edit-outline', route: '/exams' },
            // Add other links as needed
        ])

        // Navigation function
        function navigateTo(route) {
            console.log('Navigating to', route)
            // this.$router.push(route); // Uncomment and modify for your router
        }

        // Current date
        const currentDate = ref(new Date())

        // Return all the reactive properties and methods
        return {
            dialogTableVisible,
            gymForm,

            currentSelectedTime,
            showConfirmDialog,
            confirmReservation,
            dialogVisible1,
            //common reservation info
            currentMonthDay,
            tomorrowMonthDay,
            //step
            step,
            stepAddGym,
            stepMinGym,
            stepAddGame,
            stepMinGame,
            stepAddKit,
            stepMinKit,
            //gym
            disableButton,
            buttonStates,
            //reservation
            url1,
            url2,
            url3,
            //update form
            fetchUrl,
            form,
            handleUploadSuccessEdit,
            dialogVisible,
            //order
            Edit,
            userId,
            orderForm,
            getOrderInfo,
            // Router
            activeIndex,
            activeIndex2,
            handleSelect,
            // Cards
            currentDate,
            guideLinks,
            navigateTo,
            // Icons
            circleUrl,
            // squareUrl,
            // sizeList,
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

.demo-basic {
    text-align: center;
}

.demo-basic .sub-title {
    margin-bottom: 10px;
    font-size: 14px;
    color: var(--el-text-color-secondary);
}

.demo-basic .demo-basic--circle,
.demo-basic .demo-basic--square {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.demo-basic .block:not(:last-child) {
    border-right: 1px solid var(--el-border-color);
}

.demo-basic .block {
    flex: 1;
}

.demo-basic .el-col:not(:last-child) {
    /* border-right: 1px solid var(--el-border-color); */
}

.avatar {
    margin-top: 10px;
    margin-left: 50%;
}

.el-icon svg {
    height: 0.5em;
    width: 0.5em;
}

.el-upload--picture-card {
    width: 200px;
}

.app-container {
    overflow-x: hidden;
    /* 隐藏水平滚动条 */
}

.custom-button-text {
    color: #303133;
    /* 这里是你想要的文字颜色 */
}
</style>