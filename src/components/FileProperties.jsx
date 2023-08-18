import { useExplorerContext } from '../Context';

import convertBytes from '../util/ConvertBytes';
import convertTimestampToReadableDate from '../util/HumanReadableDate';

function FileProperties(props) {

    const { fileProperties } = props;
    const { setFileProperties } = useExplorerContext();

    const returnToExplorer = () => {
        setFileProperties(null);
    }

    return (
        <>
            <div
                style={{
                    display: 'flex', height: '100%', minHeight: '100vh',
                    width: '90%', margin: '0 5%',
                    flexDirection: 'column'
                }}
            >
                <div style={{
                    width: '100%',
                    display: 'flex', flexDirection: 'column', margin: '16px'
                }}>
                    <button onClick={returnToExplorer}>&#8630;</button>
                </div>


                <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', background: 'rgba(255,255,255,0.1)', padding: '12px' }}>
                    <h4>Name:</h4>
                    <h4>{fileProperties.fileName}</h4>
                </div>

                <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', background: 'rgba(255,255,255,0.025)', padding: '12px' }}>
                    <h4>Path:</h4>
                    <h4>{fileProperties.filePath}</h4>
                </div>

                <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', background: 'rgba(255,255,255,0.1)', padding: '12px' }}>
                    <h4>Size:</h4>
                    <h4>{convertBytes(fileProperties.fileSize)}</h4>
                </div>

                <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', background: 'rgba(255,255,255,0.025)', padding: '12px' }}>
                    <h4>Created:</h4>
                    <h4>{convertTimestampToReadableDate(fileProperties.createdDate)}</h4>
                </div>

                <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', background: 'rgba(255,255,255,0.1)', padding: '12px' }}>
                    <h4>Last Modified:</h4>
                    <h4>{convertTimestampToReadableDate(fileProperties.modifiedDate)}</h4>
                </div>

                <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', background: 'rgba(255,255,255,0.025)', padding: '12px' }}>
                    <h4>Last Accessed:</h4>
                    <h4>{convertTimestampToReadableDate(fileProperties.accessedDate)}</h4>
                </div>
            </div>

        </>
    )
}

export default FileProperties;
