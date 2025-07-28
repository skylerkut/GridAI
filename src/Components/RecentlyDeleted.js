import React, { useState } from "react";
import { MantineProvider, Modal, Text, Stack, Card, Group, Button } from '@mantine/core';

const RecentlyDeleted = ({delList, setDelList, close}) => {

    const recoverFile = (id) =>{
        const recoveredGraph = delList.find((diagram) => diagram._id === id);
        postGraph(recoveredGraph);
        setDelList((prevGraphs) => prevGraphs.filter((graph) => graph._id !== id));
    }

    const postGraph = async (recoveredGraph) => {
        const { _id, ...updatedDiagram } = recoveredGraph; //Remove _id field
        try {
            const response = await fetch(`/api/diagrams/`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(updatedDiagram), 
            });
            if (!response.ok) {
              throw new Error(`Error posting data! \nStatus: ${response.status}`);
            }
            const json = await response.json();
            console.log("Post Response", json);
            return json; 
          } catch (error) {
            console.error("Error posting data:", error);
            throw error;
          }
      };

    return (
        <MantineProvider>
    
          <Modal className="modal" opened={true} onClose={close} radius="lg" size="lg">
          <Group justify="space-between" spacing="md"  style={{marginBottom: "20px", marginLeft: "20px", marginTop: "10px"}}> 
            <Text align="center" weight={700} size="xl">Recently Deleted Files </Text>
            </Group>
    
    
            <Stack spacing="lg">
              {delList?.map((graph, index) => (
                <Card shadow="sm" radius="md" m="sm" withBorder key={graph.id || index}>
                  <Text weight={500} size="lg" mb="sm">
                    {graph.title}
                  </Text>
                  <Text size="sm" mb="md">
                    {graph.description}
                  </Text>
                  <Text size="sm" mb="md">
                    <b>Category:</b> {graph.category}
                  </Text>
                  <Text size="sm" mb="md">
                    <b>Created On:</b> {new Date(graph.createdAt).toLocaleDateString()}
                  </Text>
                  <Button color="red" size="lg"
                style={{ position: "absolute", top: "10px", right: "10px" }}
                onClick={() => recoverFile(graph._id)}
                title="Delete Graph"
              >Recover</Button>
                </Card>
              ))}
            </Stack>
          </Modal>
        </MantineProvider>
    
      );
}
export default RecentlyDeleted;