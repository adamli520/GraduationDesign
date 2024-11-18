<!--内容详情页-->
<template>
  <div class="detail" :title="(detail.title ? detail.title : '文章正文')">

    <van-skeleton title round :row="10" :loading="loading">
      <div class="main">
        <div class="title">
          <h1>{{ detail.title }}</h1>

          <van-row justify="center" >
            <van-col span="4" >
              <van-tag plain type="primary" size="large"><van-icon name="list-switching">{{
                  detail.category_name}}</van-icon></van-tag>
            </van-col>
            <van-col span="14">
              <van-tag plain type="success" size="large"><van-icon name="clock-o">{{
                  detail.updated_at}}</van-icon></van-tag>
            </van-col>
          </van-row>
          <van-divider></van-divider>
          <van-row justify="center" >
            <van-col span="4">
              <van-tag plain type="warning" size="large"><van-icon name="eye-o">{{ detail.views }}</van-icon></van-tag>
            </van-col>
            <van-col span="4">
              <van-tag plain type="danger" size="large"><van-icon name="good-job-o">{{ detail.likes
                }}</van-icon></van-tag>
            </van-col>
            <van-col span="6">
              <van-tag plain type="primary" size="large"><van-icon name="user">{{ detail.author_name
                }}</van-icon></van-tag>
            </van-col>         
          </van-row>
        </div>
        <div class="body">
          <MdPreview :editorId="state.id" v-model="detail.content" previewTheme="default" @onGetCatalog="onGetCatalog">
          </MdPreview>

        </div>

        <van-floating-panel v-show="showfloatingpanel" :content-draggable="false" safe-area-inset-bottom
          v-model:height="height_floatingpanel" :anchors="[300, 500, 600]">
          <template #header>
            <h3 style=" text-align: center;">目录</h3>
          </template>
          <MdCatalog @on-click="Catalog_click" :scrollElementOffsetTop="100" :editorId="state.id"
            :scrollElement="scrollElement" v-if="state.catalogList.length > 0" />
          <div v-else>
            <van-empty description="本篇文章暂无目录" />
          </div>
        </van-floating-panel>

      </div>
    </van-skeleton>

  </div>

  <van-floating-bubble :icon="icon_Catalog" @click="click_floatingbubble" :offset="{ x: 300, y: 500 }" />

</template>

<script setup lang="ts">
import { Get_articledetail } from "@/api/api_article";
import {  onMounted, reactive, ref } from "vue";

import { showLoadingToast } from "vant";
import {  onBeforeRouteUpdate, useRouter } from "vue-router";

import { MdPreview, MdCatalog } from 'md-editor-v3';
import 'md-editor-v3/lib/preview.css';
const showfloatingpanel = ref(false);
const height_floatingpanel = ref(500);
const icon_Catalog = ref('bars');

const click_floatingbubble = () => {
  height_floatingpanel.value = 500;
  icon_Catalog.value = showfloatingpanel.value ? 'bars' : 'cross';
  showfloatingpanel.value = !showfloatingpanel.value;
}


interface ArticleDetail {
  title?: string;
  updated_at?: string;
  views?: number;
  likes?: number;
  author_name?: string;
  category_name?: string;
  content?: string;
}



const state = reactive({
  id: 'my-editor',
  text: '',
  catalogList: []
});
const scrollElement = document.documentElement;
const Catalog_click= () => {
  icon_Catalog.value = showfloatingpanel.value ? 'bars' : 'cross';
  showfloatingpanel.value = !showfloatingpanel.value;
}

const onGetCatalog = (list :any) => {
  state.catalogList = list;
  
};
const router = useRouter();
 // 文章ID
 const DetailID = ref()
  // 骨架屏默认显示
  const loading = ref(true);

onMounted(async () => {
  window.scrollTo({ top: 0 })
  DetailID.value = router.currentRoute.value.params.id
  await getDetail(DetailID.value)
  
})

// onBeforeRouteUpdate(async (to) => {
//   window.scrollTo({ top: 0 })
//   DetailID.value = to.params.id
//   await getDetail(DetailID.value)
// });

  

const detail = reactive<ArticleDetail>({});

// 获取文章内容详情
async function getDetail(DetailID :number) {
  showLoadingToast({
    message: '加载中...',
    forbidClick: true,
    loadingType: 'spinner',
  });
  const {data} = await Get_articledetail(DetailID) as any
  Object.assign(detail, data)
  loading.value = false
}




</script>

<style scoped>
.detail {
  .main {

    padding: 0.267rem 0.133rem;

    .title {
      h1 {
        text-align: center;
        font-size: 1.75em;
        margin: 0;
        padding: 0.4rem 0;
      }

      .info {
        display: flex;
        justify-content: center;
        margin-bottom: 0.267rem;
        font-size: 0.7em;

        .info-item {
          border-radius: 0.267rem;
          margin: 0 0.08rem;
          display: flex;
          align-items: center;
          justify-content: center;

          .info-icon {
            padding-left: 0.133rem;
            color: white;
            width: 0.533rem;
            height: 0.533rem;
            display: inline-block;
            border-radius: 0.133rem 0 0 0.133rem;
            position: relative;

            .icon {
              transform: translate(0%, -50%);
              position: absolute;
              top: 50%;
            }
          }

          span:nth-child(2) {
            margin: 0 0.08rem;
            vertical-align: -0.027rem;
          }
        }

        .info-item:nth-child(1) {
          border: 1px solid #3498db;

          span:nth-child(1) {
            background-color: #3498db;
          }

          span:nth-child(2) {
            color: #3498db;
          }
        }

        .info-item:nth-child(2) {
          border: 1px solid #2ecc71;

          span:nth-child(1) {
            background-color: #2ecc71;
          }

          span:nth-child(2) {
            color: #2ecc71;
          }
        }

        .info-item:nth-child(3) {
          border: 1px solid #f1c40f;

          span:nth-child(1) {
            background-color: #f1c40f;
          }

          span:nth-child(2) {
            color: #f1c40f;
          }
        }

        .info-item:nth-child(4) {
          border: 1px solid #e67e22;

          span:nth-child(1) {
            background-color: #e67e22;
          }

          span:nth-child(2) {
            color: #e67e22;
          }
        }

        .info-item:nth-child(5) {
          border: 1px solid #9b59b6;

          span:nth-child(1) {
            background-color: #9b59b6;
          }

          span:nth-child(2) {
            color: #9b59b6;
          }
        }
      }
    }

    .body {
      margin: 0 0.267rem;
    }
  }




}


.bottom-margin {
  margin-bottom: 1.333rem;
}

.van-divider--content-left::before {
  max-width: 0;
}

.van-divider {
  font-size: 0.533rem;
}

.van-divider {
  margin: 0;
  padding: 0.267rem 0;
}

.v-md-editor-preview {
  padding: 0;
}

.van-empty {
  padding: 0 !important;
}
</style>