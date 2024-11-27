import React, { ReactNode } from 'react';
import { BcImage } from '~/components/bc-image';
import { Link } from '~/components/link';
import { cn } from '~/lib/utils';
import { Compare } from './compare';
import QuickView from './Quickview';
import { getProductData } from '~/components/common-functions';
import { AddToCartButton } from './AddToCartButton';
import ProductPriceDisplay from '~/app/[locale]/(default)/product/[slug]/_components/exclvat';

interface Image {
  altText: string;
  src: string;
}

type Price =
  | string
  | {
      type: 'sale';
      currentValue: string;
      previousValue: string;
    }
  | {
      type: 'range';
      minValue: string;
      maxValue: string;
    };

interface Product {
  id: string;
  name: string;
  href: string;
  image?: Image;
  price?: Price;
  subtitle?: string;
  badge?: string;
}

interface Props extends Product {
  addToCart?: ReactNode;
  className?: string;
  imagePriority?: boolean;
  imageSize?: 'square' | 'tall' | 'wide';
  showCompare?: boolean;
  product?: any;
}

const ProductCard = ({
  addToCart,
  className,
  image,
  imagePriority = false,
  imageSize,
  href,
  price,
  id,
  showCompare = true,
  subtitle,
  name,
  product,
  ...props
}: Props) => {
  const addToCardData = {
    defaultImage: {
      url: image.src,
      altText: image.altText,
    },
    name,
    price,
    subtitle,
    cartCount: 1,
  };

  return (
    <div className="product-card group relative flex flex-col overflow-visible">
      <div className="plp-img-div-parent relative flex justify-center">
        <div className="plp-img-div relative aspect-square flex-auto">
          {image ? (
            <BcImage alt={image.altText} className="!static object-contain" fill src={image.src} />
          ) : (
            <div className="h-full w-full bg-gray-200" />
          )}
          <div className="plp-product-btn-hover opacity-0 hover:opacity-100 w-full h-full flex flex-col gap-[20px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/3">
            <QuickView product={product} />
            <AddToCartButton addToCardData={addToCardData} product={product} />
          </div>
        </div>
      </div>

      <div className="plp-product-content flex flex-col gap-1">
        <h3 className="title text-xl font-bold">
          <Link href={href}>
            <span>{name}</span>
          </Link>
        </h3>
        {subtitle && (
          <p className="brand mb-[4px] text-[16px] font-[300] text-[#a5a5a5]">{subtitle}</p>
        )}
        <div className="cardprice">
          <ProductPriceDisplay product={product} page="product"/>
        </div>
        {/* Add Compare Section Here */}
        {showCompare && (
          <div className="compare-section mt-2">
            <Compare id={id} image={image} name={name} />
          </div>
        )}
      </div>

      <div className="plp-product-btn">
        <QuickView product={product} />
        <AddToCartButton addToCardData={addToCardData} product={product} />
      </div>
    </div>
  );
};

ProductCard.displayName = 'ProductCard';

export { ProductCard, type Price };