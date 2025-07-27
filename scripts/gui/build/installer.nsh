; NSIS 安装程序自定义脚本
; 用于 Vakao UI Publisher 的安装程序定制

; 安装程序页面定制
!macro customInstall
  ; 创建开始菜单快捷方式
  CreateDirectory "$SMPROGRAMS\Vakao UI"
  CreateShortCut "$SMPROGRAMS\Vakao UI\Vakao UI Publisher.lnk" "$INSTDIR\${APP_EXECUTABLE_FILENAME}" "" "$INSTDIR\${APP_EXECUTABLE_FILENAME}" 0
  CreateShortCut "$SMPROGRAMS\Vakao UI\卸载 Vakao UI Publisher.lnk" "$INSTDIR\Uninstall ${PRODUCT_FILENAME}.exe"
  
  ; 注册文件关联（可选）
  ; WriteRegStr HKCR ".vakao" "" "VakaoUIProject"
  ; WriteRegStr HKCR "VakaoUIProject" "" "Vakao UI 项目文件"
  ; WriteRegStr HKCR "VakaoUIProject\DefaultIcon" "" "$INSTDIR\${APP_EXECUTABLE_FILENAME},0"
  ; WriteRegStr HKCR "VakaoUIProject\shell\open\command" "" '"$INSTDIR\${APP_EXECUTABLE_FILENAME}" "%1"'
  
  ; 写入注册表信息
  WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\${UNINSTALL_REGISTRY_KEY}" "DisplayName" "${PRODUCT_NAME}"
  WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\${UNINSTALL_REGISTRY_KEY}" "DisplayVersion" "${VERSION}"
  WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\${UNINSTALL_REGISTRY_KEY}" "Publisher" "Vakao UI Team"
  WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\${UNINSTALL_REGISTRY_KEY}" "DisplayIcon" "$INSTDIR\${APP_EXECUTABLE_FILENAME}"
  WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\${UNINSTALL_REGISTRY_KEY}" "UninstallString" "$INSTDIR\Uninstall ${PRODUCT_FILENAME}.exe"
  WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\${UNINSTALL_REGISTRY_KEY}" "InstallLocation" "$INSTDIR"
  WriteRegDWORD HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\${UNINSTALL_REGISTRY_KEY}" "NoModify" 1
  WriteRegDWORD HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\${UNINSTALL_REGISTRY_KEY}" "NoRepair" 1
!macroend

; 卸载程序定制
!macro customUnInstall
  ; 删除开始菜单快捷方式
  Delete "$SMPROGRAMS\Vakao UI\Vakao UI Publisher.lnk"
  Delete "$SMPROGRAMS\Vakao UI\卸载 Vakao UI Publisher.lnk"
  RMDir "$SMPROGRAMS\Vakao UI"
  
  ; 删除文件关联（如果之前创建了）
  ; DeleteRegKey HKCR ".vakao"
  ; DeleteRegKey HKCR "VakaoUIProject"
  
  ; 删除注册表项
  DeleteRegKey HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\${UNINSTALL_REGISTRY_KEY}"
!macroend

; 安装程序初始化
!macro customInit
  ; 检查是否已经安装
  ReadRegStr $R0 HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\${UNINSTALL_REGISTRY_KEY}" "UninstallString"
  StrCmp $R0 "" done
  
  ; 如果已安装，询问是否卸载
  MessageBox MB_OKCANCEL|MB_ICONEXCLAMATION "检测到 ${PRODUCT_NAME} 已经安装。$\n$\n点击 '确定' 卸载之前的版本，然后继续安装。$\n点击 '取消' 退出安装程序。" IDOK uninst
  Abort
  
  uninst:
    ClearErrors
    ExecWait '$R0 _?=$INSTDIR'
    
    IfErrors no_remove_uninstaller done
    no_remove_uninstaller:
  
  done:
!macroend

; 卸载程序初始化
!macro customUnInit
  ; 确认卸载
  MessageBox MB_YESNO|MB_ICONQUESTION "确定要完全卸载 ${PRODUCT_NAME} 及其所有组件吗？" IDYES +2
  Abort
!macroend

; 安装程序页面定制
!macro customWelcomePage
  ; 自定义欢迎页面文本
  !define MUI_WELCOMEPAGE_TEXT "欢迎使用 ${PRODUCT_NAME} 安装向导。$\r$\n$\r$\n${PRODUCT_NAME} 是一个强大的 UI 组件库发布管理工具，提供直观的图形界面来管理您的组件库项目。$\r$\n$\r$\n点击 '下一步' 继续安装。"
!macroend

; 完成页面定制
!macro customFinishPage
  ; 自定义完成页面
  !define MUI_FINISHPAGE_TEXT "${PRODUCT_NAME} 已成功安装到您的计算机。$\r$\n$\r$\n您可以通过桌面快捷方式或开始菜单启动应用程序。$\r$\n$\r$\n点击 '完成' 退出安装向导。"
  !define MUI_FINISHPAGE_RUN "$INSTDIR\${APP_EXECUTABLE_FILENAME}"
  !define MUI_FINISHPAGE_RUN_TEXT "启动 ${PRODUCT_NAME}"
!macroend