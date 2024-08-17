import React, { useState, useEffect } from 'react';

function FolderList({ data }) {
  const [folders, setFolders] = useState([]);

  useEffect(() => {
    setFolders(data.map((item) => item.req_name));
  }, [data]); // Update folders whenever data changes

  return (
    <div className="folder-container">
      {folders.map((folderName) => (
        <div key={folderName} className="folder">
          {folderName}
        </div>
      ))}
    </div>
  );
}

export default FolderList;