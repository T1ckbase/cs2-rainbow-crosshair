<div id="toc">
  <ul align="center" style="list-style: none">
    <summary>
      <h1>
        CS2 Rainbow Crosshair
      </h1>
    </summary>
  </ul>
</div>
<p align="center">
  <a href="https://github.com/T1ckbase/cs2-rainbow-crosshair#readme">English</a>
  ·
  <a href="https://github.com/T1ckbase/cs2-rainbow-crosshair/blob/main/zh-TW.md">中文</a>
  &nbsp;|&nbsp;
  <a href="https://github.com/T1ckbase/cs2-rainbow-crosshair/blob/main/v1.1.0.md">v1.1 文檔</a>
</p>

## 功能
- **基於滑鼠移動改變顏色**
- **360個顏色**
- **可調整速度**

## 下載
<a href="https://github.com/T1ckbase/cs2-rainbow-crosshair/releases/latest">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/T1ckbase/cs2-rainbow-crosshair/refs/heads/main/download-button-dark.svg">
    <img src="https://raw.githubusercontent.com/T1ckbase/cs2-rainbow-crosshair/refs/heads/main/download-button-light.svg" alt="下載" width="108" height="32">
  </picture>
</a>

[id1]: ## "Counter-Strike Global Offensive/game/csgo/cfg/autoexec.cfg"
## 使用方式
1. 將解壓縮後的資料夾放到 :file_folder:`Steam/steamapps/common/Counter-Strike Global Offensive/game/csgo/cfg`
2. 添加以下指令到你的 [autoexec.cfg][id1]
```
exec t1ckbase_rainbow_crosshair/init

// speed setting (1 ~ 30)
rainbow_crosshair_speed_10

rainbow_crosshair_enable
// rainbow_crosshair_disable
// rainbow_crosshair_toggle
```

## 指令
- 打開彩虹準星
```
rainbow_crosshair_enable
```
- 關閉彩虹準星
```
rainbow_crosshair_disable
```
- 開關彩虹準星
```
rainbow_crosshair_toggle
```
- 調整速度 `(1 ~ 30)`
```
rainbow_crosshair_speed_10
```

## 顏色預覽
<img src="https://raw.githubusercontent.com/T1ckbase/cs2-rainbow-crosshair/refs/heads/main/rainbow.svg" width="80px" height="80px">

<br/>

## 舊的GIF
![cs2-rainbow-crosshair](https://github.com/T1ckbase/cs2-rainbow-crosshair/assets/146760065/6a01bc8a-d4c8-48ad-b6ed-f93c4a2c1b64)
