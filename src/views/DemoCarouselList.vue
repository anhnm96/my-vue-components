<template>
  <div>
    <CarouselList class="p-4">
      <template #header="{prev, next}">
        <div class="flex justify-between">
          <h2 class="text-lg font-bold text-primary">
            Top 100 hits
          </h2>
          <div class="flex items-center space-x-2">
            <button
              class="inline-flex items-center p-1 focus:outline-none"
              aria-label="Previous List"
              @click="prev"
            >
              Prev
            </button>
            <button
              class="inline-flex items-center p-1 focus:outline-none"
              aria-label="Next List"
              @click="next"
            >
              Next
            </button>
          </div>
        </div>
      </template>
      <CarouselListContent wrapper-class="mt-3 -mx-3">
        <CarouselListItem
          v-for="item in items"
          :key="item.title"
          class="flex-shrink-0 w-1/4 px-3 lg:w-1/5 xl:w-1/6"
        >
          <div class="relative pb-[56.25%] bg-gray-400">
            <img
              class="absolute inset-0 rounded"
              :src="item.thumbnail"
              :alt="item.title"
            >
          </div>
        </CarouselListItem>
      </CarouselListContent>
    </CarouselList>
    <!-- youtube chip list like -->
    <!-- <CarouselList>
      <CarouselListContent
        class="bg-gray-900"
        wrapper-class="space-x-4"
      >
        <CarouselListItem
          v-for="chip in chips"
          :key="chip"
          class="p-1 text-sm text-white bg-gray-500 rounded-full"
        >
          <span>{{ chip }}</span>
        </CarouselListItem>
      </CarouselListContent>
    </CarouselList> -->
  </div>
</template>

<script>
import {
  CarouselList,
  CarouselListContent,
  CarouselListItem,
} from '@/components/CarouselList'

