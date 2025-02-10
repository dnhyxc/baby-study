<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
// https://pinyin-pro.cn/use/html.html
import { html } from 'pinyin-pro';
import { GUSHI_LIST } from '@/constant';
import { scrollTo } from '@/utils';

const prevAudio = ref<HTMLAudioElement | null>(null);
const scrollTop = ref<number>(0);

onMounted(() => {
  window.addEventListener('scroll', onScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll);
});

const onScroll = () => {
  scrollTop.value = document.documentElement.scrollTop;
};

const data = GUSHI_LIST.map((i) => {
  return {
    key: i.name,
    poem: i.poem.map((item) => html(item)),
    translation: i.translation.map((item) => html(item)),
    desc: html(i.desc),
    link: i.link,
    audio: i.audio,
  };
});

const playAudio = (index: number) => {
  if (prevAudio.value) {
    prevAudio.value.pause();
  }
  const audioPlayer = document.getElementById(`audioPlayer${index}`) as HTMLAudioElement;
  if (audioPlayer) {
    prevAudio.value = audioPlayer;
    audioPlayer.play();
  }
};

const stopAudio = (index: number) => {
  const audioPlayer = document.getElementById(`audioPlayer${index}`) as HTMLAudioElement;
  if (audioPlayer) {
    audioPlayer.pause();
  }
};

const onRefresh = () => {
  location.reload();
};

const onScrollTo = () => {
  scrollTo(document.documentElement, 0);
};
</script>

<template>
  <div class="home-wrap">
    <div v-for="(item, index) in data" :key="item.key" class="poems-item">
      <div class="poems">
        <div v-for="(i, index) in item.poem" :key="index" class="text" v-html="i" />
      </div>
      <div class="actions">
        <el-button type="primary" @click="playAudio(index)">开始朗读</el-button>
        <el-button type="warning" @click="stopAudio(index)">停止朗读</el-button>
      </div>
      <div class="translations yiwen">
        <!-- <a class="link" v-html="html('译文(古诗翻译)')" :href="item.link" /> -->
        <div class="desc" v-html="html('译文(古诗翻译)')" />
        <div v-for="(i, index) in item.translation" :key="index" class="translation" v-html="i" />
      </div>
      <div class="translations">
        <div class="desc" v-html="html('诗人的思想表达')" />
        <div class="translation" v-html="item.desc" />
      </div>
      <audio :id="`audioPlayer${index}`" :src="item.audio">您的浏览器不支持<code>audio</code> 元素。</audio>
    </div>
    <ToTopIcon v-if="scrollTop > 500" :onScrollTo="onScrollTo" />
    <div class="refresh" @click="onRefresh">
      <i class="iconfont icon-refresh" />
    </div>
  </div>
</template>

<style scoped lang="less">
@import '@/styles/index.less';

.home-wrap {
  text-align: center;
  padding: 10px;
  background-color: #d4d2be;
  box-sizing: border-box;
  overflow: hidden;

  .poems-item {
    background-color: #f0efe3;
    border-radius: 5px;
    margin-bottom: 20px;

    .poems {
      padding: 10px;
      font-size: 20px;

      & .text:nth-child(2) {
        :deep {
          .py-result-item {
            .py-pinyin-item {
              font-size: 15px;
            }

            .py-chinese-item {
              font-size: 16px;
            }
          }
        }
      }
    }

    .actions {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 5px;
      margin-right: 10px;
    }

    .translations {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      margin-top: 10px;
      padding: 10px;

      .link,
      .desc {
        margin-bottom: 10px;
        color: #7899fa;

        :deep {
          .py-chinese-item {
            font-weight: 500;
          }
        }
      }

      .desc {
        color: unset;
      }

      .translation {
        text-align: left;
        font-size: 14px;

        :deep {
          .py-result-item {
            display: inline-block;
            margin-bottom: 5px;
            margin-right: 6px;

            .py-pinyin-item {
              font-size: 17px;
              margin-bottom: 3px;
            }

            .py-chinese-item {
              font-size: 18px;
            }
          }
        }
      }
    }

    .yiwen {
      border-top: 1px dashed #d4d2be;
      border-bottom: 1px dashed #d4d2be;
    }
  }

  .refresh {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    right: 20px;
    bottom: 30px;
    background-color: rgba(212, 210, 190, 0.8);
    box-shadow: 0 0 10px @bg;
    padding: 5px;
    cursor: pointer;
    z-index: 999;
    width: 30px;
    height: 30px;
    border-radius: 5px;

    .icon-refresh {
      font-size: 18px;
    }
  }

  :deep {
    .py-result-item {
      margin-right: 6px;

      .py-pinyin-item {
        font-size: 18px;
        margin-bottom: 3px;
      }

      .py-chinese-item {
        font-size: 20px;
      }
    }
  }
}
</style>
