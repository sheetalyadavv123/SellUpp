import { Eye, Edit, Plus, TrendingUp, DollarSign, Users, CheckCircle, Clock, XCircle, EyeOffIcon, EyeIcon, LockIcon, BanIcon, TrashIcon, WalletIcon, ArrowDownCircleIcon, CoinsIcon, StarIcon } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { platformIcons } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useAuth } from '@clerk/clerk-react';
import api from '../configs/axios';
import { getAllPublicListing, getAllUserListing } from '../app/features/listingSlice';
import { useState } from 'react';
import CredentialSubmission from '../components/CredentialSubmission';
import WithdrawModal from '../components/WithdrawModal';

const MyListings = () => {
    const { userListings, balance } = useSelector((state) => state.listing);
    const currency = import.meta.env.VITE_CURRENCY || '$';
    const navigate = useNavigate();
    const { getToken } = useAuth();
    const dispatch = useDispatch();

    const [showCredentialSubmission, setShowCredentialSubmission] = useState(null);
    const [showWithdrawal, setShowWithdrawal] = useState(null);

    const getStatusColor = (status) => {
        switch (status) {
            case 'active':
                return 'text-green-800';
            case 'ban':
                return 'text-red-800';
            case 'sold':
                return 'text-orange-800';
            case 'inactive':
                return 'text-[#5C4E3F]';
            default:
                return 'text-[#5C4E3F]';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'active':
                return <CheckCircle className='size-3.5' />;
            case 'ban':
                return <BanIcon className='size-3.5' />;
            case 'sold':
                return <DollarSign className='size-3.5' />;
            case 'inactive':
                return <XCircle className='size-3.5' />;
            default:
                return <Clock className='size-3.5' />;
        }
    };

    const formatNumber = (num) => {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
        if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
        return num?.toString() || '0';
    };

    const totalValue = userListings.reduce((sum, listing) => sum + (listing.price || 0), 0);
    const activeListings = userListings.filter((listing) => listing.status === 'active').length;
    const soldListings = userListings.filter((listing) => listing.status === 'sold').length;

    const toggleStatus = async (listingId) => {
        try {
            toast.loading('Updating listing status...');
            const token = await getToken();
            const { data } = await api.put(`/api/listing/${listingId}/status`, {}, { headers: { Authorization: `Bearer ${token}` } });
            dispatch(getAllUserListing({ getToken }));
            dispatch(getAllPublicListing());
            toast.dismissAll();
            toast.success(data.message);
        } catch (error) {
            toast.dismissAll();
            toast.error(error?.response?.data?.message || error.message);
        }
    };

    const deleteListing = async (listingId) => {
        try {
            const confirm = window.confirm('Are you sure you want to delete this listing? if credentials are changed, new credentials will be sent to your email');
            if (!confirm) return;

            toast.loading('Deleting listing...');
            const token = await getToken();
            const { data } = await api.delete(`/api/listing/${listingId}`, { headers: { Authorization: `Bearer ${token}` } });
            dispatch(getAllUserListing({ getToken }));
            dispatch(getAllPublicListing());
            toast.dismissAll();
            toast.success(data.message);
        } catch (error) {
            toast.dismissAll();
            toast.error(error?.response?.data?.message || error.message);
        }
    };

    const markAsFeatured = async (listingId) => {
        try {
            toast.loading('featuring listing...');
            const token = await getToken();
            const { data } = await api.put(`/api/listing/featured/${listingId}`, {}, { headers: { Authorization: `Bearer ${token}` } });
            dispatch(getAllUserListing({ getToken }));
            dispatch(getAllPublicListing());
            toast.dismissAll();
            toast.success(data.message);
        } catch (error) {
            toast.dismissAll();
            toast.error(error?.response?.data?.message || error.message);
        }
    };

    return (
        <div className='rethink px-6 md:px-16 lg:px-24 xl:px-32 pt-8 bg-[#FFF8EF] min-h-screen'>
            {/* Header */}
            <div className='flex flex-col md:flex-row justify-between items-start md:items-center mb-8'>
                <div>
                    <h1 className='text-3xl font-bold text-[#2B2118]'>My Listings</h1>
                    <p className='text-[#5C4E3F] mt-1'>Manage your social media account listings</p>
                </div>
                <button onClick={() => navigate('/create-listing')} className='bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-medium flex items-center space-x-2 mt-4 md:mt-0 transition'>
                    <Plus className='size-4' />
                    <span>New Listing</span>
                </button>
            </div>

            {/* Stats */}
            <div className='grid grid-cols-1 md:grid-cols-4 gap-6 mb-8'>
                <StatCard title='Total Listings' value={userListings.length} icon={<Eye className='size-6 text-orange-600' />} color='orange' />
                <StatCard title='Active Listings' value={activeListings} icon={<CheckCircle className='size-6 text-green-600' />} color='green' />
                <StatCard title='Sold' value={soldListings} icon={<TrendingUp className='size-6 text-orange-600' />} color='orange' />
                <StatCard title='Total Value' value={`${currency}${totalValue.toLocaleString()}`} icon={<DollarSign className='size-6 text-yellow-600' />} color='yellow' />
            </div>

            {/* Balance Section */}
            <div className='flex flex-col sm:flex-row justify-between gap-4 xl:gap-20 p-6 mb-10 bg-white rounded-2xl border-2 border-[#2B2118] shadow-[4px_4px_0px_0px_#2B2118]'>
                {[
                    { label: 'Earned', value: balance.earned, icon: WalletIcon },
                    { label: 'Withdrawn', value: balance.withdrawn, icon: ArrowDownCircleIcon },
                    { label: 'Available', value: balance.available, icon: CoinsIcon },
                ].map((item, index) => (
                    <div onClick={() => item.label === 'Available' && setShowWithdrawal(true)} key={index} className='flex flex-1 items-center justify-between p-4 rounded-lg border border-[#2B2118]/10 cursor-pointer hover:bg-[#FFF8EF] transition'>
                        <div className='flex items-center gap-3'>
                            <item.icon className='text-[#B8A98F] w-6 h-6' />
                            <span className='font-medium text-[#5C4E3F]'>{item.label}</span>
                        </div>
                        <span className='text-xl font-medium text-[#2B2118]'>
                            {currency}
                            {item.value.toFixed(2)}
                        </span>
                    </div>
                ))}
            </div>

            {/* Listings */}
            {userListings.length === 0 ? (
                <div className='bg-white rounded-2xl border-2 border-[#2B2118] shadow-[4px_4px_0px_0px_#2B2118] p-16 text-center'>
                    <div className='w-16 h-16 bg-[#FFF1DD] rounded-full flex items-center justify-center mx-auto mb-4'>
                        <Plus className='w-8 h-8 text-orange-500' />
                    </div>
                    <h3 className='text-xl font-semibold text-[#2B2118] mb-2'>No listings yet</h3>
                    <p className='text-[#5C4E3F] mb-6'>Start by creating your first listing</p>
                    <button onClick={() => navigate('/create-listing')} className='bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-medium transition'>
                        Create First Listing
                    </button>
                </div>
            ) : (
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {userListings.map((listing) => (
                        <div key={listing.id} className='bg-white rounded-2xl border-2 border-[#2B2118] shadow-[4px_4px_0px_0px_#2B2118] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_#2B2118] transition-all'>
                            <div className='p-6'>
                                <div className='flex items-start gap-4 justify-between mb-4'>
                                    {platformIcons[listing.platform]}
                                    <div className='flex-1 '>
                                        <div className='flex justify-between items-start'>
                                            <h3 className='text-lg font-semibold text-[#2B2118] '>{listing.title}</h3>
                                            <div className='flex items-center gap-2'>
                                                <div className='relative group'>
                                                    <LockIcon size={14} className='text-[#5C4E3F]' />
                                                    <div className=' invisible group-hover:visible absolute right-0 top-0 pt-4.5 z-10 '>
                                                        <div className='bg-white text-[#5C4E3F] text-xs rounded-lg border border-[#2B2118]/15 p-2 px-3 shadow-md'>
                                                            {!listing.isCredentialSubmitted && (
                                                                <>
                                                                    <button onClick={() => setShowCredentialSubmission(listing)} className='flex items-center gap-2 text-nowrap hover:text-orange-600'>
                                                                        Add Credentials
                                                                    </button>
                                                                    <hr className='border-[#EFE3D0] my-2' />
                                                                </>
                                                            )}
                                                            <button className='text-nowrap'>
                                                                Status :{' '}
                                                                <span className={listing.isCredentialSubmitted ? (listing.isCredentialVerified ? (listing.isCredentialChanged ? 'text-green-600' : 'text-orange-600') : 'text-slate-600') : 'text-red-600'}>
                                                                    {listing.isCredentialSubmitted ? (listing.isCredentialVerified ? (listing.isCredentialChanged ? 'Changed' : 'Verified') : 'Submitted') : 'Not Submitted'}
                                                                </span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                {listing.status === 'active' && <StarIcon onClick={() => markAsFeatured(listing.id)} size={18} className={`text-yellow-500 cursor-pointer ${listing.featured && 'fill-yellow-500'}`} />}
                                            </div>
                                        </div>
                                        <p className='text-sm text-[#5C4E3F]'>
                                            <span>@{listing.username}</span>
                                        </p>
                                    </div>
                                </div>

                                <div className='space-y-4'>
                                    <div className='grid grid-cols-2 gap-2 text-sm'>
                                        <div className='flex items-center space-x-2'>
                                            <Users className='size-4 text-[#B8A98F]' />
                                            <span className='text-[#5C4E3F]'>{formatNumber(listing.followers_count)} followers</span>
                                        </div>
                                        <span className={`flex items-center justify-end gap-1 ${getStatusColor(listing.status)}`}>
                                            {getStatusIcon(listing.status)} <span>{listing.status}</span>
                                        </span>
                                        <div className='flex items-center space-x-2'>
                                            <TrendingUp className='size-4 text-[#B8A98F]' />
                                            <span className='text-[#5C4E3F]'>{listing.engagement_rate}% engagement</span>
                                        </div>
                                    </div>

                                    <div className='flex items-center justify-between pt-3 border-t border-[#EFE3D0] '>
                                        <span className='text-2xl font-bold text-[#2B2118]'>
                                            {currency}
                                            {listing.price.toLocaleString()}
                                        </span>
                                        <div className='flex items-center space-x-2'>
                                            {listing.status !== 'sold' && (
                                                <button onClick={() => deleteListing(listing.id)} className='p-2 border border-[#2B2118]/20 rounded-lg hover:bg-red-50 hover:text-red-500 transition'>
                                                    <TrashIcon className='size-4' />
                                                </button>
                                            )}
                                            <button onClick={() => navigate(`/edit-listing/${listing.id}`)} className='p-2 border border-[#2B2118]/20 rounded-lg hover:bg-[#FFF8EF] hover:text-orange-600 transition'>
                                                <Edit className='size-4' />
                                            </button>
                                            <button onClick={() => toggleStatus(listing.id)} className='p-2 border border-[#2B2118]/20 rounded-lg hover:bg-[#FFF8EF] hover:text-orange-600 transition'>
                                                {listing.status === 'active' && <EyeOffIcon className='size-4' />}
                                                {listing.status !== 'active' && <EyeIcon className='size-4' />}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {showCredentialSubmission && <CredentialSubmission listing={showCredentialSubmission} onClose={() => setShowCredentialSubmission(null)} />}
            {showWithdrawal && <WithdrawModal onClose={() => setShowWithdrawal(null)} />}

            {/* Footer */}
            <div className='border-t border-[#2B2118]/15 p-4 text-center mt-28'>
                <p className='text-sm text-[#5C4E3F]'>
                    © {new Date().getFullYear()} <span className='text-orange-600'> SellUp Marketplace</span> All rights reserved.
                </p>
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

/* ------ Common Components ------ */
const StatCard = ({ title, value, icon, color }) => {
    const colorMap = { orange: 'bg-orange-100', green: 'bg-green-100', yellow: 'bg-yellow-100' };
    return (
        <div className='bg-white rounded-2xl border-2 border-[#2B2118] shadow-[4px_4px_0px_0px_#2B2118] p-6'>
            <div className='flex items-center justify-between'>
                <div>
                    <p className='text-sm font-medium text-[#5C4E3F]'>{title}</p>
                    <p className='text-2xl font-bold text-[#2B2118]'>{value}</p>
                </div>
                <div className={`size-12 ${colorMap[color]} rounded-full flex items-center justify-center`}>{icon}</div>
            </div>
        </div>
    );
};

export default MyListings;