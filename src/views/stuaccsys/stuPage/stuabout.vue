<template>
    <div class="common-layout">
        <!-- navigate -->
        <el-container>
            <el-header class="head">
                <el-menu :default-active="activeIndex2" class="el-menu-demo" mode="horizontal" background-color="#545c64"
                    text-color="#fff" active-text-color="#ffd04b" @select="handleSelect">
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
                </el-menu>
            </el-header>
            


        </el-container>
    </div>
</template>  

<script>
import { reactive } from 'vue'
import { ref } from 'vue'

export default {
    name: 'App', 

    setup() {
        // router
        const activeIndex = ref('1')
        const activeIndex2 = ref('1')
        const handleSelect = (key, keyPath) => { // 移除类型注解
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
</style>