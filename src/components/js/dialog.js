function loadSettings(settings) {
  try {
    if (typeof window.Application !== 'undefined' && window.Application.PluginStorage) {
      let saved = window.Application.PluginStorage.getItem('formatSettings')
      if (saved) {
        let parsed = JSON.parse(saved)
        Object.keys(parsed).forEach(key => {
          if (key in settings) {
            settings[key] = parsed[key]
          }
        })
        return
      }
    }
  } catch (e) {
    console.log('读取设置失败', e)
  }
  //尝试从window上读取（ribbon.js导出的）
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
    console.log('从window读取设置失败', e)
  }
}

function saveSettings(settings) {
  try {
    let settingsStr = JSON.stringify(settings)
    //方法1: WPS PluginStorage
    try {
      if (typeof window.Application !== 'undefined' && window.Application.PluginStorage) {
        window.Application.PluginStorage.setItem('formatSettings', settingsStr)
      }
    } catch (e) {
      console.log('保存到PluginStorage失败', e)
    }
    //方法2: 调用ribbon.js导出的保存函数
    try {
      if (typeof window.saveFormatSettings === 'function') {
        window.saveFormatSettings(settings)
      }
    } catch (e) {
      console.log('调用saveFormatSettings失败', e)
    }
    //方法3: localStorage作为备选
    try {
      localStorage.setItem('formatSettings', settingsStr)
    } catch (e) {
      console.log('保存到localStorage失败', e)
    }
    alert('设置已保存！')
  } catch (e) {
    alert('保存设置失败：' + e.message)
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
        clearFormatting: true
      }
    }
    Object.keys(defaults).forEach(key => {
      if (key in settings) {
        settings[key] = defaults[key]
      }
    })
    //同时保存到本地
    saveSettings(settings)
  } catch (e) {
    alert('恢复默认设置失败：' + e.message)
  }
}

export default {
  loadSettings,
  saveSettings,
  resetSettings
}
