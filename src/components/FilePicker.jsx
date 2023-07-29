import CustomButton from "./CustomButton"


function FilePicker({file, setFile, readFile}) {
  return (
    <div className="filepicker-container">
        <div className="flex-1 flex flex-col">
          <input type="file" id="file-upload" accept="image/*" onChange={(e) => setFile(e.target.files[0])}/>
          <label htmlFor="file-upload" className="filepicker-label">Upload File</label>
          <p className="mt-2 text-gray-500 text-xs truncate">
            {file === '' ? 'No file selected' : file.name}
          </p>
        </div>
        <div className="mt-4 flex flex-wrap gap-3">
          <CustomButton 
            customStyles='text-xs'
            handleClick={() => readFile('logo')}
            title={`Logo`}
            type='outline'
          />
          <CustomButton 
            customStyles='text-xs'
            handleClick={() => readFile('full')}
            title={`Full`}
            type='filled'
          />
        </div>
    </div>
  )
}

export default FilePicker