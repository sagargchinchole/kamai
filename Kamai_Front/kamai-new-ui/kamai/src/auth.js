
export const signIn = async ({ email, password }) => {
    if (email === 'admin@example.com' && password === 'password123') {
      // Simulating user session setting for admin
      return { user: { name: 'Admin User', email, role: 'admin' } };
    } else if (email === 'user@example.com' && password === 'password123') {
      // Simulating user session setting for a normal user
      return { user: { name: 'Normal User', email, role: 'user' } };
    } else {
      return null; // Return null if login fails
    }
  };
  