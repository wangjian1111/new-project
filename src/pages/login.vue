<template>
  <el-row class="login-container">
    <!-- 设置垂直居中和水平居中 -->
    <el-col :lg="16" class="left">
      <div>
        <div>欢迎光临</div>
        <div>这是Vue3项目的登录页面</div>
      </div>

    </el-col>
    <el-col :lg="8" class=" right ">
      <div class="title">欢迎回来</div>
      <div>
        <span class="line"></span>
        <span>账号密码登录</span>
        <span class="line"></span>
      </div>
      <el-form ref="formRef" :rules="rules" :model="form" style="max-width: 600px">
        <el-form-item prop="username" label="账号">
          <el-input v-model="form.username" placeholder="请输入账号">
            <!-- 进入账号图标 -->
            <template #prefix>
              <el-icon>
                <User />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码">
          <el-input v-model="form.password" type="password" placeholder="请输入密码">
            <!-- 进入密码图标 -->
            <template #prefix>
              <el-icon>
                <Lock />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>

        <el-form-item><el-button round class="w-[250px]" type="primary" @click="onSubmit" :loading="loading">登录</el-button>
          <el-button>取消</el-button></el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script setup>
import { ref, reactive } from "vue";
// import { User, Lock } from "@element-plus/icons-vue";
import { login, getinfo } from "@/api/manager";
import { toast } from '@/composables/util'
import { useRouter } from "vue-router";
import store from '@/store'
import {setToken} from "@/composables/auth";

// const cookie = useCookies();
const router = useRouter();
const form = reactive({
  username: "",
  password: "",
  // name: "",

  // region: "",
  // // date1: "",
  // // date2: "",
  // delivery: false,
  // type: [],
  // resource: "",
  // desc: "",
});
const rules = {
  username: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
  password: [{ required: true, message: '密码不能为空', trigger: 'blur' }],

}
const formRef = ref(null);
const loading = ref(false);

const onSubmit = () => {
  formRef.value.validate((valid) => {
    // 
    if (!valid) {
      return false;
    } else {
      login(form.username, form.password)
        .then((res) => {
          // 登录成功
          console.log(res);
          toast('登录成功', 'success')
          setToken(res.token);
          // 获取用户信息
          getinfo().then((res2) => {
            console.log("执行登录成功的结果",res2);
            store.commit("SET_USERINFO",res2);
            console.log("存储的store",store);
            router.push("/");
            }).catch(err=>{
              console.log("getinfo",err);
            })
          // 跳转到首页
         
        })
      // .catch(err => {


      // })

    }
  }
  );

};
</script>

<style lang="scss" scoped>
.login-container {
  @apply bg-indigo-500 min-h-screen;

}

.login-container .left,
.login-container .right {
  @apply flex items-center justify-center flex-col;
}

.login-container .right {
  @apply bg-light-50 flex-col;
}

.left>div>div:first-child {
  @apply font-bold text-5xl text-current mb-4;
}

.right .title {
  @apply text-blue-500/50 font-bold text-3xl mb-4;
}

.right>div {
  @apply flex items-center justify-center mb-4 text-gray-300 space-x-2;
}

.right .line {
  @apply h-[1px] w-8 bg-gray-300;
}
</style>