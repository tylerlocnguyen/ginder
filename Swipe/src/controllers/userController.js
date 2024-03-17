const createUser = async () => {
    try {
      const newUser = new User({
        name: 'John Doe',
        email: 'john@example.com',
        age: 18
      });
  
      const savedUser = await newUser.save();
      console.log('User saved successfully:', savedUser);
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };
  
  module.exports = createUser;
  