import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import InteractiveAppDemo from "./components/InteractiveAppDemo"
import CapabilitiesSection from "./components/CapabilitiesSection"
import ArchitectureSection from "./components/ArchitectureSection"
import ContactCtaFooter from "./components/ContactCtaFooter"

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar />
      <main>
        <Hero />
        <InteractiveAppDemo />
        <CapabilitiesSection />
        <ArchitectureSection />
      </main>
      <ContactCtaFooter />
    </div>
  )
}
