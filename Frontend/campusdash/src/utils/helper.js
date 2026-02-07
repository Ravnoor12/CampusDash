export const isValidEmail = (email) =>{
    const isValid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return isValid.test(email);
}
  

export const catchError = (error)=>{
    const {response} = error;
    if(response?.data) return response.data;
    return {error:error.message || error}; 
}


export const geocodeAddress = async (addressObj) => {
  const { street, city, zip } = addressObj;  

  const query = `${street}, ${city}, ${zip}`;  
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1`
    );
    
    const data = await response.json();

    if (data && data.length > 0) {
      // Nominatim returns strings, so we convert them to numbers
      return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
    } else {
      console.warn("No coordinates found for address:", query);
      return null;
    }
  } catch (error) {
    console.error("Geocoding error:", error);
    return null;
  }
};