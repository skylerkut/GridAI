import React, { useEffect,  useContext, useState } from "react";
import "./css/settings.css";
import { MantineProvider, Divider, Button, Text, ActionIcon,  } from "@mantine/core";
import "@mantine/core/styles.css";
import { AppContext } from "../AppContext"
import icons from "../Icons/fetchIcons";
import { IconEdit } from "@tabler/icons-react";

const OptionsIcons = () => {
  const {iconArray, toggleIconArray} = useContext(AppContext);

    const putIcon = async (updatedIcon) => {     //Updated Icon
        try {
          const response = await fetch(`/api/icons/${iconArray[0].name}`, {//Add icon ID
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json', 
            },
            body: JSON.stringify(updatedIcon), 
          });
          if (!response.ok) {
            throw new Error(`Error updating icon! \nStatus: ${response.status}`);
          }
          const json = await response.json();
          console.log('icon update response:', json);
        } catch (error) {
          console.error('Error updating icon:', error);
        }
      };

    const handleAddNew = () => {
        //open text inputs in each slot
        //take text inputs and post new icon
        //iconArray will update with useEffect, adding the icon
    }


      return (
        <MantineProvider>

            <div style={{ display: 'flex', alignItems: 'center', fontWeight: 'bold' }}>
                <span style={{ width: '50px' }}>Icon</span>
                <span style={{ width: '100px', marginLeft: '10px' }}>Type</span>
                <span style={{ width: '300px', marginLeft: '10px' }}>Name</span>
                <span style={{ marginLeft: 'auto' }}>Edit</span>
            </div>
            <Divider />

            {iconArray.map((icon, index) => (
            <div>
                <div key={index} style={{ display: 'flex', alignItems: 'center', padding: '10px 0' }}>
                    <img src={icon.src} alt={icon.name} width={30} height={30} style={{ borderRadius: '3px' }} />
                    <Text style={{ width: '100px', marginLeft: '20px' }}>{icon.type}</Text>
                    <Text style={{ width: '300px', marginLeft: '10px' }}>{icon.name}</Text>
                    {/* TODO: edit icons and add custom icons */}
                    <ActionIcon>
                        <IconEdit>Edit</IconEdit>
                    </ActionIcon> 
                </div>
                <Divider />
            </div>
            ))}
            <Button style={{position: "fixed", bottom:30, right: 15,}} >
                Add New
            </Button>
    </MantineProvider>
    );
};

export default OptionsIcons;