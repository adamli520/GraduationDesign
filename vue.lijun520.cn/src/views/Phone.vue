<template>
<!--页面主要内容-->
<main class="lyear-layout-content">

<div class="container-fluid">

  <div class="row">

    <div class="col-md-6 col-xl-3">
      <div class="card bg-primary text-white">
        <div class="card-body">
          <div class="d-flex justify-content-between">
            <span class="avatar-md rounded-circle bg-white bg-opacity-25 avatar-box">
              <i class="mdi mdi-currency-cny fs-4"></i>
            </span>
            <span class="fs-4">1022.00</span>
          </div>
          <div class="text-end">本年收入</div>
        </div>
      </div>
    </div>

    <div class="col-md-6 col-xl-3">
      <div class="card bg-danger text-white">
        <div class="card-body">
          <div class="d-flex justify-content-between">
            <span class="avatar-md rounded-circle bg-white bg-opacity-25 avatar-box">
              <i class="mdi mdi-account fs-4"></i>
            </span>
            <span class="fs-4">920</span>
          </div>
          <div class="text-end">用户总数</div>
        </div>
      </div>
    </div>

    <div class="col-md-6 col-xl-3">
      <div class="card bg-success text-white">
        <div class="card-body">
          <div class="d-flex justify-content-between">
            <span class="avatar-md rounded-circle bg-white bg-opacity-25 avatar-box">
              <i class="mdi mdi-gamepad-variant fs-4"></i>
            </span>
            <span class="fs-4">3005</span>
          </div>
          <div class="text-end">游戏总量</div>
        </div>
      </div>
    </div>

    <div class="col-md-6 col-xl-3">
      <div class="card bg-purple text-white">
        <div class="card-body">
          <div class="d-flex justify-content-between">
            <span class="avatar-md rounded-circle bg-white bg-opacity-25 avatar-box">
              <i class="mdi mdi-comment-outline fs-4"></i>
            </span>
            <span class="fs-4">153条</span>
          </div>
          <div class="text-end">反馈信息</div>
        </div>
      </div>
    </div>

  </div>

  <div class="row">
    <!--分割  -->
    <div class="col-md-5">
      <div class="card">
        <header class="card-header d-flex justify-content-between">
          <div class="card-title">本周订单量</div>
          <ul class="card-actions">
            <li><a href="#!" class="card-btn-close"><i class="mdi mdi-close"></i></a></li>
            <li><a href="#!" class="card-btn-slide"><i class="mdi mdi-chevron-up"></i></a></li>
            <li><a href="#!" class="card-btn-fullscreen"><i class="mdi mdi-fullscreen"></i></a></li>
          </ul>
        </header>
        <div class="card-body">
          <!-- <div id="js-echartjs-1" style="height:600px;width: 500px"></div> -->
          <e-charts class="echart" :option="echartjs_1"/>
        </div>
      </div>
    </div>

    <div class="col-md-7">
      <div class="card">
        <header class="card-header d-flex justify-content-between">
          <div class="card-title">近月订单</div>
          <ul class="card-actions">
            <li><a href="#!" class="card-btn-close"><i class="mdi mdi-close"></i></a></li>
            <li><a href="#!" class="card-btn-slide"><i class="mdi mdi-chevron-up"></i></a></li>
            <li><a href="#!" class="card-btn-fullscreen"><i class="mdi mdi-fullscreen"></i></a></li>
          </ul>
        </header>
        <div class="card-body">
          <div id="js-echartjs-2" style="height:600px;width: 800px"></div>
        </div>
      </div>
    </div>


  </div>

</div>

</main>
<!--End 页面主要内容-->
</template>

<script lang="ts" setup>
// import * as echarts from 'echarts';
// type EChartsOption = echarts.EChartsOption;
// var chartDom = document.getElementById('js-echartjs-1')!;
// var myChart = echarts.init(chartDom);
// var option: EChartsOption;

const echartjs_1 = {
  tooltip: {
    formatter: '{a} <br/>{b} : {c}%'
  },
  series: [
    {
      name: 'Pressure',
      type: 'gauge',
      detail: {
        formatter: '{value}'
      },
      data: [
        {
          value: 50,
          name: 'SCORE'
        }
      ]
    }
  ]
};



</script>

<style scoped>
.container-fluid{
    margin-top: 50px;
}
.echart{
  height:600px;
  width: 500px;
}

</style>

