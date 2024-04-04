<template>
    <div class="chat-room" :style="{ backgroundImage: 'url(' + require('../../src/assets/chat.jpg') + ')' }">
        <h2>Wellbeing chat room</h2>
        <el-input v-model="messages" type="textarea" readonly style="width: 20%; margin-left: 40%; margin-top: 1%;"
            :rows="20" />
        <div style="display: flex; justify-content: center; align-items: center; margin-top: 10px;">
            <!-- 输入框和Emoji选择器的容器 -->
            <el-input v-model="message" placeholder="Type a message..." type="textarea" @keyup.enter="sendMessage"
                style="width: 300px; margin-right: 5px; margin-left: 1.3%" autosize />
            <el-dropdown @command="onEmojiSelected" style="margin-right: 10px; margin-top: -10px;">
                <el-button type="text">😊<i class="el-icon-arrow-down el-icon--right"></i></el-button>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item command="😊">😊</el-dropdown-item>
                        <el-dropdown-item command="😂">😂</el-dropdown-item>
                        <el-dropdown-item command="😍">😍</el-dropdown-item>
                        <!-- 添加更多 Emoji -->
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
            <!-- <el-button type="success" plain @click="sendMessage">Send</el-button> -->
        </div>
    </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue';
import axios from 'axios';

export default {
    setup() {
        const userName = sessionStorage.getItem("userName");
        const message = ref('');
        const messages = ref('');
        let webSocket = null;



        const onEmojiSelected = (emoji) => {
            message.value += emoji; // 将选中的 Emoji 添加到输入框文本中
        };

        const fetchMessages = async () => {
            try {
                const response = await axios.get('http://localhost:8080/messages');
                messages.value = response.data.map(msg => `${msg.sender}: ${msg.content}`).join('\n');
            } catch (error) {
                console.error('Failed to fetch messages:', error);
            }
        };

        const connect = () => {
            webSocket = new WebSocket('ws://localhost:8080/chat');

            webSocket.onopen = function () {
                // 当 WebSocket 连接成功打开后，发送加入消息
                sendJoinMessage();
            };

            webSocket.onmessage = function (event) {
                messages.value += event.data + '\n';
            };

            webSocket.onclose = function () {
                console.log('WebSocket connection closed');
            };
        };

        const sendJoinMessage = () => {
            // 构造加入聊天室的消息内容
            const joinMessage = `${userName} has joined the chat room.`;
            const payload = JSON.stringify({
                sender: "System", // 使用 "System" 或者其他标识来表示这是一个系统消息
                content: joinMessage
            });
            webSocket.send(payload);
        };

        const sendMessage = () => {
            if (message.value.trim() !== '') {
                const userName = sessionStorage.getItem("userName");
                const payload = JSON.stringify({
                    sender: userName,
                    content: message.value
                });
                webSocket.send(payload);
                message.value = ''; // 清空输入字段
            }
        };

        onMounted(() => {
            connect();
            fetchMessages();
        });

        onUnmounted(() => {
            if (webSocket) {
                webSocket.close();
            }
        });

        return {
            userName,
            message,
            messages,
            sendMessage,
            fetchMessages,
            onEmojiSelected,
            sendJoinMessage ,
        };
    }
};
</script>

<style>
.chat-room {
    display: flex;
    flex-direction: column;
    height: 725px;
    width: 100%;
    background-size: cover;
    /* 使背景图片覆盖整个容器 */
    background-position: center;
    /* 中心对齐背景图片 */
}

textarea {
    flex-grow: 1;
    margin-bottom: 10px;
}
</style>