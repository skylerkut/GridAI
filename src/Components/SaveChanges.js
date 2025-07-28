import React from 'react';
import { Modal, Button, Group, MantineProvider } from '@mantine/core';

const SaveChanges = ({close}) => {


  return (
    // <div style={{ position: 'absolute', top: 20, left: '50%'}}>
    //   <Paper padding="md" shadow="md" style={{ maxWidth: 400 }} >
    //     <div style={{ marginBottom: 10 }}>
    //       <strong>Would you like to save your changes?</strong>
    //     </div>
    //     <Group position="center">
    //       <Button onClick={() => { /* Add save logic here */ }}>Yes, Save</Button>
    //       <Button onClick={onClose}>No</Button>
    //     </Group>
    //   </Paper>
    // </div>
<MantineProvider>
    <Modal
      opened={true}
      onClose={close}
      centered
      title="Save your changes?"
      overlayProps={{opacity: 0.5,   blur: 3}}
    >
      <Group position="center">
        <Button onClick={() => { /* Add save logic here */ }}>Yes, Save</Button>
        <Button onClick={close}>No</Button>
      </Group>
    </Modal>
</MantineProvider>
  );
};

export default SaveChanges;