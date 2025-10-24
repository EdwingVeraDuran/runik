import React from "react";

type BrandListProps = {
  children: React.ReactNode;
};

export default function BrandList({ children }: BrandListProps) {
  return (
    <div className="flex flex-col border border-gray-300 rounded-md shadow-xs divide-y px-4">
      {children}
    </div>
  );
}
