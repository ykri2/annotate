
/**
 * turn to text 
 * - turn param to text
 * - used for making the array to text for the autosuggest component
 */

export const turnToText = (what) => {
    let returnText = [];
    if(typeof what === 'string' && what === "")  {
      returnText = 'start to write';
    } else if(typeof what === 'string' && what !== "") {
      returnText = what;
    } else {
      let value = what;
      returnText = value.join(',')
    }
    return returnText;
  }