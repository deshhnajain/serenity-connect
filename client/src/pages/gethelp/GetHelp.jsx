import React from 'react';
import Signs from "../../Component/GetHelp/signs.jsx";
import UncontrolledExample from '../../Component/GetHelp/GetHelpCarousel.jsx';
import MentalHealthCheck from '../../Component/GetHelp/MentalHealthCheck.jsx';
import QuoteComponent from '../../Component/GetHelp/QuoteComponent.jsx';
import Stats from '../../Component/GetHelp/Stats.jsx';

function GetHelp() {
  return (
    <>
    
      <UncontrolledExample />
      <Signs />
      {/* <MentalHealthCheck/> */}
      <QuoteComponent/>
      <Stats/>
    </>
  );
}

export default GetHelp;