import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export interface InvoiceItemCardProps {
  title: string;
  href: string;
  image: string;
  options?: string[];
  quantity?: number;
  price: string;
  quantityText: string;
  priceText: string;
}

const InvoiceItemCard: React.FC<InvoiceItemCardProps> = ({
  title,
  image,
  options,
  quantity,
  price,
  quantityText,
  priceText,
}) => {
  const invoiceDetails = [
    [quantityText, quantity],
    [priceText, price],
  ];

  return (
    <article className="flex space-x-4 text-left">
      <Link href="">
        <a className="relative w-full max-w-[93px] md:max-w-[123px]">
          <Image
            src={image}
            layout="responsive"
            width={1}
            height={1}
            objectFit="cover"
            alt="dd"
            className="rounded-lg"
          />
        </a>
      </Link>
      <div className="flex flex-col text-sm">
        <h3 className="font-headings text-lg font-semibold text-primary">
          <Link href="">
            <a>{title}</a>
          </Link>
        </h3>
        {!!options?.length && (
          <ul className="mt-2 flex flex-col text-body">
            {options.map((option) => (
              <li key={option}>{option}</li>
            ))}
          </ul>
        )}
        <ul className="mt-4 md:hidden">
          {invoiceDetails.map(([text, value]) => (
            <li key={`${text}${value}`}>
              <span className="text-body">{text}</span>
              <strong className="ml-2 font-semibold text-primary">
                {value}
              </strong>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
};

// formatPrice();
export default InvoiceItemCard;
