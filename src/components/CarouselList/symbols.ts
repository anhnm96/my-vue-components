import { Ref, InjectionKey } from 'vue'

interface CarouselListContext {
  activeIndex: number;
  prev: () => void;
  next: () => void;
}

export const CarouselListKey: InjectionKey<CarouselListContext> = Symbol('CarouselList')

interface CarouselListContentContext {
  carouselItems: Ref<HTMLElement[]>;
}

export const CarouselListContentKey: InjectionKey<CarouselListContentContext> = Symbol('CarouselListContent')
