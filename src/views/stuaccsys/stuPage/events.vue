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

            <el-main>
                <!-- calendar and dialog -->
                <el-calendar @panel-change="handlePanelChange">

                    <template #date-cell="{ data }">
                        <div :class="data.isSelected ? 'is-selected' : ''" @click="checkEvent(data)">
                            {{ data.day.split('-').slice(1).join('-') }}
                            {{ data.isSelected ? '✔️' : '' }}
                            <!-- 如果有事件，显示一个小图标或标记 -->
                            <span v-if="hasEvent(data.date)" class="event-indicator">🔵</span>
                        </div>
                    </template>
                </el-calendar>
                <el-dialog v-model="dialogVisible" title="Event Details" width="500px" :before-close="handleClose">
                    <span v-if="currentEvent">{{ currentEvent.eventDetail }}</span>
                    <!-- ... -->
                </el-dialog>
            </el-main>

        </el-container>
    </div>
</template>

<script>
import { reactive } from 'vue'
import { ref } from 'vue'
import { onMounted, } from 'vue'
import axios from 'axios'
// import { ElMessageBox } from 'element-plus';

export default {
    name: 'App',

    setup() {
        //avatar
        const form = reactive({
            Evidence : '',
            userId: null // 添加 UserID 属性
        })

        function fetchUrl(){
            axios.post('http://localhost:8080/findUrl', {
                userId: userId.value
            }).then((result) => {
                form.Evidence = result.data.data
            }).catch((err) => {
                console.log(err)
            });
        }

        // let dialogVisible = ref(false);
        let currentEvent = ref(null); // 添加当前事件的ref

        // show events
        const eventTable = reactive({
            eventList: [],
        });

        //get events
        function getEvents() {
            axios.post('http://localhost:8080/checkEvent').then((result) => {
                eventTable.eventList = result.data
                // console.log(eventTable.eventList)
            }).catch((err) => {
                console.log(err)
            });
        }

        // 为给定日期获取事件的函数
        function getEventsForDate(date) {
            // 没有.value后缀，因为eventTable是用reactive声明的
            const formattedDate = formatDate(date);
            return eventTable.eventList.filter(event => event.eventDate === formattedDate);
        }

        // date format
        function formatDate(date) {
            const year = date.getFullYear();
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const day = date.getDate().toString().padStart(2, '0');
            return `${year}-${month}-${day}`;
        }

        //dialog
        let dialogVisible = ref(false)

        function hasEvent(date) {
            return getEventsForDate(date).length > 0;
        }

        function checkEvent(data) {
            // 由于 data.date 已经是字符串 'yyyy-mm-dd'，我们直接使用它进行比较
            const events = getEventsForDate(data.date);
            console.log(events);
            if (events.length > 0) {
                currentEvent.value = events[0]; // 假设只有一个事件
                dialogVisible.value = true; // 显示对话框
            } else {
                currentEvent.value = null; // 清空当前事件
                dialogVisible.value = false; // 不显示对话框
            }
        }


        //mounted function

        const authority = ref('');
        const userId = ref(0);
        const userName = ref('');

        onMounted(() => {
            authority.value = sessionStorage.getItem('authority');
            userId.value = parseInt(sessionStorage.getItem('userId'), 10);
            userName.value = sessionStorage.getItem('userName');
            getEvents();
            fetchUrl();
        });

        const value = ref(new Date())

        // router
        const activeIndex = ref('1')
        const activeIndex2 = ref('1')
        const handleSelect = (key, keyPath) => {
            console.log(key, keyPath)
        }

        //cards
        const guideLinks = reactive([
            { title: 'Function1', icon: 'el-icon-info', route: '/student-guide' },
            { title: 'Function2', icon: 'el-icon-notebook-2', route: '/courses' },
            { title: 'Function3', icon: 'el-icon-edit-outline', route: '/exams' },
            { title: 'Function4', icon: 'el-icon-edit-outline', route: '/exams' },
            { title: 'Function5', icon: 'el-icon-edit-outline', route: '/exams' },
            { title: 'Function6', icon: 'el-icon-edit-outline', route: '/exams' },

            // Add other links as needed
        ]);

        function navigateTo(route) {
            // Use your router to navigate
            console.log('Navigating to', route);
            // this.$router.push(route); // Uncomment this line and use it with your router instance
        }

        const currentDate = ref(new Date());

        // page end


        return {
            //avatar
            form,
            fetchUrl,
            currentEvent,
            hasEvent,
            //show event
            getEvents,
            eventTable,
            getEventsForDate,
            formatDate,
            //dialog
            checkEvent,
            dialogVisible,
            //sessionItem
            authority,
            userId,
            userName,
            //calendar
            value,
            //router
            activeIndex,
            activeIndex2,
            handleSelect,
            //cards
            currentDate,
            guideLinks,
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

.avatar {
    margin-top: 10px;
    margin-left: 50%;
}

.el-icon svg {
    height: 0.5em;
    width: 0.5em;
}
</style>