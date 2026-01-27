import { observer } from 'mobx-react-lite';
import { weddingStore } from '../stores/WeddingStore';

const Header = observer(() => {
  return (
    <header style={styles.header}>
      <h1 style={styles.title}>{weddingStore.weddingInfo.coupleName}</h1>
      <p style={styles.subtitle}>We're getting married!</p>
    </header>
  );
});

const styles = {
  header: {
    textAlign: 'center',
    padding: '3rem 1rem',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
  },
  title: {
    fontSize: '3rem',
    margin: '0',
    fontWeight: '300',
  },
  subtitle: {
    fontSize: '1.5rem',
    margin: '1rem 0 0 0',
    fontWeight: '200',
  },
};

export default Header;
