import { login } from '@hilla/frontend';
import { Button } from '@hilla/react-components/Button.js';
import { useNavigate } from 'react-router-dom';

export const LoginView = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Button
        theme="primary"
        onClick={() =>
          login('user', 'password')
            .then(() => navigate('/'))
            .catch((e) => console.warn(e))
        }
      >
        Login
      </Button>
    </div>
  );
};