import {
  CarouselList,
  CarouselListContent,
  CarouselListItem,
} from '@/components/CarouselList'

export default {
  title: 'CarouselList',
  component: CarouselListContent,
  subcomponents: { CarouselList, CarouselListItem },
}

const Template = args => ({
  components: { CarouselList, CarouselListContent, CarouselListItem },
  argTypes: {
    repeat: {
      control: { type: 'boolean' },
    },
    itemsToList: {
      control: { type: 'number' },
    },
  },
  setup() {
    const items = [
      {
        thumbnail:
          'https://photo-zmp3.zadn.vn/cover/d/0/d/7/d0d772a6c3e35b3e768d5c3ebf644ecd.jpg',
        title: 'Spa - Yoga',
      },
      {
        thumbnail:
          'https://photo-zmp3.zadn.vn/cover/2/e/9/6/2e966bf47b1989fdff7149c7a1b0f25e.jpg',
        title: 'Driving',
      },
      {
        thumbnail:
          'https://photo-zmp3.zadn.vn/cover/d/b/5/c/db5cf069b328c7858b2d9642cc6b4529.jpg',
        title: 'Workout',
      },
      {
        thumbnail:
          'https://photo-zmp3.zadn.vn/cover/4/a/3/b/4a3b5265ee2c9e2c84f5a88194382b5d.jpg',
        title: 'Ngủ Ngon',
      },
      {
        thumbnail:
          'https://photo-zmp3.zadn.vn/cover/0/a/e/f/0aef849d584c7e995073617f53b9ac24.jpg',
        title: 'Tình Yêu',
      },
      {
        thumbnail:
          'https://photo-zmp3.zadn.vn/cover/e/6/8/0/e680570f74b3497c95d96f6ba6db7b07.jpg',
        title: 'Giai Điệu Buồn',
      },
      {
        thumbnail:
          'https://photo-zmp3.zadn.vn/cover/4/d/f/4/4df44f0a15edb254717c383cf256b193.jpg',
        title: 'Chơi Game',
      },
      {
        thumbnail:
          'https://photo-zmp3.zadn.vn/cover/e/3/d/4/e3d43659c6dc756f87f4e44220313f92.jpg',
        title: 'Du lịch',
      },
      {
        thumbnail:
          'https://photo-zmp3.zadn.vn/cover/9/5/1/b/951bb18f468ea711a81a0dd28a8797d4.jpg',
        title: 'Motivation',
      },
      {
        thumbnail:
          'https://photo-zmp3.zadn.vn/cover/9/d/0/4/9d045c7d3a111975bb6920d963046dd1.jpg',
        title: 'Chill',
      },
      {
        thumbnail:
          'https://photo-zmp3.zadn.vn/cover/1/c/c/8/1cc8ae9704ae8fb7e34487ce744083a9.jpg',
        title: 'Dinner',
      },
      {
        thumbnail:
          'https://photo-zmp3.zadn.vn/cover/0/f/d/1/0fd1da7445b21a752a1c4282b06f2cf0.jpg',
        title: 'Thư Giãn',
      },
    ]
    return { ...args, items }
  },
  template: `
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
  <CarouselListContent :repeat="repeat" :items-to-list="itemsToList" wrapper-class="mt-3 -mx-3">
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
  `,
})

export const CarouselListStory = Template.bind({})
CarouselListStory.args = {
  itemsToList: -1,
  repeat: true,
}
