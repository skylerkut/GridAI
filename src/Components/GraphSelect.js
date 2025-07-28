import React, { useContext,useEffect, useState } from "react";
import { AppContext } from "../AppContext";
import "@mantine/core/styles.css";
import { Modal, Button, MantineProvider, Text, Group, Stack, Card, ActionIcon, Paper } from "@mantine/core";
import { IconTrash, IconFilePlus, IconHistoryToggle } from "@tabler/icons-react";
import GraphViewEdit from "./GraphViewEdit";
import RecentlyDeleted from "./RecentlyDeleted";

const GraphSelect = ({onClose}) => {
  const [availableGraphs, setAvailableGraphs] = useState([]); 
  const {currentFile, toggleCurrentFile, graphSelectOpen, toggleGraphSelect} = useContext(AppContext);
  const [deletedFiles, setDeletedFiles] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [delOpen, setDelOpen] = useState(false);
  const [editingGraph, setEditingGraph] = useState(null);

  const handleOpenFile = (graph) => {
    setEditingGraph(graph);
    setIsOpen(true);
  }
 
  const postDelete = async (id) => {
    try {
      const response = await fetch(`/api/diagrams/${id}`, {
        method: 'DELETE',
      });
    if (!response.ok) {
      throw new Error(`"Error deleting data! \nStatus: ${response.status}`);
    }
    const json = await response.json();
    console.log("Post Delete Response", json);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch('/api/diagrams'); //Get all diagrams
      if (!response.ok) {
        throw new Error(`"Error fetching data! \nStatus: ${response.status}`);
      }
      const json = await response.json();
      console.log("Fetch All Graphs Response", json);
      setAvailableGraphs(json);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleRecentlyDeleted = async (id) => {
    try {
      const response = await fetch(`/api/diagrams/${id}`); //Get diagram by id
      if (!response.ok) {
        throw new Error(`"Error fetching data! \nStatus: ${response.status}`);
      }
      const json = await response.json();
      console.log("Fetched Graph", json);

      setDeletedFiles((deletedData) => [...deletedData, json]);
      console.log("Recently Deleted:", deletedFiles);

    } catch (error) {
      console.error("Error fetching graph:", error);
    }
  };

  const handleOpenRecentlyDeleted = () => {
    setDelOpen(true);
  };

  const handleFileSelect = (cFile) => {
    if (typeof onClose === "function") {
      onClose(); // This returns an error, but the component closes anyway... remove and it wont close...
    } else {
      console.error("onClose is not a function!", onClose);
    }
      toggleGraphSelect();                 
      toggleCurrentFile(cFile);    
      console.log("currentFile", currentFile);
  };

  const handleDelete = (id) => {
    handleRecentlyDeleted(id);
    console.log(`Deleting graph with id: ${id}`);
    postDelete(id);
    setAvailableGraphs((prevGraphs) => prevGraphs.filter((graph) => graph._id !== id));
  };

  const handleAdd = () => {
    
  };

//Fetch Available Graphs
useEffect(() => {
  fetchData();
}, [isOpen, delOpen]);

console.log("Available Graphs", availableGraphs);
console.log("Recently Deleted", deletedFiles);


  return (
    <MantineProvider>

    <div>
      {isOpen && <GraphViewEdit graph={editingGraph} close={() => setIsOpen(false)} />}
    </div>

    <div>
      {delOpen && <RecentlyDeleted delList={deletedFiles} setDelList={setDeletedFiles} close={() => setDelOpen(false)} />}
    </div>

      <Modal className="modal" opened={true} onClose={toggleGraphSelect} radius="lg" size="lg" withCloseButton={false}>
      <Group justify="space-between" spacing="md"  style={{marginBottom: "20px", marginLeft: "20px", marginTop: "10px"}}> 
        <Text align="center" weight={700} size="xl">Select a graph </Text>

        <Group justify="space-between" spacing="md"  style={{marginBottom: "20px", marginLeft: "20px",  marginTop: "10px"}}>
          <ActionIcon color="blue" variant="transparent" size="lg" title="Recently Deleted"
           onClick={() => {
            if(deletedFiles.length > 0){
              setDelOpen(true)
              }
            }}>
            <IconHistoryToggle size = {28}></IconHistoryToggle>
          </ActionIcon>

          <ActionIcon color="blue" variant="transparent" size="lg" title="Add New Graph">
            <IconFilePlus size = {28}></IconFilePlus>
          </ActionIcon>

          </Group>
        </Group>


        <Stack spacing="lg">
          {availableGraphs?.map((graph, index) => (
            <Card shadow="sm" radius="md" m="sm" withBorder key={graph.id || index}>
               <ActionIcon color="red" variant="transparent" size="lg"
                style={{ position: "absolute", top: "10px", right: "10px" }}
                onClick={() => handleDelete(graph._id)}
                title="Delete Graph"
              >
              <IconTrash size={18} />
              </ActionIcon>
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
              <Group position="apart" mt="md">
                <Button variant="outline" size="sm" color="blue"
                  onClick={() => { handleOpenFile(graph); }}>
                  View File
                </Button>
                <Button size="sm" color="green"
                  onClick={() => {
                      handleFileSelect(graph);
                  }}>
                  Load SLD
                </Button>
              </Group>
            </Card>
          ))}
        </Stack>
      </Modal>
    </MantineProvider>

  );
};

export default GraphSelect;
