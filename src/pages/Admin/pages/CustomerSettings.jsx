import React from 'react';
import CustomerHeader from "../komponen/Customerheader";

export default function Settings() {
    return (
        <div>
                  <CustomerHeader/>
        <div className="p-6 bg-white rounded-md shadow-md">
            <h1 className="text-2xl font-bold text-gray-700 mb-4">Settings</h1>

            <div className="space-y-6">
                {/* User Profile Section */}
                <section className="bg-gray-50 p-4 rounded-md shadow-sm">
                    <h2 className="text-lg font-semibold text-gray-600 mb-2">User Profile</h2>
                    <form className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm text-gray-500 mb-1" htmlFor="username">Username</label>
                                <input 
                                    type="text" 
                                    id="username" 
                                    className="w-full p-2 border rounded-md text-gray-600 focus:ring focus:ring-green-300 focus:outline-none" 
                                    placeholder="Enter your username"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-500 mb-1" htmlFor="email">Email</label>
                                <input 
                                    type="email" 
                                    id="email" 
                                    className="w-full p-2 border rounded-md text-gray-600 focus:ring focus:ring-green-300 focus:outline-none" 
                                    placeholder="Enter your email"
                                />
                            </div>
                        </div>
                        <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none">
                            Save Changes
                        </button>
                    </form>
                </section>

                {/* Password Change Section */}
                <section className="bg-gray-50 p-4 rounded-md shadow-sm">
                    <h2 className="text-lg font-semibold text-gray-600 mb-2">Change Password</h2>
                    <form className="space-y-4">
                        <div>
                            <label className="block text-sm text-gray-500 mb-1" htmlFor="current-password">Current Password</label>
                            <input 
                                type="password" 
                                id="current-password" 
                                className="w-full p-2 border rounded-md text-gray-600 focus:ring focus:ring-green-300 focus:outline-none" 
                                placeholder="Enter current password"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm text-gray-500 mb-1" htmlFor="new-password">New Password</label>
                                <input 
                                    type="password" 
                                    id="new-password" 
                                    className="w-full p-2 border rounded-md text-gray-600 focus:ring focus:ring-green-300 focus:outline-none" 
                                    placeholder="Enter new password"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-500 mb-1" htmlFor="confirm-password">Confirm Password</label>
                                <input 
                                    type="password" 
                                    id="confirm-password" 
                                    className="w-full p-2 border rounded-md text-gray-600 focus:ring focus:ring-green-300 focus:outline-none" 
                                    placeholder="Confirm new password"
                                />
                            </div>
                        </div>
                        <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none">
                            Update Password
                        </button>
                    </form>
                </section>

               
            </div>
        </div>
        </div>
    );
}
