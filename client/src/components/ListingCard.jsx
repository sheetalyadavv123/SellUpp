import { BadgeCheck, MapPin, Users, LineChart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { platformIcons } from '../assets/assets';

const ListingCard = ({ listing }) => {
    const currency = import.meta.env.VITE_CURRENCY || '$';
    const navigate = useNavigate();

    return (
        <div className='relative bg-white rounded-2xl overflow-hidden'>
            {/* Featured Banner */}
            {listing.featured && (
                <>
                    <p className='py-1' />
                    <div className='absolute top-0 left-0 w-full bg-gradient-to-r from-orange-500 to-rose-500 text-white text-center text-xs font-semibold py-1 tracking-wide uppercase'>Featured</div>
                </>
            )}

            <div className='p-5 pt-8'>
                {/* Header */}
                <div className='flex items-center gap-3 mb-3'>
                    {platformIcons[listing.platform]}

                    <div className='flex flex-col'>
                        <h2 className='text-[#2B2118] font-semibold text-base'>{listing.title}</h2>
                        <p className='text-sm text-[#5C4E3F]'>
                            @{listing.username} - {listing.platform.charAt(0).toUpperCase() + listing.platform.slice(1)}
                        </p>
                    </div>
                    {listing.verified && <BadgeCheck className='text-emerald-500 ml-auto w-5 h-5' />}
                </div>

                {/* Stats */}
                <div className='flex flex-wrap justify-between max-w-lg items-center gap-3 my-5'>
                    <div className='flex items-center text-sm text-[#5C4E3F]'>
                        <Users className='size-6 mr-1 text-[#B8A98F]' />
                        <span className='text-lg font-medium text-[#2B2118] mr-1.5'>{listing.followers_count.toLocaleString()}</span> followers
                    </div>
                    {listing.engagement_rate && (
                        <div className='flex items-center text-sm text-[#5C4E3F]'>
                            <LineChart className='size-6 mr-1 text-[#B8A98F]' />
                            <span className='text-lg font-medium text-[#2B2118] mr-1.5'>{listing.engagement_rate}</span> % engagement
                        </div>
                    )}
                </div>

                {/* Tags & Location */}
                <div className='flex items-center gap-3 mb-3'>
                    <span className='text-xs font-medium bg-orange-100 text-orange-700 px-3 py-1 rounded-full capitalize'>{listing.niche}</span>
                    {listing.country && (
                        <div className='flex items-center text-[#5C4E3F] text-sm'>
                            <MapPin className='size-6 mr-1 text-[#B8A98F]' />
                            {listing.country}
                        </div>
                    )}
                </div>

                {/* Description */}
                <p className='text-sm text-[#5C4E3F] mb-4 line-clamp-2'>{listing.description}</p>

                <hr className='my-5 border-[#EFE3D0]' />

                {/* Footer */}
                <div className='flex items-center justify-between'>
                    <div className='flex items-baseline'>
                        <span className='text-2xl font-medium text-[#2B2118]'>
                            {currency}
                            {listing.price.toLocaleString()}
                        </span>
                        <span className='text-xs text-[#5C4E3F] ml-1.5'>USD</span>
                    </div>

                    <button onClick={() => { navigate(`/listing/${listing.id}`); scrollTo(0, 0); }} className='px-7 py-3 bg-orange-500 text-white text-sm rounded-lg hover:bg-orange-600 transition' >
                        More Details
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ListingCard;