// pages/about.js
'use client';

import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { MapPin, Mail, Phone, ArrowRight } from 'lucide-react';
import Header from '../components/header';

export default function About() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "Founder & CEO",
      bio: "Former agricultural economist with 15 years experience in farming communities",
      image: "/api/placeholder/300/300"
    },
    {
      name: "Michael Rodriguez",
      role: "CTO",
      bio: "Agricultural technology specialist with a background in sustainable farming",
      image: "/api/placeholder/300/300"
    },
    {
      name: "Aisha Patel",
      role: "Head of Farmer Relations",
      bio: "Third-generation farmer and agricultural community advocate",
      image: "/api/placeholder/300/300"
    },
    {
      name: "David Chen",
      role: "Lead Developer",
      bio: "Tech expert focused on creating simple tools for rural communities",
      image: "/api/placeholder/300/300"
    }
  ];

  const testimonials = [
    {
      quote: "AgriLink has completely transformed how I sell my produce. I'm reaching more buyers and earning 30% more than I was through traditional channels.",
      author: "James Wilson",
      role: "Organic Vegetable Farmer, Iowa",
      image: "/images//man1.jpg" // Updated image
    },
    {
      quote: "As a restaurant owner, I've been able to source directly from local farms, ensuring the freshest ingredients while supporting my community.",
      author: "Maria Sanchez",
      role: "Restaurant Owner, California",
      image: "/images//man2.jpg" // Updated image
    },
    {
      quote: "The platform's ease of use means I can manage my farm's sales in minutes each day, rather than spending hours at markets or on the phone.",
      author: "Robert Johnson",
      role: "Dairy Farmer, Wisconsin",
      image: "/images//man3.jpg" // Updated image
    }
  ];

  const impactMetrics = [
    { value: "10,000+", label: "Farmers Empowered" },
    { value: "$15M+", label: "Monthly Transactions" },
    { value: "40%", label: "Average Income Increase" },
    { value: "25+", label: "States Served" }
  ];

  const partners = [
    { name: "National Farmers Association", logo: "/api/placeholder/180/60" },
    { name: "Agricultural Innovation Fund", logo: "/api/placeholder/180/60" },
    { name: "Sustainable Farming Initiative", logo: "/api/placeholder/180/60" },
    { name: "Rural Development Council", logo: "/api/placeholder/180/60" }
  ];

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: 'cursive' }}>
      <Head>
        <title>About AgriLink - Our Mission & Team</title>
        <meta name="description" content="Learn about FarmConnect's mission to transform agricultural commerce and the team behind our platform." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
       <Header />
      {/* Hero Section */}
      <section className="relative bg-green-600 text-white">
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ backgroundImage: "url('/images/farmland.jpg')" }} // Updated background image
        ></div>
        <div className="container text-black mx-auto px-4 py-16 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 ">Revolutionizing Agricultural Commerce</h1>
            <p className="text-xl mb-6">AgriLink was built with one mission: to create a more equitable, efficient, and sustainable agricultural marketplace that empowers farmers and benefits consumers.</p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-gray-700 mb-4">AgriLink began in 2023 when our founder, Sarah Johnson, witnessed firsthand the challenges faced by family farmers trying to sell their products at fair prices while also seeing consumers paying premium prices for the same goods.</p>
              <p className="text-gray-700 mb-4">Having grown up in a farming community and later working as an agricultural economist, Sarah recognized the inefficiencies in the traditional agricultural supply chain. She assembled a team of technologists and agriculture experts to create a platform that would connect farmers directly with buyers.</p>
              <p className="text-gray-700">Today, AgriLink has grown from a small startup serving a single region to a nationwide platform helping thousands of farmers reach new markets and helping buyers access fresher, more affordable agricultural products.</p>
            </div>
            <div className="md:w-1/2">
              <img src="/api/placeholder/600/400" alt="Farmers using AgriLink" className="rounded-lg shadow-md w-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6 text-center">Our Mission & Values</h2>
          <div className="max-w-3xl mx-auto text-center mb-12">
            <p className="text-xl text-gray-700">We're building technology that strengthens rural communities, promotes sustainable agriculture, and delivers value to everyone in the food system.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-green-600 text-2xl">👨‍🌾</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Farmer Empowerment</h3>
              <p className="text-gray-600">We believe farmers deserve more control over how their products are sold and priced. Our platform gives farmers the tools to reach customers directly.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-green-600 text-2xl">🤝</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Transparency</h3>
              <p className="text-gray-600">We foster direct relationships between producers and consumers, creating a more transparent agricultural marketplace where everyone knows where their food comes from.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-green-600 text-2xl">🌱</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Sustainability</h3>
              <p className="text-gray-600">By promoting local connections and reducing the steps between farm and table, we're helping create a more environmentally sustainable and economically viable food system.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Metrics */}
      <section className="py-16 bg-green-600 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Impact</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {impactMetrics.map((metric, index) => (
              <div key={index}>
                <div className="text-4xl font-bold mb-2">{metric.value}</div>
                <div className="text-lg">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">What Our Users Say</h2>
          
          <div className="max-w-4xl mx-auto relative">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="text-green-600 text-4xl mb-4">"</div>
              <blockquote className="text-xl italic mb-6">
                {testimonials[activeTestimonial].quote}
              </blockquote>
              
              <div className="flex items-center">
                <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                  <img 
                    src={testimonials[activeTestimonial].image} 
                    alt={testimonials[activeTestimonial].author} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="font-semibold">{testimonials[activeTestimonial].author}</div>
                  <div className="text-gray-600">{testimonials[activeTestimonial].role}</div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button 
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-3 h-3 rounded-full ${index === activeTestimonial ? 'bg-green-600' : 'bg-gray-300'}`}
                  aria-label={`View testimonial ${index + 1}`}
                ></button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Partners</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            {partners.map((partner, index) => (
              <div key={index} className="flex justify-center">
                <img 
                  src={partner.logo} 
                  alt={partner.name} 
                  className="max-h-16 grayscale hover:grayscale-0 transition-all" 
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/3 bg-green-600 text-white p-6">
                <h3 className="text-2xl font-bold mb-6">Get in Touch</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <MapPin size={20} className="mr-3 mt-1" />
                    <div>
                      <p>Yaounde 1</p>
                      <p>chapelle Ngousso, CA 94321</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Mail size={20} className="mr-3" />
                    <a href="mailto:hello@agrilink.com" className="hover:underline">hello@agrilink.com</a>
                  </div>
                  <div className="flex items-center">
                    <Phone size={20} className="mr-3" />
                    <a href="tel:+18005551234" className="hover:underline">(237) 673-95-25-88</a>
                  </div>
                </div>
              </div>
              <div className="md:w-2/3 p-6">
                <h3 className="text-2xl font-bold mb-6">Send Us a Message</h3>
                <form>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-gray-700 mb-2" htmlFor="name">Your Name</label>
                      <input 
                        type="text" 
                        id="name" 
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600" 
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2" htmlFor="email">Email Address</label>
                      <input 
                        type="email" 
                        id="email" 
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600" 
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="subject">Subject</label>
                    <input 
                      type="text" 
                      id="subject" 
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600" 
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="message">Message</label>
                    <textarea 
                      id="message" 
                      rows="4" 
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                    ></textarea>
                  </div>
                  <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 flex items-center">
                    Send Message <ArrowRight size={16} className="ml-2" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-green-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Join the Agricultural Revolution</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">Be part of our mission to create a more fair, efficient, and sustainable agricultural marketplace.</p>
          
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link href="/signup?type=seller" className="bg-white text-green-600 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-medium">
              Join as a Seller
            </Link>
            <Link href="/signup?type=buyer" className="bg-amber-500 text-white hover:bg-amber-600 px-8 py-4 rounded-lg text-lg font-medium">
              Join as a Buyer
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Agri<span className="text-amber-500">Link</span></h3>
              <p className="mb-4">Connecting farmers directly with buyers since 2023. Our mission is to make agricultural trading more profitable, transparent, and sustainable.</p>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-white">Twitter</a>
                <a href="#" className="hover:text-white">Facebook</a>
                <a href="#" className="hover:text-white">Instagram</a>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-white mb-4">Products</h4>
              <ul className="space-y-2">
                <li><Link href="/categories/produce" className="hover:text-white">Produce</Link></li>
                <li><Link href="/categories/livestock" className="hover:text-white">Livestock</Link></li>
                <li><Link href="/categories/equipment" className="hover:text-white">Equipment</Link></li>
                <li><Link href="/categories/services" className="hover:text-white">Services</Link></li>
                <li><Link href="/categories" className="hover:text-white">All Categories</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-white mb-4">Company</h4>
              <ul className="space-y-2">
                <li><Link href="/about" className="hover:text-white">About Us</Link></li>
                <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
                <li><Link href="/careers" className="hover:text-white">Careers</Link></li>
                <li><Link href="/press" className="hover:text-white">Press</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-white mb-4">Support</h4>
              <ul className="space-y-2">
                <li><Link href="/help" className="hover:text-white">Help Center</Link></li>
                <li><Link href="/terms" className="hover:text-white">Terms of Service</Link></li>
                <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
                <li><Link href="/faq" className="hover:text-white">FAQ</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-sm text-center">
            <p>© {new Date().getFullYear()} AgriLink. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}