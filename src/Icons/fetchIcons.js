
const fetchIcons = async () => {

  try {
    const response = await fetch('/api/icons/'); //Get all icons
    if (!response.ok) {
      throw new Error(`"Error fetching icons from backend! \nStatus: ${response.status}`);
    }
    const json = await response.json();
    console.log("Fetch All Icons Response", json);

   // Transform the array into an svg string mapping to easily set icons in setupGraph.js
   const iconArr = json.map(icon => ({
    type: icon.type,
    src: "data:image/svg+xml;base64," + btoa(icon.svg),
    name: icon.name,
  }));

   return iconArr;

  } catch (error) {
    console.error("Error fetching icons:", error);
    return {}; //Return empty function so it doesnt completely crash, for troubleshooting
  }
};


export default fetchIcons;

  
  
  