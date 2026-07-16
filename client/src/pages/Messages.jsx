import { useState, useMemo, useEffect } from "react";
import { MessageCircle, Search } from "lucide-react";
import { format, isToday, isYesterday, parseISO } from "date-fns";
import { setChat } from "../app/features/chatSlice";
import { useDispatch } from "react-redux";
import api from "../configs/axios";
import { useAuth, useUser } from "@clerk/clerk-react";
import { toast } from "react-hot-toast";

export default function Messages() {
    const dispatch = useDispatch();
    const { user, isLoaded } = useUser();
    const { getToken } = useAuth();

    const [chats, setChats] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);

    const formatTime = (dateString) => {
        if (!dateString) return "";

        const date = parseISO(dateString);

        if (isToday(date)) {
            return "Today " + format(date, "HH:mm");
        }

        if (isYesterday(date)) {
            return "Yesterday " + format(date, "HH:mm");
        }

        return format(date, "MMM d");
    };

    const filteredChats = useMemo(() => {
        const query = searchQuery.toLowerCase();
        return chats.filter((chat) => {

            const chatUser = chat.chatUserId === user?.id ? chat?.ownerUser : chat?.chatUser;

            return chat.listing?.title?.toLowerCase().includes(query) || chatUser?.name?.toLowerCase().includes(query)
        }
        );
    }, [chats, searchQuery]);

    const handleOpenChat = (chat) => {
        dispatch(setChat({ listing: chat.listing, chatId: chat.id }));
    };

    const fetchUserChats = async () => {
        try {

            const token = await getToken();
            const { data } = await api.get("/api/chat/user", { headers: { Authorization: `Bearer ${token}` } });
            setChats(data.chats);
            setLoading(false);

        } catch (error) {
            toast.error(error?.response?.data?.message || error.message);
            console.log(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user && isLoaded) {
            fetchUserChats();
            const interval = setInterval(() => {
                fetchUserChats();
            }, 10*1000);
            return () => clearInterval(interval);
        }
    }, [user, isLoaded]);

    return (
        <div className="rethink mx-auto min-h-screen px-6 md:px-16 lg:px-24 xl:px-32 bg-[#FFF8EF]">
            <div className="py-10">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-[#2B2118] mb-2">Messages</h1>
                    <p className="text-[#5C4E3F]">Chat with buyers and sellers</p>
                </div>

                {/* Search */}
                <div className="relative max-w-xl mb-8">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#B8A98F] w-5 h-5" />
                    <input type="text" placeholder="Search conversations..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2 border-2 border-[#2B2118] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-orange-300" />
                </div>

                {/* Chat List */}
                {loading ? (
                    <div className="text-center text-[#5C4E3F] py-20">Loading messages...</div>
                ) : filteredChats.length === 0 ? (
                    <div className="bg-white rounded-2xl border-2 border-[#2B2118] shadow-[4px_4px_0px_0px_#2B2118] p-16 text-center">
                        <div className="w-16 h-16 bg-[#FFF1DD] rounded-full flex items-center justify-center mx-auto mb-4">
                            <MessageCircle className="w-8 h-8 text-orange-500" />
                        </div>
                        <h3 className="text-xl font-semibold text-[#2B2118] mb-2">{searchQuery ? "No chats found" : "No messages yet"}</h3>
                        <p className="text-[#5C4E3F]">{searchQuery ? "Try a different search term" : 'Start a conversation by viewing a listing and clicking "Chat with Seller"'}</p>
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl border-2 border-[#2B2118] shadow-[4px_4px_0px_0px_#2B2118] divide-y divide-[#EFE3D0] overflow-hidden">
                        {filteredChats.map((chat) => {
                            const chatUser = chat.chatUserId === user?.id ? chat.ownerUser : chat.chatUser;
                            return (
                                <button key={chat.id} onClick={() => handleOpenChat(chat)} className="w-full p-4 hover:bg-[#FFF8EF] transition-colors text-left">
                                    <div className="flex items-start space-x-4">
                                        <div className="flex-shrink-0">
                                            <img src={chatUser?.image || "/default-avatar.png"} alt={chat?.chatUser?.name} className="w-12 h-12 rounded-lg object-cover border border-[#2B2118]/10" />
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between mb-1">
                                                <h3 className="font-semibold text-[#2B2118] truncate">{chat.listing?.title || "Deleted Listing"}</h3>
                                                <span className="text-xs text-[#B8A98F] flex-shrink-0 ml-2">{formatTime(chat.updatedAt)}</span>
                                            </div>
                                            <p className="text-sm text-[#5C4E3F] truncate mb-1">{chatUser?.name || "Unknown User"}</p>
                                            <p className={`text-sm truncate ${!chat.isLastMessageRead && chat.lastMessageSenderId !== user?.id ? "text-orange-600 font-medium" : "text-[#5C4E3F]"}`}>{chat.lastMessage || "No messages yet"}</p>
                                        </div>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                )}
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
}