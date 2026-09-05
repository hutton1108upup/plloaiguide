import Image from 'next/image';

export function BrandMark() {
  return (
    <span className="brand-mark" aria-hidden="true">
      <Image src="/icons/p-icon-64.png" width={32} height={32} alt="" unoptimized />
    </span>
  );
}
