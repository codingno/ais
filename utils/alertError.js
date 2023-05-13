import axios from "axios";

export default function alertError(error) {
 if(axios.isCancel(error)) 
		return
 if(error.response) {
  console.log("🚀 ~ file: alertError.js ~ line 2 ~ alertError ~ error", error.response)
  if (error.response.status == 404) return;

  if(typeof(error.response.data) == 'string')
    return alert(error.response.data)
  if(error.response.statusText)
    return alert(error.response.statusText)
 }
 else
  alert(error)
 console.log("🚀 ~ file: alertError.js ~ line 13 ~ alertError ~ error", error)
}