import React, { useEffect } from "react";
import "./css/settings.css";
import {Slider, Switch, MantineProvider, Stack, Card, Text, Group, Button, Select} from "@mantine/core";
import "@mantine/core/styles.css";
import GraphSelect from "./GraphSelect";
import { useContext, useState } from "react";
import { AppContext } from "../AppContext"
import SaveChanges from "./SaveChanges";

const Settings = ({linkForce, setLinkForce, showNodeLabels, setShowNodeLabels, onClose}) => {
  const handleToggleLabels = () => setShowNodeLabels((prev) => !prev);
  const handleForceChange = (value) => setLinkForce(value);
  const [saveChangesOpen, setSaveChangesOpen] = useState(false);
  const {currentFile, toggleCurrentFile, graphSelectOpen, toggleGraphSelect} = useContext(AppContext);

  const handleOpenGraphSelect = () => {
    //if(currentFile !match the backend file)
      //then open save 

    // if(saveChangesOpen === false)
      toggleGraphSelect();
  }

  // const handleGenerateClick = () => {
  //   const numNodes = parseInt(document.getElementById("numNodesInput").value, 10);
  //   if (!isNaN(numNodes) && numNodes > 0) {
  //     const newJsonData = generateTest(numNodes);
  //     // setJsonFiles([...jsonFiles, newJsonData]);
  //     // setJsonIndex(jsonFiles.length);
  //   } else {
  //     alert("Invalid number of nodes.\nEntry must be > 1 node");
  //   }
  // };
  
  return (
      <MantineProvider>

    <div>
      {saveChangesOpen && <SaveChanges close={() => setSaveChangesOpen(false)} />}
    </div>

        <Stack gap="md" align="stretch" justify="flex-start"> 
        {/*Open Graph Select */}

          <Button onClick={handleOpenGraphSelect} mt="md"> Select New File</Button>
          {graphSelectOpen && (<GraphSelect onClose={onClose}/>)}


        {/* Generate Random Test
        <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Text size="md">Generate Random Test File</Text>
          <TextInput label="Number of Nodes" placeholder="Enter # Nodes" id="numNodesInput" mt="md"/>
          <Button onClick={handleGenerateClick} mt="md"> Generate Test File</Button>
          </Card> */}

          {/* Toggle Node Labels */}
          <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Group justify="space-between" >
            <Text size="md" weight={500}> Node Labels </Text>
            <Switch size="lg" id="toggleNodeLabels" checked={showNodeLabels} onChange={handleToggleLabels} onLabel="ON" offLabel="OFF"/>
          </Group>
          </Card>

          {/* Remove Disconnected Node */}
          <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Group justify="space-between" >
            <Text size="md" weight={500}> Disconnected Nodes </Text>
            <Switch size="lg" id="toggleDisconnectedNode" checked={showNodeLabels} onChange={handleToggleLabels} onLabel="Show" offLabel="Hide"/>
          </Group>
          </Card>

          {/* Toggle Graph Forces */}
          <Card shadow="sm" padding="md" radius="md" withBorder>
            <Text size="md" weight={500} mb='xl'> Edit Force Strength </Text>
          <Slider step={10} min={10} max={50} labelAlwaysOn mb="md"
          value={linkForce} onChangeEnd={handleForceChange} 
            marks={[
              { value: 10, label: '10' },
              { value: 20, label: '20' },
              { value: 30, label: '30' },
              { value: 40, label: '40' },
              { value: 50, label: '50' },
              ]} />
          </Card>
        </Stack>
      </MantineProvider>

  );
};

export default Settings;
