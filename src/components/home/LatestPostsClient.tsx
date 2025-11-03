"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Clock, Tag, Sparkles, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/blog";

export interface BlogFrontmatter {
  title: string;
  date: string;
  summary: string;
  tags?: string[];
  image?: string;
  featured?: boolean;
}

export interface BlogPost {
  slug: string;
  readingTime: string;
  frontmatter: BlogFrontmatter;
}

interface LatestPostsClientProps {
  posts: BlogPost[];
}

export default function LatestPostsClient({ posts }: LatestPostsClientProps) {
  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute top-1/4 -right-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 -left-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16 space-y-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4"
          >
            <Sparkles className="w-4 h-4" />
            <span>Latest Writings</span>
          </motion.div>

          {/* Icon like Featured Projects */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center"
          >
            <svg
              className="w-8 h-8 sm:w-10 sm:h-10 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </motion.div>

          {/* Title - Centered */}
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-center">
            From the{" "}
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Blog
            </span>
          </h2>
          
          <p className="text-base sm:text-lg text-muted-foreground mt-4 max-w-2xl mx-auto text-center">
            Thoughts on cybersecurity, CTF writeups, and technical deep dives
          </p>

          {/* Swipe hint */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center items-center gap-2 text-sm text-muted-foreground mt-4"
          >
            <span>Swipe to explore</span>
            <ChevronRight className="w-5 h-5 animate-pulse" />
          </motion.div>
        </motion.div>

        {/* Posts - Horizontal Scroll for ALL devices */}
        {posts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
              <Sparkles className="w-10 h-10 text-muted-foreground" />
            </div>
            <p className="text-lg text-muted-foreground mb-4">
              No posts yet. Stay tuned!
            </p>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-primary hover:underline"
            >
              Explore Blog
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        ) : (
          <>
            {/* Horizontal Scroll Container - Mobile & Desktop */}
            <div className="relative">
              <div className="flex gap-4 md:gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 md:-mx-8 md:px-8">
                {posts.map((post, index) => (
                  <motion.article
                    key={post.slug}
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex-shrink-0 w-[85vw] sm:w-[420px] md:w-[460px] lg:w-[480px] snap-start"
                  >
                    <BlogPostCard post={post} />
                  </motion.article>
                ))}
              </div>

              {/* Scroll indicator dots */}
              <div className="flex justify-center gap-2 mt-4">
                {posts.map((_, index) => (
                  <div
                    key={index}
                    className="w-2 h-2 rounded-full bg-primary/30"
                  />
                ))}
              </div>
            </div>
          </>
        )}

        {/* View All Link */}
        {posts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-12"
          >
            <Link href="/blog">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-xl bg-primary text-primary-foreground font-semibold hover:shadow-lg hover:shadow-primary/50 transition-all group"
              >
                <span>View All Posts</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </Link>
          </motion.div>
        )}
      </div>

      {/* Custom scrollbar hide */}
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}

// Reusable Blog Post Card Component
function BlogPostCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`} className="block group h-full">
      <motion.div
        whileHover={{ y: -8, scale: 1.02 }}
        transition={{ duration: 0.3 }}
        className="h-full rounded-2xl border border-border bg-gradient-to-br from-card via-card to-primary/5 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 relative overflow-hidden"
      >
        {/* Animated gradient overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          initial={false}
        />

        {/* Shine effect on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
        />

        {/* Image */}
        {post.frontmatter.image && (
          <div className="relative w-full h-48 sm:h-56 overflow-hidden bg-muted">
            <Image
              src={post.frontmatter.image}
              alt={post.frontmatter.title}
              fill
              sizes="(max-width: 768px) 85vw, 500px"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              priority={post.frontmatter.featured}
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {post.frontmatter.featured && (
              <div className="absolute top-4 left-4 z-10">
                <Badge className="bg-primary text-primary-foreground shadow-lg backdrop-blur-sm">
                  <Sparkles className="w-3 h-3 mr-1" />
                  Featured
                </Badge>
              </div>
            )}
          </div>
        )}

        {/* Content */}
        <div className="relative p-6 space-y-4">
          {/* Tags */}
          {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.frontmatter.tags.slice(0, 2).map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="px-2.5 py-1 text-xs font-medium hover:bg-primary/20 transition-colors"
                >
                  <Tag className="w-3 h-3 mr-1" />
                  {tag}
                </Badge>
              ))}
              {post.frontmatter.tags.length > 2 && (
                <Badge variant="secondary" className="px-2.5 py-1 text-xs">
                  +{post.frontmatter.tags.length - 2}
                </Badge>
              )}
            </div>
          )}

          {/* Title */}
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight line-clamp-2 group-hover:text-primary transition-colors min-h-[3.5rem]">
            {post.frontmatter.title}
          </h3>

          {/* Summary */}
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed line-clamp-2 min-h-[2.5rem]">
            {post.frontmatter.summary}
          </p>

          {/* Meta Info */}
          <div className="flex items-center justify-between pt-4 border-t border-border/50">
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{formatDate(post.frontmatter.date)}</span>
                <span className="sm:hidden">{new Date(post.frontmatter.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>{post.readingTime}</span>
              </div>
            </div>

            {/* Read More Arrow */}
            <div className="flex items-center gap-1 text-primary font-medium group-hover:gap-2 transition-all">
              <span className="text-sm hidden sm:inline">Read</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>

        {/* Corner decoration */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-primary/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Featured badge (jika tidak ada image) */}
        {!post.frontmatter.image && post.frontmatter.featured && (
          <div className="absolute top-4 right-4 z-10">
            <Badge className="bg-primary text-primary-foreground shadow-lg">
              <Sparkles className="w-3 h-3 mr-1" />
              Featured
            </Badge>
          </div>
        )}
      </motion.div>
    </Link>
  );
}