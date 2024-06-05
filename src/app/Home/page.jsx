import React from 'react';

const HomePage = () => {
  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.logo}>
          <img src="/translib.png" width={100} alt="Mint Logo" />
        </div>
        <nav style={styles.nav}>
          <a style={styles.navLink} href="#how-it-works">How it works</a>
          <a style={styles.navLink} href="#credit-cards">Credit Cards</a>
          <a style={styles.navLink} href="#investing">Investing</a>
          <a style={styles.navLink} href="#loans">Loans</a>
          <a style={styles.navLink} href="#resources">Resources</a>
        </nav>
        <div style={styles.authButtons}>
          <button style={styles.button}>Sign up</button>
          <button style={styles.button}>Sign in</button>
        </div>
      </header>

      <main style={styles.main}>
        <div style={styles.textContainer}>
          <h1 style={styles.heading}>Experience a fresh way to <br /> manage money</h1>
          <p style={styles.subheading}>
            Reach your goals with personalized insights, custom budgets, spend tracking,
            and subscription monitoring—all for free.
          </p>
          <button style={styles.signUpButton}>Sign up for Mint</button>
          <div style={styles.appLinks}>
            <a href="#appstore" style={styles.appLink}>
              <img src="/path/to/app-store-badge.png" alt="App Store" />
            </a>
            <a href="#googleplay" style={styles.appLink}>
              <img src="/path/to/google-play-badge.png" alt="Google Play" />
            </a>
          </div>
        </div>
        <div style={styles.imageContainer}>
          <img src="/lib1.jpg" alt="Woman using phone" />
        </div>
      </main>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    borderBottom: '1px solid #ddd',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
  },
  nav: {
    display: 'flex',
    alignItems: 'center',
  },
  navLink: {
    margin: '0 10px',
    textDecoration: 'none',
    color: '#333',
  },
  authButtons: {
    display: 'flex',
    alignItems: 'center',
  },
  button: {
    margin: '0 5px',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  main: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '40px 20px',
  },
  textContainer: {
    maxWidth: '50%',
  },
  heading: {
    fontSize: '36px',
    color: '#2a9d8f',
  },
  subheading: {
    fontSize: '18px',
    color: '#333',
  },
  signUpButton: {
    marginTop: '20px',
    padding: '10px 20px',
    backgroundColor: '#2a9d8f',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  appLinks: {
    marginTop: '20px',
    display: 'flex',
    alignItems: 'center',
  },
  appLink: {
    margin: '0 10px',
  },
  imageContainer: {
    maxWidth: '50%',
  },
};

export default HomePage;
