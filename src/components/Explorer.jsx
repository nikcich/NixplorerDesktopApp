import { useState, useEffect, useRef } from 'react'
import Drive from './Drive';

import { useExplorerContext } from '../Context';
import Results from './Results';
import SvgSpinners90RingWithBg from './SvgSpinners90RingWithBg';
import useFetchUrl from '../util/fetchUrl';

function Explorer(props) {
    const input = useRef();
    const base = useRef();
    const [isInput1Focused, setInput1Focused] = useState(false);
    const [isInput2Focused, setInput2Focused] = useState(false);
    const [fetchUrl, loading] = useFetchUrl();

    const {
        fetchFileSystemData, openFile, handleContextMenu, setFileProperties,
        data, setData, fsData, setFsData, fetchListOfFileSystems, 
        searchResults, setSearchResults, searching, setSearching
    } = useExplorerContext();

    useEffect(() => {

    });

    const inputSubmit = async (e) => {
        if (!e || (e && e.key === 'Enter')) {
            input.current.blur(); // unfocus

            const filter = input.current.value;
            let directory = "C:\\";
            if (fsData != null && fsData.path) {
                directory = fsData.path;
            }

            const queryParams = new URLSearchParams({
                filter: filter,
                directory: directory
            });

            setSearching(true);
            const response = await fetch(`${fetchUrl}/explorer/search?${queryParams}`);
            const jsonData = await response.json();
            setSearching(false);
            setSearchResults(jsonData);
        }
    }

    return (
        <>
            <div
                style={{
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'flex-start',
                    width: '90%', margin: '0 5%', marginBottom: '50px'
                }}
                ref={base}
                onContextMenu={handleContextMenu}
            >

                {(searching || data == null || data.length == 0) &&
                    <div style={{
                        position: 'absolute', top: '0', left: '0',
                        height: '100%', width: '100%',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        background: 'rgba(0,0,0, 0.5)'
                    }}>
                        <div style={{
                            height: '250px', width: '250px'
                        }}>
                            <SvgSpinners90RingWithBg />
                        </div>
                    </div>
                }


                {searchResults != null || fsData != null ? (
                    <div style={{
                        display: 'flex', top: '0px', position: 'sticky',
                        width: '100%'
                    }}>
                        <p
                            className={"inputContainer pathSearch " + (isInput2Focused ? "searchInactive" : isInput1Focused ? "searchActive" : "searchNeutral")}
                            ref={input} type="text"
                            defaultValue={fsData != null ? fsData.path : ""}
                            placeholder={fsData != null ? fsData.path : "Enter a path"}
                            onKeyDown={inputSubmit}
                            onFocus={() => setInput1Focused(true)}
                            onBlur={() => setInput1Focused(false)}
                            style={{
                                textAlign: 'left', background: '#3B3B3B'
                            }}
                        >{fsData != null ? fsData.path : ""}</p>



                        <div
                            className={"inputContainer " + (isInput1Focused ? "searchInactive" : isInput2Focused ? "searchActive" : "searchNeutral")}
                            style={{ padding: '0', position: 'relative' }}
                        >
                            <input
                                className="fileSearch"
                                style={{
                                    height: '100%', width: '100%', margin: '0', padding: '0 0 0 0',
                                    position: 'absolute', top: '0', left: '0'
                                }}
                                ref={input} type="text"
                                placeholder={"🔍 Search"}
                                onKeyDown={inputSubmit}
                                onFocus={() => setInput2Focused(true)}
                                onBlur={() => setInput2Focused(false)}
                            />

                            <button
                                style={{
                                    height: '100%', width: '50px', margin: '0',
                                    position: 'absolute', top: '0', right: '0', textAlign: 'center',
                                    fontSize: '17.5px'
                                }}
                                onClick={() => inputSubmit()}
                            >&#10148;</button>
                        </div>
                    </div>
                ) : (
                    <></>
                )}

                {searchResults == null ?
                    fsData == null ? (
                        <>
                            <p style={{ color: 'white', fontWeight: 'bold', width: '250px', textAlign: 'left' }}>{data.length} Drive(s) Available</p>
                            {data.map((d) => (
                                <Drive d={d} key={d} onClick={() => { fetchFileSystemData(d.path) }} />
                            ))}
                        </>
                    ) : (
                        <Results fsData={fsData} />
                    )
                    : (
                        <Results fsData={searchResults} />
                    )}
            </div >
        </>
    )
}

export default Explorer;
