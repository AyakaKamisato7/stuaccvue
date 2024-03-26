<template>
    <div class="common-layout" v-if="authority == 1">
        <!-- navigate -->
        <el-container>
            <el-header class="head">
                <el-menu :default-active="activeIndex2" class="el-menu-demo" mode="horizontal"
                    background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" @select="handleSelect">
                    <el-menu-item index="1">
                        <router-link to="/accHome">Home</router-link>
                    </el-menu-item>
                    <!-- <el-menu-item index="3" disabled>Info</el-menu-item> -->
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
                    <!--  -->
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
                                    <el-badge class="mark"  />
                                </el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </el-menu>
            </el-header>
            <!-- zoumadeng -->
            <el-container>
                <el-main>
                    <div class="block text-center">
                        <span class="demonstration"></span>
                        <el-carousel height="350px">
                            <el-carousel-item>
                                <img src="../../assets/zouma1.png" alt="Carousel image 1">
                            </el-carousel-item>
                            <el-carousel-item>
                                <img src="../../assets/zouma2.png" alt="Carousel image 2">
                            </el-carousel-item>
                            <el-carousel-item>
                                <img src="../../assets/zouma3.png" alt="Carousel image 3">
                            </el-carousel-item>
                        </el-carousel>
                    </div>
                </el-main>
            </el-container>
        </el-container>
        <!-- span -->
        <span>
            <h2 style="margin-left: -1425px;">Student-Guide</h2>
        </span>
        <!-- cards -->
        <div class="app-container">
            <el-row :gutter="50">
                <el-col :span="4" v-for="(link, index) in guideLinks" :key="index">
                    <el-card @click="navigateTo(link.route)" class="guide-link-card" :body-style="{ padding: '32px' }"
                        style="background-color: rgb(21, 31, 109); width: 195px; height: 195px; color: azure;">
                        <div class="card-content">
                            <i :class="link.icon"></i>
                            <div class="card-title">{{ link.title }}</div>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </div>
        <br>
    </div>
</template>

<script>
import { onMounted, reactive } from 'vue'
import { ref } from 'vue'
import axios from 'axios'
import {
    ArrowLeft,
    ArrowRight,
} from '@element-plus/icons-vue'

import { useRouter } from 'vue-router';
export default {
    name: 'App', // 应该是字符串
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

        //get authority and userId
        const router = useRouter();
        const authority = ref('');
        const userId = ref(0);
        const userName = ref('');

        onMounted(() => {
            authority.value = sessionStorage.getItem('authority');
            userId.value = parseInt(sessionStorage.getItem('userId'), 10);
            userName.value = sessionStorage.getItem('userName');
            fetchUrl();
        });

        // router
        const activeIndex = ref('1')
        const activeIndex2 = ref('1')
        const handleSelect = (key, keyPath) => { // 移除类型注解
            console.log(key, keyPath)
        }

        //cards
        const guideLinks = reactive([
            { title: 'My order', icon: 'el-icon-info', route: '/order' },
            { title: 'My Complaint', icon: 'el-icon-notebook-2', route: '/complaint?' },
            { title: 'My Repair', icon: 'el-icon-edit-outline', route: '/repair' },
            { title: 'My Events', icon: 'el-icon-edit-outline', route: '/events' },
            { title: 'My Account', icon: 'el-icon-edit-outline', route: '/stuHelp' },
            { title: 'Wellbeing', icon: 'el-icon-edit-outline', route: '/wellbeing' },

            // Add other links as needed
        ]);

        function navigateTo(route) {
            // Use your router to navigate
            router.push(route);
            console.log('Navigating to', route);
            // this.$router.push(route); // Uncomment this line and use it with your router instance
        }

        const currentDate = ref(new Date());

        // page end


        return {
            //avatar
            form,
            fetchUrl,
            //
            userName,
            router,
            authority,
            userId,
            //router
            activeIndex,
            activeIndex2,
            handleSelect,
            //cards
            currentDate,
            guideLinks,
            navigateTo,
            //icon
            ArrowLeft,
            ArrowRight,
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

/* cards */
/* .time {
    font-size: 12px;
    color: #999;
}

.bottom {
    margin-top: 13px;
    line-height: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.button {
    padding: 0;
    min-height: auto;
}

.image {
    width: 100%;
    display: block;
} */

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