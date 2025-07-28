import React from 'react';
import Draggable from 'react-draggable';
import "./css/components.css"
// import {getIcons} from "../Icons/importIcons";
import { Badge, MantineProvider, Divider } from '@mantine/core';
// import FeederGraph from "./FeederGraph";
import collapseLeft from '../Icons/collapseLeft.svg';
import collapseRight from '../Icons/collapseRight.svg';
import generatorIcon from '../Icons/nodeIcons/Generator.svg';

const NodeInfo = ({ node, onClose, lastPosition, setLastPosition, onCollapse}) => {
  if (!node) return null; // Hide component if no node is selected
  // const icons = getIcons(); 
  
  const handleClose = () => {
      setLastPosition({ x: lastPosition.x, y: lastPosition.y });
      onClose(); 
    };

    // Function to process data and return parameter details
    const getDetailLines = (data, isDynamic = false) => {
      return Object.entries(data).map(([key, value]) => ({
        label: key.replace(/([A-Z])/g, ' $1').toUpperCase(),
        value: isDynamic ? value.replace(/{.*?}/, 'Dynamic Value') : value
      }));
    };
  
    // Generate the detail lines
    const staticDetails = node.text.static ? getDetailLines(node.text.static) : [];
    const dynamicDetails = node.text.dynamic ? getDetailLines(node.text.dynamic, true) : [];
    const dataDetails = node.data ? getDetailLines(node.data) : [];
  
  return (
  <MantineProvider>
  <Draggable defaultPosition={lastPosition} onStop={(e, data) => {setLastPosition({ x: data.x, y: data.y }); }}>

  <div className="node-info" style={{ margin: '10px', padding: '25px', border: '1px solid #ccc' }}>
  <div className="header" style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
      <h2 className="info-title" style={{marginRight: '10px'}}>{node.name}</h2>
      <Badge color='blue' size="md">{node.type}</Badge>
      <div style={{ marginLeft: 'auto' }}> 
        <button className="close-button" onClick={handleClose}> &times; </button>
        <button className="collapse-button" onClick={onCollapse}> <img src={collapseLeft} style={{ width: '24px', height: '24px' }}></img></button>
      </div>
    </div>

    <div style={{ marginBottom: '10px' }}>
      <p><strong>ID:</strong> {node.id}</p>
      <img src={generatorIcon} alt="node icon" style={{ width: '45px', height: '45px' }} />
      <p> [ X: {Math.floor(node.fx)}, Y: {Math.floor(node.fy)} ]</p>
    </div>

<div>
                {/* Static details */}
              {staticDetails.length > 0 && ( <>
              {staticDetails.map(({ label, value }) => (
                <p> <strong>{label}:</strong> {value}</p>
              ))}
            </>
          )}
 
 </div>
          {/* Data details */}
          {dataDetails.length > 0 && (<>
            <Divider my="sm" label="Data" />
              {dataDetails.map(({ label, value }) => (
                <p key={label}><strong>{label}:</strong> {value}</p>
              ))}
            </>
          )}

          {/* Dynamic details */}
          {dynamicDetails.length > 0 && (<>
              <Divider my="sm" label="Dynamic" />
              {dynamicDetails.map(({ label, value }) => (
                <p key={label}><strong>{label}:</strong> {value}</p>
              ))}
            </>
          )}

{/* todo: add graph component of dynamic data and finish styling */}
    {/* <FeederGraph node={node}></FeederGraph> */}
      </div>

  </Draggable>
  </MantineProvider>

  );
};

export default NodeInfo;
