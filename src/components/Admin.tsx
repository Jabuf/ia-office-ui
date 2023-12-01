import { List, ListItem, ListItemText } from '@mui/material'
import { useEffect, useState } from 'react'
import { DriveFileInfo, getFiles } from '../api/FileService'
import GoogleIcon from './base/GoogleIcon'

function Admin() {
  const [files, setFiles] = useState<DriveFileInfo[]>([])
  useEffect(() => {
      const fetchFiles = async () => {
        const response = await getFiles()
        if (response) {
          setFiles(response.data)
        }
      }
      void fetchFiles()
    }, [])

  return (
    <div className="Admin overflow-auto">
      <header className="flex  bg-slate-900 text-slate-50">
        <div className="flex">
          <List>
            {files.map((file) => (
              <ListItem>
                <GoogleIcon
                  type={
                    file.fileType === 'application/vnd.google-apps.document'
                      ? 'docs'
                      : file.fileType ===
                        'application/vnd.google-apps.spreadsheet'
                      ? 'sheets'
                      : 'slides'
                  }
                />
                <a href={file.webViewLink ?? ''} target="_blank">
                  <ListItemText primary={`${file.fileName??''} - ${file.created??''}`} />
                </a>
              </ListItem>
            ))}
          </List>
        </div>
      </header>
    </div>
  )
}

export default Admin
