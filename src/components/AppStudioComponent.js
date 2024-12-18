import React, { useEffect, useState } from 'react';
import { ECGWave } from '@ltts-dtp-appstudio/react-restingdisplay';
import ecgjson from '../JSON/ecgjson.json';

const AppStudioComponent = () => {
   

    return (
        <div>
            <h1>App Studio Component</h1>
          
                <div>
                    <ECGWave json={ecgjson} />
                </div>
            
        </div>
    );
}

export default AppStudioComponent;
