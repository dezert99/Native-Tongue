import React from 'react';

const UserContext = React.createContext({user: {}, updateUser: () => {}, logout: () => {}}); // Create a context object

export {
  UserContext // Export it so it can be used by other Components
};