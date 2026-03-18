import {
  Briefcase,
  Building2,
  Users,
  TrendingUp,
  Laptop,
  HeartHandshake,
  BarChart3,
  Wrench,
  GraduationCap,
  ShoppingBag,
} from "lucide-react"

export const STATS = [
  { label: "Active Jobs", value: "1,200+", icon: Briefcase },
  { label: "Companies", value: "340+", icon: Building2 },
  { label: "Job Seekers", value: "8,500+", icon: Users },
  { label: "Placements", value: "2,100+", icon: TrendingUp },
]

export const CATEGORIES = [
  { label: "Technology", icon: Laptop, count: 234 },
  { label: "Finance", icon: BarChart3, count: 118 },
  { label: "Healthcare", icon: HeartHandshake, count: 95 },
  { label: "Engineering", icon: Wrench, count: 142 },
  { label: "Education", icon: GraduationCap, count: 87 },
  { label: "Retail", icon: ShoppingBag, count: 63 },
]

export const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Create Account",
    desc: "Sign up as a job seeker or employer in under a minute.",
  },
  {
    step: "02",
    title: "Find or Post",
    desc: "Browse thousands of listings or post your open role.",
  },
  {
    step: "03",
    title: "Connect",
    desc: "Apply directly or review applicants and move fast.",
  },
]

export const TYPE_COLORS: Record<string, string> = {
  "full-time": "bg-blue-50 text-blue-700",
  "part-time": "bg-amber-50 text-amber-700",
  remote: "bg-emerald-50 text-emerald-700",
}
