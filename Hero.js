const Hero = () => (
  <section className="hero">
    {/* Logo */}
    <img
      src="/image/logo1.png"
      alt="Chai Culture Logo"
      className="hero-logo"
    />

    <h1>Brew the Royal Tradition</h1>

    <p>
      Premium instant chai inspired by royal Indian households,
      crafted for modern lifestyles.
    </p>

    {/* Chai Images */}
    <div className="chai-images">
      <img src="/image/chai1.jpg" alt="Chai cup 1" />
      <img src="/image/chai2.jpg" alt="Chai cup 2" />
    </div>
  </section>
);

export default Hero;
