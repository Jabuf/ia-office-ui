import { List, ListItem, ListItemText } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { DriveFileInfo, getFiles } from '../api/FileService'
import GoogleIcon from './base/GoogleIcon'
import BaseButton from './base/BaseButton'
import { getStatus } from '../api/SpreadsheetService'
import BaseNotification from './base/BaseNotification'

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

  const [loading, setLoading] = useState(false)
  const checkStatusOpenApi = () => {
    void (async () => {
      setLoading(true)
      await getStatus()
      setLoading(false)
    })()
  }

  return (
    <div className="Admin overflow-auto">
      <header className="flex flex-col bg-slate-900 text-slate-50">
        <div className="p-5">
          <BaseButton
            onClick={checkStatusOpenApi}
            label="Status"
            loading={loading}
          />
        </div>
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
                  <ListItemText
                    primary={`${file.fileName ?? ''} - ${file.created ?? ''}`}
                  />
                </a>
              </ListItem>
            ))}
          </List>
        </div>
        <BaseNotification />
      </header>
    </div>
  )
}

export default Admin
