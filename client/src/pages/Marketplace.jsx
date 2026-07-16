import { useSelector } from "react-redux";
import FilterSidebar from "../components/FilterSidebar";
import ListingCard from "../components/ListingCard";
import { ArrowLeftIcon, FilterIcon } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";

const Marketplace = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const search = searchParams.get("search");

    const { listings } = useSelector((state) => state.listing);
    const [filters, setFilters] = useState({
        platform: null,
        maxPrice: 100000,
        minFollowers: 0,
        niche: null,
        verified: false,
        monetized: false,
    });
    const [showFilterPhone, setShowFilterPhone] = useState(false);

    const filteredListings = listings.filter((listing) => {
        if (filters.platform && filters.platform.length > 0) {
            if (!filters.platform.includes(listing.platform)) return false;
        }

        if (filters.maxPrice) {
            if (listing.price > filters.maxPrice) return false;
        }

        if (filters.minFollowers) {
            if (listing.followers_count < filters.minFollowers) return false;
        }

        if (filters.niche && filters.niche.length > 0) {
            if (!filters.niche.includes(listing.niche)) return false;
        }

        if (filters.verified && listing.verified !== filters.verified) return false;

        if (filters.monetized && listing.monetized !== filters.monetized) return false;

        if (search) {
            const trimed = search.trim();
            if (
                !listing.title.toLowerCase().includes(trimed.toLowerCase()) &&
                !listing.username.toLowerCase().includes(trimed.toLowerCase()) &&
                !listing.description.toLowerCase().includes(trimed.toLowerCase()) &&
                !listing.platform.toLowerCase().includes(trimed.toLowerCase()) &&
                !listing.niche.toLowerCase().includes(trimed.toLowerCase())
            )
                return false;
        }

        return true;
    });

    return (
        <div className="rethink px-6 md:px-16 lg:px-24 xl:px-32 bg-[#FFF8EF] min-h-screen">
            <div className="flex items-center justify-between text-[#5C4E3F]">
                <button onClick={() => { navigate("/"); scrollTo(0, 0); }} className="flex items-center gap-2 py-5 hover:text-orange-600 transition" >
                    <ArrowLeftIcon className="size-4" /> Back to Home
                </button>
                <button onClick={()=>setShowFilterPhone(true)} className="flex sm:hidden items-center gap-2 py-5 hover:text-orange-600 transition">
                    <FilterIcon className="size-4" /> Filters
                </button>
            </div>

            <div className="relative flex items-start justify-between gap-8 pb-8">
                <FilterSidebar setFilters={setFilters} filters={filters} setShowFilterPhone={setShowFilterPhone} showFilterPhone={showFilterPhone} />
                <div className="flex-1 grid xl:grid-cols-2 gap-4">
                    {filteredListings.sort((a, b) => a.featured ? -1 : b.featured ? 1 : 0).map((listing, index) => (
                        <div
                            key={index}
                            className="rounded-2xl border-2 border-[#2B2118] bg-white shadow-[4px_4px_0px_0px_#2B2118] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_#2B2118] transition-all"
                        >
                            <ListingCard listing={listing} />
                        </div>
                    ))}
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

export default Marketplace;