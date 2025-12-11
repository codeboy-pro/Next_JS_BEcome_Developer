import { Users, Clock, Rocket } from "lucide-react"

export default function About() {
  const milestones = [
    { year: "2018", title: "The Beginning", desc: "Started with a vision to transform digital experiences." },
    { year: "2020", title: "Growing Strong", desc: "Expanded our team and launched 50+ successful projects." },
    { year: "2022", title: "Global Reach", desc: "Partnered with clients across 20+ countries worldwide." },
    { year: "2024", title: "Industry Leader", desc: "Recognized as a top innovator in web development." },
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

      {/* About Us Section */}
      <div className="relative py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <div className="mb-6 inline-flex px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm items-center gap-2">
                <Users className="w-4 h-4 text-cyan-400" />
                <span className="text-sm text-zinc-400">Get to know us</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-transparent">
                About Us
              </h1>

              <div className="space-y-4 text-zinc-400 leading-relaxed">
                <p>
                  Founded with a mission to bridge the gap between technology and creativity, we have grown into a
                  dynamic team that thrives on challenges and innovation.
                </p>
                <p>
                  Our expertise spans across web development, UI/UX design, and digital strategy. We believe in creating
                  solutions that not only look stunning but also deliver measurable results for our clients.
                </p>
                <p>
                  Every project we take on is an opportunity to push boundaries, learn something new, and deliver
                  excellence. Our commitment to quality has earned us the trust of businesses worldwide.
                </p>
              </div>
            </div>

            {/* Right - Visual Element */}
            <div className="relative">
              <div className="aspect-square rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-transparent backdrop-blur-sm overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-cyan-500/10" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
                      <Rocket className="w-12 h-12 text-white" />
                    </div>
                    <p className="text-zinc-500">Innovation in Motion</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Our Story Timeline */}
      <div className="relative py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-transparent">
              Our Story
            </h2>
            <p className="text-zinc-500 text-lg max-w-xl mx-auto">
              A journey of growth, innovation, and countless successes
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/50 via-cyan-500/50 to-transparent hidden md:block" />

            <div className="space-y-8">
              {milestones.map((milestone, i) => (
                <div key={i} className="relative flex gap-6 md:gap-8">
                  {/* Timeline dot */}
                  <div className="relative z-10 flex-shrink-0">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-white/10 flex items-center justify-center backdrop-blur-sm">
                      <Clock className="w-6 h-6 text-cyan-400" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-6 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-sm hover:bg-white/[0.05] hover:border-white/10 transition-all duration-300">
                    <div className="text-sm text-cyan-400 font-medium mb-2">{milestone.year}</div>
                    <h3 className="text-xl font-semibold text-white mb-2">{milestone.title}</h3>
                    <p className="text-zinc-500">{milestone.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
