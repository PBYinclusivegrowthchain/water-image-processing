import { useEffect, useState } from "react"

const Table = () => {
    const [images, setImages] = useState([])


    const imagesData = async () => {
        const response = await fetch("https://klp2fh7w9b.execute-api.us-east-1.amazonaws.com/dev/api/devicedata/fetchAllImages")
        const data = await response.json()
        setImages(data.filteredImages)
    }

    useEffect(() => {
        imagesData()
    }, [])


    let allRecords = [];

    const postImageData = async (imgUrl: any) => {
        const apiUrl = 'http://18.207.118.242:5000/iot-image-processing';

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    img_url: imgUrl,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Response:', data);
                allRecords.push(data);
            } else {
                console.error('Error:', response.status, response.statusText);
            }
        } catch (error: any) {
            console.error('Error:', error?.message);
        }
    };

    const delay = (ms: any) => new Promise(resolve => setTimeout(resolve, ms));

    const processImagesSequentially = async () => {
        for (let i = 0; i < 10; i++) {
            await postImageData(images[i]);
            await delay(1000);  // Adjust the delay time (in milliseconds) based on your server's capacity
        }
    };

    // Call the function to process images sequentially
    processImagesSequentially();

    return (
        <div className="shadow-lg my-3 rounded-lg overflow-hidden">
            <div className="overflow-x-auto overflow-y-auto" style={{ overflowY: 'scroll', scrollbarWidth: 'thin', maxHeight: "800px" }}>
                <table className="w-full table-auto table">
                    <thead className=" text-sm font-semibold uppercase top-0  text-gray-400 bg-gray-50 sticky">
                        <tr className=" bg-black text-white font-light">
                            <th className="py-4 px-32 text-left">
                                <div className="font-semibold text-left">Image</div>
                            </th>
                            <th className="py-4 px-8 text-left">
                                <div className="font-semibold text-left">K_mean_RG</div>
                            </th>
                            <th className="py-4 px-8 text-left">
                                <div className="font-semibold text-left">Secchi Depth</div>
                            </th>
                            <th className="py-4 px-8 text-left">
                                <div className="font-semibold text-left">Turbidity</div>
                            </th>
                            <th className="py-4 px-8 text-left">
                                <div className="font-semibold text-left">TSM</div>
                            </th>
                            <th className="py-4 px-8 text-left">
                                <div className="font-semibold text-left">cdom_ratio</div>
                            </th>
                            <th className="py-4 px-8 text-left">
                                <div className="font-semibold text-left">CDOM</div>
                            </th>
                            <th className="py-4 px-8 text-left">
                                <div className="font-semibold text-left">LP - Black RGB</div>
                            </th>
                            <th className="py-4 px-8 text-left">
                                <div className="font-semibold text-left">LP - Corrected RGB</div>
                            </th>
                            <th className="py-4 px-8 text-left">
                                <div className="font-semibold text-left">LP - Depth</div>
                            </th>
                            <th className="py-4 px-8 text-left">
                                <div className="font-semibold text-left">LP - Gray RGB</div>
                            </th>
                            <th className="py-4 px-8 text-left">
                                <div className="font-semibold text-left">LP - White RGB</div>
                            </th>
                            <th className="py-4 px-8 text-left">
                                <div className="font-semibold text-left">UP - Black RGB</div>
                            </th>
                            <th className="py-4 px-8 text-left">
                                <div className="font-semibold text-left">UP - Corrected RGB</div>
                            </th>
                            <th className="py-4 px-8 text-left">
                                <div className="font-semibold text-left">UP - Depth</div>
                            </th>
                            <th className="py-4 px-8 text-left">
                                <div className="font-semibold text-left">UP - Gray RGB</div>
                            </th>
                            <th className="py-4 px-8 text-left">
                                <div className="font-semibold text-left">UP - White RGB</div>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="text-sm divide-y divide-gray-100">
                        {
                            images && images?.map((image: string, ind: number) => {
                                return (
                                    <tr key={ind} className='my-4'>
                                        <td className="py-1 px-8 text-left">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 mr-2 sm:mr-3">
                                                    <img
                                                        className=" object-cover"
                                                        src={image}
                                                        width={250}
                                                        height={250}
                                                        alt="Alex Shatov"
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-1 px-8 text-left">
                                            <div className="text-left">-2.03</div>
                                        </td>
                                        <td className="py-1 px-8 text-left">
                                            <div className="text-left">
                                                -6.69
                                            </div>
                                        </td>
                                        <td className="py-1 px-8 text-left">
                                            <div className=" text-left">-4.13</div>
                                        </td>
                                        <td className="py-1 px-8 text-left">
                                            <div className=" text-left">-1.9023896699529108</div>
                                        </td>
                                        <td className="py-1 px-8 text-left">
                                            <div className=" text-left">0.8929897711407037</div>
                                        </td>
                                        <td className="py-1 px-8 text-left">
                                            <div className=" text-left">-1.4765885669760044</div>
                                        </td>
                                        <td className="py-1 px-8 text-left">
                                            <div className=" text-left">[42. 68. 73.]</div>
                                        </td>
                                        <td className="py-1 px-8 text-left">
                                            <div className=" text-left">[1.31147541 0.80769231 0.75949367]</div>
                                        </td>
                                        <td className="py-1 px-8 text-left">
                                            <div className=" text-left">15 cm</div>
                                        </td>
                                        <td className="py-1 px-8 text-left">
                                            <div className=" text-left">[61. 78. 79.]</div>
                                        </td>
                                        <td className="py-1 px-8 text-left">
                                            <div className=" text-left">[122. 131. 133.]</div>
                                        </td>
                                        <td className="py-1 px-8 text-left">
                                            <div className=" text-left">[ 61. 99. 103.]</div>
                                        </td>
                                        <td className="py-1 px-8 text-left">
                                            <div className=" text-left">[1.06542056 0.66206897 0.63087248]</div>
                                        </td>
                                        <td className="py-1 px-8 text-left">
                                            <div className=" text-left">5 cm</div>
                                        </td>
                                        <td className="py-1 px-8 text-left">
                                            <div className=" text-left">[107. 145. 149.]</div>
                                        </td>
                                        <td className="py-1 px-8 text-left">
                                            <div className=" text-left">[175. 195. 197.]</div>
                                        </td>
                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </table>

            </div>
        </div>
    )
}

export default Table