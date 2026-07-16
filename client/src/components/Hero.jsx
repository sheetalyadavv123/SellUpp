import React from 'react'
import { useNavigate } from 'react-router-dom'

const Hero = () => {

    const navigate = useNavigate()
    const [input, setInput] = React.useState('')

    const onSubmitHandler = (e) => {
        e.preventDefault()
        navigate(`/marketplace?search=${input}`)
    }

    return (
        <>
            <div className="rethink relative overflow-hidden bg-[#FFF8EF] text-[#2B2118]">

                {/* Warm decorative blobs */}
                <div className="pointer-events-none absolute -top-32 right-0 h-96 w-96 rounded-full bg-orange-200/60 blur-3xl" />
                <div className="pointer-events-none absolute bottom-0 -left-32 h-80 w-80 rounded-full bg-rose-200/50 blur-3xl" />
                <div className="pointer-events-none absolute top-1/3 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-amber-100/70 blur-3xl" />

                <div className="relative px-4 md:px-16 lg:px-24 xl:px-40 pt-20 md:pt-28 pb-20 flex flex-col items-center text-center">

                    <span className="inline-flex items-center gap-2 text-xs font-semibold bg-[#2B2118] text-[#FFF8EF] px-4 py-1.5 rounded-full">
                        ⭐ 10,000+ happy traders
                    </span>

                    <h1 className="text-4xl md:text-6xl font-bold mt-6 leading-[1.05] tracking-tight max-w-3xl">
                        Trade Social Profiles
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-rose-500 to-amber-500">
                            Like a Marketplace
                        </span>
                    </h1>

                    <p className="text-[#5C4E3F] text-base md:text-lg mt-5 max-w-xl">
                        Buy and sell Instagram, YouTube, Twitter and Telegram accounts — verified, secure, and fast.
                    </p>

                    {/* Search Box */}
                    <form onSubmit={onSubmitHandler} className="mt-8 flex w-full max-w-md rounded-full border-2 border-[#2B2118] bg-white overflow-hidden shadow-[4px_4px_0px_0px_#2B2118]">
                        <input
                            onChange={e => setInput(e.target.value)}
                            value={input}
                            type="text"
                            placeholder="Search Instagram account"
                            className="flex-1 px-5 py-3 outline-none text-sm bg-transparent"
                        />
                        <button className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-6 transition cursor-pointer">
                            Search
                        </button>
                    </form>

                    <div className="flex items-center gap-3 mt-8">
                        <div className="flex -space-x-3">
                            <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200" alt="user3" className="size-9 object-cover rounded-full border-2 border-[#FFF8EF] ring-1 ring-[#2B2118]/20" />
                            <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200" alt="user1" className="size-9 object-cover rounded-full border-2 border-[#FFF8EF] ring-1 ring-[#2B2118]/20" />
                            <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200" alt="user2" className="size-9 object-cover rounded-full border-2 border-[#FFF8EF] ring-1 ring-[#2B2118]/20" />
                            <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200" alt="user3" className="size-9 object-cover rounded-full border-2 border-[#FFF8EF] ring-1 ring-[#2B2118]/20" />
                            <img src="https://randomuser.me/api/portraits/men/75.jpg" alt="user5" className="size-9 rounded-full border-2 border-[#FFF8EF] ring-1 ring-[#2B2118]/20" />
                        </div>
                        <div className="flex">
                            {Array(5).fill(0).map((_, i) => (
                                <svg key={i} xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="fill-orange-500 text-transparent" aria-hidden="true"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path></svg>
                            ))}
                        </div>
                    </div>

                    {/* Floating account cards */}
                    <div className="hidden md:flex gap-6 mt-14">
                        <div className="rounded-2xl border-2 border-[#2B2118] bg-white p-4 -rotate-3 shadow-[4px_4px_0px_0px_#2B2118] w-52">
                            <div className="flex items-center gap-3">
                                <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200" alt="account" className="size-10 rounded-full object-cover" />
                                <div className="text-left">
                                    <p className="font-semibold text-xs">@travel.diaries</p>
                                    <p className="text-[11px] text-[#5C4E3F]">120K · Instagram</p>
                                </div>
                            </div>
                            <p className="text-lg font-bold text-orange-600 mt-2">$450</p>
                        </div>

                        <div className="rounded-2xl border-2 border-[#2B2118] bg-white p-4 rotate-2 shadow-[4px_4px_0px_0px_#2B2118] w-52 mt-6">
                            <div className="flex items-center gap-3">
                                <img src="https://randomuser.me/api/portraits/men/75.jpg" alt="account" className="size-10 rounded-full object-cover" />
                                <div className="text-left">
                                    <p className="font-semibold text-xs">@tech.reviews</p>
                                    <p className="text-[11px] text-[#5C4E3F]">80K · YouTube</p>
                                </div>
                            </div>
                            <p className="text-lg font-bold text-orange-600 mt-2">$310</p>
                        </div>
                    </div>
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
        </>
    );
}

export default Hero