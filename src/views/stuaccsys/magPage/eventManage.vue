<template>
    <div>
        <el-calendar @panel-change="handlePanelChange">
            <template #date-cell="{ data }">
                <div :class="data.isSelected ? 'is-selected' : ''" @click="handleDateClick(data);checkEvent(data)">
                    {{ data.day.split('-').slice(1).join('-') }}
                    {{ data.isSelected ? '✔️' : '' }}
                    <span v-if="hasEvent(data.date)" class="event-indicator">🔵</span>
                </div>
            </template>
        </el-calendar>

        <el-dialog v-model="dialogVisible" title="Event Details" width="500px" :before-close="handleClose">
            <span v-if="currentEvent">{{ currentEvent.eventDetail }}</span>
            <!-- ... -->
        </el-dialog>

        <el-dialog v-model="addEventDialogVisible" title="Add Event" width="500px">
            <el-form  :model="addEventForm">
                <el-form-item label="Event Details">
                    <el-input type="textarea" v-model="addEventForm.eventDetail" placeholder="Describe the event" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitNewEvent()"
                        style="margin-left: 43%; margin-top: 5%;">Submit</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import { onMounted, reactive, ref,  } from 'vue'
import axios from 'axios'

export default {
    name: 'App',
    setup() {
        let addEventForm = reactive({
            eventDate: '',
            eventDetail: '',
        });

        let addEventDialogVisible = ref(false);

        // 处理日期点击
        function handleDateClick(data) {
            if (!hasEvent(data.date)) {
                addEventForm.eventDate = data.date; // 设置事件日期为被点击的日期
                addEventDialogVisible.value = true; // 显示添加事件对话框
            } else {
                // ...显示事件详情逻辑
            }
        }

        // 提交新事件
        function submitNewEvent() {
            addEventForm.eventDate = formatDateYear(new Date(addEventForm.eventDate));
            axios.post('http://localhost:8080/insertEvent', addEventForm)
                .then(() => {
                    addEventDialogVisible.value = false; // 关闭对话框
                    addEventForm.eventDetail = '';
                    getAllEvents(); // 重新获取所有事件
                })
                .catch(error => {
                    console.error('Failed to add event:', error);
                });
        }


        let currentEvent = ref(null); // 添加当前事件的ref

        // 为给定日期获取事件的函数
        function getEventsForDate(date) {
            // 没有.value后缀，因为eventTable是用reactive声明的
            const formattedDate = formatDate(date);
            return eventTable.eventList.filter(event => event.eventDate === formattedDate);
        }

        function formatDateYear(date) {
            const year = date.getFullYear();
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const day = date.getDate().toString().padStart(2, '0');
            return `${year}-${month}-${day}`;
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
            // console.log(events);
            if (events.length > 0) {
                currentEvent.value = events[0]; // 假设只有一个事件
                dialogVisible.value = true; // 显示对话框
            } else {
                currentEvent.value = null; // 清空当前事件
                dialogVisible.value = false; // 不显示对话框
            }
        }

        let eventTable = reactive({
            eventList: []
        })

        function getAllEvents() {
            axios.post('http://localhost:8080/checkEvent').then((result) => {
                eventTable.eventList = result.data;
            }).catch((err) => {
                console.log(err)
            });
        }

        onMounted(() => {
            getAllEvents();
        });


        return {
            eventTable,
            getAllEvents,
            getEventsForDate,
            formatDate,
            currentEvent,
            dialogVisible,
            hasEvent,
            checkEvent,
            //add
            addEventForm,
            addEventDialogVisible,
            handleDateClick,
            submitNewEvent,
            formatDateYear,
        }
    }
}
</script>

<style></style>