const items = [
  {
    encodeId: 'IWZ9Z09C',
    cover:
      'https://photo-zmp3.zadn.vn/cover/1/3/d/a/13da957b7350667f92a0c6ae620c97ec.jpg',
    thumbnail:
      'https://photo-zmp3.zadn.vn/cover/d/0/d/7/d0d772a6c3e35b3e768d5c3ebf644ecd.jpg',
    thumbnailHasText:
      'https://photo-zmp3.zadn.vn/cover/8/7/d/c/87dc784f849a55fb343b0ed994a8d864.jpg',
    thumbnailR:
      'https://photo-zmp3.zadn.vn/cover/4/7/8/0/47808cadd480844905b26104468e29b7.jpg',
    title: 'Spa - Yoga',
    link: '/hub/Spa-Yoga/IWZ9Z09C.html',
    description: '',
  },
  {
    encodeId: 'IWZ9Z0AF',
    cover:
      'https://photo-zmp3.zadn.vn/cover/1/6/6/4/16643b9766c7cd5a5eb819d8160eb8b8.jpg',
    thumbnail:
      'https://photo-zmp3.zadn.vn/cover/2/e/9/6/2e966bf47b1989fdff7149c7a1b0f25e.jpg',
    thumbnailHasText:
      'https://photo-zmp3.zadn.vn/cover/b/e/9/b/be9b83fdbb931eaf0a0342914cb6a12d.jpg',
    thumbnailR:
      'https://photo-zmp3.zadn.vn/cover/0/c/6/a/0c6a98b09036e57ecea05f0d19fe7011.jpg',
    title: 'Driving',
    link: '/hub/Driving/IWZ9Z0AF.html',
    description: '',
  },
  {
    encodeId: 'IWZ9Z09F',
    cover:
      'https://photo-zmp3.zadn.vn/cover/7/1/a/b/71ab8a69d1ad4cad8c6289a346773073.jpg',
    thumbnail:
      'https://photo-zmp3.zadn.vn/cover/d/b/5/c/db5cf069b328c7858b2d9642cc6b4529.jpg',
    thumbnailHasText:
      'https://photo-zmp3.zadn.vn/cover/6/a/9/8/6a982b0ea4de24100388beb27087d241.jpg',
    thumbnailR:
      'https://photo-zmp3.zadn.vn/cover/a/a/6/a/aa6afa7fdab849574a71dec0770a4b22.jpg',
    title: 'Workout',
    link: '/hub/Workout/IWZ9Z09F.html',
    description: '',
  },
  {
    encodeId: 'IWZ9Z09B',
    cover:
      'https://photo-zmp3.zadn.vn/cover/9/4/5/2/94525d3e4dfd9b64b3cddb0365b00dcc.jpg',
    thumbnail:
      'https://photo-zmp3.zadn.vn/cover/4/a/3/b/4a3b5265ee2c9e2c84f5a88194382b5d.jpg',
    thumbnailHasText:
      'https://photo-zmp3.zadn.vn/cover/7/8/e/b/78eb333a7b7a350a03c7674c0613d04d.jpg',
    thumbnailR:
      'https://photo-zmp3.zadn.vn/cover/3/e/2/5/3e25261cae8470995e8d88997e9c3e0e.jpg',
    title: 'Ngủ Ngon',
    link: '/hub/Ngu-Ngon/IWZ9Z09B.html',
    description: '',
  },
  {
    encodeId: 'IWZ9Z09E',
    cover:
      'https://photo-zmp3.zadn.vn/cover/5/7/d/b/57dbc9145318876d3d79e26a99ec8a83.jpg',
    thumbnail:
      'https://photo-zmp3.zadn.vn/cover/0/a/e/f/0aef849d584c7e995073617f53b9ac24.jpg',
    thumbnailHasText:
      'https://photo-zmp3.zadn.vn/cover/9/8/7/3/98732de40faf3fa472968bd081369978.jpg',
    thumbnailR:
      'https://photo-zmp3.zadn.vn/cover/a/2/3/b/a23b64ffea1892027878ffe3fd5a38bb.jpg',
    title: 'Tình Yêu',
    link: '/hub/Tinh-Yeu/IWZ9Z09E.html',
    description: '',
  },
  {
    encodeId: 'IWZ9Z099',
    cover:
      'https://photo-zmp3.zadn.vn/cover/9/5/e/2/95e21d554ae394322b3bb79f7a01617b.jpg',
    thumbnail:
      'https://photo-zmp3.zadn.vn/cover/e/6/8/0/e680570f74b3497c95d96f6ba6db7b07.jpg',
    thumbnailHasText:
      'https://photo-zmp3.zadn.vn/cover/4/f/d/a/4fda0068d6821c35e89a6d405b314ba0.jpg',
    thumbnailR:
      'https://photo-zmp3.zadn.vn/cover/0/7/e/a/07eaa28ca48cc2557737deee06d3c3f6.jpg',
    title: 'Giai Điệu Buồn',
    link: '/hub/Giai-Dieu-Buon/IWZ9Z099.html',
    description: '',
  },
  {
    encodeId: 'IWZ9Z097',
    cover:
      'https://photo-zmp3.zadn.vn/cover/9/2/4/d/924d799e99bc603fe8aab02284711de1.jpg',
    thumbnail:
      'https://photo-zmp3.zadn.vn/cover/4/d/f/4/4df44f0a15edb254717c383cf256b193.jpg',
    thumbnailHasText:
      'https://photo-zmp3.zadn.vn/cover/c/1/5/1/c151d0ea45ca4e88bade5841047acb9e.jpg',
    thumbnailR:
      'https://photo-zmp3.zadn.vn/cover/2/5/2/9/25296c695110c33adaf08901c9223017.jpg',
    title: 'Chơi Game',
    link: '/hub/Choi-Game/IWZ9Z097.html',
    description: '',
  },
  {
    encodeId: 'IWZ9Z098',
    cover:
      'https://photo-zmp3.zadn.vn/cover/7/b/a/3/7ba3b164504295c3ab8ee10e1133678e.jpg',
    thumbnail:
      'https://photo-zmp3.zadn.vn/cover/e/3/d/4/e3d43659c6dc756f87f4e44220313f92.jpg',
    thumbnailHasText:
      'https://photo-zmp3.zadn.vn/cover/d/0/7/1/d0714f6cfd28af5d7518d582285f3312.jpg',
    thumbnailR:
      'https://photo-zmp3.zadn.vn/cover/a/5/9/2/a592ccc7e41403e2f7b5233e064cf594.jpg',
    title: 'Du lịch',
    link: '/hub/Du-lich/IWZ9Z098.html',
    description: '',
  },
  {
    encodeId: 'IWZ9Z0A0',
    cover:
      'https://photo-zmp3.zadn.vn/cover/7/4/5/7/7457c5c2972c13603b22885baf25b47d.jpg',
    thumbnail:
      'https://photo-zmp3.zadn.vn/cover/9/5/1/b/951bb18f468ea711a81a0dd28a8797d4.jpg',
    thumbnailHasText:
      'https://photo-zmp3.zadn.vn/cover/e/d/3/2/ed325aa9d68abced2dc9234965f4af73.jpg',
    thumbnailR:
      'https://photo-zmp3.zadn.vn/cover/4/d/8/3/4d83d75dbb440bc97b3e397ea7606936.jpg',
    title: 'Motivation',
    link: '/hub/Motivation/IWZ9Z0A0.html',
    description: '',
  },
  {
    encodeId: 'IWZ9Z0CI',
    cover:
      'https://photo-zmp3.zadn.vn/cover/d/6/2/1/d621f4cf5cecdf0ab58f6c4dfd8536a1.jpg',
    thumbnail:
      'https://photo-zmp3.zadn.vn/cover/9/d/0/4/9d045c7d3a111975bb6920d963046dd1.jpg',
    thumbnailHasText:
      'https://photo-zmp3.zadn.vn/cover/4/f/8/5/4f857e3277bb89b5e1c5ecc24598027c.jpg',
    thumbnailR:
      'https://photo-zmp3.zadn.vn/cover/e/2/c/6/e2c683306586cb2e6e9cbfa77b4fd622.jpg',
    title: 'Chill',
    link: '/hub/Chill/IWZ9Z0CI.html',
    description: '',
  },
  {
    encodeId: 'IWZ9Z0C8',
    cover:
      'https://photo-zmp3.zadn.vn/cover/2/8/2/a/282a894be5043c1b47446fff0d748fcb.jpg',
    thumbnail:
      'https://photo-zmp3.zadn.vn/cover/1/c/c/8/1cc8ae9704ae8fb7e34487ce744083a9.jpg',
    thumbnailHasText:
      'https://photo-zmp3.zadn.vn/cover/1/a/9/9/1a99f9d8d8c5563e3893d9f10cd8689a.jpg',
    thumbnailR:
      'https://photo-zmp3.zadn.vn/cover/f/6/6/3/f6639d240726fcbe9c4fe584ee5cedc6.jpg',
    title: 'Dinner',
    link: '/hub/Dinner/IWZ9Z0C8.html',
    description: '',
  },
  {
    encodeId: 'IWZ9Z096',
    cover:
      'https://photo-zmp3.zadn.vn/cover/f/b/7/9/fb79cd3242278a6d8f8a8e473a80cd3b.jpg',
    thumbnail:
      'https://photo-zmp3.zadn.vn/cover/0/f/d/1/0fd1da7445b21a752a1c4282b06f2cf0.jpg',
    thumbnailHasText:
      'https://photo-zmp3.zadn.vn/cover/a/2/7/8/a2784283efbab4c3b17e344f9b0a4b30.jpg',
    thumbnailR:
      'https://photo-zmp3.zadn.vn/cover/9/2/2/d/922d20a7762e49a74a5564942189fb84.jpg',
    title: 'Thư Giãn',
    link: '/hub/Thu-Gian/IWZ9Z096.html',
    description: '',
  },
]
export default {
  name: 'DemoCarouselList',
  components: { CarouselList, CarouselListContent, CarouselListItem },
  setup() {
    const chips = [
      'All',
      'CSS',
      'Rain',
      'Meditation music',
      'Vegetation',
      'Computer Science',
      'Music',
      'Subliminal stimuli',
      'Natural sounds',
      'Chill-out music',
    ]
    return { items, chips }
  },
}
</script>

<style>
</style>
