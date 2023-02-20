import { Carousel } from '@mantine/carousel';
import { Image } from '@mantine/core';
import { IconX } from '@tabler/icons';

interface ImageProps {
  image: any;
  indexImage: number;
  onClick?: (val: any) => void;
}

export default function ShowImage({ image, indexImage, onClick }: ImageProps) {
  const slides = image.map((item: any, index: number) => (
    <Carousel.Slide key={index}>
      <Image src={item.Url} height={450} />
    </Carousel.Slide>
  ));
  return (
    <div className="fixed inset-0 flex items-center justify-center z-[101]">
      <div className="max-w-md relative z-10">
        <div className="flex justify-end mb-2 cursor-pointer" onClick={onClick}>
          <IconX />
        </div>
        <div className="rounded-md overflow-hidden">
          <Carousel
            loop
            withIndicators
            initialSlide={indexImage}
            styles={{
              indicator: {
                width: 8,
                height: 8,
                transition: 'width 250ms ease',
                backgroundColor: 'white !important',

                '&[data-active]': {
                  width: 40,
                },
              },
            }}
          >
            {slides}
          </Carousel>
        </div>
      </div>
      <div className="w-full h-full absolute top-0 bg-black bg-opacity-70" />
    </div>
  );
}
