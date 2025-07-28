# SLD ReadMe

## Overall Purpose
To display the given nodes and links in a simple Single Line Diagram format, emulating an electrical diagram. Examples are available in the file this readme.md is located in. 
## Common Errors & Troubleshooting
> If nothing displays in a component, the likely issue is that it needed to get something from the backend and didn't. 

> If you import any icons, be sure nothing has the same name as the imported icon. For example if you import an icon called "IconSettings" for a settings icon, make sure your icon settings component is not also named IconSettings. 

## Background
### SLD Librarys for layout that have already been tried
- MSAGL
- D3
- React Flow
- Yfiles

### Top Level TODO
- Make DockerFile for startup and change readme instructions
- 

## Startup
1) Open 2 git bash windows
2) Use git bash to CD into the project directory in both windows.

In the first window 
```bash
nodemon backend/server.js
```

In the second window
```bash
npm start
```
**TODO**: Make DockerFile for startup and change readme instructions

## Schemas

### Node Schema 
> **id**: Unique ID (not auto generated DB), used by links to connect nodes<br>

> **type**: Determines icon <br>

> **name**: Displayed on SLD next to node<br>

> **icon**: Does nothing, maybe change the icon logic, maybe remove this param<br>

> **x & y**: Before running the D3 simulation, x and y are null/the params do not exist in the DB. <br>

> **text**: Text contains 2 params, static text and dynamic text<br>
>> **static**: Static text is statically displayed and does not change, contains 2 empty params, **label1**, and **label2**<br>
>> **dynamic**: Dynamic text should be pulled from the "Feeder" file that is listed under the diagram's "dataFeedReference" parameter. <br>

> **data**: This is dynamic data. The fields of data should align with the parameters in the Feeder file that is named in the graph's "dataFeedReference" parameter. 

### Link Schema

> **source**: The `id` of the node where the link originates.  

> **target**: The `id` of the node where the link ends.  

> **type**: Optional field describing the kind of link, no function. 

> **label**: An optional static text field.

> **dynamic**: Dynamic values from the Feeder file, similar to node `text.dynamic`.  

> **data**: Additional dynamic fields from the Feeder file, similar to node `data`.


### Graph Schema

> **title**: The title of the diagram for display purposes.

> **description**: A short text describing what the diagram represents.  

> **createdAt**: Timestamp marking when the diagram was created.  

> **category**: Used to group or classify diagrams, has no function currently.

> **kind**: Describes the type or variation of diagram, also has no function.

> **dataFeedReference**: The name of the Feeder file used to populate dynamic values in the node `text.dynamic` and `data` fields.  

> **nodes**: An array of node objects following the Node Schema (see above). These are the visual elements shown in the diagram.  

> **links**: An array of link objects following the Link Schema. These represent connections (edges) between nodes using their `id` values.


### Feeder Schema

> **feedId**: A unique identifier for the feeder.  

> **timestamp**: The time the feeder data was captured or recorded. 

> **data**: A dynamic object containing key-value pairs aligned with node `data` and `text.dynamic`. Fields vary. 


### Icon Schema

> **source**: SVG string of the icon, can be generated with AI. 

> **type**: Corresponds to the node `type` this icon is associated with.  

> **name**: Human-readable name of the icon (for reference or display).



### Icon Defaults
In setupGraph.js, type parameter for each node renders the icon. Nodes do have a parameter "icon", either remove this or change icon logic.  

bus = bus bar = think line<br>
cb = circuit breaker = square<br>
tr = transformer = circle, double circle, triple circle, based on edgeCount function in setupGraph.js<br>
gen = generator = circle with G<br>
sub = substation = spiral<br>
grd = ground<br>
bat = battery<br>
mot = motor<br>
sw = switch<br>
met = meter<br>


# Components

## FeederGraph
### Purpose
The purpose was to provide a simulation of dynamic data feed by generating random values. The random values represented data that is supposed to be coming from the Feeder file. This file is no longer in use and does not effect anything in the app. The functionality of the dynamic feeder graph should be implemented at some point. 
### Calling & Params
None
### Completed Features
Randomly generates fake dynamic data to simulate having a feeder file
### TODO
Everything or nothing


## GraphSelect
### Purpose
Select graph to display from the available graphs. 
### Calling & Params
Loads on start (code in App.js) or when "Select new file" is clicked from Settings component. Sets currentFile global var. 
### Completed Features
Shows available graphs, load SLD, view SLD info, recover deleted files, delete graph
### TODO
Add graph (Button in upper right corner)

## GraphViewEdit
### Purpose
Edit Graph information like title, description, etc.
### Calling & Params
Called from selecting "View File" button from GraphSelect
### Completed Features
Edit graph params like title, description, etc. Save features to backend. 
### TODO
Edit nodes info on expanding cards, edit link info somehow


## LinkInfo
### Purpose
Show info of a selected link
### Calling & Params
Called by clicked on a link
### Completed Features
Shows static link info, can be collapsed and closed
### TODO
Show dynamic link info, improve design

## NodeInfo
### Purpose
Show info of selected node
### Calling & Params
Click on a node
### Completed Features
Shows static node data, collapse and close
### TODO
Show dynamic node data, improve design, add options for what data should be shown on the graph next to the node, add option to edit node from there or open node editor

## OptionsIcons
### Purpose
Opens icon editor
### Calling & Params
Click button on upper left of Graph screen
### Completed Features
Displays icons and gets icons from the backend
### TODO
Edit icons (Heres how I would do it: parse things from the SVG string like "fill", "size", etc things that you would want to edit, allow user to input a new value, write the new value into the SVG string, PUT string to backend. Alternatively you could create parameters for "fill", "size", etc for Icon objects in the backend)

## RecentlyDeleted
### Purpose
Recover deleted files
### Calling & Params
Click button on GraphSelect
### Completed Features
Lists and Recovers the deleted files successfully
### TODO
Improve look

## SaveChanges
### Purpose
To save edits made in GraphViewEdit
### Calling & Params
Click button in GraphViewEdit
### Completed Features
No functionality
### TODO
Implement this feature

## Settings
### Purpose
Display options for the graph
### Calling & Params
Click button on Graph
### Completed Features
Select new file, Node labels, Edit force strength
### TODO
Add functionality for "Disconnected Nodes" option. This was supposed to remove any nodes that dont have a link. 

# Graph

## Graph.js
Everything is rendered here kind of like a single-page website. 
All other components are opened from here or opened by/within a component opened here. 

## setupGraph
Initial render of the SVG icons and linking the nodes

## AppContext
Contains global variables

## graphHelperFuncs
Currently none are in use except for "edgeCount" which is used in setupGraph to count the number of edges a transformer has, which determines if the icon is 1 circle, 2 circles, or 3.





