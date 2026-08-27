class User {
  constructor(email, username, birthdate, password, role, valid) {
    this.email = email;
    this.username = username;
    this.birthdate = birthdate;
    this.password = password;
    this.role = role;
    this.valid = valid;
  }
}

const users = [
  new User('admin@test.com', 'admin', '2000-01-01', '123', 'superadmin', true),
  new User('lachlan@test.com', 'Lachlan', '2006-01-30', '123', 'groupadmin', true),
  new User('jack@test.com', 'Jack', '2005-02-15', '123', 'user', true)
];

function initializeRoutes(app) {
  app.post('/api/auth', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ valid: false, message: 'Email and password are required' });
    }

    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      const { password, ...userDetails } = user;
      res.json(userDetails);
    } else {
      res.json({ valid: false });
    }
  });
}

module.exports = initializeRoutes;