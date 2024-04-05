<template>
    <div :class="{ container: true, 'sign-up-model': vari }">
        <div class="inner-left-container">
            <div class="login-content">
                <h1 class="login-title">UAccommodation</h1>
                <el-button type="primary" @click="onclick">Register</el-button>
                <img src="@/assets/login-bg.svg" class="image">
            </div>
        </div>
        <div class="inner-right-container">
            <div class="register-content">
                <h1>Register</h1>
                <el-button type="primary" @click="onclick">Login</el-button>
            </div>

            <img src="@/assets/register-bg.svg" class="image">

            <div class="inner-sign-up-container">
                <!-- 登录表单 -->
                <div :class="{ 'sign-up-model': vari }" id="login-form">

                    <div class="login-header">
                        <!-- <img src="../../assets/zyleft.png" style="width: 20%; margin-right: 18%;" v-show="showImages" /> -->
                        <!-- <img v-show="!showImages" src="../../assets/byleft.png" -->
                            <!-- style="width: 20%; margin-right: 18%;" /> -->
                        <h1>Login</h1>
                        <!-- <img src="../../assets/zyright.png" style="width: 20%; margin-left: 18%; "
                            v-show="showImages" />
                        <img v-show="!showImages" src="../../assets/byright.png"
                            style="width: 20%; margin-left: 18%;" /> -->
                    </div>

                    <br>
                    <!-- <h4 style="display: flex;">Username:</h4> -->
                    <el-input v-model="loginUserName" placeholder="Please input username" clearable />
                    <br><br>
                    <el-input v-model="loginUserPassword" placeholder="Please input password" clearable
                        @focus="toggleImages" @blur="toggleImages" type="password" />
                    <br><br>

                    <!-- 对话框↓ -->
                    <el-input style="width: 55%;" v-model="vCode" placeholder="Please input code" clearable
                        @focus="toggleImages" @blur="toggleImages" />
                    <el-button type="success" plain @click="dialogVisible = true ; sendSms()"
                        style="font-size: 13px; width: 40%; margin-left: 5%;">
                        Fetch Verification code
                    </el-button>

                    <el-dialog v-model="dialogVisible" title="Tips" width="500" :before-close="handleClose">
                        <span>A text message has been sent to your registered mobile number</span>
                        <template #footer>
                            <div class="dialog-footer">
                                <el-button @click="dialogVisible = false">Cancel</el-button>
                                <el-button type="primary" @click="dialogVisible = false">
                                    Confirm
                                </el-button>
                            </div>
                        </template>
                    </el-dialog>
                    <!-- 对话框↑ -->
                    <br><br>
                    <el-button type="primary" plain style="width: 100%;" @click="login">Login</el-button>
                </div>
                <div style="margin-top: -30%;">
                    <!-- 注册表单 -->
                    <div :class="{ 'sign-up-model': vari }" id="register-form">
                        <!-- <div> -->
                        <h1 style="margin-left: -20%;">Register</h1>
                        <el-form :model="registerForm" label-width="120px">
                            <el-form-item label="Username">
                                <el-input v-model="registerForm.registerUserName" placeholder="Please input username"
                                    style="width: 60%;" />
                            </el-form-item>
                            <el-form-item label="Phone">
                                <el-input v-model="registerForm.registerUserPhone" placeholder="Please input Phone"
                                    style="width: 60%;" />
                            </el-form-item>
                            <el-form-item label="Password">
                                <el-input v-model="registerForm.registerUserPassword"
                                    placeholder="Please input password" style="width: 60%;" />
                            </el-form-item>
                            <el-form-item label="Status">
                                <el-select v-model="registerForm.registerUserStatus"
                                    placeholder="please select your status">
                                    <el-option label="Student" value="1" />
                                    <el-option label="Accommodation Manager" value="2" />
                                    <el-option label="Maintenance Staff" value="3" />
                                </el-select>
                            </el-form-item>
                            <el-form-item label="Birthday">
                                <el-col :span="11">
                                    <el-date-picker v-model="registerForm.registerUserBirthday" type="date"
                                        placeholder="Pick a date" style="width: 100%" />
                                </el-col>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="register">Create</el-button>
                                <el-button>Cancel</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useRouter } from 'vue-router'
