import * as React from "react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function CarouselPlugin() {

  return (
    <Carousel
    plugins={[
      Autoplay({
        delay: 2000,
      }),
    ]}
      className="w-full max-w-xs"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        <CarouselItem>
          <Image
            src="/Banner-ST-01.jpg"
            alt="Description of image"
            className="rounded p-2 mx-auto"
            width={400}
            height={230}
          />
        </CarouselItem>
        <CarouselItem>
          <Image
            src="/Banner-ST-01.jpg"
            alt="Description of image"
            className="rounded p-2 mx-auto"
            width={400}
            height={230}
          />
        </CarouselItem>
        <CarouselItem>
          <Image
            src="/Banner-ST-01.jpg"
            alt="Description of image"
            className="rounded p-2 mx-auto"
            width={400}
            height={230}
          />
        </CarouselItem>
        <CarouselItem>
          <Image
            src="/Banner-ST-01.jpg"
            alt="Description of image"
            className="rounded p-2 mx-auto"
            width={400}
            height={230}
          />
        </CarouselItem>
        <CarouselItem>
          <Image
            src="/Banner-ST-01.jpg"
            alt="Description of image"
            className="rounded p-2 mx-auto"
            width={400}
            height={230}
          />
        </CarouselItem>
        <CarouselItem>
          <Image
            src="/Banner-ST-01.jpg"
            alt="Description of image"
            className="rounded p-2 mx-auto"
            width={400}
            height={230}
          />
        </CarouselItem>
        <CarouselItem>
          <Image
            src="/Banner-ST-01.jpg"
            alt="Description of image"
            className="rounded p-2 mx-auto"
            width={400}
            height={230}
          />
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
