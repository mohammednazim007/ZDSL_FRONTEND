"use client";
/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa6";
import dateIcon from "@/assets/icons/carrer/jobPostDate.svg";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

const ShowComments = ({ comments, setIsModalOpen, setSelectedCommentId, blogTitle, blogUrl }: any) => {
    const [visibleReplies, setVisibleReplies] = useState<{ [key: string]: number }>({});

    const encodedTitle = encodeURIComponent(blogTitle);
    const encodedUrl = encodeURIComponent(blogUrl);

    // Social Media Share Links
    const shareLinks = {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
        twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
        linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`,
    };

    const handleReply = (id: any) => {
        setIsModalOpen((prevState: any) => !prevState);
        setSelectedCommentId(id);
    };

    // Handle "View more replies" click for specific comments
    const handleViewMore = (commentId: string) => {
        setVisibleReplies((prev) => ({
            ...prev,
            [commentId]: (prev[commentId] || 1) + 1, // Show 1 more reply for this comment
        }));
    };

    return (
        <div className="py-4">
            {/* Share with social media */}
            <div className="border border-[#DEE4E8] flex items-center p-3 justify-between gap-2 rounded-sm">
                <div>
                    <h6 className="text-black font-semibold text-[14px]">Comments - {comments?.length || 0}</h6>
                </div>
                <div className="flex items-center justify-center space-x-4">
                    <h6 className="text-black font-semibold text-[14px]">Share Post</h6>
                    <div className="flex space-x-3">
                        <Link href={shareLinks?.facebook} target="_blank" aria-label="Share on Facebook">
                            <FaFacebookF className="text-[#063354] cursor-pointer hover:text-blue-700" />
                        </Link>
                        <Link href={shareLinks?.twitter} target="_blank" aria-label="Share on Twitter">
                            <FaTwitter className="text-[#063354] cursor-pointer hover:text-blue-400" />
                        </Link>
                        <Link href={shareLinks?.linkedin} target="_blank" aria-label="Share on LinkedIn">
                            <FaLinkedinIn className="text-[#063354] cursor-pointer hover:text-blue-600" />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Comments Section */}
            {comments?.map((comment: any, index: number) => {
                const formattedDate = new Date(Number(comment?.createdAt)).toLocaleString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                });

                // Track visible replies for each comment
                const visibleCount = visibleReplies[comment.id] || 1;
                const remainingReplies = (comment?.replies?.length || 0) - visibleCount;

                return (
                    <div>
                        <div key={index} className="mt-14 p-3 rounded-sm border border-[#DEE4E8]">
                            {/* User Info */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className="w-12 h-12 overflow-hidden rounded-full">
                                        <Image
                                            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                                            alt="User Image"
                                            width={48}
                                            height={48}
                                        />
                                    </div>
                                    <h2 className="ml-3 font-semibold text-gray-800">
                                        {comment?.firstName} {comment?.lastName}
                                    </h2>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Image className="w-[17px] h-[17px]" src={dateIcon} alt="Date Icon" />
                                    <h2 className="text-[14px] text-gray-500">{formattedDate}</h2>
                                </div>
                            </div>

                            {/* Comment Content */}
                            <p className="mt-3 text-[12px] md:text-[14px] text-gray-700">{comment?.content}</p>



                            <div className="flex items-center justify-between ">
                                {/* View More Replies */}
                                {remainingReplies > 0 ? (
                                    <h4
                                        className="text-[14px] text-gray-600 cursor-pointer mt-3 ml-8"
                                        onClick={() => handleViewMore(comment.id)}
                                    >
                                        View more <strong className="font-semibold">{remainingReplies}</strong> replies
                                    </h4>
                                ) : "Replies"}

                                {/* Reply Button */}
                                <div className="mt-3">
                                    <button
                                        className="px-5 py-1.5 text-white font-medium"
                                        style={{ background: "linear-gradient(360deg, #E59F00 0%, #F3C65D 100%)" }}
                                        onClick={() => handleReply(comment?.id)}
                                    >
                                        Reply
                                    </button>
                                </div>
                            </div>

                        </div>


                        {/* replies */}
                        {comment?.replies?.slice(0, visibleCount).map((reply: any, replyIndex: number) => {
                            const replyDate = new Date(Number(reply?.createdAt)).toLocaleString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                            });

                            return (
                                <motion.div
                                    key={replyIndex}
                                    initial={{ opacity: 0, y: 50 }}  // Start from invisible and lower position
                                    animate={{ opacity: 1, y: 0 }}  // Animate to visible and original position
                                    transition={{ duration: 0.5, ease: "easeOut" }}  // Smooth animation
                                    className="border border-[#DEE4E8] mt-3 ml-8 p-3 bg-[#f0f8fb] rounded-sm"
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <div className="w-12 h-12 overflow-hidden rounded-full">
                                                <Image
                                                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                                                    alt="User Image"
                                                    width={48}
                                                    height={48}
                                                />
                                            </div>
                                            <h2 className="ml-4">{reply?.firstName} {reply?.lastName}</h2>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Image className="w-[17px] h-[17px]" src={dateIcon} alt="Date Icon" />
                                            <h2 className="text-[14px]">{replyDate}</h2>
                                        </div>
                                    </div>
                                    <p className="mt-2">{reply?.content}</p>
                                </motion.div>
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );
};

export default ShowComments;
