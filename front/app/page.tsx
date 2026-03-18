"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Endpoints } from "@/components/shared/Endpoints"
import { Briefcase, Search, ArrowRight, ChevronRight } from "lucide-react"
import { Job } from "@/features/jobs/types"
import JobCard from "@/features/jobs/components/JobCard"
import { CATEGORIES, HOW_IT_WORKS, STATS } from "@/constants"

const Home = () => {
  const [jobs, setJobs] = useState<Job[]>([])
  const [search, setSearch] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}${Endpoints.JOBS}`,
        )
        const data = await res.json()
        setJobs(data.jobs?.slice(0, 6) ?? [])
      } catch {
        setJobs([])
      } finally {
        setIsLoading(false)
      }
    }
    fetchJobs()
  }, [])

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="relative max-w-5xl mx-auto px-6 py-28 text-center">
          <Badge className="mb-6 bg-blue-500/10 text-blue-300 border-blue-500/20 text-xs font-medium px-3 py-1">
            Kazakhstan&apos;s Job Platform 🇰🇿
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 leading-tight">
            Find Your Next
            <span className="text-blue-400"> Opportunity</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-xl mx-auto mb-10">
            Connect with top employers across Kazakhstan. Thousands of jobs
            waiting for the right candidate.
          </p>

          <div className="flex gap-2 max-w-xl mx-auto">
            <div className="relative flex-1">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Job title, skill, or keyword..."
                className="pl-9 bg-white text-gray-900 border-0 h-11"
              />
            </div>
            <Link href={`/jobs${search ? `?q=${search}` : ""}`}>
              <Button className="h-11 px-6 bg-blue-500 hover:bg-blue-600">
                Search
              </Button>
            </Link>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {["React", "Node.js", "Almaty", "Remote", "Finance"].map((tag) => (
              <Link
                key={tag}
                href={`/jobs?q=${tag}`}
                className="text-xs text-slate-400 hover:text-white border border-slate-700 hover:border-slate-500 px-3 py-1 rounded-full transition-colors"
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b bg-white">
        <div className="max-w-5xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-6">
          {STATS.map(({ label, value, icon: Icon }) => (
            <div key={label} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                <Icon size={18} className="text-blue-600" />
              </div>
              <div>
                <p className="text-xl font-bold text-gray-900">{value}</p>
                <p className="text-xs text-gray-500">{label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Browse Categories
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Find roles in your field
            </p>
          </div>
          <Link
            href="/categories"
            className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
          >
            All categories <ChevronRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {CATEGORIES.map(({ label, icon: Icon, count }) => (
            <Link key={label} href={`/jobs?category=${label.toLowerCase()}`}>
              <div className="flex items-center gap-3 p-4 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50/50 transition-all group cursor-pointer">
                <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                  <Icon size={16} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">{label}</p>
                  <p className="text-xs text-gray-400">{count} jobs</p>
                </div>
                <ArrowRight
                  size={14}
                  className="ml-auto text-gray-300 group-hover:text-blue-500 transition-colors"
                />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Latest Jobs</h2>
              <p className="text-sm text-gray-500 mt-1">
                Fresh opportunities this week
              </p>
            </div>
            <Link href="/jobs">
              <Button variant="outline" size="sm" className="gap-1">
                View all <ArrowRight size={14} />
              </Button>
            </Link>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="h-44 rounded-xl bg-gray-200 animate-pulse"
                />
              ))}
            </div>
          ) : jobs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {jobs.map((job) => (
                <JobCard key={job._id} job={job} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-gray-400">
              <Briefcase size={32} className="mx-auto mb-3 opacity-40" />
              <p>No jobs available yet.</p>
              <Link href="/auth">
                <Button variant="outline" size="sm" className="mt-4">
                  Post a job
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-gray-900">How It Works</h2>
          <p className="text-sm text-gray-500 mt-2">
            Three steps to your next role
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {HOW_IT_WORKS.map(({ step, title, desc }) => (
            <div key={step} className="text-center">
              <div className="w-12 h-12 rounded-full bg-blue-600 text-white text-sm font-bold flex items-center justify-center mx-auto mb-4">
                {step}
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-blue-600 text-white">
        <div className="max-w-5xl mx-auto px-6 py-14 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Ready to get started?</h2>
            <p className="text-blue-100 text-sm">
              Join thousands of professionals already using KazJobs.
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            <Link href="/auth">
              <Button className="bg-white text-blue-600 hover:bg-blue-50 font-medium">
                Find a Job
              </Button>
            </Link>
            <Link href="/auth">
              <Button
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10"
              >
                Post a Job
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
