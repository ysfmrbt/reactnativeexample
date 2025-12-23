import { Dimensions, View } from 'react-native';
import { useMemo, useRef } from 'react';
import Carousel, {
  ICarouselInstance,
  Pagination,
} from 'react-native-reanimated-carousel';
import { useSharedValue } from 'react-native-reanimated';
import Typography from '../../atoms/Typography';
const width = Dimensions.get('window').width;

type SlideItem = {
  id?: string | number;
  title?: string;
  subtitle?: string;
};

type HomeScreenCarouselProps = {
  data?: SlideItem[];
};

function HomeScreenCarousel({ data }: HomeScreenCarouselProps) {
  const ref = useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);

  const slides = useMemo(() => data ?? [], [data]);
  const indexes = useMemo(() => slides.map((_, idx) => idx), [slides]);

  if (!slides.length) {
    return null;
  }

  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({ count: index - progress.value, animated: true });
  };

  return (
    <View style={{ flex: 1 }}>
      <Carousel
        ref={ref}
        width={width}
        height={width / 1.5}
        style={{ width: '100%' }}
        data={slides}
        onProgressChange={(_, absoluteProgress) =>
          (progress.value = absoluteProgress)
        }
        renderItem={({ index, item }) => (
          <View className="flex-1 items-center justify-center px-10">
            <Typography variant="h2" className="text-center text-white">
              {item?.title ?? `Slide ${indexes[index] + 1}`}
            </Typography>
            {item?.subtitle ? (
              <Typography
                variant="caption"
                className="mt-3 text-center text-white"
              >
                {item.subtitle}
              </Typography>
            ) : null}
          </View>
        )}
      />

      <Pagination.Basic
        progress={progress}
        data={indexes}
        dotStyle={{
          width: 8,
          height: 8,
          borderRadius: 50,
          backgroundColor: 'rgba(255,255,255,0.4)',
        }}
        activeDotStyle={{
          width: 10,
          height: 10,
          borderRadius: 50,
          backgroundColor: 'rgba(255,255,255,0.9)',
        }}
        containerStyle={{ gap: 8, marginTop: 16, alignSelf: 'center' }}
        onPress={onPressPagination}
      />
    </View>
  );
}

export default HomeScreenCarousel;
