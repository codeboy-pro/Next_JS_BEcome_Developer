import { Mail, Phone, MapPin, Send, MessageSquare } from "lucide-react"

const Contact = () => {
  const contactInfo = [
    { icon: Mail, title: "Email", lines: ["hello@example.com", "support@example.com"] },
    { icon: Phone, title: "Phone", lines: ["+1 (555) 123-4567", "+1 (555) 987-6543"] },
    { icon: MapPin, title: "Location", lines: ["123 Innovation Street", "San Francisco, CA 94102"] },
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

      {/* Contact Section */}
      <div className="relative py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left - Contact Form */}
            <div>
              <div className="mb-6 inline-flex px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm items-center gap-2">
                <MessageSquare className="w-4 h-4 text-cyan-400" />
                <span className="text-sm text-zinc-400">Get in touch</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-transparent">
                Contact Us
              </h1>

              <p className="text-zinc-400 leading-relaxed mb-8">
                Have a question or want to work together? We would love to hear from you. Send us a message and we will
                respond as soon as possible.
              </p>

              {/* Form */}
              <form className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-zinc-400 mb-2">First Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-white/[0.02] border border-white/5 rounded-xl focus:outline-none focus:border-cyan-500/50 transition-colors text-white placeholder-zinc-600"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-zinc-400 mb-2">Last Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-white/[0.02] border border-white/5 rounded-xl focus:outline-none focus:border-cyan-500/50 transition-colors text-white placeholder-zinc-600"
                      placeholder="Doe"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-zinc-400 mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 bg-white/[0.02] border border-white/5 rounded-xl focus:outline-none focus:border-cyan-500/50 transition-colors text-white placeholder-zinc-600"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm text-zinc-400 mb-2">Subject</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-white/[0.02] border border-white/5 rounded-xl focus:outline-none focus:border-cyan-500/50 transition-colors text-white placeholder-zinc-600"
                    placeholder="How can we help?"
                  />
                </div>
                <div>
                  <label className="block text-sm text-zinc-400 mb-2">Message</label>
                  <textarea
                    rows={5}
                    className="w-full px-4 py-3 bg-white/[0.02] border border-white/5 rounded-xl focus:outline-none focus:border-cyan-500/50 transition-colors text-white placeholder-zinc-600 resize-none"
                    placeholder="Your message..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Send Message
                </button>
              </form>
            </div>

            {/* Right - Contact Info */}
            <div className="space-y-6">
              {/* Contact Info Card */}
              <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-sm">
                <h2 className="text-xl font-semibold text-white mb-6">Contact Information</h2>
                <div className="space-y-6">
                  {contactInfo.map((item, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-white/10 flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-5 h-5 text-cyan-400" />
                      </div>
                      <div>
                        <h3 className="font-medium text-white mb-1">{item.title}</h3>
                        {item.lines.map((line, j) => (
                          <p key={j} className="text-zinc-500">
                            {line}
                          </p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Visual Element - matching about page style */}
              <div className="aspect-video rounded-2xl border border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent backdrop-blur-sm overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-cyan-500/10" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
                      <Mail className="w-8 h-8 text-white" />
                    </div>
                    <p className="text-zinc-500">We respond within 24 hours</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
