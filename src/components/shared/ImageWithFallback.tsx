"use client";
import { useState } from 'react';
import Image, { ImageProps } from 'next/image';

interface Props extends ImageProps {
  fallbackSrc?: string;
}

export default function ImageWithFallback({ src, fallbackSrc = '/images/placeholder.png', alt, ...rest }: Props) {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      {...rest}
      src={imgSrc}
      alt={alt}
      onError={() => setImgSrc(fallbackSrc)}
    />
  );
}
