import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, Zap, MessageSquare, Clock } from "lucide-react";
import { SignInButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";

export default async function Home() {
  const user = await currentUser();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 relative overflow-hidden">
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-10 [background-image:linear-gradient(to_right,#0284c7_1px,transparent_1px),linear-gradient(to_bottom,#0284c7_1px,transparent_1px)] bg-[size:40px_40px]" />
      
      {/* Floating bubbles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-blue-200/20"
            style={{
              width: `${Math.random() * 300 + 100}px`,
              height: `${Math.random() * 300 + 100}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              filter: 'blur(40px)',
              transform: `translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px)`
            }}
          />
        ))}
      </div>

      {/* Content Layer */}
      <div className="relative z-10">
        {/* Navigation */}
        <nav className="fixed w-full bg-white/10 backdrop-blur-md border-b border-blue-100/20 shadow-sm z-50">
  <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
    <Link href="/" className="flex items-center gap-2">
      <div className="w-10 h-10 rounded-lg bg-blue-600/90 flex items-center justify-center backdrop-blur-sm">
        <Sparkles className="h-5 w-5 text-white" />
      </div>
      <span className="text-xl font-semibold text-blue-900/90">ContentAI</span>
    </Link>
    
    <div>
      {!user ? (
        <SignInButton mode="modal">
          <Button variant="outline" className="border-blue-600/70 text-blue-600/90 hover:bg-blue-600/10 hover:border-blue-600/90 transition-colors backdrop-blur-sm">
            Sign In
          </Button>
        </SignInButton>
      ) : (
        <Link href="/dashboard">
          <Button className="bg-blue-600/90 hover:bg-blue-700/90 transition-colors shadow-md backdrop-blur-sm">
            Dashboard
          </Button>
        </Link>
      )}
    </div>
  </div>
</nav>

        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] text-center px-6">
          <div className="space-y-8 max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md px-4 py-2.5 rounded-full text-sm font-medium shadow-sm border border-blue-100">
              <Sparkles className="h-4 w-4 text-blue-600" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
                AI-Powered Content Generation
              </span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-blue-900 leading-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
                Create engaging content
              </span><br />
              in seconds with AI
            </h1>
            
            <p className="text-xl text-blue-800/80 max-w-2xl mx-auto">
              Transform your ideas into polished content using our advanced AI templates. Perfect for marketers, writers, and content creators.
            </p>

            <div className="flex justify-center gap-4 pt-2">
  <Link href={"/dashboard"}>
    <Button className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-6 shadow-lg hover:shadow-blue-600/20 transition-all duration-300 group flex items-center cursor-pointer">
      Get Started
      <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
    </Button>
  </Link>
</div>
          </div>
        </section>

        {/* Features Section */}
        <section className="max-w-7xl mx-auto px-6 py-24">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap className="h-6 w-6 text-blue-600" />,
                title: "Lightning Fast",
                description: "Generate high-quality content in seconds, not hours"
              },
              {
                icon: <MessageSquare className="h-6 w-6 text-blue-600" />,
                title: "Smart Templates",
                description: "Choose from a variety of AI-powered content templates"
              },
              {
                icon: <Clock className="h-6 w-6 text-blue-600" />,
                title: "Time Saving",
                description: "Focus on what matters while AI handles the content"
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="flex flex-col items-center text-center p-8 rounded-2xl bg-white/80 backdrop-blur-sm border border-blue-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-1"
              >
                <div className="h-14 w-14 bg-blue-100/50 rounded-xl flex items-center justify-center mb-5 border border-blue-200/50">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-blue-900">{feature.title}</h3>
                <p className="text-blue-800/80">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-blue-100 py-10 text-center bg-white/80 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6">
            <p className="text-blue-800/70">© 2024 ContentAI. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}