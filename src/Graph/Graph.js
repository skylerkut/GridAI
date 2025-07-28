import * as d3 from "d3";
import React, { useEffect, useRef, useState, useContext } from "react";
import NodeInfo from "../Components/NodeInfo";
import LinkInfo from "../Components/LinkInfo";
import Settings from "../Components/Settings";
import "../Components/css/components.css";
import { AppContext } from "../AppContext";
import { useDisclosure } from "@mantine/hooks";
import { Drawer, Button, MantineProvider, ActionIcon } from "@mantine/core";
import setupGraph from './setupGraph';
import { IconSettings, IconIcons } from "@tabler/icons-react";
import OptionsIcons from "../Components/OptionsIcons";
import internalIcons from "../Icons/internalIcons";


const Graph = () => {
  const svgRef = useRef();
  //Nodes and links components
  const [selectedNode, setSelectedNode] = useState(null);
  const [selectedLink, setSelectedLink] = useState(null);
  const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 });
  const [lastPositionLinks, setLastPositionLinks] = useState({ x: 0, y: 0 });
  const [collapseNode, setCollapseNode] = useState(false);
  const [collapseLink, setCollapseLink] = useState(false);
  //Settings
  const [linkForce, setLinkForce] = useState(30);
  const [showNodeLabels, setShowNodeLabels] = useState(true);
  const [showDisconnectNodes, setShowDisconnectNodes] = useState(false);
  const [opened, { open, close }] = useDisclosure(false); //Settings
  const [iconsOpen, setIconsOpen] = useState(false); //Icons
  //Graph
  const [nodesArr, setNodes] = useState([]);
  const [linksArr, setLinks] = useState([]);
  const {currentFile, iconArray} = useContext(AppContext);
  //Functions
  const handleCloseNodeInfo = () => setSelectedNode(null);
  const handleCloseLinkInfo = () => setSelectedLink(null);
  const toggleCollapseNode = () => setCollapseNode(!collapseNode);
  const toggleCollapseLink = () => setCollapseLink(!collapseLink);

    //Save graph
    const postUpdate = async () => {
      //Update nodes and links in currentFile with the new position nodes
      currentFile.nodes = nodesArr;
      console.log("Saved Nodes Array:", nodesArr);

      try {
        const response = await fetch(`/api/diagrams/${currentFile._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json', 
          },
          body: JSON.stringify(currentFile), 
        });
        if (!response.ok) {
          throw new Error(`Error updating currentFile! \nStatus: ${response.status}`);
        }
        const json = await response.json();
      console.log("Updated currentFile", currentFile);
      } catch (error) {
        console.error('Error updating currentFile:', error);
      }
    };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/diagrams/${currentFile._id}`); //Get current diagram
        if (!response.ok) {
          throw new Error(`Error fetching data! \nStatus: ${response.status}`);
        }
        else {
        const json = await response.json();
        console.log("Fetch Current File Response", json);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [currentFile]);


  //Parse Nodes and Links
  useEffect(() => {
    console.log("currentFile", currentFile);
    const currData = currentFile;
    const nodesArr = currData.nodes.map(({_id, ...rest}) => ({ ...rest }));

    // Construct links referencing nodeID
    const linksArr = currData.links.map((link) => {
        const sourceNode = nodesArr.find((node) => node.id === link.source);
        const targetNode = nodesArr.find((node) => node.id === link.target);
        return {
          source: sourceNode ? sourceNode.id : null,
          target: targetNode ? targetNode.id : null, 
        };
      })
      .filter((link) => link.source && link.target); //Filter out null links

    // let count = 0;
    // if(!showDisconnectNodes){ //filter out disconnected nodes
    //   nodesArr.forEach(node => {
    //     linksArr.forEach(link => {
    //       if(node.id === link.source || node.id === link.target){
    //         count++;
    //       }
    //     })
    //     if(count == 0){
    //       nodesArr.filter((node) => node.id === node.id); //filter out node if it does not show up in links array
    //     }
    //     count = 0;
    //   });
    //   }

    setNodes(nodesArr);
    setLinks(linksArr);

    console.log("Nodes Array:", nodesArr);
    console.log("Links Array:", linksArr);

    }, [currentFile, linkForce, showDisconnectNodes]);

    //Null x and y so nodes are force directed and no longer fixed
    const reloadLayout = async () => {
       nodesArr.forEach((node) => {
        if (node.x !== undefined && node.y !== undefined) {
          node.fx = undefined; 
          node.fy = undefined;
          node.x = undefined;
          node.y = undefined;
        }
      });
      loadForceLayout();
    }

  //Layout Select
  useEffect(() => {
      loadForceLayout();
    }, [nodesArr, linksArr, showNodeLabels, linkForce]);


// Function to create force layout
  const loadForceLayout = () => {
    const { nodeElements, linkElements, graphGroup, svg } = setupGraph(svgRef, nodesArr, linksArr, iconArray);

      // // Position busbars
      // nodesArr.forEach((node) => {
      //   if (node.type === "bus1") {
      //     node.x = 100; 
      //     node.y = 50;
      //   }
      // });

    // Lock positions for nodes with initial x and y
    nodesArr.forEach((node) => {
      if (node.x !== undefined && node.y !== undefined) {
        node.fx = node.x; 
        node.fy = node.y;
      }
    });

    const simulation = d3
      .forceSimulation(nodesArr)
      .force("collide", d3.forceCollide(100))
      .force("link",d3.forceLink(linksArr).id((d) => d.id).distance(linkForce))
      .force("charge", d3.forceManyBody().strength(-500))
      .force("x", d3.forceX(1))
      .force("y", d3.forceY(0.5))
      .on("tick", () => {
        //Set X and Y
        linkElements
          // .each(function(d) { 
          //   d.source.y -= k; 
          //   d.target.y += k; 
          // }) //Move links into weak tree
          .attr("x1", (d) => d.source.x)
          .attr("y1", (d) => d.source.y)
          .attr("x2", (d) => d.target.x)
          .attr("y2", (d) => d.target.y);

        nodeElements.attr("transform", (d) => `translate(${d.x}, ${d.y})`);
      })
      .on("end", () => {
        nodeElements.each(function (d) {
          d.fx = d.x;
          d.fy = d.y;
        });
      }); //end sim

    //Zoom and drag for entire graph
    const zoomed = ({ transform }) => {
      graphGroup.attr("transform", transform);
    };

    svg.call(d3.zoom().extent([
          [-window.innerWidth / 2, -window.innerHeight / 2],
          [window.innerWidth, window.innerHeight],
        ])
        .scaleExtent([0.3, 5])
        .on("zoom", zoomed)
    );

    //Drag graph
    const dragSVG = d3.drag().on("drag", (event) => {
      graphGroup.attr("transform", `translate(${event.dx}, ${event.dy})`);
    });
    
    graphGroup.call(dragSVG);

    //Drag nodes
    const drag = d3
      .drag()
      .on("start", () => svg.attr("cursor", "grabbing"))
      .on("drag", (event, d) => {
        svg.attr("cursor", "grabbing");
        d.fx = event.x;
        d.fy = event.y;
        setSelectedNode({ ...d, fx: event.x, fy: event.y });
        simulation.alpha(0.0001).restart();
      })
      .on("end", () => svg.attr("cursor", "default"));

    //Node Actions
    nodeElements
      .call(drag)
      .on("click", (event, d) => {
        console.log("selectNode d", d);
        setSelectedNode(d);
        setCollapseNode(false);
      })
      .on("mouseover", function () {
        svg.attr("cursor", "grab");
        var g = d3.select(this);
        g.select("image").attr("height", 45).attr("width", 45);
      })
      .on("mouseout", function () {
        svg.attr("cursor", "default");
        var g = d3.select(this);
        g.select("image").attr("height", 40).attr("width", 40);
      });

    if (showNodeLabels) {
      nodeElements
        .append("text")
        .attr("dx", 22)
        .attr("dy", ".35em")
        .text(function (d) {
          return d.name;
        });
    }

    //Link Actions
    linkElements
      .on("click", (event, d) => {
        setSelectedLink(d);
        setCollapseLink(false);
      })
      .on("mouseover", function () {
        var g = d3.select(this);
        g.attr("stroke-width", 6).attr("stroke", "black");
      })
      .on("mouseout", function () {
        var g = d3.select(this);
        g.attr("stroke", "black").attr("stroke-width", 4);
      });

    return () => {
      svg.call(d3.zoom().on("zoom", null));
      return () => simulation.stop();
    };
  }

  return (
    <div>
      <svg ref={svgRef}></svg>

      <MantineProvider>

        <Button onClick={postUpdate} style={{position: "fixed", top: 15, right: 15,}}>Save Layout</Button>
        <Button onClick={reloadLayout} style={{position: "fixed", top: 15, right: 145,}}>Reload Layout</Button>

        {/* Settings Drawer and button */}
        <ActionIcon onClick={open} style={{position: "fixed", top: 15, left: 15}} variant="transparent" size={48} title="Graph Settings">
            <IconSettings className="settings-button" size={42} color="black"/>
        </ActionIcon>

        <Drawer
          opened={opened}
          onClose={close}
          offset={10}
          radius={8}
          overlayProps={{ backgroundOpacity: 0.1 }}
          title={<div className="settings-header">Graph Options</div>}
          padding="xl"
          size="sm"
          position="left"
          closeButtonProps={{
            "aria-label": "Close Settings",
            className: "settings-close",
          }}
        >
          <Settings
            linkForce={linkForce}
            setLinkForce={setLinkForce}
            showNodeLabels={showNodeLabels}
            setShowNodeLabels={setShowNodeLabels}
            onClose={close}
          />
        </Drawer>

        {/* Icons drawer and button */}
        <ActionIcon onClick={() => setIconsOpen(true)} style={{position: "fixed", top: 15, left: 75}} variant="transparent" size={48} title="Icon Settings">
            <IconIcons className="icons-button" size={42} color="black"/>
        </ActionIcon>

        {iconsOpen && (
  <Drawer
    opened={iconsOpen}
    onClose={() => setIconsOpen(false)}
    offset={10}
    radius={8}
    overlayProps={{ backgroundOpacity: 0.1 }}
    title={<div className="settings-header">Icon Settings</div>}
    padding="xl"
    size="sm"
    position="left"
    closeButtonProps={{
      "aria-label": "Close Icon Settings",
      className: "settings-close",
    }}
  >
    <div>
      {console.log("icons open")}
      <OptionsIcons />
    </div>
  </Drawer>
)}

      </MantineProvider>

      <div style={{ position: 'absolute', top: '75px', right: '10px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
        {selectedNode && (
        <button className="collapse-graph-button" onClick={toggleCollapseNode}  style={{background: 'transparent', border: 'none' }}>  
          <img src={collapseNode ? internalIcons.collapseLeft : internalIcons.collapseRight}
              style={{ width: '24px', height: '24px'}}
            ></img>
        </button>
        )}

        {selectedLink && (
        <button className="collapse-graph-button" onClick={toggleCollapseLink} style={{background: 'transparent', border: 'none' }}>  
          <img src={collapseLink ? internalIcons.settingsOpen : internalIcons.settingsOpen}
              style={{ width: '24px', height: '24px' }}>
            </img>
        </button>
        )}
      </div>

      {selectedNode && !collapseNode && (
        <NodeInfo
          node={selectedNode}
          onClose={handleCloseNodeInfo}
          lastPosition={lastPosition}
          setLastPosition={setLastPosition}
          onCollapse={() => setCollapseNode(true)}
        />
      )}
      {selectedLink && !collapseLink &&(
        <LinkInfo
          link={selectedLink}
          onClose={handleCloseLinkInfo}
          lastPositionLinks={lastPositionLinks}
          setLastPositionLinks={setLastPositionLinks}
          onCollapse={() => setCollapseLink(true)}
        />
      )}
    </div>
  );
};
export default Graph;
