import './Registry.css';

const REGISTRY_URL = 'https://withjoy.com/andrewandgretchen2026/registry';

const Registry = () => {
  return (
    <section id="registry" className="registry-section">
      <h2 className="registry-heading">Registry</h2>
      <div className="registry-card">
        <p className="registry-subtext">
          Your presence at our celebration is gift enough! If you'd like to do something more, we've set up a few ways to contribute — from honeymoon adventures to causes close to our hearts.
        </p>
        <a
          href={REGISTRY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="registry-button"
        >
          View Our Registry
        </a>
      </div>
    </section>
  );
};

export default Registry;