import axios from 'axios'
import { reactive, ref, } from 'vue'
import { ElMessageBox } from 'element-plus'
export default {
    name: "App",
    setup() {
        function sendSms(){
            axios.post('http://localhost:8080/sendCode').then((result) => {
                console.log(result)
            }).catch((err) => {
                console.log(err)
            });
        }

        //register
        const radio1 = ref('1')

        let registerForm = reactive({
            registerUserName: '',
            registerUserPhone: '',
            registerUserPassword: '',
            registerUserStatus: '',
            registerUserBirthday: '',
        })

        const onSubmit = () => {
            console.log('submit!')
        }

        function register() {
            let data = reactive({
                userName: registerForm.registerUserName,
                password: registerForm.registerUserPassword,
                userType: registerForm.registerUserStatus,
                phone: registerForm.registerUserPhone,
                birth: registerForm.registerUserBirthday
            })
            axios.post('http://localhost:8080/register', data).then((resp) => {
                if (resp.data.code == '200') {
                    alert(resp.data.message)
                    registerForm.registerUserName = ref('');
                    registerForm.registerUserPassword = ref('');
                    registerForm.registerUserStatus = ref('');
                    registerForm.registerUserPhone = ref('');
                    registerForm.registerUserBirthday = ref('');
                } else if (resp.data.code == '400') {
                    alert(resp.data.message);
                    return false;
                }
            }).catch((err) => {
                console.log(err)
            });
        }

        //login
        let vCode = ref('');
        // 登录切换
        const showImages = ref(true);
        const toggleImages = () => {
            showImages.value = !showImages.value;
        };

        //好的↓
        const dialogVisible = ref(false)

        const handleClose = (done) => {
            ElMessageBox.confirm('Are you sure to close this dialog?')
                .then(() => {
                    done();
                })
                .catch(() => {
                    // 处理取消操作或关闭消息框的错误
                });
        };
        //对话框↑

        let loginUserName = ref('');
        let loginUserPassword = ref('');
        let router = useRouter();
        let vari = ref(false);

        function login() {
            let data = reactive({
                userName: loginUserName,
                password: loginUserPassword
            })
            axios.post('http://localhost:8080/login', data).then((resp) => {
                if (resp.data.code == '200') {
                    sessionStorage.setItem('userId', resp.data.userId);
                    sessionStorage.setItem('authority', resp.data.authority);
                    sessionStorage.setItem('userName',resp.data.userName);

                    router.push({
                        path: '/accHome',
                        query: {
                            //all of them are string
                            // authority: resp.data.authority,
                            // id: resp.data.userId,
                        }
                    })
                } else if (resp.data.code == '400') {
                    alert(resp.data.message);
                    return false;
                }
            }).catch((err) => {
                console.log(err);
            })
        }

        // ------------------------------------------------------------------
        const onclick = () => {
            vari.value = !vari.value;
        }
        // ------------------------------------------------------------------
        return {
            sendSms,
            //
            login,
            onclick,
            vari,
            onSubmit,
            // ...toRefs(registerForm),
            registerForm,
            loginUserName,
            loginUserPassword,
            //re
            radio1,
            register,
            //log
            dialogVisible,
            handleClose,
            toggleImages,
            showImages,
            vCode,
        }
    }
}

</script>

<style>
.container {
    width: 100vw;
    height: 100vh;
    background-color: white;
    overflow: hidden;
    position: relative;
    display: flex;
    flex-direction: row;
}

.container::before {
    content: "";
    width: 2000px;
    height: 2000px;
    background-color: rgb(160, 209, 35);
    position: absolute;
    border-radius: 50%;
    transform: translateY(-50%);
    right: 48%;
    top: -10%;
    transition: 1.8s ease-in-out;
}

.inner-left-container {
    width: 0;
    flex: 1;
    z-index: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-end;
    padding: 3rem 10% 2rem 10%;
    pointer-events: all;
}

.inner-right-container {
    width: 0;
    flex: 1;
    z-index: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-start;
    padding: 3rem 10% 2rem 10%;
    pointer-events: none;
}

.container.sign-up-model::before {
    transform: translate(100%, -50%);
    transition: 1.8s ease-in-out;
    right: 52%;

}

.container .inner-left-container .login-content,
.container .inner-left-container .image {
    transition: 1s ease-in-out;
    transform: translateX(0px);
    transition-delay: 0.5s;
}

.imag {
    width: 100%
}

.inner-sign-up-container {
    width: 50%;
    height: 50%;
    position: absolute;
    right: 0;
    top: 20%;
    transition: 1s ease-in-out;
    transition-delay: 0.5s;
    display: grid;
    grid-auto-columns: 1fr;
}


.container .inner-right-container .register-content,
.container .inner-right-container .image {
    transform: translateX(1000px);
    transition: 1.8s ease-in-out;
    transition-delay: 0.5s;
}

.container.sign-up-model .inner-right-container .register-content,
.container.sign-up-model .inner-right-container .image {
    transform: translateX(0px);
    transition: 1.8s ease-in-out;
    transition-delay: 0.5s;
}

.container.sign-up-model .inner-left-container .login-content,
.container.sign-up-model .inner-left-container .image {
    transform: translateX(-1000px);
    transition: 1.8s ease-in-out;
    transition-delay: 0.5s;
}

.container.sign-up-model .inner-sign-up-container {
    width: 50%;
    height: 50%;
    top: 20%;
    right: 50%;
    transition-delay: 0.5s;
}





#login-form {
    grid-column: 1;
    grid-row: 1;
    opacity: 1;
    transition: 1s ease-in-out;
    padding: 1% 25%;
    pointer-events: all;

}

#register-form {
    grid-column: 1;
    grid-row: 1;
    opacity: 0;
    transition: 1s ease-in-out;
    pointer-events: none
}

#register-form.sign-up-model {
    opacity: 1;
    transition: 1s ease-in-out;
    transition-delay: 0.5s;
    pointer-events: all;
}

#login-form.sign-up-model {
    opacity: 0;
    transition: 1s ease-in-out;
    transition-delay: 0.5s;
    pointer-events: all
}


.container.sign-up-model .inner-right-container {
    pointer-events: all;
}

.container.sign-up-model .inner-left-container {
    pointer-events: none
}

.login-title {
    text-align: center;
    color: #444;
}

.login-btn {
    width: 82%;
    height: 13%;
    font-size: 15px;
    background-color: lightblue;
}

.textInput {
    width: 80%;
    height: 13%;
    font-size: 15px;
}

.passwordInput {
    width: 80%;
    height: 13%;
    font-size: 15px;
}

/* reg */


/* login */

.image.hidden {
    display: none;
    /* 当图片隐藏时，不占用布局空间 */
}

.login-header {
    display: flex;
    /* 使用flex布局 */
    align-items: center;
    /* 垂直居中子元素 */
    justify-content: center;
    /* 水平居中子元素 */
}

.header-image {
    width: 10%;
    /* 或者使用其他尺寸 */
    margin-right: 10px;
    /* 根据需要添加外边距 */
}

/* 将h1元素的样式调整为与图片匹配 */
.login-title {
    margin: 0 10px;
    /* 消除默认的外边距并添加适当的间隔 */
    /* 其他样式保持不变 */
}
</style>