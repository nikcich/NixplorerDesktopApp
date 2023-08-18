function Drive(props) {

    const { d, onClick } = props;

    return (
        <>
            <div key={d} className="drive-container" onClick={onClick}>
                <div className="progress-bar" style={{ width: `${d.percentage * 100}%` }} />

                <div className="drive-info">
                    <p>{d.path} Drive -</p>
                    <p>{d.usedSpace}</p>
                    <p>/</p>
                    <p>{d.totalSpace}</p>
                </div>
                
            </div>
        </>
    )
}

export default Drive
