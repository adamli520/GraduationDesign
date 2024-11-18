<template>
  <!-- 介绍自己 -->
  <section id="about" class="pt-5 py-5">
    <div class="container">
      <div class="row align-items-center pb-5">
        <div class="col-lg-8">
          <div class="mt-3">
            <h2 class="sub-title">自我介绍</h2>
            <h4 class="mt-4">
              Hello
              <span class="font-weight-bold">I'm AdamLi~</span>
            </h4>
            <p class="text-muted mt-4 introduce-text text-justify">
              我叫李军，今年19岁，.。。。。。。。
            </p>
            <div class="row">
              <div class="col-md-6">
                <ul class="about-info">
                  <li class="mt-3">
                    姓名:
                    <span class="text-muted ml-3">李军</span>
                  </li>
                  <li class="mt-3">
                    邮箱:
                    <span class="text-muted ml-3">lj@lijun520.cn</span>
                  </li>
                  <li class="mt-3">
                    地址:
                    <span class="text-muted ml-3">武汉软件工程职业学院</span>
                  </li>
                  <li class="mt-3">
                    班级:
                    <span class="text-muted ml-3">软件2216</span>
                  </li>
                </ul>
              </div>
              <div class="col-md-6">
                <ul class="about-info">
                  <li class="mt-3">
                    生日:
                    <span class="text-muted ml-3">2004-4-18</span>
                  </li>
                  <li class="mt-3">
                    网站:
                    <a href="https://www.lijun520.cn" target="_blank"><span
                        class="text-muted ml-3">www.lijun520.cn</span></a>
                  </li>
                  <li class="mt-3">
                    GitHub:
                    <a href="https://github.com/adamli520" target="_blank"><span
                        class="text-muted ml-3">github.com/adamli520</span></a>
                  </li>
                  <li class="mt-3">
                    学号:
                    <span class="text-muted ml-3">2022240823</span>
                  </li>
                </ul>
              </div>
            </div>
            <div class="mt-4 pt-2">
              <el-button type="primary" size="large" href="https://nav.lijun520.cn" target="_blank">去我的网站</el-button>
            </div>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="mt-3 about-img">
            <img src="../assets/picture/DSC_0053.jpg" alt="author" class="img-fluid rounded-lg" />
          </div>
        </div>
      </div>
      <!-- 提示框 -->
      <el-alert title="普普通通的一个人，罢了！" type="info" show-icon></el-alert>
      <div class="row align-items-center mt-5">
        <div class="col-lg-6">
          <h4>擅长</h4>
          <p class="mt-3 text-muted introduce-text">
            热爱计算机！！！！！！！！
          </p>
        </div>
        <div class="col-lg-6">
          <div id="skills" class="pt-4 mt-4">
            <div class="skill-bar mb-5">
              <span class="skill-title">HTML</span>
              <el-progress :percentage="80" status="active"></el-progress>
              <span class="skill-percent">80%</span>
            </div>

            <div class="skill-bar mb-5">
              <span class="skill-title">CSS</span>
              <el-progress :percentage="65" status="active" color="info"></el-progress>
              <span class="skill-percent">65%</span>
            </div>

            <div class="skill-bar mb-5">
              <span class="skill-title">JavaScript</span>
              <el-progress :percentage="85" status="active" color="danger"></el-progress>
              <span class="skill-percent">85%</span>
            </div>

            <div class="skill-bar mb-5">
              <span class="skill-title">C++</span>
              <el-progress :percentage="70" status="active" color="warning"></el-progress>
              <span class="skill-percent">70%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- 爱好模块 -->
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-12">
          <div class="text-left">
            <h2 class="sub-title">——爱好</h2>
            <h4 class="mt-4">自找苦吃</h4>
          </div>
        </div>
      </div>

      <el-space>
    <el-card class="custom-card" shadow="hover" style="margin-bottom: 20px;">
      <i class="iconfont icon-youxi1" style="font-size:40px;"></i>
      <h3 class="card-title my-2">游戏</h3>
      <h6 class="card-subtitle mb-4">玩你所玩</h6>
      <p class="card-text">
        游戏也能增长见识与才干，比起电影，不仅能让你身临其境，而且你还可以改变剧情走向。哪些热门手游肯定不能，主机游戏却能。
      </p>
    </el-card>

    <el-card class="custom-card" shadow="hover" style="margin-bottom: 20px;">
      <i class="iconfont icon-yinle" style="font-size:40px;"></i>
      <h3 class="card-title my-2">音乐</h3>
      <h6 class="card-subtitle mb-4">听你想听</h6>
      <p class="card-text">
        音乐不久能放松，使人愉悦，歌手或以爱情，亲情，或以批判使人同感，让人能使自己灵魂悦动。
      </p>
    </el-card>

    <el-card class="custom-card" shadow="hover" style="margin-bottom: 20px;">
      <i class="iconfont icon-github" style="font-size:40px;"></i>
      <h3 class="card-title my-2">开源</h3>
      <h6 class="card-subtitle mb-4">开你所开</h6>
      <p class="card-text">
        所有做过的课程设计都开源，互相分享，互相进步！
      </p>
    </el-card>
  </el-space>

      <!-- 提示框 -->
      <el-alert title="开源使你强大" type="info" show-icon></el-alert>
    </div>


  <!-- 轮播 -->
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <div class="text-left">
            <h2 class="sub-title">——————项目</h2>
            <h4 class="mt-4">做过的一些项目</h4>
          </div>
        </div>
      </div>

      <div class="row mt-4">
        <div class="col-lg-12 pb-5">
          <div class="bd-example">
            <el-carousel :interval="2000" height="500px">
              <el-carousel-item>
                <img src="../assets//picture/blog1.png" class="d-block w-100" />
                <div class="carousel-caption text-danger">
                  <h5>网页</h5>
                  <p>
                    大一上学期课设开源
                  </p>
                </div>
              </el-carousel-item>
              <el-carousel-item>
                <img src="../assets/picture/twoball.png" class="d-block w-100" alt="carousel2" />
                <div class="carousel-caption text-primary">
                  <h5>双色球</h5>
                  <p>c++写的双色球，已开源。</p>
                </div>
              </el-carousel-item>
              <el-carousel-item>
                <img src="../assets/picture/Mygithub.png" class="d-block w-100" alt="carousel3" />
                <div class="carousel-caption text-info">
                  <h5>GitHub</h5>
                  <p>开源地址</p>
                </div>
              </el-carousel-item>
            </el-carousel>
          </div>
        </div>
      </div>
    </div>



</template>



<script lang="ts" setup>

import { ref } from 'vue'

// 数据，原来是写在data中的，此时的name、age、tel都不是响应式的数据
let name = ref('AdamLi')
let age = ref(18)
let tel = '13888888888'
let address = '湖北恩施'

// let person = ref({
//   name: '张三',
//   age: 18,
// })


// 方法
function changeName() {
  name.value = 'zhang-san' // JS中操作ref对象时候需要.value
  console.log(name.value)
}
function changeAge() {
  age.value += 1
  console.log(age.value) // JS中操作ref对象时候需要.value
}
function showTel() {
  alert(tel)
}
</script>

<style scoped>
.person {
  background-color: skyblue;
  box-shadow: 0 0 10px;
  border-radius: 10px;
  padding: 20px;
}

button {
  margin: 0 5px;
}
</style>