<template>
  <swiper
    :slidesPerView="1"
    :spaceBetween="20"
    :loop="true"
    :pagination="{
      clickable: true
    }"
    :navigation="true"
    :modules="modules"
    class="mySwiper"
  >
    <swiper-slide
      v-for="image in images"
      :key="image.id"
      ><img
        :src="`/${image.image}`"
        alt="game image"
    /></swiper-slide>
  </swiper>
</template>
<script setup>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// Import required modules
import { Pagination, Navigation } from 'swiper/modules';

const props = defineProps({
  images: Array
});
const modules = [Pagination, Navigation];
</script>

<style scoped>
:root {
}

.swiper {
  width: 100%;
  height: 100%;
  border-radius: 15px;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;

  /* Center slide text vertically */
  display: flex;
  justify-content: center;
  align-items: center;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.swiper {
  margin-left: auto;
  margin-right: auto;
}
</style>
