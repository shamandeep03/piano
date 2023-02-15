const addScripts=()=>{
  const scripts=document.getElementsByTagName('script')
  const check= Array.from(scripts).find(item=>item.src==='https://www.dropbox.com/static/api/2/dropins.js')
  if(!check){
  const dropboxscript = document.createElement('script')
  dropboxscript.src = 'https://www.dropbox.com/static/api/2/dropins.js'
  dropboxscript.dataset.appKey = ''
  dropboxscript.id='dropboxjs'
  dropboxscript.crossOrigin = 'anonymous'
  document.head.append(dropboxscript)
  }
  const checkgooglescript= Array.from(scripts).find(item=>item.src==='https://apis.google.com/js/api.js')
  if(!checkgooglescript){
  const googlescript = document.createElement('script')
  googlescript.src = 'https://apis.google.com/js/api.js'
  googlescript.crossOrigin = 'anonymous'
  document.head.append(googlescript)
  }
}
const developerKey = ''
const clientId =''
const appId = ''
const scope = [
  'https://www.googleapis.com/auth/drive.file',
  'https://www.googleapis.com/auth/drive.appdata',
]
let pickerApiLoaded = false
let oauthToken
const loadPicker = () => {
  gapi.load('auth', { callback: onAuthApiLoad })
  gapi.load('picker', { callback: onPickerApiLoad })
}
const onAuthApiLoad = () => {
  window.gapi.auth.authorize(
    {
      client_id: clientId,
      scope: scope,
      immediate: false,
    },
    handleAuthResult
  )
}
let onPickerApiLoad = () => {
  pickerApiLoaded = true
  createPicker()
}
const handleAuthResult = (authResult) => {
  if (authResult && !authResult.error) {
    oauthToken = authResult.access_token
    createPicker()
  }
}
const createPicker = () => {
  if (pickerApiLoaded && oauthToken) {
    const view = new google.picker.View(google.picker.ViewId.DOCS)
    view.setMimeTypes(mimeTypes)
    const picker = new google.picker.PickerBuilder()
      .enableFeature(google.picker.Feature.NAV_HIDDEN)
      .enableFeature(google.picker.Feature.MULTISELECT_ENABLED)
      .setAppId(appId)
      .setOAuthToken(oauthToken)
      .addView(view)
      .addView(new google.picker.DocsUploadView())
      .setDeveloperKey(developerKey)
      .setCallback(pickerCallback)
      .build()
    picker.setVisible(true)
  }
}
const pickerCallback = async (data) => {
  if (data.action == google.picker.Action.PICKED) {
    showLoader()
    var filesArray=data.docs.map(async(i)=>{
      const res= await fetch(`https://www.googleapis.com/drive/v3/files/${i.id}?alt=media`,{
      headers: {
        'Authorization': `Bearer ${oauthToken}`  }
     }).then(res=>res.blob())
     let metadata = {
      type: i.mimeType
      }
      const file = new File([res], i.name, metadata);
      return file
    })
    closeLoader()
    getFile(filesArray)
  }
}
function chooseFromDropbox() {
  Dropbox.choose({
    success: async (files) => {
      if (files.length < 0) {
        return
      }
      var dropboxArray=files.map(async(file)=>{
        showLoader()
        const url = new URL(file.link)
        const response = await fetch(url).then((res) => res.blob())
        let metadata = {
          type: response.type,
        }
        let newFile = new File([response], file.name, metadata)
        return newFile
      })
     
      closeLoader()
      getDropBoxFile(dropboxArray)
    },
    cancel: function () {},
    linkType: 'direct', 
    multiselect: true, 
    extensions: [...filemimes], 
    folderselect: false, 
  })
}

const fileupload=(file)=>{
    gapi.load('auth', {'callback': onAuthLoad});
  }
  const onAuthLoad=()=> {
  window.gapi.auth.authorize(
      {
        'client_id': clientId,
        'scope': scope,
        'immediate': false
      },
      handleAuth);
}
const handleAuth=(authResult)=> {
  if (authResult && !authResult.error) {
    showuploadloading()
    var formData = new FormData();
  const fileToUpload = file
var metadata = {
  name: fileToUpload.name,
  mimeType: fileToUpload.type
};
formData.append( "metadata", new Blob( [JSON.stringify( metadata )], {type: "application/json"} ));
formData.append( "file", fileToUpload );
fetch( "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart", {
  method: "POST",
  headers: new Headers({ "Authorization": "Bearer " + gapi.auth.getToken().access_token }),
  body: formData
}).then( function( response ){
  stopuploadloading()
  return response.json();

}).then( function( value ){
  stopuploadloading()
  showmessage()
});
  }
}

  
  