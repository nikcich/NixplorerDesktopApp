import { useState, useEffect, useRef } from 'react'
import './App.css'
import Explorer from './components/Explorer';
import Context from './Context';
import FileProperties from './components/FileProperties';
import ContextMenu from './components/ContextMenu';
import useFetchUrl from './util/fetchUrl';

function App() {

  const [data, setData] = useState([]);
  const [fsData, setFsData] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const [fileProperties, setFileProperties] = useState(null);
  const [contextMenu, setContextMenu] = useState({ isVisible: false, top: 0, left: 0, options: [] });
  const [searching, setSearchingState] = useState(false);

  const [fetchUrl, loading] = useFetchUrl();

  const setSearching = (b) => {
    if (b == false) {
      setTimeout(() => {
        setSearchingState(b)
      }, 200)

    } else {
      setSearchingState(b);
    }
  }

  const fetchListOfFileSystems = async () => {
    try {
      const response = await fetch(fetchUrl + '/explorer/fileSystems');
      const jsonData = await response.json();

      setData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleContextMenu = (e) => {
    e.preventDefault();
    let target = e.target;
    if (target.getAttribute("data-file")) {
      let dataFile = JSON.parse(target.getAttribute("data-file"));
      let type = dataFile.type;
      let options = [
        { label: type == "FOLDER" ? 'Open Folder In Windows Explorer' : 'Open File', action: 'open' },
        { label: 'Properties', action: 'properties' },
      ];

      if (type == "FILE") {
        options.splice(1, 0, {
          label: "Open File Location", action: 'openLocation'
        });
      }



      setContextMenu({ isVisible: true, top: e.clientY, left: e.clientX, options, f: dataFile });
    } else {
      const empty = [];
      setContextMenu({ isVisible: false, top: e.clientY, left: e.clientX, empty, f: null });
    }
  };

  const openFile = async (f) => {
    let p = f.parent;
    if (!p.endsWith('\\')) {
      p += '\\';
    }
    p += f.name;

    const queryParams = new URLSearchParams({
      path: p
    });
    const url = `/explorer/open?${queryParams}`;

    const headers = {
      'Content-Type': 'application/json'
    };

    const requestOptions = {
      method: 'POST',
      headers: headers
    };

    setSearching(true);
    await fetch(fetchUrl + url, requestOptions);
    setSearching(false);
  }

  const fetchFileProperties = async (f) => {
    let p = f.parent;
    if (!p.endsWith('\\')) {
      p += "\\";
    }
    p += f.name;

    try {
      if (!p.endsWith('\\')) {
        p += '\\';
      }

      const queryParams = new URLSearchParams({
        path: p
      });

      setSearching(true);
      const response = await fetch(fetchUrl + `/explorer/properties?${queryParams}`);
      const jsonData = await response.json();
      setSearching(false);
      setFileProperties(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const openFileLocation = async (f) => {
    let p = f.parent.split('\\');
    let name = p.pop();
    p = p.join('\\');
    const parent = {
      root: f.root,
      parent: p,
      name: name
    }
    return await openFile(parent);
  }

  const handleContextMenuClose = async (action, f) => {
    if (action == "open" && f != null && f != undefined) {
      await openFile(f);
    } else if (action == "properties" && f != null && f != undefined) {
      await fetchFileProperties(f);
    } else if (action == "openLocation" && f != null && f != undefined) {
      await openFileLocation(f);
    }

    setContextMenu({ isVisible: false, top: 0, left: 0, options: [], f: null });
  };

  const fetchFileSystemData = async (fs) => {
    try {
      if (!fs.endsWith('\\')) {
        fs += '\\';
      }

      const queryParams = new URLSearchParams({
        path: fs
      });

      setSearching(true);
      const response = await fetch(fetchUrl + `/explorer/path?${queryParams}`);
      const jsonData = await response.json();
      setSearching(false);
      setFsData(jsonData);
      setSearchResults(null);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }


  if (data.length == 0) {
    fetchListOfFileSystems();
  }

  const contextData = {
    message: 'Hello from the context!',
    setFileProperties: setFileProperties,
    data: data,
    setData: setData,
    fsData: fsData,
    setFsData: setFsData,
    fetchListOfFileSystems: fetchListOfFileSystems,
    setContextMenu: setContextMenu,
    handleContextMenu: handleContextMenu,
    openFile: openFile,
    searchResults: searchResults,
    setSearchResults: setSearchResults,
    fetchFileSystemData: fetchFileSystemData,
    searching: searching,
    setSearching: setSearching
  };

  return (
    <Context.Provider value={contextData}>

      {loading ? (
        <h2>Loading URL...</h2>
      ) : (
        <div style={{ width: '100vw', height: '100vh', overflowX: 'hidden' }}>
          {fileProperties == null ? (
            <Explorer />
          ) : (
            <FileProperties fileProperties={fileProperties} />
          )}

        </div>
      )}

      <ContextMenu {...contextMenu} onClose={handleContextMenuClose} />

    </Context.Provider >
  )
}

export default App
