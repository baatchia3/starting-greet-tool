import { Mail, MessageSquare, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import Navbar from "@/components/Navbar";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    // Reset form
    setFormData({ name: "", email: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-foreground mb-6">Get in Touch</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Have questions, feedback, or suggestions? We'd love to hear from you.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-card/80 backdrop-blur-md rounded-lg p-8 border border-border">
              <div className="flex items-center space-x-2 mb-6">
                <MessageSquare className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold text-foreground">Send us a message</h2>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    Name
                  </label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Email
                  </label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us what's on your mind..."
                    rows={6}
                    required
                  />
                </div>
                
                <Button type="submit" className="w-full">
                  <Send className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div className="bg-card/80 backdrop-blur-md rounded-lg p-8 border border-border">
                <div className="flex items-center space-x-2 mb-4">
                  <Mail className="h-6 w-6 text-primary" />
                  <h3 className="text-xl font-bold text-foreground">Email Us</h3>
                </div>
                <p className="text-muted-foreground mb-2">
                  For general inquiries and support:
                </p>
                <a 
                  href="mailto:hello@todoflow.app" 
                  className="text-primary hover:underline font-medium"
                >
                  hello@todoflow.app
                </a>
              </div>

              <div className="bg-card/80 backdrop-blur-md rounded-lg p-8 border border-border">
                <h3 className="text-xl font-bold text-foreground mb-4">Frequently Asked Questions</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-foreground mb-1">How do I delete completed tasks?</h4>
                    <p className="text-sm text-muted-foreground">
                      Click the trash icon next to any completed task to remove it permanently.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-1">Is my data saved?</h4>
                    <p className="text-sm text-muted-foreground">
                      Yes, your tasks are automatically saved in your browser's local storage.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-1">Can I use keyboard shortcuts?</h4>
                    <p className="text-sm text-muted-foreground">
                      Press Enter in the input field to quickly add a new task.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
