import Title from './Title'
import ListingCard from './ListingCard';
import { useSelector } from 'react-redux';

const LatestListings = () => {

    const { listings } = useSelector(state => state.listing)

    return (
        <div className='rethink relative bg-[#FFF8EF] pt-20 pb-16 overflow-hidden'>

            {/* Warm decorative blobs to match Hero */}
            <div className="pointer-events-none absolute -top-20 -left-20 h-72 w-72 rounded-full bg-amber-100/60 blur-3xl" />
            <div className="pointer-events-none absolute bottom-0 right-0 h-72 w-72 rounded-full bg-rose-100/50 blur-3xl" />

            <div className='relative'>
                <Title title="Latest Listings" description="Discover the hottest social profiles available right now." />

                <div className='flex flex-col gap-6 px-6 mt-10'>
                    {listings
                        .slice()
                        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                        .slice(0, 4)
                        .map((listing, index) => (
                            <div
                                key={index}
                                className='mx-auto w-full max-w-3xl rounded-2xl border-2 border-[#2B2118] bg-white shadow-[4px_4px_0px_0px_#2B2118] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_#2B2118] transition-all'
                            >
                                <ListingCard listing={listing} />
                            </div>
                        ))}
                </div>
            </div>
        </div>
    )
}

export default LatestListings