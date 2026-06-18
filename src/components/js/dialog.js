function getSettingsFilePath() {
  try {
    if (typeof window.Application !== 'undefined' && window.Application.Env) {
      const appDataPath = window.Application.Env.GetAppDataPath()
      return appDataPath + '\\WPSAutoFormat\\settings.json'
    }
  } catch (e) {
  }
  return null
}

function loadSettings(settings) {
  const filePath = getSettingsFilePath()
  if (filePath) {
    try {
      if (typeof window.Application !== 'undefined' && window.Application.FileSystem) {
        const fs = window.Application.FileSystem
        if (fs.Exists(filePath)) {
          let content = null
          try {
            content = fs.ReadFile(filePath)
          } catch (e1) {
            try {
              content = fs.readFileString(filePath)
            } catch (e2) { }
          }
          if (content) {
            let parsed = JSON.parse(content)
            Object.keys(parsed).forEach(key => {
              if (key in settings) {
                settings[key] = parsed[key]
              }
            })
            return
          }
        }
      }
    } catch (e) {
    }
  }

  try {
    if (typeof window.getFormatSettings === 'function') {
      let saved = window.getFormatSettings()
      Object.keys(saved).forEach(key => {
        if (key in settings) {
          settings[key] = saved[key]
        }
      })
    }
  } catch (e) {
  }
}

function saveSettings(settings) {
  try {
    let settingsStr = JSON.stringify(settings)

    const filePath = getSettingsFilePath()
    if (filePath) {
      try {
        if (typeof window.Application !== 'undefined' && window.Application.FileSystem) {
          const fs = window.Application.FileSystem
          const dirPath = filePath.substring(0, filePath.lastIndexOf('\\'))
          if (!fs.Exists(dirPath)) {
            fs.Mkdir(dirPath)
          }
          
          if (fs.Exists(filePath)) {
            fs.Remove(filePath)
          }
          
          fs.AppendFile(filePath, settingsStr)
          
          if (fs.Exists(filePath)) {
            let readContent = ''
            try {
              readContent = fs.ReadFile(filePath)
            } catch (e) {
              try {
                readContent = fs.readFileString(filePath)
              } catch (e2) {
              }
            }
          } else {
          }
        } else {
        }
      } catch (e) {
      }
    } else {
    }

    try {
      if (typeof window.saveFormatSettings === 'function') {
        window.saveFormatSettings(settings)
      }
    } catch (e) {
    }

    try {
      if (typeof window.Application !== 'undefined' && window.Application.PluginStorage) {
        window.Application.PluginStorage.setItem('formatSettings', settingsStr)
      }
    } catch (e) {
    }

    alert('设置已保存！')
  } catch (e) {
    alert('保存设置失败：' + e.message + '\n' + e.stack)
  }
}

function resetSettings(settings) {
  try {
    let defaults
    if (typeof window.getDefaultSettings === 'function') {
      defaults = window.getDefaultSettings()
    } else {
      defaults = {
          titleFontSize: 22,
          bodyFontSize: 16,
          h1FontSize: 16,
          h2FontSize: 16,
          h3FontSize: 16,
          h4FontSize: 16,
          titleFont: '方正小标宋简体',
          bodyFont: '仿宋_GB2312',
          h1Font: '黑体',
          h2Font: '楷体_GB2312',
          h3Font: '仿宋_GB2312',
          h4Font: '仿宋_GB2312',
          lineSpacing: 28.9,
          marginTop: 37,
          marginBottom: 35,
          marginLeft: 28,
          marginRight: 26,
          enablePageNumber: true,
          pageNumberPosition: 'center',
          clearFormatting: true,
          disableFontWarning: false,
          autoSplitSubtitle: false
        }
    }
    Object.keys(defaults).forEach(key => {
      if (key in settings) {
        settings[key] = defaults[key]
      }
    })
    saveSettings(settings)
  } catch (e) {
  }
}

export default {
  loadSettings,
  saveSettings,
  resetSettings
}