import { SignInForm } from "@/components/ui/signin"

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 p-4">
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Left side - Illustration and branding */}
        <div className="relative hidden md:block">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-700">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.2)_0,_transparent_100%)]"></div>
            <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/30 to-transparent"></div>
          </div>

          <div className="relative h-full flex flex-col justify-between p-12 text-white">
            <div>
              <div className="flex items-center mb-8">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path d="M11.7 2.805a.75.75 0 01.6 0A60.65 60.65 0 0122.83 8.72a.75.75 0 01-.231 1.337 49.949 49.949 0 00-9.902 3.912l-.003.002-.34.18a.75.75 0 01-.707 0A50.009 50.009 0 007.5 12.174v-.224c0-.131.067-.248.172-.311a54.614 54.614 0 014.653-2.52.75.75 0 00-.65-1.352 56.129 56.129 0 00-4.78 2.589 1.858 1.858 0 00-.859 1.228 49.803 49.803 0 00-4.634-1.527.75.75 0 01-.231-1.337A60.653 60.653 0 0111.7 2.805z" />
                    <path d="M13.06 15.473a48.45 48.45 0 017.666-3.282c.134 1.414.22 2.843.255 4.285a.75.75 0 01-.46.71 47.878 47.878 0 00-8.105 4.342.75.75 0 01-.832 0 47.877 47.877 0 00-8.104-4.342.75.75 0 01-.461-.71c.035-1.442.121-2.87.255-4.286A48.4 48.4 0 016 13.18v1.27a1.5 1.5 0 00-.14 2.508c-.09.38-.222.753-.397 1.11.452.213.901.434 1.346.661a6.729 6.729 0 00.551-1.608 1.5 1.5 0 00.14-2.67v-.645a48.549 48.549 0 013.44 1.668 2.25 2.25 0 002.12 0z" />
                    <path d="M4.462 19.462c.42-.419.753-.89 1-1.394.453.213.902.434 1.347.661a6.743 6.743 0 01-1.286 1.794.75.75 0 11-1.06-1.06z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold">LearnHub</h2>
              </div>
              <h1 className="text-4xl font-bold mb-4">Welcome back!</h1>
              <p className="text-white/80 text-lg">
                Sign in to continue your learning journey and access your personalized dashboard.
              </p>
            </div>

            <div className="space-y-8">
              <div className="p-6 bg-white/10 backdrop-blur-sm rounded-xl">
                <div className="flex items-start space-x-4">
                  <img src="/placeholder.svg?height=48&width=48" alt="Student" className="w-12 h-12 rounded-full" />
                  <div>
                    <div className="flex items-center">
                      <p className="font-medium">Sarah Johnson</p>
                      <div className="ml-2 px-2 py-0.5 bg-indigo-400/30 rounded-full text-xs">Student</div>
                    </div>
                    <p className="text-white/70 text-sm mt-1">
                      "LearnHub helped me master data science in just 3 months. The interactive courses and supportive
                      community made all the difference!"
                    </p>
                    <div className="flex mt-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-4 h-4 text-yellow-300"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <p className="text-sm text-white/80">Trusted by leading universities and companies worldwide</p>
              <div className="flex items-center space-x-6 mt-3">
                <div className="h-8 w-auto bg-white/20 rounded-md px-3 flex items-center">
                  <span className="font-semibold">Harvard</span>
                </div>
                <div className="h-8 w-auto bg-white/20 rounded-md px-3 flex items-center">
                  <span className="font-semibold">MIT</span>
                </div>
                <div className="h-8 w-auto bg-white/20 rounded-md px-3 flex items-center">
                  <span className="font-semibold">Google</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Form */}
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Sign in to your account</h1>
            <p className="text-gray-600 mt-2">Enter your credentials to access your dashboard</p>
          </div>

          <SignInForm />

          <div className="mt-8 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <a href="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
              Sign up for free
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
