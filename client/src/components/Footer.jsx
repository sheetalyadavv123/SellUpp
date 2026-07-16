import { assets } from "../assets/assets";

export default function Footer() {
    return (
        <>  
            <footer className="rethink mt-32 px-6 md:px-16 lg:px-24 xl:px-32 w-full text-sm text-[#5C4E3F] bg-[#FFF8EF] border-t-2 border-[#2B2118] pt-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-14">
                    <div className="sm:col-span-2 lg:col-span-1">
                        <a href="/">
                            <img src={assets.logo} alt="logo" />
                        </a>
                        <p className="text-sm/7 mt-6">SellUp is a social media marketplace. We are the leading social media marketplace that connects brands with their customers With our user-friendly interface.</p>
                    </div>
                    <div className="flex flex-col lg:items-center lg:justify-center">
                        <div className="flex flex-col text-sm space-y-2.5">
                            <h2 className="font-semibold mb-5 text-[#2B2118]">Company</h2>
                            <a className="hover:text-orange-600 transition" href="#">About us</a>
                            <a className="hover:text-orange-600 transition" href="#">Careers<span className="text-xs text-white bg-orange-500 rounded-md ml-2 px-2 py-1">We're hiring!</span></a>
                            <a className="hover:text-orange-600 transition" href="#">Contact us</a>
                            <a className="hover:text-orange-600 transition" href="#">Privacy policy</a>
                        </div>
                    </div>
                    <div>
                        <h2 className="font-semibold text-[#2B2118] mb-5">Subscribe to our newsletter</h2>
                        <div className="text-sm space-y-6 max-w-sm">
                            <p>The latest news, articles, and resources, sent to your inbox weekly.</p>
                            <div className="flex items-center justify-center gap-2 p-2 rounded-md bg-white border border-[#2B2118]/15">
                                <input className="focus:ring-2 ring-orange-500 outline-none w-full max-w-64 py-2 rounded px-2 bg-transparent" type="email" placeholder="Enter your email" />
                                <button className="bg-orange-500 hover:bg-orange-600 px-4 py-2 text-white rounded transition">Subscribe</button>
                            </div>
                        </div>
                    </div>
                </div>
                <p className="py-4 text-center border-t mt-6 border-[#2B2118]/15">
                    Copyright {new Date().getFullYear()} © SellUp All Right Reserved.
                </p>
            </footer>

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
};