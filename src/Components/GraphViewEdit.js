import React, { useState } from "react";
import { MantineProvider, Modal, TextInput, Text, Grid, Stack, Card, Button, Group, Badge } from '@mantine/core';

const GraphViewEdit = ({graph, close}) => {
  const [updatedGraph, setUpdatedGraph] = useState(graph);
  const [expandedCard, setExpandedCard] = useState(null);
  if (!graph) return null;
  const typeColorMap = {};

  const toggleExpand = (index) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  const postUpdate = async () => {
    try {
      const response = await fetch(`/api/diagrams/${graph._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify(updatedGraph), 
      });
      if (!response.ok) {
        throw new Error(`Error updating feed! \nStatus: ${response.status}`);
      }
      const json = await response.json();
      console.log('Feed update response:', json);
    } catch (error) {
      console.error('Error updating feed:', error);
    }
  };

  const handleChange = (field, value) => {
    setUpdatedGraph((prevGraph) => ({
      ...prevGraph,
      [field]: value,
    }));
  };

  const handleNodeChange = (index, field, value) => {
    const updatedNodes = [...updatedGraph.nodes];
    updatedNodes[index] = { 
      ...updatedNodes[index], 
      [field]: value 
    };

    setUpdatedGraph((prevGraph) => ({
      ...prevGraph,
      nodes: updatedNodes,
    }));
  };


  const generateRandomColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return checkColor({ r, g, b });
  };

  const checkColor = ({ r, g, b }) => {
    for (const type in typeColorMap) {
      let color = typeColorMap[type];
      if (Math.abs(color.r - r) < 20) r = (r + 20) % 256;
      if (Math.abs(color.g - g) < 20) g = (g + 20) % 256;
      if (Math.abs(color.b - b) < 20) b = (b + 20) % 256;
    }
    return { r, g, b };
  };

  //If type doesn't have a color, generate a new one and store it
  const getTypeColor = (type) => {
    let colorResult;
    if (!typeColorMap[type]) {
      colorResult = generateRandomColor();
    } else {
      colorResult = typeColorMap[type];
    }
    typeColorMap[type] = colorResult; //Store or overwrite the color for the type
    const color = typeColorMap[type];
    return `rgb(${color.r}, ${color.g}, ${color.b})`;
  };

return (
  <MantineProvider>
    <Modal opened={true} size="xl" padding={30} withCloseButton={false} onClose={close}>
    <Group justify="space-between" align="center" style={{ width: '100%' }}>
      <Text>{updatedGraph.title}</Text>
    <Group>
      <Button onClick={postUpdate}>Apply Changes</Button>
      <Button onClick={close}>Close</Button>
    </Group>
    </Group>
      <Card radius="lg" withBorder style={{marginTop: '15px'}}>
      <Stack gap="md" align="flex-start" justify="Space-around"> 
      <Text>Created On {updatedGraph.createdAt || new Date().toLocaleString()}</Text>
      <Group justify="space-between" spacing="sm" >
        <Text style={{marginRight: '50px'}}> Title</Text>
        <TextInput value={updatedGraph.title} 
        onChange={(e) => handleChange('title', e.target.value)}  />
      </Group>
      <Group justify="space-between" spacing="sm">
        <Text> Description</Text>
        <TextInput value={updatedGraph.description} 
        onChange={(e) => handleChange('description', e.target.value)} />
      </Group>
      <Group justify="space-between" spacing="sm">
        <Text style={{marginRight: "17px"}}> Category</Text>
        <TextInput value={updatedGraph.category} 
        onChange={(e) => handleChange('category', e.target.value)}/>
      </Group >
      <Group justify="space-between" spacing="sm">
          <Text style={{marginRight: "50px"}}> Kind </Text>
          <TextInput value={updatedGraph.kind} 
          onChange={(e) => handleChange('kind', e.target.value)}/>
            </Group>
      </Stack>
      </Card>


      {/* Render nodes */}
      <div>
      <h3>Nodes:</h3>
        <Grid gutter="lg">
          {graph.nodes.map((node, index) => (
            <Grid.Col
            span={expandedCard === index ? 12 : 6} // Take full row if expanded
            sm={expandedCard === index ? 12 : 4}
            md={expandedCard === index ? 12 : 3}
            key={index}
          >
              <Card shadow="md" padding="lg" style={{ minHeight: expandedCard === index ? 300 : 140 }}>
                <Card.Section>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem' }}>
                <Badge style={{ backgroundColor: getTypeColor(node.type), color: '#fff' }} size="lg">{node.type}</Badge>
                </div>
                </Card.Section>
                  <Text weight={500}>{node.name}</Text>
                  <Text size="sm" style={{ marginBottom: '0.5rem' }}>{node.text.static.label1}</Text>
                  <Text size="sm">{node.text.static.label2}</Text>

                {expandedCard === index && ( // Render additional details when expanded
                <div style={{ marginTop: "1rem" }}>
                  <Text size="sm"><b>Capacity:</b> {node.data.capacity}</Text>
                  <Text size="sm"><b>Voltage:</b> {node.data.voltage}</Text>
                  <Text size="sm"><b>Critical:</b> {node.data.isCritical ? "Yes" : "No"}</Text>
                </div>
              )}
                  <Button variant="light" color="blue"
                  style={{ position: 'absolute', top: '1rem', right: '1rem' }}
                  onClick={() => toggleExpand(index)}>
                  {expandedCard === index ? "Collapse" : "Expand"}
                </Button>
              </Card>
            </Grid.Col>
          ))}
        </Grid>
      </div>

     </Modal>
  </MantineProvider>
  );
};

export default GraphViewEdit;