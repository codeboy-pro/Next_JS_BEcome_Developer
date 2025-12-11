import { HomeIcon, Star, ArrowRight, Code, Palette, Zap, Globe, Sparkles } from "lucide-react"

export default function Home() {
  const features = [
    {
      icon: Code,
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
      title: "Modern Code",
      desc: "Built with the latest technologies for optimal performance.",
    },
    {
      icon: Palette,
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/10",
      title: "Beautiful Design",
      desc: "Stunning UI components styled with Tailwind CSS.",
    },
    {
      icon: Zap,
      color: "text-amber-400",
      bgColor: "bg-amber-500/10",
      title: "Fast & Efficient",
      desc: "Lightning-fast loading and smooth user experience.",
    },
    {
      icon: Globe,
      color: "text-cyan-400",
      bgColor: "bg-cyan-500/10",
      title: "Global Reach",
      desc: "Accessible worldwide with a fully responsive layout.",
    },
  ]

  return (
    <div className="min-h-screen bg-[#09090b] text-white overflow-hidden">
      {/* Background ambient glow effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-cyan-500/8 rounded-full blur-3xl" />
      </div>

      {/* Subtle grid overlay */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Hero Section */}
      <div className="relative min-h-screen flex justify-center items-center">
        <div className="flex flex-col justify-center items-center text-center px-4 max-w-4xl mx-auto">
          {/* Badge */}
          <div className="mb-8 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-zinc-400">Built with Next.js & Tailwind</span>
          </div>

          <div className="flex items-center mb-6">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 mr-4 shadow-lg shadow-blue-500/20">
              <HomeIcon className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-transparent">
              Welcome Home
            </h1>
          </div>

          <p className="text-zinc-400 text-lg md:text-xl max-w-2xl leading-relaxed mb-10">
            This clean and modern website is built with Next.js and Tailwind CSS. Perfect for developers creating
            beautiful web experiences.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button className="group bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white text-lg font-medium rounded-xl px-8 py-4 flex items-center justify-center transition-all duration-300 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 hover:scale-105">
              <Star className="w-5 h-5 mr-2" />
              Get Started
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 text-white text-lg font-medium rounded-xl px-8 py-4 flex items-center justify-center transition-all duration-300">
              Learn More
            </button>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-zinc-600">
            <span className="text-sm">Scroll to explore</span>
            <div className="w-6 h-10 rounded-full border-2 border-zinc-700 flex justify-center pt-2">
              <div className="w-1.5 h-3 bg-zinc-600 rounded-full animate-bounce" />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative py-32 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-transparent">
              Why Choose Us?
            </h2>
            <p className="text-zinc-500 text-lg max-w-xl mx-auto">
              Discover the features that set us apart from the rest
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <div
                key={i}
                className="group relative p-6 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-sm hover:bg-white/[0.05] hover:border-white/10 transition-all duration-300"
              >
                <div
                  className={`w-14 h-14 rounded-xl ${feature.bgColor} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}
                >
                  <feature.icon className={`w-7 h-7 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
                <p className="text-zinc-500 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative py-32 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative p-12 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.03] to-transparent backdrop-blur-sm overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-cyan-500/5" />
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Ready to Get Started?</h2>
              <p className="text-zinc-400 mb-8 max-w-lg mx-auto">
                Join thousands of developers building amazing experiences with our platform.
              </p>
              <button className="bg-white text-zinc-900 hover:bg-zinc-100 font-semibold rounded-xl px-8 py-4 transition-all duration-300 hover:scale-105">
                Start Building Today
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500">
              <HomeIcon className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold">MyWebsite</span>
          </div>
          <p className="text-zinc-600 text-sm">© 2025 MyWebsite. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
