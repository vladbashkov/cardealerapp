import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
    const [make, setMake] = useState('');
    const [year, setYear] = useState('');
    const [makes, setMakes] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchMakes = async () => {
        setLoading(true);
        const res = await fetch('https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json');
        const data = await res.json();
        setMakes(data.Results || []);
        setLoading(false);
    };

    const handleMakeChange = (e) => {
        setMake(e.target.value);
    };

    const handleYearChange = (e) => {
        setYear(e.target.value);
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <h1 className="text-2xl font-bold mb-6">Car Dealer App</h1>
            <div className="space-y-4 w-3/12">
                <div>
                    <button
                        onClick={fetchMakes}
                        className="bg-blue-500 text-white px-4 py-2 rounded w-full"
                        disabled={loading}
                    >
                        {loading ? 'Loading...' : 'Fetch Makes'}
                    </button>
                </div>
                <div>
                    <select value={make} onChange={handleMakeChange} className="border px-4 py-2 rounded w-full">
                        <option value="">Select Make</option>
                        {makes.map((item) => (
                            <option key={item.MakeId} value={item.MakeId}>
                                {item.MakeName}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <select value={year} onChange={handleYearChange} className="border px-4 py-2 rounded w-full">
                        <option value="">Select Year</option>
                        {[...Array(new Date().getFullYear() - 2014)].map((_, index) => {
                            const year = 2015 + index;
                            return (
                                <option key={year} value={year}>
                                    {year}
                                </option>
                            );
                        })}
                    </select>
                </div>
                <div>
                    <Link href={`/result/${make}/${year}`}>
                        <button
                            className="bg-green-500 text-white px-4 py-2 rounded w-full"
                            disabled={!make || !year}
                        >
                            Next
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}