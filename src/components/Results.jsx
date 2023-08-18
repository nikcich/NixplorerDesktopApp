import Files from './Files';
import Folders from './Folders';
import { useExplorerContext } from '../Context';
import { useEffect, useState } from 'react';

const Results = (props) => {

    const {
        fetchFileSystemData, openFile,
        setFsData, fetchListOfFileSystems, setSearchResults
    } = useExplorerContext();

    const [maxResults, setMaxResults] = useState(100);

    const { fsData } = props;

    const fetchFolderData = async (f) => {
        let p = f.parent;
        if (!p.endsWith('\\')) {
            p += "\\";
        }
        p += f.name;

        await fetchFileSystemData(p);
    }

    const upLevel = async () => {

        let p = fsData.path;
        let spl = fsData.path.split('\\');
        let filteredSpl = [];
        for (let s of spl) {
            if (s != '') {
                filteredSpl.push(s);
            }
        }

        if (filteredSpl.length <= 1) {
            setFsData(null);
            await fetchListOfFileSystems();
        } else {
            filteredSpl.pop();
            const newPath = filteredSpl.join('\\');
            await fetchFileSystemData(newPath + '\\')
        }

        setSearchResults(null);
    }

    // Create new arrays with limited results
    const limitedFolders = fsData.folders.slice(0, maxResults);
    const limitedFiles = fsData.files.slice(0, maxResults);
    const hasMore = (fsData.folders.length + fsData.files.length) != (limitedFolders.length + limitedFiles.length);

    useEffect(() => {
        setMaxResults(100);
    }, [fsData]);

    return (
        <>
            <div style={{
                height: '100%', width: '100%',
                display: 'flex', flexDirection: 'column'
            }}>
                <button onClick={upLevel}>&#8630;</button>
                {fsData.folders.length == 0 && fsData.files.length == 0 ? (
                    <h4>No contents to display...</h4>
                ) : (
                    <>
                        <Folders folders={limitedFolders} onClick={(e) => { fetchFolderData(e) }} />
                        <Files files={limitedFiles} onClick={(e) => { openFile(e) }} />
                    </>
                )}

                {hasMore ? (
                    <button className="loadMoreButton" onClick={() => setMaxResults((old) => old + 100)}>Load More</button>
                ) : (<></>)}

                <p className="showingText" >Showing {limitedFolders.length + limitedFiles.length} of {fsData.files.length + fsData.folders.length}</p>
            </div>
        </>
    )
}

export default Results;