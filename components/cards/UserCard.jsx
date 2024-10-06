import React from 'react';

const UserCard = ({ users }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 p-4">
      {users.map((user) => (
        <div
          key={user._id}
          className="bg-gray-200 rounded-lg shadow-lg flex flex-col justify-between p-6 transition-transform transform hover:scale-105"
        >
          <div className="flex-grow">
            <p className="text-black  text-xl font-semibold">{user?.fullName}</p>
            <p className="text-gray-600 text-sm">{user?.email}</p> {/* Displaying email */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserCard;
