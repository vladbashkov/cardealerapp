export async function getServerSideProps(context) {
    const { makeId, year } = context.params;
    const res = await fetch(
        `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`
    );
    const data = await res.json();

    return {
        props: {
            models: data.Results || [],
        },
    };
}

export default function ResultPage({ models }) {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-5">
            <h1 className="text-2xl font-bold mb-4">Vehicle Models</h1>
            <ul className="space-y-2">
                {models.length > 0 ? (
                    models.map((model) => (
                        <li key={model.Model_ID} className="bg-white p-4 rounded shadow">
                            {model.Model_Name}
                        </li>
                    ))
                ) : (
                    <p>No models found for the selected make and year.</p>
                )}
            </ul>
        </div>
    );
}