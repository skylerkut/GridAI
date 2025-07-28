// import React from 'react';
// import { useContext, useEffect } from "react";
// import { AppContext } from "../AppContext"

// const FeederGraph = () => {
//     const {currentFile, toggleCurrentFile} = useContext(AppContext);
   
//     let history = []; // Array to store last 10 updates
//     let currentFeedID;

//       const fetchFeed = async () => {
//         try {
//           const response = await fetch('/api/feeders/'); //Get all feeders
//           if (!response.ok) {
//             throw new Error(`"Error fetching feed data! \nStatus: ${response.status}`);
//           }
//           const feederList = await response.json();
//           const matchedFeeder = feederList.find(feeder => feeder.feedId === currentFile.dataFeedReference);

//           if (matchedFeeder) {
//             currentFeedID = matchedFeeder._id;
//           } else {
//             console.log("No feeder found");
//           }
//         } catch (error) {
//           console.error("Error fetching feed data:", error);
//         }
//       }; 

//       fetchFeed();

//     const putFeeder = async (updatedFeeder) => {
//         try {
//           const response = await fetch(`/api/feeders/${currentFeedID}`, {
//             method: 'PUT',
//             headers: {
//               'Content-Type': 'application/json', 
//             },
//             body: JSON.stringify(updatedFeeder), 
//           });
//           if (!response.ok) {
//             throw new Error(`Error updating feed! \nStatus: ${response.status}`);
//           }
//           const json = await response.json();
//           console.log('Feed update response:', json);
//         } catch (error) {
//           console.error('Error updating feed:', error);
//         }
//       };

//     const getRandomStatus = () => {
//         const statuses = ["active", "standby", "temporarily down", "offline"];
//         return statuses[Math.floor(Math.random() * statuses.length)];
//     };

//     const generateDynamicData = () => {
//        let dynamicData = {
//           feedId: "grid-derms-feed-001",
//           timestamp: new Date().toISOString(),
//           data: {
//             n1: { generation: Math.floor(Math.random() * 1001), status: getRandomStatus() },
//             n2: { soc: Math.floor(Math.random() * 101), rate: Math.floor(Math.random() * (100 - (-100) + 1)) + (-100) },
//             n3: { status: getRandomStatus(), fuelLevel: Math.floor(Math.random() * 101) },
//             n4: { currentLoad: Math.floor(Math.random() * (250 - 150 + 1)) + 150 },
//             n5: { importExportPower: Math.floor(Math.random() * (100 - (-100) + 1)) + (-100) },
//             "n1-n4": { powerFlow: Math.floor(Math.random() * (100 - (-100) + 1)) + (-100) },
//             "n2-n4": { powerFlow: Math.floor(Math.random() * (100 - (-100) + 1)) + (-100) },
//             "n4-n5": { powerFlow:Math.floor(Math.random() * (100 - (-100) + 1)) + (-100) },
//           }
//         };

//         history.push(dynamicData);
//         putFeeder(dynamicData);

//         if (history.length > 10) {
//           history.shift();
//         }
//         console.log("feeder history", history);
//     };

//     useEffect(() => {
//         const interval = setInterval(() => {
//             generateDynamicData();
//         }, 3000);
//         return () => clearInterval(interval); // Clean up on unmount
//     }, []);

//     //create a seperate array for the singular node history and get data for graph.

//     return (
//         <div>
            
//         </div>
//     );
// };

// export default FeederGraph;