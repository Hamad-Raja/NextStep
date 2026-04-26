export default function AboutPage() {
  return (
    <main className="bg-[#F8F5EF] text-[#111111]">
      {/* Hero Section */}
      <section className="min-h-[70vh] flex items-center px-6 md:px-16 lg:px-24 py-20">
        <div className="max-w-5xl">
          <p className="uppercase tracking-[0.35em] text-sm text-[#9C7A4D] mb-5">
            About Umii
          </p>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif leading-tight mb-8">
            Modern footwear made for confident everyday movement.
          </h1>

          <p className="text-lg md:text-xl text-[#4A4A4A] max-w-3xl leading-relaxed">
            Umii is built for people who want shoes that feel comfortable, look refined,
            and move naturally with their lifestyle. We combine modern design, premium
            detailing, and everyday practicality to create footwear that fits both casual
            moments and elevated occasions.
          </p>
        </div>
      </section>

      {/* Brand Story */}
      <section className="bg-[#111111] text-white px-6 md:px-16 lg:px-24 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="uppercase tracking-[0.3em] text-sm text-[#D6B98C] mb-4">
              Our Story
            </p>

            <h2 className="text-3xl md:text-5xl font-serif leading-tight mb-6">
              Designed with simplicity, shaped by comfort.
            </h2>
          </div>

          <div>
            <p className="text-[#D8D8D8] leading-relaxed mb-5">
              We started Umii with a simple idea: footwear should never force you to
              choose between style and comfort. Every pair is created with attention to
              shape, texture, fit, and finish so you can step out feeling relaxed,
              polished, and ready.
            </p>

            <p className="text-[#D8D8D8] leading-relaxed">
              Our designs focus on clean lines, versatile colors, and timeless details.
              Whether you are dressing for daily wear, travel, work, or weekend plans,
              Umii shoes are made to support your pace without compromising your style.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="px-6 md:px-16 lg:px-24 py-20">
        <div className="max-w-3xl mb-12">
          <p className="uppercase tracking-[0.3em] text-sm text-[#9C7A4D] mb-4">
            What We Believe
          </p>

          <h2 className="text-3xl md:text-5xl font-serif leading-tight">
            Premium style should feel effortless.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="border border-[#D6C8B5] p-8 rounded-2xl bg-white">
            <h3 className="text-2xl font-serif mb-4">Comfort First</h3>
            <p className="text-[#555555] leading-relaxed">
              Every design is made to feel wearable from the first step, with comfort
              that supports your daily routine.
            </p>
          </div>

          <div className="border border-[#D6C8B5] p-8 rounded-2xl bg-white">
            <h3 className="text-2xl font-serif mb-4">Modern Luxury</h3>
            <p className="text-[#555555] leading-relaxed">
              We keep our designs refined, minimal, and versatile so every pair feels
              premium without being loud.
            </p>
          </div>

          <div className="border border-[#D6C8B5] p-8 rounded-2xl bg-white">
            <h3 className="text-2xl font-serif mb-4">Everyday Quality</h3>
            <p className="text-[#555555] leading-relaxed">
              From material selection to finishing details, we focus on shoes that look
              good and stay dependable.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="px-6 md:px-16 lg:px-24 pb-24">
        <div className="bg-[#E7D7BE] rounded-3xl p-8 md:p-14 lg:p-16 text-center">
          <p className="uppercase tracking-[0.3em] text-sm text-[#7A5A2E] mb-4">
            Our Mission
          </p>

          <h2 className="text-3xl md:text-5xl font-serif leading-tight mb-6">
            To create shoes that make every step feel stylish, easy, and confident.
          </h2>

          <p className="text-[#3F3528] max-w-3xl mx-auto leading-relaxed text-lg">
            Umii is more than footwear. It is a modern approach to everyday dressing:
            clean, comfortable, and thoughtfully made for people who value both design
            and movement.
          </p>
        </div>
      </section>
    </main>
  );
}