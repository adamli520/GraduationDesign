<template>
    <div class="container">
        <div class="row align-items-center pb-5">
            <div class="col-lg-8">
                <div class="mt-3">
                    <h2 class="sub-title">自我介绍</h2>
                    <h4 class="mt-4">
                        Hello
                        <span class="fw-bold">I'm AdamLi~</span>
                    </h4>
                    <p class="text-muted mt-4 introduce-text text-justify">
                        我叫李军，今年19岁，.。。。。。。。
                    </p>
                    <div class="row">
                        <div class="col-md-6">
                            <ul class="about-info">
                                <li class="mt-3">
                                    姓名:
                                    <span class="text-muted ms-3">李军</span>
                                </li>
                                <li class="mt-3">
                                    邮箱:
                                    <span class="text-muted ms-3">lj@lijun520.cn</span>
                                </li>
                                <li class="mt-3">
                                    地址:
                                    <span class="text-muted ms-3">武汉软件工程职业学院</span>
                                </li>
                                <li class="mt-3">
                                    班级:
                                    <span class="text-muted ms-3">软件2216</span>
                                </li>
                            </ul>
                        </div>
                        <div class="col-md-6">
                            <ul class="about-info">
                                <li class="mt-3">
                                    生日:
                                    <span class="text-muted ms-3">2004-4-18</span>
                                </li>
                                <li class="mt-3">
                                    网站:
                                    <a href="https://www.lijun520.cn" target="_blank"><span
                                            class="text-muted ms-3">www.lijun520.cn</span></a>
                                </li>
                                <li class="mt-3">
                                    GitHub:
                                    <a href="https://github.com/adamli520" target="_blank"><span
                                            class="text-muted ms-3">github.com/adamli520</span></a>
                                </li>
                                <li class="mt-3">
                                    学号:
                                    <span class="text-muted ms-3">2022240823</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="mt-4 pt-2">
                        <a href="https://nav.lijun520.cn" class="btn btn-outline-primary btn-lg"
                            target="_blank">去我的网站</a>
                    </div>
                </div>
            </div>
            <div class="col-lg-4">
                <div class="mt-3 about-img">
                    <img src="/picture/DSC_0053.jpg" alt="author" class="img-fluid rounded-lg" />
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
                        <div class="progress">
                            <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"
                                style="width: 80%" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"></div>
                            <span class="skill-percent">80%</span>
                        </div>
                    </div>

                    <div class="skill-bar mb-5">
                        <span class="skill-title">CSS</span>
                        <div class="progress">
                            <div class="progress-bar progress-bar-striped progress-bar-animated bg-info"
                                role="progressbar" style="width: 65%" aria-valuenow="65" aria-valuemin="0"
                                aria-valuemax="100"></div>
                            <span class="skill-percent">65%</span>
                        </div>
                    </div>

                    <div class="skill-bar mb-5">
                        <span class="skill-title">JavaScript</span>
                        <div class="progress">
                            <div class="progress-bar progress-bar-striped progress-bar-animated bg-danger"
                                role="progressbar" style="width: 85%" aria-valuenow="85" aria-valuemin="0"
                                aria-valuemax="100"></div>
                            <span class="skill-percent">85%</span>
                        </div>
                    </div>

                    <div class="skill-bar mb-5">
                        <span class="skill-title">C++</span>
                        <div class="progress">
                            <div class="progress-bar progress-bar-striped progress-bar-animated bg-warning"
                                role="progressbar" style="width: 70%" aria-valuenow="70" aria-valuemin="0"
                                aria-valuemax="100"></div>
                            <span class="skill-percent">70%</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

<el-row  justify="center" >
    <el-col :span="4" :key="index" v-for="(item, index) in skills">
        <el-progress :percentage="item.value"  type="circle" :color="item.color" stroke-width="15" :label="item.title" />
    </el-col>
</el-row>

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
        <div class="alert alert-primary d-flex align-items-center justify-content-between text-center my-5"
            role="alert">
            <h3 class="flex-grow-1">开源使你强大</h3>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
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
                <img src="/picture/blog1.png" class="d-block w-100" />
                <div class="carousel-caption text-danger">
                  <h5>网页</h5>
                  <p>
                    大一上学期课设开源
                  </p>
                </div>
              </el-carousel-item>
              <el-carousel-item>
                <img src="/picture/twoball.png" class="d-block w-100" alt="carousel2" />
                <div class="carousel-caption text-primary">
                  <h5>双色球</h5>
                  <p>c++写的双色球，已开源。</p>
                </div>
              </el-carousel-item>
              <el-carousel-item>
                <img src="/picture/Mygithub.png" class="d-block w-100" alt="carousel3" />
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

    <!-- 回到顶部 -->
    <el-backtop :right="100" :bottom="100" />

</template>

<script setup lang="ts">
import { ref } from 'vue';
const skills = ref([
  { title: 'HTML', value: 80, color: '#0d6efd' },
  { title: 'CSS', value: 65, color: '#0dcaf0' }, 
  { title: 'JavaScript', value: 85, color: '#dc3545'},
  { title: 'C++', value: 70, color: '#ffc107' },
]);


</script>

<style scoped>
.container{
    margin-top: 50px;
}
</style>
