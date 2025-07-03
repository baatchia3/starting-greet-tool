import { CheckSquare, Target, Users, Zap } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <CheckSquare className="h-12 w-12 text-primary" />
              <h1 className="text-4xl font-bold text-foreground">About TodoFlow</h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A simple, elegant task management solution designed to help you stay organized and productive.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <div className="bg-card/80 backdrop-blur-md rounded-lg p-6 border border-border">
              <Target className="h-8 w-8 text-primary mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Stay Focused</h3>
              <p className="text-muted-foreground">
                Keep track of your tasks and goals with our intuitive interface designed for clarity and focus.
              </p>
            </div>
            
            <div className="bg-card/80 backdrop-blur-md rounded-lg p-6 border border-border">
              <Zap className="h-8 w-8 text-primary mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Lightning Fast</h3>
              <p className="text-muted-foreground">
                Add, complete, and manage tasks quickly with keyboard shortcuts and smooth interactions.
              </p>
            </div>
            
            <div className="bg-card/80 backdrop-blur-md rounded-lg p-6 border border-border">
              <Users className="h-8 w-8 text-primary mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">For Everyone</h3>
              <p className="text-muted-foreground">
                Whether you're a student, professional, or just organizing daily life, TodoFlow adapts to your needs.
              </p>
            </div>
          </div>

          {/* Mission Statement */}
          <div className="bg-card/80 backdrop-blur-md rounded-lg p-8 border border-border text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">Our Mission</h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              We believe that productivity shouldn't be complicated. TodoFlow is built on the principle that 
              the best task management tool is the one you actually want to use. Simple, beautiful, and effective.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;