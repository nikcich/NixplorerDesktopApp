function Folders(props) {

    const { folders, onClick } = props;

    return (
        <>
            {folders.length == 0 ? (
                <h4></h4>
            ) : (
                <>
                    {folders.map((f) => (
                        <div
                            key={f.parent + "\\" + f.name}
                            className="fileFolderElement"
                            onClick={() => onClick(f)}
                            data-file={JSON.stringify(f)}
                        >
                            📂 {f.name}
                        </div>
                    ))}
                </>
            )}
        </>
    )
}

export default Folders
