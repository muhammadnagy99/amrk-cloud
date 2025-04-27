import React from 'react';

const ProductGridSkeletonLoader = () => {
    const SkeletonCard = () => (
        <>
            <figure className="flex flex-col gap-2 snap-start rounded-lg">
                <div className="bg-gray-200 rounded-lg animate-pulse w-full h-[80px]" />

                <div className="flex flex-col w-full">
                    <div className="flex flex-col gap-1 w-full">
                        <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
                    </div>

                    <div className="flex flex-row gap-1 items-center mt-2">
                        <div className="h-4 bg-gray-200 rounded w-16 animate-pulse" />
                        <div className="h-4 w-4 bg-gray-200 rounded-full animate-pulse" />
                    </div>
                </div>
            </figure>
        </>
    );

    return (
        <>
            <div className='flex flex-col gap-4'>
                <h3 className="h-4 bg-gray-200 rounded w-16 animate-pulse" />
                <div className="grid grid-cols-3 gap-4">
                    {Array(9).fill(0).map((_, index) => (
                        <SkeletonCard key={index} />
                    ))}
                </div>
            </div>
            <div className='flex flex-col gap-4'>
                <h3 className="h-4 bg-gray-200 rounded w-16 animate-pulse" />
                <div className="grid grid-cols-3 gap-4">
                    {Array(9).fill(0).map((_, index) => (
                        <SkeletonCard key={index} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default ProductGridSkeletonLoader;