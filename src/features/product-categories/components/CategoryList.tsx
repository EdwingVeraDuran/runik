import React from "react";

type CategoryListProps = {
  children: React.ReactNode;
}

export default function CategoryList({ children }: CategoryListProps) {
  return <div className="flex flex-col border border-gray-300 rounded-md shadow-xs divide-y px-4">
    {children}
  </div>
}
