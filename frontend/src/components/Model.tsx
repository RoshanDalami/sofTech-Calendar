// import React from 'react'

export default function Model({ children }: any) {
  return (
    <div className="absolute z-50 inset-0 bg-black/40 w-[100%]   min-h-screen flex md:items-center py-20 justify-center">
      <div className="md:w-2/4 w-full px-5 md:px-0">{children}</div>
    </div>
  );
}
