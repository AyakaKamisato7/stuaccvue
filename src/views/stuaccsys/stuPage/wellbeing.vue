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
                <div id="app">
                    <ChatComponent />
                </div>
                <!-- <div>
                    <h2>Chat Room</h2>
                    <div v-for="(message, index) in messages" :key="index">{{ message }}</div>
                    <input v-model="inputMessage" @keyup.enter="sendMessage" placeholder="Type your message..." />
                </div> -->
            </el-main>


        </el-container>
    </div>
</template>

<script>
import { onMounted, reactive, ref, } from 'vue'
import axios from 'axios'
import { Edit } from '@element-plus/icons-vue';
// import { io } from 'socket.io-client';
import ChatComponent from '../../../components/ChatComponent.vue';
export default {

    name: 'App',
    components: {
        ChatComponent
    },
    setup() {
        //chat
        // const inputMessage = ref('');
        // const messages = ref([]);
        // let socket = null;

        // const connectWebSocket = () => {
        //     socket = io('http://localhost:8080'); // Change the URL if necessary

        //     socket.on('connect', () => {
        //         console.log('WebSocket connected');
        //     });

        //     socket.on('message', (message) => {
        //         messages.value.push(message);
        //     });

        //     socket.on('disconnect', () => {
        //         console.log('WebSocket disconnected');
        //     });
        // };

        // const sendMessage = () => {
        //     if (inputMessage.value.trim() !== '') {
        //         socket.emit('message', inputMessage.value);
        //         inputMessage.value = '';
        //     }
        // };

        // onMounted(() => {
        //     connectWebSocket();
        // });

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
            //chat
            // inputMessage,
            // messages,
            // sendMessage,
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
</style>