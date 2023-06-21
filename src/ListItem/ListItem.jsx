

const ListItem = ({ country, index }) => {
    const { name, area, region } = country

    return (
        <div className="focus:outline-none py-8 w-full">
            <div className="lg:flex items-start justify-center w-full">
                <div className="focus:outline-none lg:w-8/12 lg:mr-7 lg:mb-0 mb-7 bg-gray-50 rounded-lg  p-6 shadow ">
                    <div className="flex items-center   pb-6">
                        <div className="flex items-start justify-between w-full">
                            <div className="pl-3 w-full space-y-2">
                                <p className="focus:outline-none text-2xl font-medium leading-5 text-gray-800 ">{name}</p>
                                <p className="focus:outline-none text-lg leading-normal pt-2 text-gray-700 "><strong>Region: </strong>{region}</p>
                                <p className="focus:outline-none text-lg leading-normal pt-2 text-gray-700 "><strong>Area: </strong>{area} Km<sup>2</sup></p>
                            </div>
                            <div role="img" aria-label="bookmark" className="border p-2 rounded-xl">
                                {index + 1}
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default ListItem;