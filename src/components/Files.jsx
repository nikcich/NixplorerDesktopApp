function Files(props) {

    const { files, onClick } = props;

    return (
        <>
            {files.length == 0 ? (
                <h4></h4>
            ) : (
                <>
                    {files.map((f) => (
                        <div
                            key={f.parent + "\\" + f.name}
                            className="fileFolderElement"
                            onClick={() => onClick(f)}
                            data-file={JSON.stringify(f)}
                        >
                            📄 {f.name}
                        </div>
                    ))}
                </>
            )}
        </>
    )
}

export default Files
