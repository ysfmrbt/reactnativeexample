import React from 'react';
import { Pressable, Text, View } from 'react-native';
import Slider from '@react-native-community/slider';
import { tv } from 'tailwind-variants';

export type FeatureSlide = {
  key: string;
  title: string;
  description: string;
  /**
   * Optional: an icon/illustration component you render yourself.
   * Keep it simple: pass a ReactNode and FeatureSlider will place it.
   */
  visual?: React.ReactNode;
};

export interface FeatureSliderProps {
  slides: FeatureSlide[];
  /**
   * Called whenever the active slide changes.
   */
  onIndexChange?: (index: number) => void;

  /**
   * Initial slide index.
   */
  initialIndex?: number;

  /**
   * Optional: override the pagination dots count/behavior if you render fewer slides.
   * Defaults to slides.length.
   */
  dotsCount?: number;

  /**
   * Optional container className.
   */
  className?: string;

  /**
   * Optional: height class for the carousel area (e.g. "h-56").
   * Defaults to a reasonable height.
   */
  carouselClassName?: string;
}

const styles = tv({
  slots: {
    root: 'w-full',
    carousel: 'w-full',
    slide: 'w-full justify-center',
    card: 'rounded-2xl bg-surface border border-border p-5',
    titleRow: 'flex-row items-center justify-between',
    title: 'text-2xl font-bold text-foreground',
    description: 'mt-2 text-base leading-6 text-text-secondary',
    visual: 'mt-4',
    footer: 'mt-4 flex-row items-center justify-between',
    dots: 'flex-row items-center',
    dot: 'h-2 rounded-full',
    controls: 'flex-row items-center gap-2',
    controlText: 'text-sm font-semibold text-brand-primary',
    slider: 'flex-1',
  },
  variants: {
    size: {
      md: {
        title: 'text-2xl',
        description: 'text-base',
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

function clampIndex(index: number, length: number) {
  if (length <= 0) return 0;
  return Math.min(Math.max(index, 0), length - 1);
}

export default function FeatureSlider({
  slides,
  onIndexChange,
  initialIndex = 0,
  dotsCount,
  className,
  carouselClassName,
}: FeatureSliderProps) {
  const {
    root,
    carousel,
    slide,
    card,
    titleRow,
    title,
    description,
    visual,
    footer,
    dots,
    dot,
    controls,
    controlText,
    slider,
  } = styles();

  const [index, setIndex] = React.useState(() =>
    clampIndex(initialIndex, slides.length),
  );

  const effectiveDotsCount = dotsCount ?? slides.length;

  React.useEffect(() => {
    // If slides change, keep index valid.
    setIndex(prev => clampIndex(prev, slides.length));
  }, [slides.length]);

  React.useEffect(() => {
    onIndexChange?.(index);
  }, [index, onIndexChange]);

  const goTo = React.useCallback(
    (next: number) => setIndex(clampIndex(next, slides.length)),
    [slides.length],
  );

  const currentSlide = slides[index];

  return (
    <View className={root({ className })}>
      <View className={carousel({ className: carouselClassName ?? 'h-56' })}>
        <View className={slide()}>
          <View className={card()}>
            <View className={titleRow()}>
              <Text className={title()}>{currentSlide?.title ?? ''}</Text>
            </View>

            <Text className={description()}>
              {currentSlide?.description ?? ''}
            </Text>

            {currentSlide?.visual ? (
              <View className={visual()}>{currentSlide.visual}</View>
            ) : null}
          </View>
        </View>
      </View>

      <View className={footer()}>
        <View className={dots()}>
          {Array.from({ length: effectiveDotsCount }).map((_, i) => {
            const active = i === index;
            // If dotsCount != slides.length, keep it simple: clamp index to dot range.
            const isActive = dotsCount
              ? i === clampIndex(index, effectiveDotsCount)
              : active;

            return (
              <View
                key={`dot-${i}`}
                className={dot({
                  className: isActive
                    ? 'w-6 bg-brand-primary'
                    : 'w-2 bg-border',
                })}
                style={{ marginRight: i === effectiveDotsCount - 1 ? 0 : 8 }}
              />
            );
          })}
        </View>

        <View className={controls()}>
          <Pressable
            onPress={() => goTo(index - 1)}
            disabled={index <= 0}
            className={index <= 0 ? 'opacity-50' : undefined}
          >
            <Text className={controlText()}>Prev</Text>
          </Pressable>

          <View className={slider()}>
            <Slider
              value={slides.length > 1 ? index : 0}
              minimumValue={0}
              maximumValue={Math.max(slides.length - 1, 0)}
              step={1}
              onValueChange={v => setIndex(Math.round(v))}
              minimumTrackTintColor="#22c55e"
              maximumTrackTintColor="#94a3b8"
              thumbTintColor="#22c55e"
            />
          </View>

          <Pressable
            onPress={() => goTo(index + 1)}
            disabled={index >= slides.length - 1}
            className={index >= slides.length - 1 ? 'opacity-50' : undefined}
          >
            <Text className={controlText()}>Next</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
