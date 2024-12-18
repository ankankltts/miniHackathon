import React from 'react';
import { Link } from "react-router-dom";
import ApiIpComponent from '../APIs/ApiIpComponent';
import GeoLocationApi from '../APIs/GeoLocationApi';



const APIComponent = () => {
    return (
        <div  className="p-6 bg-gray-100 min-h-screen" >

                 <Link to="/" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                   Go To Home
                 </Link>
               
            <div>
            <ApiIpComponent />
            </div>
            <div>
                 <GeoLocationApi />
            </div>

        </div>
    );
}

export default APIComponent;
