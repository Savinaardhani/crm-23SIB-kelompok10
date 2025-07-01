import React from 'react';
import OrderHeader from "../komponen/OrderHeader";

export default function Invoice() {
    return (
       <div>
          <OrderHeader/>
     
        
        <div className="p-8 bg-white shadow-lg rounded-md">
            <header className="mb-8 flex justify-between items-center border-b pb-4">
                <div>
                    <h1 className="text-2xl font-bold">Invoice</h1>
                    <p className="text-sm text-gray-500">#INV-0001</p>
                </div>
                <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                    Print Invoice
                </button>
            </header>

            <section className="mb-8">
                <p className="text-gray-700">
                    <span className="font-semibold">Pelanggan:</span> Keisha
                </p>
                <p className="text-gray-700">
                    <span className="font-semibold">Date:</span> April 28, 2025
                </p>
            </section>

            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b">
                        <th className="py-2">Item</th>
                        <th className="py-2">Quantity</th>
                        <th className="py-2">Price</th>
                        <th className="py-2">Total</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="border-b">
                        <td className="py-2">Product A</td>
                        <td className="py-2">2</td>
                        <td className="py-2">$50.00</td>
                        <td className="py-2">$100.00</td>
                    </tr>
                    <tr className="border-b">
                        <td className="py-2">Product B</td>
                        <td className="py-2">1</td>
                        <td className="py-2">$100.00</td>
                        <td className="py-2">$100.00</td>
                    </tr>
                    <tr className="border-b">
                        <td className="py-2">Product C</td>
                        <td className="py-2">3</td>
                        <td className="py-2">$30.00</td>
                        <td className="py-2">$90.00</td>
                    </tr>
                </tbody>
            </table>

            <div className="mt-8 text-right">
                <p className="text-lg font-bold">Total: $290.00</p>
            </div>
        </div>
        </div>
    );
}
