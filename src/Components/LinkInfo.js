import React from 'react';
import Draggable from 'react-draggable';
import "./css/components.css"
// import {getIcons} from "../Icons/importIcons";
import icons from '../Icons/fetchIcons';

const LinkInfo = ({ link, onClose, lastPositionLinks, setLastPositionLinks, onCollapse }) => {
  if (!link) return null; // Hide component if no node is selected
  // const icons = getIcons(); 

  const handleClose = () => {
    setLastPositionLinks({ x: lastPositionLinks.x, y: lastPositionLinks.y });
    onClose(); 
  };

  return (
    <Draggable defaultPosition={lastPositionLinks} onStop={(e, data) => {setLastPositionLinks({ x: data.x, y: data.y }); }}>
    <div className="link-info">
    <div className="header">
    <h2 className="info-title">Link Details</h2>
      <button className="close-button" onClick={handleClose}> &times; </button>
      <button className="collapse-button" onClick={onCollapse}> <img src={icons.cb} style={{ width: '24px', height: '24px' }}></img></button>
    </div>
      <p><strong>Source:</strong> {link.source.name} : [ {Math.floor(link.source.x)}, {Math.floor(link.source.y)} ]</p>
      <p><strong>Target:</strong> {link.target.name} : [ {Math.floor(link.target.x)}, {Math.floor(link.target.y)} ]</p>
      <p><strong>Index:</strong> {link.index}</p>
    </div>
    </Draggable>
  );
};

export default LinkInfo;