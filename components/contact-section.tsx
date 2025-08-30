import { Mail, Github, Linkedin, Twitter, Globe } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function ContactSection() {
  return (
    <section className="py-12" id="contact">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-white">Contact Us</h2>

        <Card className="max-w-3xl mx-auto contact-section">
          <CardHeader>
            <CardTitle className="text-center">Get in Touch</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Creators Information</h3>
                  <p className="text-muted-foreground">Keerthan M</p>
                  <p className="text-muted-foreground">Hanmanth C</p>
                  <p className="text-muted-foreground">Gururaja K G</p>
                  <p className="text-muted-foreground">Students Of MVJCE</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Contact Details</h3>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    <a href="mailto:keerthanmgowda3@gmail.com" className="hover:text-primary transition-colors">
                      keerthanmgowda3@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex gap-4 pt-2">
                  <a href="https://github.com/Keerthanm17" aria-label="GitHub" className="social-icon">
                    <Github className="h-5 w-5" />
                  </a>
                  <a href="https://linkedin.com/in/keerthan-m-gowda-3459602b9/" aria-label="LinkedIn" className="social-icon">
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a href="https://twitter.com/ZOZOZOZO" aria-label="Twitter" className="social-icon">
                    <Twitter className="h-5 w-5" />
                  </a>
                  <a href="https://rajeshkumar.com" aria-label="Portfolio" className="social-icon">
                    <Globe className="h-5 w-5" />
                  </a>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold mb-2">About the Project</h3>
                <p className="text-muted-foreground">
                  The Indian Heritage Tourism Guide is dedicated to promoting and preserving India's rich cultural
                  heritage through technology.
                </p>
                <p className="text-muted-foreground">
                  Our mission is to make India's historical monuments accessible to everyone through AI-powered
                  recognition and multilingual information.
                </p>
                <Button className="w-full mt-4" asChild>
                  <a href="mailto:keerthanmgowda3@gmail.com">Send Message</a>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
