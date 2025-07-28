import * as d3 from "d3";
import { select } from "d3";
import { countEdges } from "./graphHelperFuncs";

const SetupGraph = (svgRef, nodesArr, linksArr, iconArray) => {

    const svg = select(svgRef.current).attr("viewBox", [
      -window.innerWidth / 2,
      -window.innerHeight / 2,
      window.innerWidth,
      window.innerHeight,
    ]);

    //Remove previous nodes on refresh
    svg.selectAll("*").remove();

    //Graph group is what is getting dragged, it contains everything in the graph
    const graphGroup = svg.append("g").attr("class", "graphGroup");
    //node and linkGroup are for adding svg to the Elements
    const linkGroup = graphGroup.append("g").attr("class", "links");
    const nodeGroup = graphGroup.append("g").attr("class", "nodes");
    let iconPath = "";

    //node and linkElements are svg for the d3 nodes and links
    const linkElements = linkGroup
      .selectAll("line")
      .data(linksArr)
      .enter()
      .append("line")
      .attr("stroke", "black")
      .attr("stroke-width", 4);

     let edgeCount = countEdges(nodesArr, linksArr);
     let countIndex = -1;

    const nodeElements = nodeGroup
      .selectAll("g")
      .data(nodesArr)
      .enter()
      .append("g")
      .each(function (d) {
        countIndex++;
        switch (d.type) {
          case "cb": iconPath = iconArray.find(icon => icon.type === "cb").src; break;
          case "sub": iconPath = iconArray.find(icon => icon.type === "sub").src; break;
          case "gen": iconPath = iconArray.find(icon => icon.type === "gen").src; break;
          case "bus1": iconPath = iconArray.find(icon => icon.type === "bus1").src; break;
          case "grd": iconPath = iconArray.find(icon => icon.type === "grd").src; break;
          case "bat": iconPath = iconArray.find(icon => icon.type === "bat").src; break;
          case "mot": iconPath = iconArray.find(icon => icon.type === "mot").src; break;
          case "sw": iconPath = iconArray.find(icon => icon.type === "sw").src; break;
          case "met": iconPath = iconArray.find(icon => icon.type === "met").src; break;
          case "tr": 
            if (edgeCount[countIndex] === 3) {
              iconPath = iconArray.find(icon => icon.type === "tr3").src; // Triple circle
            } else if (edgeCount[countIndex] === 2) {
              iconPath = iconArray.find(icon => icon.type === "tr2").src;  // Double circle
            } else {
              iconPath = iconArray.find(icon => icon.type === "tr1").src; // Single circle
            }
            break;
          default: iconPath = iconArray.find(icon => icon.type === "cb").src;
        }

        //Select the d3 node and attach the svg icon
                d3.select(this)
                  .append("image")
                  .attr("xlink:href", iconPath)
                  .attr("width", 40) //Icon size
                  .attr("height", 40)
                  .attr("x", -20) //center Icon
                  .attr("y", -20);
              });

        return { nodeElements, linkElements, graphGroup, svg };
    };
                
export default SetupGraph;