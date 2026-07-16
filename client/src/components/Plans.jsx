import { PricingTable } from '@clerk/clerk-react';

const Plans = () => {
    return (
        <div className='rethink relative bg-[#FFF8EF] py-24 overflow-hidden'>

            {/* Warm decorative blobs to match Hero/Listings */}
            <div className="pointer-events-none absolute top-0 right-1/4 h-64 w-64 rounded-full bg-amber-100/60 blur-3xl" />
            <div className="pointer-events-none absolute bottom-0 left-1/4 h-64 w-64 rounded-full bg-rose-100/50 blur-3xl" />

            <div className='relative max-w-2xl mx-auto z-20 max-md:px-4'>
                <div className='text-center'>
                    <span className='inline-flex items-center gap-2 text-xs font-semibold bg-[#2B2118] text-[#FFF8EF] px-4 py-1.5 rounded-full'>
                        💳 Simple Pricing
                    </span>
                    <h2 className='text-[#2B2118] text-4xl font-bold mt-4'>Choose Your Plan</h2>
                    <p className='text-[#5C4E3F] text-sm max-w-md mx-auto mt-2'>Start for free and scale up as you grow. Find the perfect plan for your content creation needs.</p>
                </div>
                <div className='mt-14'>
                    <PricingTable
                        appearance={{
                            variables: {
                                colorPrimary: '#f97316',
                                colorBackground: '#ffffff',
                                colorText: '#2B2118',
                                colorTextSecondary: '#5C4E3F',
                                borderRadius: '1rem',
                                fontFamily: "'Rethink Sans', sans-serif",
                            },
                        }}
                    />
                </div>
            </div>

            <style>
                {`
                    @import url('https://fonts.googleapis.com/css2?&family=Rethink+Sans:ital,wght@0,400..800;1,400..800&display=swap');

                   .rethink {
                       font-family: 'Rethink Sans', sans-serif;
                   }
                `}
            </style>
        </div>
    );
};

export default Plans;