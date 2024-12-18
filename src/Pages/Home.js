import React from 'react';
import { Link } from "react-router-dom";
import { MenuBar } from "@ltts-dtp-appstudio/react-navigation";
import { Search ,FeedBack } from '@ltts-dtp-appstudio/react-genericui';
import { ImageSlider } from "@ltts-dtp-appstudio/react-mediaview";

import SearchJson from '../JSON/SearchJson.json';
import MenuBarJson from '../JSON/MenuBarJson.json';
import TextExtraction from '../APIs/TextExtraction';
import imageSliderJson from '../JSON/imageSliderJson.json';
import FeedBackjson from '../JSON/FeedBackjson.json';
import ProgrammableSearchEngine from '../APIs/ProgrammableSearchEngine';



const Home = () => {
    return (
        <div className="h-screen flex flex-col">
            
            {/* MenuBar */}
            <div className='h-1/6 bg-gray-100'> 
                <MenuBar json={MenuBarJson} />
            </div>

            {/* ImageSlider - Full screen height and width */}
            <div className="h-auto w-auto">
                <ImageSlider 
                    slides={imageSliderJson} 
                   
                />
            </div>

            {/* Add Student Button and Search */}
            <div className="p-4 flex items-center">
  <Link 
    to="/add-student" 
    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded whitespace-nowrap"
  >
    Add Student
  </Link>

  <div className="flex-1 px-4">
    <Search json={SearchJson} />
  </div>

  <Link 
    to="/api-hub" 
    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded whitespace-nowrap"
  >
    Go To APIHub
  </Link>
  <Link 
    to="/api-google-translate" 
    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded whitespace-nowrap"
  >
    Use Google Translator
  </Link>
</div>



            {/* Weather Forecast */}
            <div className="p-4">
                <TextExtraction />
            </div>
            <div className='h-screen w-full'>
                  <ProgrammableSearchEngine />
            </div>

            {/* <div className='bg-gray-100 p-4'>
                  <FeedBack json={FeedBackjson}/>
            </div> */}

        </div>
    );
}

export default Home;
